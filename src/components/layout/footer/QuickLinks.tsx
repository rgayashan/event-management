import React from 'react';
import { Box, Typography, Link, Grow } from '@mui/material';
import { footerStyles } from './styles';

const footerLinks = [
  { title: 'About Us', url: '/about' },
  { title: 'Contact', url: '/contact' },
  { title: 'Privacy Policy', url: '/privacy' },
  { title: 'Terms of Service', url: '/terms' },
];

interface QuickLinksProps {
  mounted: boolean;
}

export const QuickLinks: React.FC<QuickLinksProps> = ({ mounted }) => (
  <Grow in={mounted} timeout={1200}>
    <Box>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'medium' }}>
        Quick Links
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        {footerLinks.map((link) => (
          <Link
            key={link.title}
            href={link.url}
            underline="none"
            color="text.secondary"
            sx={footerStyles.quickLink}
          >
            {link.title}
          </Link>
        ))}
      </Box>
    </Box>
  </Grow>
); 