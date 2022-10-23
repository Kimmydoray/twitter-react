import React, { Component } from 'react';
import { Navigate } from "react-router-dom";
import TwitterComponent from  './TwitterComponent';

class NavigationComponent extends Component {

  state = {
    isLoggedIn: null,
    user: ''
  }
  
  
  handleIsLoggedIn = async() => {

    if(localStorage.getItem('user')){
        
        this.state.user = JSON.parse(localStorage.getItem('user'));
        console.log(this.state.user);
        if(this.state.user.token) {
            this.state.isLoggedIn = true
        } else {
            this.state.isLoggedIn = false
        }

        if(this.state.isLoggedIn) {
            window.location.replace('/twitter')
        } else {
            window.location.replace('/login')
        }

        console.log(this.state.isLoggedIn);
    } else {
        window.location.replace('/login')
    }
    
  }
  
  componentDidMount() {
    this.handleIsLoggedIn();
  }

  render() {

    return (
        <div> 
            <nav className="navbar navbar-expand-md navbar-light bg-white shadow-sm">
                <div className="container">
                    <a className="navbar-brand" href="{{ url('/') }}">
                    </a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        {/* <!-- Left Side Of Navbar --> */}
                        <ul className="navbar-nav me-auto">

                        </ul>

                        {/* <!-- Right Side Of Navbar --> */}
                        <ul className="navbar-nav ms-auto">
                            {/* <!-- Authentication Links --> */}
                            {/* @guest */}
                                {/* @if (Route::has('login')) */}
                                    <li className="nav-item">
                                        <a className="nav-link" href="/login">
                                            Login
                                        </a>
                                    </li>
                                {/* @endif */}

                                {/* @if (Route::has('register')) */}
                                    <li className="nav-item">
                                        <a className="nav-link" href="/register">
                                            Register
                                        </a>
                                    </li>
                                {/* @endif */}
                            {/* @else */}
                                <li className="nav-item dropdown">
                                    <a id="navbarDropdown" className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        {/* {{ Auth::user()->name }} */}
                                    </a>

                                    <div className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                        <a className="dropdown-item" href="{{ route('logout') }}"
                                            >
                                            {/* {{ __('Logout') }} */}
                                        </a>

                                        <form id="logout-form" action="{{ route('logout') }}" method="POST" className="d-none">
                                            {/* @csrf */}
                                        </form>
                                    </div>
                                </li>
                            {/* @endguest */}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
  }
}

export default NavigationComponent;
