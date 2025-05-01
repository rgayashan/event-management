import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Divider, Fade, Grow } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import { SocialLinks } from './SocialLinks';
import { QuickLinks } from './QuickLinks';
import { footerStyles } from './styles';

const Footer: React.FC = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Fade in={mounted} timeout={1000}>
      <Box component="footer" sx={footerStyles.footer}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', flexWrap: 'wrap', mx: -2 }}>
            {/* About Section */}
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 33.33%' }, p: 2 }}>
              <Grow in={mounted} timeout={1000}>
                <Box>
                  <Typography variant="h6" sx={footerStyles.gradientText}>
                    Event Manager
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Your all-in-one solution for planning and managing events with ease.
                    Create, join, and discover amazing events that match your interests.
                  </Typography>
                  <SocialLinks mounted={mounted} />
                </Box>
              </Grow>
            </Box>

            {/* Quick Links Section */}
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 33.33%' }, p: 2 }}>
              <QuickLinks mounted={mounted} />
            </Box>

            {/* Contact Section */}
            <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 33.33%' }, p: 2 }}>
              <Grow in={mounted} timeout={1400}>
                <Box>
                  <Typography variant="h6" sx={{ mb: 2, fontWeight: 'medium' }}>
                    Contact Us
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <EmailIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography variant="body2" color="text.secondary">
                      contact.gayashan@gmail.com
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