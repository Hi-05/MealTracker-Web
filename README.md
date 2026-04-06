# MealTracker: Enterprise Full-Stack Application

## 📌 Project Overview
MealTracker is a comprehensive web application designed to track daily nutritional intake and plan weekly meals.It empower users to log daily dietary intake, specifically calculating real-time caloric and protein consumption to track and manage nutritional targets. It is architected using a decoupled microservice-style approach, featuring a React (Vite) frontend and a Java Spring Boot REST API backend.

## 🚀 Technical Architecture & Engineering Decisions
* **Separation of Concerns:** The frontend handles all UI rendering, state management, and user-side calculations, strictly sending validated JSON payloads to the backend.
* **Secure Backend Validation:** The Spring Boot API acts as the final ledger, re-validating all incoming data and calculations before database persistence to prevent malicious client-side manipulation.
* **Build Tools:** Utilized Vite for rapid frontend Hot Module Replacement (HMR) and Maven for rigorous Java dependency management.

## 💻 Tech Stack
**Frontend:**
* React.js (Vite)
* JavaScript / HTML5 / CSS3

**Backend:**
* Java 17+
* Spring Boot (Spring Web, Spring Data JPA)
* MySQL

## 🛠️ Local Setup & Installation
To run this application locally, you will need Node.js and Java JDK installed on your machine.

### 1. Clone the repository
`git clone https://github.com/Hi-05/MealTracker-App.git`

### 2. Run the Backend (Spring Boot)
1. Navigate to the backend directory: `cd backend`
2. Configure your `application.properties` with your local database credentials.
3. Run the application using your IDE or Maven: `./mvnw spring-boot:run`

### 3. Run the Frontend (React/Vite)
1. Open a new terminal and navigate to the frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Start the Vite development server: `npm run dev`
