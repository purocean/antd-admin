import 'antd/dist/antd.css'
import 'styles/App.css'

import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import Router from './routers/AppRouter'

ReactDOM.render(<Router />, document.getElementById('app'));
