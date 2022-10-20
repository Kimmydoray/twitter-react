import './bootstrap';
import '../css/app.css'

import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Page/Home';
import TwitterComponent from  './components/TwitterComponent';
import Login from  './components/auth/Login';
import Register from  './components/auth/Register';
import NavigationComponent from './components/NavigationComponent';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<NavigationComponent />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}