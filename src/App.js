import React, { useEffect, useState } from 'react';
import { Container, Grid } from '@mui/material';
import LeftSection from './LeftSection';
import RightSection from './RightSection';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const API_URL = `${BACKEND_URL}/api/tasks`;

const App = () => {

  const [tasks, setTasks] = useState([]);



  function getData(){
    axios.get(API_URL)
    .then(res =>{
      setTasks(res.data)
    })
    .catch(e =>{
      console.log(e);
    })
  }

  const handleAddTask = (task) => {
    axios
      .post(API_URL, task)
      .then((res) => {
        setTasks([...tasks, res.data]);
      })
      .catch((error) => {
        console.log(error);
      });
  };


  const handleDeleteTask = (index) => {
    const taskId = tasks[index]._id;
    axios
      .delete(`${API_URL}/${taskId}`)
      .then((res) => {
        const newTasks = tasks.filter((_, i) => i !== index);
        setTasks(newTasks);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(()=>{
    getData()
  },[])

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <LeftSection onAddTask={handleAddTask} />
        </Grid>
        <Grid item xs={6}>
          <RightSection
            tasks={tasks}
            setTasks={setTasks}
            onDeleteTask={handleDeleteTask}
            // onEditTask={handleEditTask}
          />
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
