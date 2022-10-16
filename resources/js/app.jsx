import './bootstrap';
import '../css/app.css'

import ReactDOM from 'react-dom/client';        
import Home from './Page/Home';
import TwitterComponent from  './components/TwitterComponent';

ReactDOM.createRoot(document.getElementById('app')).render(     
    // <Home />  
    <TwitterComponent/>      
);