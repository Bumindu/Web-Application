# Alexa Chatbot

A modern AI chatbot web application built with React, Node.js, and Groq AI.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Development](#development)
- [Deployment](#deployment)
- [Team Collaboration](#team-collaboration)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- Interactive AI chatbot powered by Groq's LLaMA 3 model
- User authentication with Firebase
- Real-time chat interface
- Image upload and analysis
- Responsive design for all devices
- Dark/light mode support

## 🛠️ Tech Stack

### Frontend
- React
- Material UI
- Firebase Authentication
- Axios

### Backend
- Node.js
- Express
- Groq SDK
- Multer (file uploads)

### DevOps
- GitHub Actions (CI/CD)
- SonarCloud (code quality)
- Snyk (security scanning)

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn
- Firebase account
- Groq API key

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/alexa-chatbot.git
   cd alexa-chatbot
   ```

2. Install dependencies
   ```bash
   npm run install-all
   ```

3. Set up environment variables
   ```bash
   # Create .env file in the server directory
   touch server/.env
   ```

   Add the following to the .env file:
   ```
   GROQ_API_KEY=your_groq_api_key
   PORT=5000
   ```

4. Start the development servers
   ```bash
   npm start
   ```

## 📁 Project Structure

```
alexa-chatbot/
├── client/                 # Frontend React application
│   ├── public/             # Static files
│   └── src/                # React source code
│       ├── assets/         # Images, icons, etc.
│       ├── components/     # Reusable components
│       ├── firebase.js     # Firebase configuration
│       └── App.js          # Main application component
├── server/                 # Backend Node.js application
│   ├── uploads/            # Uploaded files
│   └── server.js           # Express server
├── .github/                # GitHub configuration
│   ├── ISSUE_TEMPLATE/     # Issue templates
│   └── workflows/          # GitHub Actions workflows
├── CONTRIBUTING.md         # Contribution guidelines
├── TEAM_COLLABORATION.md   # Team collaboration protocols
└── package.json            # Root package.json
```

## 💻 Development

### Running the Application

```bash
# Start both client and server
npm start

# Start only the client
npm run client

# Start only the server
npm run server
```

### Testing

```bash
# Run tests
npm test
```

### Linting

```bash
# Run linter
npm run lint
```

### Building for Production

```bash
# Build the client
npm run build
```

## 🌐 Deployment

The application is automatically deployed using GitHub Actions:

- Push to `develop` branch: Deploys to staging environment
- Push to `main` branch: Deploys to production environment

See the [deployment workflow](.github/workflows/deploy.yml) for details.

## 👥 Team Collaboration

We follow specific protocols for team collaboration. Please refer to our [Team Collaboration Guide](TEAM_COLLABORATION.md) for details on:

- Communication channels and guidelines
- Git workflow and branching strategy
- Code review process
- Issue tracking and management
- Documentation standards
- Meeting protocols
- Onboarding process for new team members

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details on how to get started.

## 📄 License

This project is licensed under the ISC License.
