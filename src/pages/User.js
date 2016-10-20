import React from 'react';
import { Link } from 'react-router';

import yeomanImage from '../images/yeoman.png';

class Component extends React.Component {
  render() {
    return (
      <div className="index">
        <img src={yeomanImage} alt="Yeoman Generator" />
        <h4>user</h4>
        <div className="notice">Please edit <code><Link to="user">user;</Link></code> to get started!</div>
      </div>
    );
  }
}

Component.defaultProps = {
};

export default Component;
