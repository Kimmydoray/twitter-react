<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

// Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/stage', "App\Http\Controllers\StageController@index");
    Route::get('/stage/{id}', "App\Http\Controllers\StageController@stageById");
    Route::post('/stage/update', "App\Http\Controllers\StageController@update");

    Route::get('/twitter', "App\Http\Controllers\TwitterController@getTwitterPost");

    Route::get('/account', "App\Http\Controllers\AccountController@index");
    Route::post('/account/update', "App\Http\Controllers\AccountController@update");

    Route::post('/login/sanctum', "App\Http\Controllers\LoginSanctumController@authenticate");

    

    // Route::get('/twitter', "App\Http\Controllers\TwitterController@getTwitterPost");
// });
