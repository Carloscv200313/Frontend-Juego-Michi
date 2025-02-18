import { createRoot } from 'react-dom/client'
import { BrowserRouter , Routes, Route } from "react-router";
import './index.css'
import App from './App.tsx';
import { IndexRaya } from './IndexRaya.tsx';
createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App/>} />
      <Route path="/Raya" element={<IndexRaya />} />
    </Routes>
  </BrowserRouter>
)
