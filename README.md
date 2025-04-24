# Alexa Chatbot

A web-based AI chatbot application built with React and Node.js, powered by OpenAI's GPT-3.5.

## Features

- Real-time chat interface
- Modern UI with Material-UI components
- OpenAI GPT-3.5 integration
- Responsive design

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- OpenAI API key

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm run install-all
   ```

3. Configure the environment:
   - Copy the `.env` file in the server directory
   - Replace `your_openai_api_key_here` with your actual OpenAI API key

## Running the Application

1. Start both client and server:
   ```bash
   npm start
   ```

2. The client will run on `http://localhost:3000`
3. The server will run on `http://localhost:5000`

## Project Structure

- `client/` - React frontend application
- `server/` - Node.js backend server
- `package.json` - Root package configuration
- `README.md` - This file

## Technologies Used

- Frontend:
  - React
  - Material-UI
  - Axios

- Backend:
  - Node.js
  - Express
  - OpenAI API
  - CORS 