import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Divider, Link, IconButton, Fade, Grow, Tooltip } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import { keyframes } from '@mui/system';

const iconHover = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0); }
`;

const Footer: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  
  const footerLinks = [
    { title: 'About Us', url: '/about' },
    { title: 'Contact', url: '/contact' },
    { title: 'Privacy Policy', url: '/privacy' },
    { title: 'Terms of Service', url: '/terms' },
  ];
  
  const socialLinks = [
    { icon: <FacebookIcon />, url: 'https://facebook.com', label: 'Facebook' },
    { icon: <TwitterIcon />, url: 'https://twitter.com', label: 'Twitter' },
    { icon: <InstagramIcon />, url: 'https://instagram.com', label: 'Instagram' },
    { icon: <LinkedInIcon />, url: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: <GitHubIcon />, url: 'https://github.com', label: 'GitHub' },
  ];
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  return (
    <Fade in={mounted} timeout={1000}>
      <Box 
        component="footer" 
        sx={{ 
          mt: 'auto', 
          pt: 6, 
          pb: 3, 
          bgcolor: 'background.paper',
          boxShadow: '0 -4px 20px rgba(0,0,0,0.05)',
          borderTop: '1px solid',
          borderColor: 'divider',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '200px',
            height: '4px',
            background: 'linear-gradient(90deg, #1976d2, #9c27b0)',
            borderRadius: '0 0 8px 8px',
          }
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', flexWrap: 'wrap', mx: -2 }}>
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 33.33%' }, p: 2 }}>
              <Grow in={mounted} timeout={1000}>
                <Box>
                  <Typography 
                    variant="h6" 
                    sx={{ 
                      fontWeight: 'bold',
                      mb: 2,
                      background: 'linear-gradient(45deg, #1976d2, #9c27b0)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    Event Manager
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Your all-in-one solution for planning and managing events with ease. 
                    Create, join, and discover amazing events that match your interests.
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                    {socialLinks.map((social, index) => (
                      <Grow 
                        key={social.label} 
                        in={mounted} 
                        timeout={1000 + (index * 100)}
                      >
                        <Tooltip title={social.label}>
                          <IconButton 
                            href={social.url} 
                            target="_blank" 
                            rel="noopener"
                            size="small"
                            sx={{
                              color: 'text.secondary',
                              transition: 'all 0.2s',
                              '&:hover': {
                                color: 'primary.main',
                                animation: `${iconHover} 0.5s ease`,
                              }
                            }}
                          >
                            {social.icon}
                          </IconButton>
                        </Tooltip>
                      </Grow>
                    ))}
                  </Box>
                </Box>
              </Grow>
            </Box>
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 33.33%' }, p: 2 }}>
              <Grow in={mounted} timeout={1200}>
                <Box>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 'medium' }}>
                    Quick Links
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {footerLinks.map((link, index) => (
                      <Link 
                        key={link.title} 
                        href={link.url} 
                        underline="none" 
                        color="text.secondary"
                        sx={{ 
                          transition: 'all 0.2s',
                          '&:hover': {
                            color: 'primary.main',
                            pl: 0.5,
                          }
                        }}
                      >
                        {link.title}
                      </Link>
                    ))}
                  </Box>
                </Box>
              </Grow>
            </Box>
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 33.33%' }, p: 2 }}>
              <Grow in={mounted} timeout={1400}>
                <Box>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 'medium' }}>
                    Contact Us
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <EmailIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      support@eventmanager.com
                    </Typography>
                  </Box>
                  <Box 
                    sx={{ 
                      mt: 2, 
                      p: 2, 
                      borderRadius: 2, 
                      bgcolor: 'background.default',
                      border: '1px solid',
                      borderColor: 'divider'
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      Subscribe to our newsletter for updates on new features and upcoming events.
                    </Typography>
                  </Box>
                </Box>
              </Grow>
            </Box>
          </Box>
          
          <Divider sx={{ my: 3, opacity: 0.5 }} />
          
          <Fade in={mounted} timeout={1800}>
            <Box 
              py={2} 
              display="flex" 
              justifyContent="space-between" 
              alignItems="center"
              flexDirection={{ xs: 'column', sm: 'row' }}
              gap={1}
            >
              <Typography variant="body2" color="text.secondary" align="center">
                © {new Date().getFullYear()} Event Manager - All rights reserved
              </Typography>
              <Typography variant="body2" color="text.secondary" align="center">
                Made with ❤️ for event lovers
              </Typography>
            </Box>
          </Fade>
        </Container>
      </Box>
    </Fade>
  );
};

export default Footer;