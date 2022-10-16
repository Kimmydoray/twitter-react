import React, { Component } from 'react';

class TwitterComponent extends Component {

    state = {
        twitter: {},
        error_message: '',
        validationErrors: {},
        processing: false,
        error: false,
        error_message: '',
        stages: ''
    };

    getTwitter = async() => {
        const api = await fetch("/api/twitter")
        .then(response => response.json())
        .then(response => {
            // setProducts(response.result);
            console.log(response);
            this.setState({
                twitter: response
            });
        })
        .catch(err => console.error(err));
        // console.log(api); 
        // this.setState({
        //     twitter: api
        // });
    }
    
    componentDidMount() {
        this.getTwitter()
    }
    render() {
        const retweet = async(event) => {
            console.log(event);
            window.location.href = window.location.origin + "/twitter";
        }
        // const heading = "Laravel 9 Vite  with React JS";
        return (
            <div>
                <div className="antialiased">
                    <div className="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center py-4 sm:pt-0">
                    
                        <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
                            <div className="flex justify-center pt-8 sm:justify-start sm:pt-0">
                                <h1 className="dark:text-white">Twitter</h1>
                            </div>
                            <div className="">
                                <div className="grid grid-cols-1 md:grid-cols-2">
                                    <div className="tweet-wrap p-5">
                                    
                                        <div className="alert alert-danger pb-15 text-danger" id="close" v-if="error">
                                            <a href="#" className="close" data-dismiss="alert" aria-label="close">&times;</a>
                                            <span className="text-danger">{ this.error_message }</span>
                                        </div>
                                        <div className="tweet-header">
                                            <img src={this.state.twitter.profile_image_url_https} alt="" className="avator"/>
                                            <div className="tweet-header-info">
                                                    { this.state.twitter.user_name } <span>{ this.state.twitter.user_screen_name } </span>
                                                <span>
                                                    { this.state.twitter.created_at }
                                                </span>
                                                <p>{ this.state.twitter.text }</p>
                                                
                                            </div>
                                        </div>
                                        <div className="tweet-info-counts">
                                            
                                            <div className="retweets">
                                                <svg className="feather feather-repeat sc-dnqmqq jxshSx" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path></svg>
                                                <div className="retweet-count">{this.state.twitter.retweet_count }</div>
                                            </div>
                                            
                                            <div className="message">
                                                {/* Call retweet API */}
                                                <a className="feather feather-send btn btn-primary cursor-pointer" onClick={event => retweet(event)}>
                                                    <i className="fab fa-twitter"></i> Retweet
                                                </a>
                                            </div>
                                        </div>
                                        <br/>
                                        <div className="tweet-info-counts">
                                            <div className="retweet-count">Hashtag Count (#{ this.state.twitter.hashtag }): {this.state.twitter.hashtag_count }</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default TwitterComponent;
