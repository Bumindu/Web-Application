require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Groq } = require('groq-sdk');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 5000;

// Check for required environment variables
if (!process.env.GROQ_API_KEY) {
  console.error('Error: GROQ_API_KEY is not set in .env file');
  process.exit(1);
}

// Initialize Groq
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
});

// Enhanced CORS configuration
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is running!' });
});

// File upload route
app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({ url: fileUrl });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'File upload failed' });
  }
});

// Routes
app.post('/api/chat', async (req, res) => {
  try {
    console.log('Received chat request:', req.body);
    const { message, imageUrl } = req.body;
    
    if (!message && !imageUrl) {
      return res.status(400).json({ error: 'Message or image is required' });
    }

    const messages = [
      {
        role: "system",
        content: "You are Alexa, a helpful and friendly AI assistant. Keep your responses concise and helpful."
      },
      {
        role: "user",
        content: imageUrl 
          ? `User has shared an image. Please analyze it and respond to: ${message || "What's in this image?"}`
          : message
      }
    ];

    const completion = await groq.chat.completions.create({
      model: "llama3-70b-8192",
      messages: messages,
      temperature: 0.7,
      max_tokens: 150
    });

    console.log('Groq response:', completion.choices[0].message.content);
    res.json({ response: completion.choices[0].message.content });
  } catch (error) {
    console.error('Error details:', error);
    res.status(500).json({ 
      error: 'Something went wrong',
      details: error.message 
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log('Groq API Key configured:', process.env.GROQ_API_KEY ? 'Yes' : 'No');
  console.log('Upload directory:', path.join(__dirname, 'uploads'));
}); 