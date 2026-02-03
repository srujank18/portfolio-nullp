package com.portfolio.dto;

public class AiRequest {
    private String prompt;
    private String model;

    public AiRequest() {}

    public AiRequest(String prompt, String model) {
        this.prompt = prompt;
        this.model = model;
    }

    public String getPrompt() {
        return prompt;
    }

    public void setPrompt(String prompt) {
        this.prompt = prompt;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }
}
