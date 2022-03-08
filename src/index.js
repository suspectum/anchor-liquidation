import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

// project imports
import { App } from './App';

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
