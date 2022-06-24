import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MessageBottom from './component/bottomMessage';

import Loading from './component/loading';
import Login from './component/login';
import Nave from './component/nave';
import Protected from './component/protected';
import Todo from './component/todo';
import Todos from './component/todos';
import Users from './component/users';
import { getCurrentUser } from './services/auth.service';
import { logout } from './utils/api';

function App() {
  const [todos, setTodos] = useState([]);
  const [users, setUsers] = useState();
  const [currentUser, setCurrentUser] = useState(getCurrentUser);
  const [messageBottom, setMessageBottom] = useState({});
  
  const handleLogout = () => {
    logout()
    localStorage.clear()
    setCurrentUser(false)
    setTodos(false)
  }

  return (
    <BrowserRouter >
      <Nave currentUser={currentUser} setCurrentUser={setCurrentUser} handleLogout={handleLogout} />
      <Routes>
        <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />} />
        <Route path="/todos" element={<Protected >
          <Todos todos={todos} setTodos={setTodos} currentUser={currentUser} setMessageBottom={setMessageBottom} />
          </Protected>} />
        <Route path="/todos/:todoId" element={<Protected ><Todo setMessageBottom={setMessageBottom} /></Protected>} />
        <Route path="/" element={<Users users={users} setUsers={setUsers} setMessageBottom={setMessageBottom} />} />
      </Routes>
      <MessageBottom messageBottom={messageBottom} />
    </BrowserRouter>
  );
}

export default App;
