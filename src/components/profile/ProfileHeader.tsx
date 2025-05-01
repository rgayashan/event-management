import React from 'react';
import {
  Box,
  Avatar,
  Typography,
  IconButton,
  Tooltip,
  Slide,
  Zoom,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import EditIcon from '@mui/icons-material/Edit';
import SettingsIcon from '@mui/icons-material/Settings';
import { User } from '../../types';
import { useProfileStyles } from './profileStyles';

interface ProfileHeaderProps {
  user: User;
  animationLoaded: boolean;
  userBackground: string;
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  user,
  animationLoaded,
  userBackground,
}) => {
  const { gradientAnimation } = useProfileStyles();

  return (
    <>
      <Box
        sx={{
          height: '160px',
          background: userBackground,
          backgroundSize: '200% 200%',
          animation: `${gradientAnimation} 15s ease infinite`,
          position: 'relative',
        }}
      >
        <Slide direction="down" in={animationLoaded} timeout={800}>
          <Box
            sx={{
              position: 'absolute',
              top: '30%',
              right: '5%',
              display: 'flex',
              gap: 1,
            }}
          >
            <Tooltip title="Edit Profile">
              <IconButton
                sx={{
                  bgcolor: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.3)',
                    transform: 'translateY(-3px)',
                  },
                  transition: 'all 0.3s',
                }}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Settings">
              <IconButton
                sx={{
                  bgcolor: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.3)',
                    transform: 'translateY(-3px)',
                  },
                  transition: 'all 0.3s',
                }}
              >
                <SettingsIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Slide>
        <Zoom in={animationLoaded} timeout={1000}>
          <Avatar
            sx={{
              position: 'absolute',
              bottom: '-40px',
              left: { xs: '50%', sm: '40px' },
              transform: { xs: 'translateX(-50%)', sm: 'translateX(0)' },
              width: 96,
              height: 96,
              border: '4px solid white',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              background: userBackground,
              backgroundSize: '200% 200%',
              animation: `${gradientAnimation} 15s ease infinite`,
            }}
          >
            <PersonIcon sx={{ fontSize: 40 }} />
          </Avatar>
        </Zoom>
      </Box>

      <Box
        sx={{
          p: 3,
          pt: { xs: 6, sm: 3 },
          pl: { xs: 3, sm: '160px' },
          textAlign: { xs: 'center', sm: 'left' },
          mt: { xs: 3, sm: 0 },
        }}
      >
        <Slide direction="right" in={animationLoaded} timeout={1200}>
          <Box>
            <Typography
              variant="h4"
              component="h1"
              sx={{
                fontWeight: 'bold',
                mb: 0.5,
              }}
            >
              {user.name}
            </Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                mb: 2,
                justifyContent: { xs: 'center', sm: 'flex-start' },
              }}
            >
              <EmailIcon color="action" fontSize="small" />
              <Typography variant="body1" color="text.secondary">
                {user.email}
              </Typography>
            </Box>
          </Box>
        </Slide>
      </Box>
    </>
  );
};

export default ProfileHeader; 