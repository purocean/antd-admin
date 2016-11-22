import '../styles/Main.css';

import React from 'react';
import { Link } from 'react-router';
import { Menu, Icon } from 'antd';

import Auth from '../auth/Auth';
import Navbar from '../components/Navbar';
import Http from '../utils/Http';

class Component extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  handleMenuClick(e) {
    if (e.key === 'logout') {
      Http.fetch('/users/logout', {method: 'POST'})
      .then(() => {
        this.context.router.push('/login');
      })
    }
  }

  render () {
    return (
      <div className="layout-main">
        <Navbar>
          <Menu mode="horizontal" theme="dark" onClick={e => this.handleMenuClick(e)} defaultSelectedKeys={[this.props.navKey]}>
            <Menu.Item key="/"><Link to="/"> Home </Link></Menu.Item>
            <Menu.Item key="/user"><Link to="/user"> User </Link></Menu.Item>
            <Menu.Item key="/rbac"><Link to="/rbac"> RBAC </Link></Menu.Item>
            <Menu.SubMenu className="pull-right" title={<span><Icon type="user" />{Auth.getUser().username}</span>}>
              <Menu.Item key="logout">Logout</Menu.Item>
            </Menu.SubMenu>
          </Menu>
        </Navbar>
        <div className="main">
          {this.props.children}
        </div>
      </div>
    );
  }
}

Component.defaultProps = {
  navKey: '/',
  sideBar: false
};

export default Component;
