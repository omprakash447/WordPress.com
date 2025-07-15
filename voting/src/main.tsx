import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import "react-toastify/dist/ReactToastify.css";
import App from './App';
import { CreateProvider } from "./middlewere/authmiddlewere/checkauth";
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CreateProvider>
      <App />
    </CreateProvider>
  </StrictMode>,
)