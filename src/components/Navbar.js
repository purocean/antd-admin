import '../styles/Navbar.css';

import React from 'react';
import { Menu, Row, Col } from 'antd';

class Component extends React.Component {
  render() {
    return (
        <Row className="navbar">
          <Col span={4}>
          <Menu theme="dark">
            <Menu.Item className="pull-right">
              <span className="brand">{this.props.brand}</span>
            </Menu.Item>
          </Menu>
          </Col>
          <Col span={10}>
            {this.props.mainMenu}
          </Col>
          <Col span={6} className="right">
            {this.props.rightMenu}
          </Col>
          <Col span={4}></Col>
        </Row>
    );
  }
}

Component.defaultProps = {
  brand: 'Antd Admin',
  mainMenu: null,
  rightMenu: null
};


export default Component;
