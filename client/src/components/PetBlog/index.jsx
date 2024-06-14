import React from 'react';
import React from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from './theme';


ReactDOM.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
        <App />
        </ThemeProvider>
          </React.StrictMode>,
    document.getElementById('root')
  
);

// if i want the app to work offline and load faster i can change unregister() to register() belowbut it is not recomended.
serviceWorker.unregister();