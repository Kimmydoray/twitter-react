import '../bootstrap';
import '../../css/app.css'

import ReactDOM from 'react-dom/client';
import LoginComponent from '../components/LoginComponent';
import TwitterComponent from "../components/TwitterComponent";
ReactDOM.createRoot(document.getElementById('login')).render(
    // <Home />
    <TwitterComponent/>
    // <LoginComponent/>
);
