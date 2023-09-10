import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from '@mui/material';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/tasks`;

const EditTaskModal = ({
  Tasks,
  setTasks,
  onClose,
  editIndex,
  taskToEdit,
  handleSaveTask,
}) => {
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newStatus, setNewStatus] = useState('');
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  const API_URL = `${BACKEND_URL}/api/tasks`;

  useEffect(()=>{
    setNewTitle(taskToEdit.title)
    setNewDesc(taskToEdit.description)
    setNewStatus(taskToEdit.status)
  },[])


  const handleSaveChanges = () => {
    const taskId = taskToEdit._id;
    const editedTask = {
      title: newTitle,
      description: newDesc,
      status: newStatus,
    };
    console.log(editedTask);
    axios
      .put(`${API_URL}/${taskId}`, editedTask)
      .then((res) => {
        if (res.status !== 201) throw new Error('Task not Found');
        const updatedTasks = [...Tasks];
        for(let i=0;i<updatedTasks.length;i++){
          if(updatedTasks[i]._id == res.data._id){
            updatedTasks[i]=res.data
          }
        }
        setTasks(updatedTasks);
        handleSaveTask();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>Edit Task</DialogTitle>
      <DialogContent>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          style={{ marginBottom: 4 }}
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          value={newDesc}
          onChange={(e) => setNewDesc(e.target.value)}
          style={{ marginBottom: 4 }}
        />
        <TextField
          label="Status"
          variant="outlined"
          fullWidth
          value={newStatus}
          onChange={(e) => setNewStatus(e.target.value)}
          style={{ marginBottom: 4 }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSaveChanges} color="primary">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditTaskModal;
