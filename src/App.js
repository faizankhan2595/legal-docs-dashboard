import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import { BrowserRouter as Router } from 'react-router-dom';
import Views from './views';
import { Route, Switch } from 'react-router-dom';
import { ThemeSwitcherProvider } from "react-css-theme-switcher";
import { THEME_CONFIG } from './configs/AppConfig';
import axios from 'axios';
import { message } from 'antd';

const themes = {
  dark: `${process.env.PUBLIC_URL}/css/dark-theme.css`,
  light: `${process.env.PUBLIC_URL}/css/light-theme.css`,
};

function App() {

  axios.interceptors.response.use((response) => {
    return response;
  }, (error) => {
      if(+error.response.status===403) {
        message.error("You do not have enough permissions to perform this action!");
      }
      if(+error.response.status===401) {
        localStorage.removeItem("token");
        message.error("Unauthorized/Expired Access, please login again to continue!");
      }
    return Promise.reject(error);
  });

  axios.defaults.headers.common['Authorization'] = 'Bearer '+ localStorage.getItem('token');

  return (
    <div className="App">
      <Provider store={store}>
        <ThemeSwitcherProvider themeMap={themes} defaultTheme={THEME_CONFIG.currentTheme} insertionPoint="styles-insertion-point">
          <Router>
            <Switch>
              <Route path="/" component={Views}/>
            </Switch>
          </Router>
        </ThemeSwitcherProvider>
      </Provider>
    </div>
  );
}

export default App;
