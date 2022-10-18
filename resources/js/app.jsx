import './bootstrap';
import '../css/app.css'

import ReactDOM from 'react-dom/client';
import Home from './Page/Home';
import TwitterComponent from  './components/TwitterComponent';
import LoginComponent from './components/LoginComponent';
ReactDOM.createRoot(document.getElementById('app')).render(
    // <Home />
    // <TwitterComponent/>
    <LoginComponent/>
);
