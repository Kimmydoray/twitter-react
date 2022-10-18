import './bootstrap';
import '../css/app.css'

import ReactDOM from 'react-dom/client';
import Home from './Page/Home';
import "./App.css"
import TwitterComponent from  './components/TwitterComponent';
import LoginComponent from './Page/LoginComponent';
import SignupComponent from "./Page/SignupComponent";
import {BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";

ReactDOM.createRoot(document.getElementById('app')).render(
    // <Home />
    // <TwitterComponent/>
    // <LoginComponent/>
    // <SignupComponent/>
    function App() {
        return (
            <Router>
                <Switch>
                    <Route exact path="{/login}" component={LoginComponent} />
                    <Route exact path="{/register}" component={SignupComponent} />
                </Switch>
            </Router>
        )
    }
);

export default App;
