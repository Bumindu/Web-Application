import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Container, 
  Box, 
  TextField, 
  Button, 
  Paper, 
  Typography,
  CircularProgress,
  Alert,
  Snackbar,
  Avatar,
  AppBar,
  Toolbar,
  IconButton,
  useTheme,
  ThemeProvider,
  createTheme,
  Switch,
  FormControlLabel,
  Badge,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import PersonIcon from '@mui/icons-material/Person';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ImageIcon from '@mui/icons-material/Image';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import ChatApp from './components/ChatApp';

// Protected Route component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularProgress />
    </Box>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

function App() {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [serverStatus, setServerStatus] = useState('checking');
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem('themeMode');
    return savedMode || 'light';
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('themeMode', mode);
  }, [mode]);

  // Create theme based on mode
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === 'light' ? '#4B5563' : '#9CA3AF',
            light: mode === 'light' ? '#6B7280' : '#D1D5DB',
            dark: mode === 'light' ? '#374151' : '#6B7280',
          },
          secondary: {
            main: mode === 'light' ? '#6B7280' : '#9CA3AF',
            light: mode === 'light' ? '#9CA3AF' : '#D1D5DB',
            dark: mode === 'light' ? '#4B5563' : '#6B7280',
          },
          background: {
            default: mode === 'light' ? '#F3F4F6' : '#111827',
            paper: mode === 'light' ? '#FFFFFF' : '#1F2937',
          },
          text: {
            primary: mode === 'light' ? '#1F2937' : '#F9FAFB',
            secondary: mode === 'light' ? '#4B5563' : '#D1D5DB',
          },
        },
        typography: {
          fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
          h1: {
            fontWeight: 600,
          },
          h2: {
            fontWeight: 600,
          },
          h3: {
            fontWeight: 600,
          },
        },
        shape: {
          borderRadius: 12,
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: 'none',
                fontWeight: 500,
              },
            },
          },
          MuiPaper: {
            styleOverrides: {
              root: {
                backgroundImage: 'none',
              },
            },
          },
          MuiAppBar: {
            styleOverrides: {
              root: {
                backgroundColor: mode === 'light' ? '#4B5563' : '#1F2937',
              },
            },
          },
          MuiTextField: {
            styleOverrides: {
              root: {
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: mode === 'light' ? '#D1D5DB' : '#374151',
                  },
                  '&:hover fieldset': {
                    borderColor: mode === 'light' ? '#9CA3AF' : '#6B7280',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: mode === 'light' ? '#4B5563' : '#9CA3AF',
                  },
                },
              },
            },
          },
        },
      }),
    [mode]
  );

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    checkServerConnection();
    // Check connection every 30 seconds
    const interval = setInterval(checkServerConnection, 30000);
    return () => clearInterval(interval);
  }, []);

  const checkServerConnection = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/test');
      if (response.data.message === 'Server is running!') {
        setServerStatus('connected');
      } else {
        setServerStatus('disconnected');
        setError('Server is not responding correctly');
      }
    } catch (error) {
      setServerStatus('disconnected');
      setError('Unable to connect to the server. Please make sure the server is running.');
    }
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Check file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        setError('File size exceeds 5MB limit');
        return;
      }
      // Check file type
      if (!file.type.startsWith('image/')) {
        setError('Please upload an image file');
        return;
      }
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return null;

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (!response.data.url) {
        throw new Error('No URL returned from server');
      }

      return response.data.url;
    } catch (error) {
      console.error('Upload error:', error);
      setError('Failed to upload file. Please try again.');
      return null;
    }
  };

  const handleSendMessage = async () => {
    if (!message.trim() && !selectedFile) return;

    const userMessage = message.trim();
    setMessage('');
    setLoading(true);
    setError(null);

    let imageUrl = null;
    if (selectedFile) {
      imageUrl = await handleUpload();
      if (!imageUrl) {
        setLoading(false);
        return;
      }
      setSelectedFile(null);
      setPreviewUrl(null);
    }

    setChatHistory(prev => [...prev, { 
      sender: 'user', 
      text: userMessage || (imageUrl ? 'Analyze this image' : ''),
      imageUrl: previewUrl
    }]);

    try {
      const response = await axios.post('http://localhost:5000/api/chat', {
        message: userMessage,
        imageUrl: imageUrl
      });

      if (!response.data.response) {
        throw new Error('No response from server');
      }

      setChatHistory(prev => [...prev, { sender: 'alexa', text: response.data.response }]);
    } catch (error) {
      console.error('Error:', error);
      const errorMessage = error.response?.data?.error || 'Failed to send message. Please try again.';
      setError(errorMessage);
      setChatHistory(prev => [...prev, { 
        sender: 'alexa', 
        text: 'Sorry, I encountered an error. Please try again.' 
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseError = () => {
    setError(null);
  };

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <ChatApp mode={mode} setMode={setMode} />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App; 