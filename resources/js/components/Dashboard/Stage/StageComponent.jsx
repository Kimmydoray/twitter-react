import React, { Component } from 'react';
import { Navigate } from "react-router-dom";
import DashboardComponent from  '../DashboardComponent';

class StageComponent extends Component {

    state = {
        validationErrors: {},
        processing: false,
        stages: []
    }

    getStage = async() => {
        await axios.get('/api/stage').then(({data})=>{
            console.log(data);
            this.setState({
                stages: data
            });
        }).catch(({response})=>{
            if(response.status===422){
                this.setState({
                    validationErrors: response.data.errors
                });
            }else{
                this.setState({
                    validationErrors: {}
                });
            }
        }).finally(()=>{
            this.setState({
                processing: false
            })
        })
    }
    componentDidMount() {
        this.getStage();
    }

    render() {

        return (
            <div>
                <DashboardComponent></DashboardComponent>
                <div className="row">
                    <div className="col-12">
                        <div className="card shadow-sm">
                            <div className="card-header">
                                <h3>Stage</h3>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                <table className="table">
                                    <caption>List of stages</caption>
                                    <thead>
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Stage</th>
                                            <th scope="col">Target Number</th>
                                            <th scope="col">Stage timer</th>
                                            <th scope="col">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.stages.map((stage) =>  
                                            <tr>
                                                <td>
                                                    <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                                                        {stage.id}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                                                        {stage.stage}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                                                        {stage.target_number}
                                                    </span>
                                                </td>
                                                <td>
                                                    <span className="text-dark-75 font-weight-bolder d-block font-size-lg">
                                                        {stage.stage_number}
                                                    </span>
                                                </td>
                                                <td>
                                                    {/* <router-link :to="'/stage/edit/' + stage.id"  className="btn btn-icon btn-light btn-hover-primary btn-sm mx-3" title="Edit"> */}
                                                        <span className="svg-icon svg-icon-md svg-icon-primary">
                                                            
                                                            <button >Edit</button>
                                                            
                                                        </span>                            
                                                    {/* </router-link> */}
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default StageComponent;