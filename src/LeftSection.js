import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from '@mui/material';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/tasks`;

const LeftSection = ({ onAddTask }) => {
  const [title, setTitleName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('Pending');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() !== '') {
      const newTask = {
        title: title,
        description: description,
        status: status,
      };
      onAddTask(newTask);
      setTitleName('');
      setDescription('');
      setStatus('Pending');
    }
  };

  return (
    <Box p={2}>
      <Paper elevation={3}>
        <Typography variant="h5" align="center" sx={{ p: 2 }}>
          Add Task
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box p={2}>
            <TextField
              label="Task Name"
              variant="outlined"
              fullWidth
              value={title}
              onChange={(e) => setTitleName(e.target.value)}
            />
          </Box>
          <Box p={2}>
            <TextField
              label="Description"
              variant="outlined"
              fullWidth
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Box>
          <Box p={2}>
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <MenuItem value="Pending">Pending</MenuItem>
                <MenuItem value="Complete">Completed</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box p={2} textAlign="center">
            <Button variant="contained" color="primary" type="submit">
              Add
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default LeftSection;
