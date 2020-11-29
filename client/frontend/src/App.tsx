import React from 'react';
import {
  Route,
  Switch,
  Redirect,
  useLocation,
  withRouter,
  useHistory,
} from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { FireOutlined } from '@ant-design/icons';
import HomePage from './modules/HomePage/HomePage';
import './App.css';
import LogInPage from './modules/UserAuthentication/LogInPage';
import RegistrationPage from './modules/UserAuthentication/RegistrationPage';
import UploadPage from './modules/UploadPage/UploadPage';
import AnalysisPage from './modules/AnalysisPage/AnalysisPage';
import TestForm from './modules/UserAuthentication/TestForm';
import StudentDash from './modules/StudentDash/StudentDash';
import StudentDashMessage from './modules/StudentDash/StudentDash';

function App() {
  // fetches the current path - used to check if the navbar should render
  let location = useLocation();
  let history = useHistory();

  const onMenuClick = (e: any) => {
    // home button
    if (e.key === "0" || e.key === "1") {
      history.push("/home");
    }
    // logout button
    if (e.key === '3') {
      history.push('/login');
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        {location.pathname !== '/login' &&
          location.pathname !== '/register' &&
          location.pathname !== '/test' && (
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['1']}
              style={{ lineHeight: '64px' }}
              onClick={onMenuClick}
            >
              <Menu.Item>
                <span>Plagiarism Avengers</span>
                <FireOutlined />
              </Menu.Item>
              <Menu.Item key="1">My Dashboard</Menu.Item>
              <Menu.Item key="2">Notifications</Menu.Item>
              <Menu.Item key="3">Logout</Menu.Item>
            </Menu>
          )}
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route path="/login" component={LogInPage} />
          <Route path="/register" component={RegistrationPage} />
          <Route path="/home" component={HomePage} exact />
          <Route path="/upload" component={UploadPage} />
          <Route path="/similarity" component={AnalysisPage} />
          <Route path="/test" component={TestForm} exact />
          <Route path="/student" component={StudentDash} exact />
          <Route path="/student/message" component={StudentDashMessage} exact />
        </Switch>
      </header>
    </div>
  );
}

export default withRouter(App);
