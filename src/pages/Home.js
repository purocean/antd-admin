import React from 'react';

import Main from '../layouts/Main';

class Component extends React.Component {
  render() {
    return (
      <Main className="home" navKey="/" sideBar={false}>
        <h1 style={{textAlign: 'center', marginTop: '100px'}}>HOME</h1>
      </Main>
    );
  }
}

Component.defaultProps = {
};

export default Component;
