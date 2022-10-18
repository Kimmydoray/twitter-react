import {Component} from "react";
import 'bootstrap/dist/css/bootstrap.min.css'


class SignupComponent extends Component {
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
                                <h1 className="text-center">Register</h1>
                                <hr/>
                                <form action="javascript:void(0)" class="row" method="post">
                            <div class="form-group col-12">
                                <label for="name" class="font-weight-bold">Name</label>
                                <input type="text" name="name"  id="name" placeholder="Enter name" class="form-control"></input>
                            </div>
                            <div class="form-group col-12 my-2">
                                <label for="email" class="font-weight-bold">Email</label>
                                <input type="text" name="email"  id="email" placeholder="Enter Email" class="form-control"></input>
                            </div>
                            <div class="form-group col-12">
                                <label for="password" class="font-weight-bold">Password</label>
                                <input type="password" name="password" id="password" placeholder="Enter Password" class="form-control"></input>
                            </div>
                            <div class="form-group mb-3 col-12 my-2">
                                <label for="password_confirmation" class="font-weight-bold">Confirm Password</label>
                                <input type="password_confirmation" name="password_confirmation" id="password_confirmation" placeholder="Enter Password" class="form-control"></input>
                            </div>
                            <div class="col-12 mb-2">
                                <button className="btn btn-primary btn-block">Register</button>
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

export default SignupComponent;
