<?php

use Illuminate\Http\Request;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// Get
Route::resource('company', 'Api\CompanyController');
Route::resource('role', 'Api\RoleController');
Route::resource('user', 'Api\UserController');
Route::resource('module', 'Api\ModuleController');

/**
**Basic Routes for a RESTful service:
**Route::get($uri, $callback);
**Route::post($uri, $callback);
**Route::put($uri, $callback);
**Route::delete($uri, $callback);
**
*/

// Route::post('company','Api\CompanyController@store');
 
// Route::put('company/{company}','Api\CompanyController@update');
 
// Route::delete('company/{id}', 'CompanyController@delete');