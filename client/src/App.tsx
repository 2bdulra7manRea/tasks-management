import React from 'react';
import './App.css';
import { TaskCard } from './components/task-card/TaskCard';
import Bucket from './components/bucket/Bucket';
import TasksList from './pages/tasks/TasksList';

function App() {
  return (
    <div >
      <TasksList/>
    </div>
  );
}

export default App;
