# Portfolio Management Application (MVP)

A full-stack application to track investments, visualizing allocation, and getting AI-based market sentiment. Built with **Spring Boot** and **React**.

## Features
- **Portfolio Overview**: View total balance, gain/loss, and top categories.
- **Asset Management**: Add and remove stocks, bonds, or other assets.
- **Visualizations**: Interactive pie chart for category allocation.
- **AI Sentiment**: Get simulated market sentiment analysis for any ticker.
- **Premium UI**: Modern dark-mode interface.

## Prerequisites
- Java 17
- MySQL Database
- Node.js & npm

## Setup Instructions

### 1. Database Setup
Ensure MySQL is running. The application expects a database named `portfolio_db`.
Update credentials in `backend/src/main/resources/application.properties` if needed (default: root/root).

### 2. Backend Setup
Navigate to the `backend` directory:
```bash
cd backend
mvn spring-boot:run
```
> **Important**: If you see an error like `'mvn' is not recognized`, it means Maven is not installed on your system.
> **Solution**:
> 1.  **Recommended**: Open the `backend` folder in an IDE like **IntelliJ IDEA** or **Eclipse**. Run the `PortfolioApplication` class directly. The IDE will handle Maven dependencies for you.
> 2.  **Alternative**: [Install Apache Maven](https://maven.apache.org/install.html) manually and add it to your system PATH.

The backend will start on `http://localhost:8080`.
API Documentation: `http://localhost:8080/swagger-ui.html`

### 3. Frontend Setup
Navigate to the `frontend` directory:
```bash
cd frontend
npm install
npm run dev
```
Access the application at `http://localhost:5173`.

## Architecture
- **Backend**: Spring Boot 3, Spring Data JPA, MySQL.
- **Frontend**: React, Vite, Chart.js, CSS Variables.
- **Testing**: JUnit 5, Mockito, MockMvc.

## Known Limitations
- Market data is currently mocked (randomized prices).
- Single user support (no authentication for MVP).
