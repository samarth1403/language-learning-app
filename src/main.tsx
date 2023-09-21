import { ThemeProvider } from '@emotion/react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {CssBaseline} from "@mui/material"
import { theme } from './theme';
import {Provider} from "react-redux";
import { store } from './Redux/store';
import "./index.css"


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <App/>
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
