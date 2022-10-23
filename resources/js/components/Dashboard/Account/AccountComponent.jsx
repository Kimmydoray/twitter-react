import React, { Component } from 'react';
import { useNavigate } from "react-router-dom";
import DashboardComponent from  '../DashboardComponent';
import { CToast, CButton, CToastHeader } from '@coreui/react';

class AccountComponent extends Component {

    // SET STATE
    state = {
        validationErrors: {},
        processing: false,
        accountData: {
            account_id: '',
            hashtag: ''
        },
        is_edit: false
    }

    // GET ACCOUNT DATA
    getAccount = async() => {
        await axios.get('/api/account').then(({data})=>{
            this.setState({
                accountData: data
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
            });
        })
    }

    // ENABLED EDIT
    handleOnEdit = async() => {
        this.setState({
            is_edit: true
        })
    }

    // NAVIGATE BACK
    goBack = async() => {
        const navigate = useNavigate()
        navigate(-1);
    }

    // UPDATE ACCOUNT
    updateAccount = async(event) => {
        event.preventDefault();

        await axios.post('/api/account/update', this.state.accountData).then(({data})=>{
            console.log(data.success);
            if(data.success) {
                // const toaster = createToaster({ position: 'top' });
                // toaster.success('Save Account Successfully');
                alert('Save Account Successfully')
                this.is_edit = false
            }
        }).catch(({response})=>{
            if(response.status===422){
                this.validationErrors = response.data.errors
            }else{
                this.validationErrors = {}
                alert(response.data.message)
            }
        }).finally(()=>{
            this.processing = false
        })
    }

    // RUN ON LOAD
    componentDidMount() {
        this.getAccount();
    }

    render() {

        return (
            <div>
                <DashboardComponent></DashboardComponent>
                <div className="row">
                    <div className="col-12">
                        <div className="card shadow-sm">
                            <div className="card-header">
                                <h3>Account</h3>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <form className="form" onSubmit={this.updateAccount}>
                                    <div className="card-body">
                                        <input type="text" className="d-none"/>
                                        <div className="row mb-2">
                                            <div className="col-xl-3">
                                                <div className="form-group">
                                                    <label>Account ID</label>
                                                    <input type="text" disabled={!this.state.is_edit} value={this.state.accountData.account_id} className="form-control"/>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="row mb-2">
                                            <div className="col-xl-3">
                                                <div className="form-group">
                                                    <label>Hashtag</label>
                                                    <input disabled={!this.state.is_edit} value={this.state.accountData.hashtag} type="text" className="form-control"/>
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

export default AccountComponent;