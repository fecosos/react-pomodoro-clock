import React from 'react';
import ReactDOM from 'react-dom';
import 'Styles/index.css';
import Pomodoro from 'Components/Pomodoro/Pomodoro';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Pomodoro />, document.getElementById('root'));
registerServiceWorker();
