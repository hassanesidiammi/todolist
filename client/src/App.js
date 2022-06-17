import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import Loading from './component/loading';
import Nave from './component/nave';
import Protected from './component/protected';

function App() {
  return (
    <BrowserRouter >
        <Nave />
        <Routes>
          <Route path="/login" element={<Loading />} />
          <Route path="/" element={<Protected><Loading /></Protected>} />
          <Route path="/todos" element={<Protected><Loading /></Protected>} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
