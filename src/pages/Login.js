import '../styles/Login.css';

import Config from 'config';
import React from 'react';
import {Menu, Icon, Form, Input, Checkbox, Card, Button} from 'antd';

import Auth from '../auth/Auth';
import Http from '../utils/Http';

import Navbar from '../components/Navbar';

class Component extends React.Component {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      isSubmit: false
    };

    Auth.setUser('');
  }

  onSubmit(e) {
    e.preventDefault();
    this.setState({isSubmit: true});

    Http.fetch(Config.urls.userLogin, {
      method: 'post',
      body: this.props.form.getFieldsValue()
    })
    .then(response => {
      if (response.ok) {
          response.json().then(data => {
          if (data.status === 'ok') {
            Auth.setUser(data.user);
            let next = this.props.location.query.redirect;
            this.context.router.push(next ? next : '/');
          } else {
            console.log(data);
          }

          console.log(response)
        })
      } else {
        console.log('Network response was not ok.')
      }
    })
    .catch(error => {
      console.log('There has been a problem with your fetch operation: ' + error.message)
    })
    .then(() => this.setState({isSubmit: false}));
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className="login">
        <Navbar>
          <Menu  mode="horizontal" theme="dark" defaultSelectedKeys={['login']}>
            <Menu.Item className="pull-right" key="login">
              <Icon type="user" />Login
            </Menu.Item>
          </Menu>
        </Navbar>
        <Card className="main">
          <h1 className="title">Login</h1>
          <Form vertical onSubmit={e => this.onSubmit(e)}>
            <Form.Item label="Username">
              {getFieldDecorator('username', {
                rules: [
                  { required: true, whitespace: true, message: 'Please enter your username' }
                ]
              })(
                <Input type="text" required />
              )}
            </Form.Item>
            <Form.Item label="Passeord">
              {getFieldDecorator('password', {
                rules: [
                  { required: true, whitespace: true, message: 'Please enter your password' }
                ]
              })(
                <Input type="password" autoComplete="off" required />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('rememberMe', {})(
                <Checkbox>Remember Me</Checkbox>
              )}
              <Button loading={this.state.isSubmit} className="pull-right" type="primary" size="large" htmlType="submit">Login</Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }
}

Component.defaultProps = {
};

Component = Form.create()(Component);

export default Component;
