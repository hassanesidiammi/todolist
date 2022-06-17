import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import Loading from './component/loading';
import Login from './component/login';
import Nave from './component/nave';
import Protected from './component/protected';
import Todos from './component/todos';

function App() {
  return (
    <BrowserRouter >
        <Nave />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Protected><Loading /></Protected>} />
          <Route path="/todos" element={<Protected><Todos /></Protected>} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
