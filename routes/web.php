<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TwitterController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/twitter', [TwitterController::class, 'connectToTwitter'])->name('media.twitter');
Route::get('/twitter/callback', [TwitterController::class, 'twitterCallback'])->name('media.callback');
// Route::get('/get/twitter', [TwitterController::class, 'getTwitterPost'])->name('twitter.post');
// Route::get('/hashtag/count', [TwitterController::class, 'getHashtagCount'])->name('twitter.hashtag');

// Route::get('/post/status', [TwitterController::class, 'setStagePerPost'])->name('twitter.hashtag');




// Auth::routes();

// Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::get('{any}', function () {
    return view('app');
})->where('any', '.*');

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');


Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
