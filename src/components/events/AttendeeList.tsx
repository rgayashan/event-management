import React from 'react';
import { List, ListItem, ListItemAvatar, ListItemText, Avatar, Typography, Box } from '@mui/material';
import { Attendee } from '../../types';

interface AttendeeListProps {
  attendees: Attendee[];
}

const AttendeeList: React.FC<AttendeeListProps> = ({ attendees }) => {
  if (attendees.length === 0) {
    return (
      <Box p={2} textAlign="center">
        <Typography variant="body1">No attendees yet.</Typography>
      </Box>
    );
  }
  
  return (
    <List>
      {attendees.map((attendee) => (
        <ListItem key={attendee.id}>
          <ListItemAvatar>
            <Avatar src={attendee.avatar}>
              {attendee.name.charAt(0)}
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={attendee.name} />
        </ListItem>
      ))}
    </List>
  );
};

export default AttendeeList;