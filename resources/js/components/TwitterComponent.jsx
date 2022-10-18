import { times } from 'lodash';
import React, { Component } from 'react';
import { CAlert, CCarousel, CCarouselItem } from '@coreui/react';
import 'bootstrap/dist/css/bootstrap.min.css'
import '@coreui/coreui/dist/css/coreui.min.css'

class TwitterComponent extends Component {

    state = {
        twitter: {},
        error_message: '',
        validationErrors: {},
        processing: false,
        error: false,
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
            })
        })
    }

    getStage = async() => {
        await axios.get('/api/stage').then(({data})=>{
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
                alert(response.data.message)
            }
        }).finally(()=>{
            this.setState({
                processing: false
            })
        })
    }


    componentDidMount() {
        this.getTwitter();
        this.getStage();

        // if(Object.keys(this.props.location.query).length) {
        //     // this.error = true
        //     this.setState({
        //         error_message: this.props.location.query.message
        //     });
        //     const toaster = createToaster({ position: 'top' });
        //     toaster.warning(this.error_message);
        // }
    }
    render() {
        const retweet = async(event) => {
            console.log(event);
            window.location.href = window.location.origin + "/twitter";
        }
        const style = {
            tweetContainer: {
                margin: 'unset'
            },
            // carouselContatiner: {
            //     width: '70%',
            //     margin: '0 auto'
            // }
        };
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
                                <div className="grid grid-cols-1">
                                    { (this.state.stages).length?
                                        <div className="tweet-wrap p-5" style={style.tweetContainer} if={this.state.stages}>

                                            <CCarousel controls activeIndex={this.state.twitter.stage_level - 1} dark={true} interval={false} >
                                                <CCarouselItem>
                                                    <img className="d-block w-100" src='/images/stage1.png' alt="slide 1"/>
                                                </CCarouselItem>
                                                <CCarouselItem>
                                                    <img className="d-block w-100" src='/images/stage2.png' alt="slide 2"/>
                                                </CCarouselItem>
                                                <CCarouselItem>
                                                    <img className="d-block w-100" src='/images/stage3.png' alt="slide 3"/>
                                                </CCarouselItem>
                                                <CCarouselItem>
                                                    <img className="d-block w-100" src='/images/stage4.png' alt="slide 3"/>
                                                </CCarouselItem>
                                                <CCarouselItem>
                                                    <img className="d-block w-100" src='/images/stage5.png' alt="slide 3"/>
                                                </CCarouselItem>
                                            </CCarousel>

                                            { this.state.twitter.stage_level?
                                                <div className="text-center">
                                                    Level { this.state.twitter.stage_level }
                                                </div>
                                            : '' }
                                        </div>
                                    : '' }
                                    <div className="tweet-wrap p-5 mt-0">
                                        { this.state.error?
                                        <div className="alert alert-danger pb-15 text-danger" id="close">
                                            <a href="#" className="close" data-dismiss="alert" aria-label="close">&times;</a>
                                            <span className="text-danger">{ this.state.error_message }</span>
                                        </div>
                                        : ''}
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
