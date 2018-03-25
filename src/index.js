import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'font-awesome/css/font-awesome.min.css';
import 'animate.css/animate.min.css';
import './bootstrap.min.css';
import App from './App';
import { Provider } from 'react-redux';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './redux/Store';

const store = configureStore();

ReactDOM.render(<Provider store={store}>
                    <App />
</Provider>, document.getElementById('root'));
registerServiceWorker();
