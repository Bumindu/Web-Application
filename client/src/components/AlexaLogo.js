import React from 'react';
import { Box, Typography } from '@mui/material';
import alexaIcon from '../assets/alexa-icon.svg';

const AlexaLogo = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
      <Box
        component="img"
        src={alexaIcon}
        alt="Alexa Icon"
        sx={{
          width: 36,
          height: 36,
          animation: 'pulse 2s infinite ease-in-out',
          '@keyframes pulse': {
            '0%': {
              transform: 'scale(1)',
            },
            '50%': {
              transform: 'scale(1.1)',
            },
            '100%': {
              transform: 'scale(1)',
            },
          },
          filter: 'drop-shadow(0px 2px 4px rgba(0, 0, 0, 0.1))',
          transition: 'filter 0.3s ease',
          '&:hover': {
            filter: 'drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.2))',
          },
        }}
      />
      <Typography 
        variant="h5" 
        component="div" 
        sx={{ 
          fontWeight: 600,
          background: 'linear-gradient(45deg, #60A5FA, #3B82F6)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        }}
      >
        Alexa
      </Typography>
    </Box>
  );
};

export default AlexaLogo; 