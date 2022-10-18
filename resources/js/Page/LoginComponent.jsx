import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'

class LoginComponent extends Component {
    render() {
        const retweet = async(event) => {
            console.log(event);
            window.location.href = window.location.origin + "/twitter";
        }
        // const heading = "Laravel 9 Vite  with React JS";
        return (
            <div className="container h-100">
                <div className="row h-100 align-items-center">
                    <div className="col-12 col-md-6 offset-md-3">
                        <div className="card shadow sm">
                            <div className="card-body">
                                <h1 className="text-center">Login</h1>
                                <hr/>
                                <form action="javascript:void(0)" class="row" method="post">
                                    <div className="form-group col-12">
                                        <label htmlFor="email" className="font-weight-bold">Email:</label>
                                        <input type="text" name="email" id="email"
                                               className="form-control"></input>
                                    </div>
                                    <div className="form-group col-12 mb-3">
                                        <label htmlFor="email" className="font-weight-bold">Password:</label>
                                        <input type="text" name="password" id="email"
                                               className="form-control"></input>
                                    </div>
                                    <div class="col-12 mb-2">
                                        <button class="btn btn-primary btn-block">Login</button>
                                    </div>
                                    <div class="col-12 text-center">
                                        <label>Don't have an account? <a href={"#"}>Register Now!</a></label>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginComponent;
