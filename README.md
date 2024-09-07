# Branch Messaging Web App

## Overview
Welcome to the Branch Messaging Web App project! This application is designed to handle a high volume of customer inquiries and facilitate efficient communication between customers and a team of agents. The app supports multiple agents logging in simultaneously to respond to customer messages. This README provides instructions for setting up, running, and testing the application.

## Features

### Basic Functionality
1. **Agent Messaging Portal**: Allows agents to view and respond to customer messages.
2. **Message Management**: Store and retrieve messages from a database.
3. **Simulated API Endpoint**: A simple web form simulates incoming customer messages.

### Optional Features Implemented
- **Work Division**: Mechanism to prevent multiple agents from working on the same message simultaneously.
- **Search Functionality**: Search over incoming messages and/or customers.
- **Real-time Updates**: Use of websockets for real-time message updates.

## Setup Instructions

### Prerequisites
- Node.js (v14.x or later)
- npm (v6.x or later)
- Any IDE (or VS Code)
- A modern web browser

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/MuskanGarg24/branch-international.git
   cd branch-international
   ```
2. **Setup Server**
    ```bash
    cd server
    npm install
    node index.js
    ```
3. **Setup Client**
    ```bash
    cd client
    npm install
    npm run dev
    ```
4. The application will be available at **http://localhost:5173**

## Tech Stack Used

- **Frontend**:
  - React.js
  - Tailwind CSS

- **Backend**:
  - Node.js
  - Express.js
  - Socket.io

- **Database**:
  - MongoDB

- **Deployment**:
  - Render and Vercel

## Live Application

You can access the live version of the application at the following URL:

[https://cms-web-app-iota.vercel.app/](https://cms-web-app-iota.vercel.app/)
    