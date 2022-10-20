import React, { Component } from 'react';

class NavigationComponent extends Component {
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
