import React from 'react';
import ReactDOM from 'react-dom';
import Router from './components/Router';
import axios from 'axios';
import { getCookie } from './helpers';


axios.defaults.headers.post['X-XSRF-TOKEN'] = getCookie('csrftoken');
axios.defaults.headers.put['X-XSRF-TOKEN'] = getCookie('csrftoken');

ReactDOM.render(<Router />, document.getElementById('app'));
