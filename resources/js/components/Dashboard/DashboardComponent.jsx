import React, { Component } from 'react';
import { Navigate } from "react-router-dom";

class DashboardComponent extends Component {

    handleLogout = async() => {
        localStorage.removeItem("user");
        window.location.href = '/login';
    }

    render() {

        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="https://twitter.com" target="_blank">Twitter</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavDropdown">
                            <ul className="navbar-nav me-auto">
                                <li className="nav-item">
                                    <a href="/dashboard" className="nav-link">Home <span className="sr-only"></span></a>
                                </li>
                                <li className="nav-item">
                                    <a href="/stage" className="nav-link">Setting Stage <span className="sr-only"></span></a>
                                </li>
                                <li className="nav-item">
                                    <a href="/account" className="nav-link">Account <span className="sr-only"></span></a>
                                </li>
                            </ul>
                            <div className="d-flex">
                                <ul className="navbar-nav">
                                    <li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            {/* {{ user.name }} */}
                                        </a>
                                        <div className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdownMenuLink">
                                            <a className="dropdown-item" onClick={this.handleLogout}>Logout</a>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }
}

export default DashboardComponent;