<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SocialAuth extends Model
{
    use HasFactory;

    protected $fillable = [
        'twitter_screen_name',
        'twitter_oauth_token', 
        'twitter_oauth_token_secret'
    ];
}
