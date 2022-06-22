import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Loading from './component/loading';
import Login from './component/login';
import Nave from './component/nave';
import Protected from './component/protected';
import Todo from './component/todo';
import Todos from './component/todos';
import { getCurrentUser } from './services/auth.service';
import { logout } from './utils/api';

function App() {
  const [todos, setTodos] = useState([]);
  const [currentUser, setCurrentUser] = useState(getCurrentUser);
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
          <Route path="/" element={<Protected><Loading /></Protected>} />
          <Route path="/todos" element={<Protected><Todos todos={todos} setTodos={setTodos} currentUser={currentUser} /></Protected>} />
          <Route path="/todos/:todoId" element={<Protected><Todo /></Protected>} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
