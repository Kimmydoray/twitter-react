import React, { Component } from 'react';
import { Navigate, useParams } from "react-router-dom";
import DashboardComponent from  '../DashboardComponent';

class StateEditComponent extends Component {
    state = {
        validationErrors: {},
        processing: false,
        stages: {},
        stage_id: 4,
        stageData: {
            stage: '',
            stage_id: '',
            target_number: '',
            stage_number: ''
        },
        is_edit: false
    };
    
    handleParams = () => {
        // const { id } = this.props.match.params;
        // alert(id)
    }
    
    // GET STAGE BY ID
    getStageById = async() => {
        await axios.get('/api/stage/' + this.state.stage_id).then(({data})=>{
            this.setState({
                stages: data,
                stageData: data
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
                alert(response.data.message)
            }
        }).finally(()=>{
            this.setState({
                processing: false
            });
        })
    }
    // UPDATE STAGE BY ID
    updateStage = async(event)=> {
        event.preventDefault();
        await axios.post('/api/stage/update', this.state.stageData).then(({data})=>{
            if(data.success) {
                console.log(data.success);
                // const toaster = createToaster({ position: 'top' });
                // toaster.success('Save stage successfully');
                // toastr.success('Update Stage Successfully')
                // this.$router.go(-1);
            }
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
            });
        })
    }

    // ENABLED EDIT
    handleOnEdit = async() => {
        this.setState({
            is_edit: true
        })
    }

    handleChange = async (event) => {
        this.setState(prevState => ({ 
            stageData: {
                ...prevState.stageData, [event.target.name]: event.target.value 
            }
        }));

        console.log(this.state.stageData.target_number, 'target_num');
    }

    componentDidMount() {
        this.getStageById()
    }

    render() {

        return (
            <div>
                <DashboardComponent></DashboardComponent>
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <div className="card shadow-sm">
                                <div className="card-header">
                                    <h3>Stage</h3>
                                </div>
                                <div className="card-body">
                                    <form className="form" onSubmit={this.updateStage}>
                                        <div className="card-body">
                                            <input type="text" className="d-none" disabled={!this.state.is_edit} defaultValue={this.state.stage_id}/>
                                            <div className="row mb-2">
                                                <div className="col-xl-3">
                                                    <div className="form-group">
                                                        <label>Stage</label>
                                                        <input onChange={this.handleChange} name="stage" defaultValue={this.state.stageData.stage} type="text" disabled={!this.state.is_edit} className="form-control"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row mb-2">
                                                <div className="col-xl-3">
                                                    <div className="form-group">
                                                        <label>Target number(target retweet number)</label>
                                                        <input onChange={this.handleChange} name="target_number" defaultValue={this.state.stageData.target_number} type="text" disabled={!this.state.is_edit} className="form-control"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row mb-2">
                                                <div className="col-xl-3">
                                                    <div className="form-group">
                                                        <label>Stage timer</label>
                                                        <input onChange={this.handleChange} name="stage_timer" defaultValue={this.state.stageData.stage_number} type="text" disabled={!this.state.is_edit} className="form-control" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        { (!this.state.is_edit)? 
                                            <div className="card-footer">
                                                <button type="submit" onClick={this.handleOnEdit} className="btn btn-primary mx-3">Edit</button>
                                                <button type="button" onClick={this.goBack} className="btn btn-secondary ml-3">Cancel</button>
                                            </div>
                                            : ''
                                        }
                                        { (this.state.is_edit)? 
                                            <div className="card-footer" v-if="is_edit">
                                                <button type="submit" className="btn btn-primary mx-3">Submit</button>
                                                <button type="button" onClick={this.goBack} className="btn btn-secondary ml-3">Cancel</button>
                                            </div>
                                            : ''
                                        }
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default StateEditComponent;