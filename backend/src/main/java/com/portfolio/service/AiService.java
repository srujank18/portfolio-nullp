package com.portfolio.service;

import com.portfolio.dto.AiRequest;
import com.portfolio.dto.AiResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.net.URI;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class AiService {

    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${ai.api.key:}")
    private String apiKey;

    @Value("${ai.api.key-location:bearer}")
    private String apiKeyLocation; // options: bearer | header | query

    @Value("${ai.api.key-header:x-api-key}")
    private String apiKeyHeaderName;

    // Default URL is a placeholder; override with the real Gemini/OpenAI-compatible endpoint
    @Value("${ai.api.url:https://api.openai.com/v1/completions}")
    private String apiUrl;

    public AiResponse ask(AiRequest request) {
        if (apiKey == null || apiKey.isBlank()) {
            log.warn("AI API key not configured (property 'ai.api.key' or env var expected)");
            return new AiResponse("AI API key not configured");
        }

        try {
            boolean isGoogle = apiUrl != null && apiUrl.contains("generativelanguage.googleapis.com");

            String targetUrl = apiUrl;
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            // For Google endpoints, append key as query param
            if (isGoogle) {
                if (targetUrl.contains("?")) targetUrl = targetUrl + "&key=" + encode(apiKey);
                else targetUrl = targetUrl + "?key=" + encode(apiKey);
                // Also set header if configured as header (some setups may expect it)
                if ("header".equalsIgnoreCase(apiKeyLocation)) {
                    headers.set(apiKeyHeaderName, apiKey);
                }
            } else {
                // Apply API key depending on configured location
                if ("bearer".equalsIgnoreCase(apiKeyLocation)) {
                    headers.setBearerAuth(apiKey);
                } else if ("header".equalsIgnoreCase(apiKeyLocation)) {
                    headers.set(apiKeyHeaderName, apiKey);
                } else if ("query".equalsIgnoreCase(apiKeyLocation)) {
                    if (targetUrl.contains("?")) targetUrl = targetUrl + "&key=" + encode(apiKey);
                    else targetUrl = targetUrl + "?key=" + encode(apiKey);
                } else {
                    headers.setBearerAuth(apiKey);
                }
            }

            log.info("Calling AI provider at {} with apiKeyLocation={}", targetUrl, apiKeyLocation);

            ResponseEntity<Map> response = null;

            if (isGoogle) {
                // Google Generative Language API uses 'contents' (messages-style) format
                // Reference: https://ai.google.dev/api/rest/v1beta/models/generateContent
                List<Object> contents = new ArrayList<>();
                Map<String, Object> message = Map.of(
                        "role", "user",
                        "parts", List.of(Map.of("text", request.getPrompt()))
                );
                contents.add(message);

                Map<String, Object> googleBody = Map.of(
                        "contents", contents
                );

                try {
                    log.info("Calling Google Gemini with correct 'contents' format (messages-style)");
                    response = doPost(targetUrl, googleBody, headers);
                    if (response != null && response.getStatusCode().is2xxSuccessful()) {
                        log.info("Google API returned success");
                    }
                } catch (HttpClientErrorException ex) {
                    String body = ex.getResponseBodyAsString(StandardCharsets.UTF_8);
                    log.error("Google API returned error: {} body: {}", ex.getStatusCode(), body);
                    throw ex;
                }
            } else {
                // Generic provider: use OpenAI-like body
                Map<String, Object> genericBody = Map.of(
                        "model", request.getModel() == null ? "gemini" : request.getModel(),
                        "prompt", request.getPrompt(),
                        "max_tokens", 200
                );
                response = doPost(targetUrl, genericBody, headers);
            }

            if (response == null) throw new RuntimeException("No response from AI provider");

            if (!response.getStatusCode().is2xxSuccessful() || response.getBody() == null) {
                log.warn("AI provider returned non-2xx or empty body: {}", response.getStatusCode());
                return new AiResponse("AI provider returned status: " + response.getStatusCode());
            }

            Map respBody = response.getBody();
            log.info("AI provider response body keys: {}", respBody.keySet());

            // Parse Google Gemini response format: { candidates: [ { content: { parts: [ { text: "..." } ] } } ] }
            Object candidatesObj = respBody.get("candidates");
            if (candidatesObj instanceof List) {
                List candidates = (List) candidatesObj;
                if (!candidates.isEmpty()) {
                    Object first = candidates.get(0);
                    if (first instanceof Map) {
                        Map firstCandidate = (Map) first;

                        // Try to get content.parts[0].text
                        Object contentObj = firstCandidate.get("content");
                        if (contentObj instanceof Map) {
                            Map content = (Map) contentObj;
                            Object partsObj = content.get("parts");
                            if (partsObj instanceof List) {
                                List parts = (List) partsObj;
                                if (!parts.isEmpty()) {
                                    Object firstPart = parts.get(0);
                                    if (firstPart instanceof Map) {
                                        Object text = ((Map) firstPart).get("text");
                                        if (text != null) {
                                            log.info("Extracted text from Google response: {}", text);
                                            return new AiResponse(text.toString());
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

            // Fallback parsing for other shapes
            // 1) OpenAI-like: { choices: [ { text: '...' } ] }
            Object choicesObj = respBody.get("choices");
            if (choicesObj instanceof List) {
                List choices = (List) choicesObj;
                if (!choices.isEmpty()) {
                    Object first = choices.get(0);
                    if (first instanceof Map) {
                        Object text = ((Map) first).get("text");
                        if (text != null) return new AiResponse(text.toString());
                    }
                }
            }

            // 2) Other possible shapes
            Object output = respBody.get("output");
            if (output instanceof List) {
                List outList = (List) output;
                if (!outList.isEmpty()) {
                    Object first = outList.get(0);
                    if (first instanceof Map) {
                        Object content = ((Map) first).get("content");
                        if (content != null) return new AiResponse(content.toString());
                    }
                }
            }

            Object answer = respBody.get("answer");
            if (answer != null) return new AiResponse(answer.toString());

            return new AiResponse(respBody.toString());

        } catch (HttpClientErrorException ex) {
            String body = ex.getResponseBodyAsString(StandardCharsets.UTF_8);
            log.error("HTTP error from AI provider: {} body: {}", ex.getStatusCode(), body);
            return new AiResponse("Error calling AI provider: " + ex.getStatusCode() + " " + ex.getStatusText() + ": " + body);
        } catch (Exception ex) {
            log.error("Error calling AI provider", ex);
            return new AiResponse("Error calling AI provider: " + ex.getMessage());
        }
    }

    private ResponseEntity<Map> doPost(String targetUrl, Object body, HttpHeaders headers) {
        HttpEntity<Object> entity = new HttpEntity<>(body, headers);
        return restTemplate.postForEntity(URI.create(targetUrl), entity, Map.class);
    }

    private String encode(String s) {
        try {
            return java.net.URLEncoder.encode(s, StandardCharsets.UTF_8.name());
        } catch (Exception e) {
            return s;
        }
    }
}
