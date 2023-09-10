import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  TextField,
  Button,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import TaskDetails from './TaskDetails';
import EditTaskModal from './EditTaskModal';



const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/tasks`;

const RightSection = ({ tasks,setTasks, onDeleteTask }) => {
  const [editIndex, setEditIndex] = useState(-1);
  const [selectedTask, setSelectedTask] = useState(null);
  const [detailTask, setDetailTask] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const handleSaveTask = (index) => {
    setEditIndex(-1);
    setSelectedTask(null); // Reset the edited task state
    setShowEditModal(false);
  };

  const onEditClick = (index, task) => {
    setEditIndex(index);
      setSelectedTask(task);// Store the task object for editing
      setShowEditModal(true);
  };

  const onEditStatus = (index,task)=>{
    const taskId = task._id;
    axios.put(`${API_URL}/${taskId}`,task).then(res=>{
      if (res.status !== 201) throw new Error('Task not Found');
        const updatedTasks = [...tasks];
        for(let i=0;i<updatedTasks.length;i++){
          if(updatedTasks[i]._id == res.data._id){
            updatedTasks[i]=res.data
          }
        }
        setTasks(updatedTasks);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const clickDetails = (task)=>{
    setShowDetailsModal(true)
    setDetailTask(task);
  }

  return (
    <Box p={2}>
      <Paper elevation={3} sx={{ backgroundColor: '#f0f0f0' }}>
        <Typography variant="h5" align="center" sx={{ p: 2 }}>
          Tasks List
        </Typography>
        <List>
          {tasks.map((task, index) => (
            <React.Fragment key={index}>
              <ListItem
                sx={{
                  borderBottom: '1px solid #ccc',
                  '&:last-child': {
                    borderBottom: 'none',
                  },
                }}
              >
                <>
                  <ListItemText
                    primary={task.title}
                    onClick={() => clickDetails(task)}
                    style={{ cursor: 'pointer' }}
                  />
                  <ListItemSecondaryAction>
                    {task.status !== 'Completed' && (
                      <Button
                        variant="outlined"
                        color="primary"
                        onClick={() =>
                          onEditStatus(index, { ...task, status: 'Completed' })
                        }
                      >
                        Done
                      </Button>
                    )}
                    <IconButton
                      edge="end"
                      onClick={() => onEditClick(index, task)}
                    >
                      <EditIcon sx={{ color: 'blue' }} />
                    </IconButton>
                    <IconButton edge="end" onClick={() => onDeleteTask(index)}>
                      <DeleteIcon sx={{ color: 'red' }} />
                    </IconButton>
                  </ListItemSecondaryAction>
                </>
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </Paper>
      {showEditModal && selectedTask && (
        <EditTaskModal
          Tasks={tasks} // All tasks
          setTasks={setTasks} // To change all task array
          taskToEdit={selectedTask} // Task to edit
          handleSaveTask={handleSaveTask}
          onClose={() => setShowEditModal(false)}
          editIndex={editIndex} // Index of task to edit
        />
      )}
      {showDetailsModal && (
        <TaskDetails
          task={detailTask}
          setShowDetailsModal={setShowDetailsModal}
        />
      )}
    </Box>
  );
};

export default RightSection;
