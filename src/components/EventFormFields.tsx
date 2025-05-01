import React from 'react';
import { Box, TextField, InputAdornment, Stack } from '@mui/material';
import TitleIcon from '@mui/icons-material/Title';
import EventIcon from '@mui/icons-material/Event';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import DescriptionIcon from '@mui/icons-material/Description';
import { commonFieldStyles, getFieldAnimation } from '../styles/formStyles';

interface EventFormFieldsProps {
  formData: any;
  errors: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  animationLoaded: boolean;
}

const EventFormFields: React.FC<EventFormFieldsProps> = ({
  formData,
  errors,
  handleChange,
  animationLoaded
}) => {
  const fields = [
    {
      name: 'title',
      label: 'Event Title',
      icon: TitleIcon,
      multiline: false
    },
    {
      name: 'date',
      label: 'Event Date & Time',
      icon: EventIcon,
      type: 'datetime-local',
      shrinkLabel: true
    },
    {
      name: 'location',
      label: 'Location',
      icon: LocationOnIcon,
      multiline: false
    },
    {
      name: 'host',
      label: 'Host',
      icon: PersonIcon,
      multiline: false
    },
    {
      name: 'description',
      label: 'Description',
      icon: DescriptionIcon,
      multiline: true,
      rows: 4
    }
  ];

  return (
    <Stack spacing={3}>
      {fields.map((field, index) => (
        <Box key={field.name} sx={getFieldAnimation(index, animationLoaded)}>
          <TextField
            fullWidth
            label={field.label}
            name={field.name}
            type={field.type}
            value={formData[field.name]}
            onChange={handleChange}
            error={Boolean(errors[field.name])}
            helperText={errors[field.name]}
            required
            variant="outlined"
            multiline={field.multiline}
            rows={field.rows}
            InputLabelProps={field.shrinkLabel ? { shrink: true } : undefined}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <field.icon color={errors[field.name] ? "error" : "primary"} />
                </InputAdornment>
              ),
            }}
            sx={commonFieldStyles}
          />
        </Box>
      ))}
    </Stack>
  );
};

export default EventFormFields; 