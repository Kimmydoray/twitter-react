import './bootstrap';
import '../css/app.css'

import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Page/Home';
import TwitterComponent from  './components/TwitterComponent';
import Login from  './components/auth/Login';
import Register from  './components/auth/Register';
import DashboardComponent from  './components/Dashboard/DashboardComponent';
import StageComponent from  './components/Dashboard/Stage/StageComponent';
import AccountComponent from  './components/Dashboard/Account/AccountComponent';
import NavigationComponent from './components/NavigationComponent';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<NavigationComponent />} />
                <Route path="login" element={<Login />} />
                <Route path="register" element={<Register />} />
                <Route path="twitter" element={<TwitterComponent />} />
                <Route path="dashboard" element={<DashboardComponent />} />
                <Route path="stage" element={<StageComponent />} />
                <Route path="account" element={<AccountComponent />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}