<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Noweh\TwitterApi\Client;
use Abraham\TwitterOAuth\TwitterOAuth;
use App\Models\Stage;
use App\Models\Tweet;
use App\Models\TwitterAccount;
use App\Models\Hashtag;
use DateTime;
use Illuminate\Support\Facades\Redirect;

class TwitterController extends Controller
{
    
    public function connectToTwitter(Request $request) 
    {
        $callback = '';
        $_twitter_connect = new TwitterOAuth(env('TWITTER_API_KEY'), env('TWITTER_API_KEY_SECRET'));

        $_access_token = $_twitter_connect->oauth('oauth/request_token', ['oauth_callback' => $callback]);
        
        $_route = $_twitter_connect->url('oauth/authorize', ['oauth_token' => $_access_token['oauth_token']]);

        return redirect($_route);
        
        // $content = $connection->get("account/verify_credentials");

        // $statuses = $connection->get("search/tweets", ["q" => "twitterapi"]);
        // var_dump($statuses);die;
    }

    public function twitterCallback(Request $request) 
    {
        
        $response = $request->all();
        
        $oauth_token = $response['oauth_token'];
        $oauth_verifier = $response['oauth_verifier'];

        $_twitter_connect = new TwitterOAuth(env('TWITTER_API_KEY'), env('TWITTER_API_KEY_SECRET'), $oauth_token, $oauth_verifier);

        //verify user token 
        $token = $_twitter_connect->oauth('oauth/access_token', ['oauth_verifier'=> $oauth_verifier]);

        $user_id = $token['user_id'];
        $oauth_token = $token['oauth_token']; //access token
        $oauth_token_secret = $token['oauth_token_secret']; //token secret

        // return $this->postMessageToTwitter($oauth_token, $oauth_token_secret);
        return $this->retweetMessageToTwitter($oauth_token, $oauth_token_secret, $user_id);
        
    }

    public function getTwitterPost($message = NULL) {
        $connection = new TwitterOAuth(env('TWITTER_API_KEY'), env('TWITTER_API_KEY_SECRET'));
        $connection->setTimeouts(10, 15);
        $id = $this->getUserRecentTweet();
        
        $result = $connection->get('statuses/show', ['id' => $id]);
        // Get all time from tweet time, current time and last retweet time
        $tweet_time = new DateTime(date('Y-m-d H:i', strtotime($result->created_at))); // Time Tweeted
        $current_time = new DateTime(date('Y-m-d H:i'));
        $last_retweet_time = $this->getRecentRetweetOfTweet($id);

        $interval =  $current_time->diff(new DateTime($last_retweet_time));
        // $result = $connection->get('statuses/user_timeline/', ['user_id' => '1432133282339033092', 'count' => 1]);
        // echo 'tweet time: ' . $tweet_time->format('Y-m-d H:i') . '</br>';
        // echo 'current time: ' . $current_time->format('Y-m-d H:i') . '</br>';
        // echo 'last retweet time: ' . $last_retweet_time . '</br>';
        // echo $interval->format('%i minutes(s)');

        // Get stages data
        $stages = Stage::all();
        $stage_level = 1;
        $stage_time = 0;
        foreach($stages as $key => $stage) {
            if($result->retweet_count >= $stage['target_number']) {
                $stage_level = $stage['stage'];
                $stage_time = $stage['stage_number'];
            }
        }
        
        if($stage_level > 1) {
            if($interval->i > $stage_time) {
                $stage_level--;
            } else {
                // $stage_level++;
            }
        }
        // dd($stage_level, $stage_time);
    
        // dd($tweet_time, $current_time, $last_retweet_time, $interval->i, $stage_level);
        $hashtag = Hashtag::first();
        $data = null;
        $data = [
            'id' => $result->id_str,
            'retweet_count' => $result->retweet_count,
            'source' => $result->source,
            'text' => $result->text,
            'created_at' => $result->created_at,
            'user_name' => $result->user->name,
            'user_screen_name' => '@' . $result->user->screen_name,
            'profile_image_url_https' => $result->user->profile_image_url_https,
            'error' => $message,
            'hashtag_count' => $this->getHashtagCount(),
            'stage_level' => $stage_level,
            'hashtag' => $hashtag->hashtag
        ];
        
        return response()->json($data);
        
        // dd($result);
        // dd($result->retweet_count);
    }

