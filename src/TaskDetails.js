import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';

const TaskDetails = ({ task, setShowDetailsModal }) => {

  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newStatus, setNewStatus] = useState('');

  console.log(task);

  //Comments Branch
  // Testing Comments for git branching

  useEffect(() => {
    setNewTitle(task.title);
    setNewDesc(task.description);
    setNewStatus(task.status);
  }, []);
  return (
    <Dialog style={{width:"100%"}} open>
      <DialogTitle>Task Details</DialogTitle>
      <DialogContent>
        <Box>
          <Typography variant="h6">Name:</Typography>
          <TextField variant="outlined" fullWidth value={newTitle} />
        </Box>
        <Box mt={2}>
          <Typography variant="h6">Description:</Typography>
          <TextField variant="outlined" fullWidth value={newDesc} />
        </Box>
        <Box mt={2}>
          <Typography variant="h6">Status:</Typography>
          <TextField variant="outlined" fullWidth value={newStatus} />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setShowDetailsModal(false)}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskDetails;
