import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


import './index.css';
import App from './App';

import MuiTheme from './MuiTheme';
  ReactDOM.render(
  <MuiThemeProvider  muiTheme={getMuiTheme(MuiTheme)}>
    <App />
  </MuiThemeProvider>, document.getElementById('root'));
registerServiceWorker();
