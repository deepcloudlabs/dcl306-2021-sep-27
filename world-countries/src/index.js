import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import World from './World';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<World />, document.getElementById('root'));
registerServiceWorker();
