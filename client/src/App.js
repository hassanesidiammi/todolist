import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Loading from './component/loading';
import Login from './component/login';
import MessageBar from './component/messageBar';
import Nave from './component/nave';
import Protected from './component/protected';
import Todo from './component/todo';
import Todos from './component/todos';
import Users from './component/users';
import { getCurrentUser } from './services/auth.service';
import { logout, setMessageHandler } from './utils/api';

function App() {
  const [todos, setTodos] = useState([]);
  const [users, setUsers] = useState();
  const [currentUser, setCurrentUser] = useState(getCurrentUser);
  const [messageBar, setMessageBar] = useState({});
  setMessageHandler(setMessageBar);
  
  const handleLogout = () => {
    logout()
    localStorage.clear()
    setCurrentUser(false)
    setTodos(false)
  }

  return (
    <BrowserRouter >
      <Nave currentUser={currentUser} setCurrentUser={setCurrentUser} handleLogout={handleLogout} />
      <MessageBar messageBar={messageBar} />
      <Routes>
        <Route path="/login" element={<Login setCurrentUser={setCurrentUser} setMessageBar={setMessageBar}/>} />
        <Route path="/todos" element={<Protected >
          <Todos todos={todos} setTodos={setTodos} currentUser={currentUser} setMessageBar={setMessageBar} />
        </Protected>} />
        <Route path="/users" element={<Protected >
          <Users users={users} setUsers={setUsers} currentUser={currentUser} setMessageBar={setMessageBar} /></Protected>} />
        <Route path="/todos/:todoId" element={<Protected ><Todo setMessageBar={setMessageBar} /></Protected>} />
        <Route path="/" element={<h1 className='h1'>Welcome</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
