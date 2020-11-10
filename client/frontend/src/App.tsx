import React from 'react';
import { Route, Switch, useLocation, withRouter } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import { FireOutlined } from '@ant-design/icons'
import HomePage from './modules/HomePage/HomePage'
import './App.css';



function App() {

  // fetches the current path - used to check if the navbar should render
  let location = useLocation()

  return (
    <div className="App">
      <header className="App-header">
        { location.pathname !== '/login' &&
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} style={{ lineHeight: '64px' }}>
          <Menu.Item><span>Plagiarism Avengers</span><FireOutlined /></Menu.Item>
          <Menu.Item key="1">My Dashboard</Menu.Item>
          <Menu.Item key="2">Notifications</Menu.Item>
          <Menu.Item key="3">Logout</Menu.Item>
        </Menu>
        }
        <Switch>
          <Route path="/home" component={HomePage} exact />
        </Switch> 
      </header>
    </div>
  );
}

export default withRouter(App);
