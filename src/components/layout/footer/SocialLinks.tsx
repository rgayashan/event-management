import React from 'react';
import { Box, IconButton, Tooltip, Grow } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import { footerStyles } from './styles';

const socialLinks = [
  { icon: <FacebookIcon />, url: 'https://facebook.com', label: 'Facebook' },
  { icon: <TwitterIcon />, url: 'https://twitter.com', label: 'Twitter' },
  { icon: <InstagramIcon />, url: 'https://instagram.com', label: 'Instagram' },
  { icon: <LinkedInIcon />, url: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: <GitHubIcon />, url: 'https://github.com', label: 'GitHub' },
];

interface SocialLinksProps {
  mounted: boolean;
}

export const SocialLinks: React.FC<SocialLinksProps> = ({ mounted }) => (
  <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
    {socialLinks.map((social, index) => (
      <Grow key={social.label} in={mounted} timeout={1000 + (index * 100)}>
        <Tooltip title={social.label}>
          <IconButton
            href={social.url}
            target="_blank"
            rel="noopener"
            size="small"
            sx={footerStyles.socialIcon}
          >
            {social.icon}
          </IconButton>
        </Tooltip>
      </Grow>
    ))}
  </Box>
); 