    public function getUserRecentTweet() {
        $connection = new TwitterOAuth(env('TWITTER_API_KEY'), env('TWITTER_API_KEY_SECRET'));
        $connection->setTimeouts(10, 15);
        $twitter_account = TwitterAccount::first();
        $result = $connection->get('statuses/user_timeline/', ['include_rts'=>'false','user_id' => $twitter_account->account_id, 'count' => 1]);

        return $result[0]->id_str;
       
    }

    public function postMessageToTwitter($oauth_token, $oauth_token_secret) 
    {
        $push = new TwitterOAuth(env('TWITTER_API_KEY'), env('TWITTER_API_KEY_SECRET'), $oauth_token, $oauth_token_secret);
        $push->setTimeouts(10, 15);
        $result = $push->post('statuses/update', ['status'=>'Hello this is just another test']);

        $data = [
            'id' => $result->id_str,
            'retweet_count' => $result->retweet_count,
            'source' => $result->source,
            'text' => $result->text,
            'created_at' => $result
        ];
        return response()->view('welcome', $data);
        // return redirect()->route('');
    }

    public function retweetMessageToTwitter($oauth_token, $oauth_token_secret, $user_id) {
        $push = new TwitterOAuth(env('TWITTER_API_KEY'), env('TWITTER_API_KEY_SECRET'), $oauth_token, $oauth_token_secret);
        $push->setTimeouts(10, 15);
        $id = $this->getUserRecentTweet();
        $result = $push->post('statuses/retweet/' . $id);

        // dd($result);
        if(isset($result->errors)) {
            $message = $result->errors[0]->message;
            // return $this->getTwitterPost($message);
            return Redirect::to('/get/twitter?message=' . $message);
        } else {
            $data = [
                'id' => $result->id_str,
                'retweet_count' => $result->retweet_count,
                'source' => $result->source,
                'text' => $result->text,
                'created_at' => $result,
                'user_name' => $result->user->name,
                'user_screen_name' => '@' . $result->user->screen_name,
                'profile_image_url_https' => $result->user->profile_image_url_https
            ];
        
            return Redirect::to('/get/twitter');
        }
        
        // return response()->view('welcome', $data);

        // dd($result);
    }

    public function getHashtagCount()
    {
        $connection = new TwitterOAuth(env('TWITTER_API_KEY'), env('TWITTER_API_KEY_SECRET'));
        $connection->setTimeouts(10, 15);
        $hashtag= Hashtag::first();
        $result = $connection->get('search/tweets', ['q' => $hashtag->hashtag]);
        $hashtag_count = 0;
        if(count($result->statuses)) {
            $hashtag_count = count($result->statuses);
        }
        return $hashtag_count;
    }
    
    public function setStagePerPost()
    {
        $connection = new TwitterOAuth(env('TWITTER_API_KEY'), env('TWITTER_API_KEY_SECRET'));
        $connection->setTimeouts(10, 15);
        $id = $this->getUserRecentTweet();

        $result = $connection->get('statuses/show', ['id' => $id]);
        
        $time = (explode(' ', $result->created_at))[2] . ' ' . (explode(' ', $result->created_at))[3];
        dd($time);
        //TODOS: CHECK time if they are valid for increase or decrease of stage
        $tweet = Tweet::where('id', 1)
        ->update([
            'stage_id' => 2,
            'last_retweet_time' => $time
        ]);
    }
    
    /**
     * Get Recent Retweet of a tweet 
     */
    public function getRecentRetweetOfTweet($tweet_id) {
        $connection = new TwitterOAuth(env('TWITTER_API_KEY'), env('TWITTER_API_KEY_SECRET'));
        $connection->setTimeouts(10, 15);
        $id = $tweet_id;
        $result = $connection->get('statuses/retweets/' . $id, ['count' => 10]);
        
        $time = null;
        if(count($result)) {
            $time = date('Y-m-d H:i', strtotime($result[0]->created_at));
        }
        // $result = $connection->get('statuses/user_timeline/', ['user_id' => '1432133282339033092', 'count' => 1]);
        
        return $time;
    }
}
