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
 
 
Route::post('company','CompanyController@store');
 
Route::put('company/{company}','CompanyController@update');
 
Route::delete('company/{company}', 'CompanyController@delete');

// // Post
// Route::post('company', function (Request $request) {
//     $resp = Product::create($request->all());
//     return $resp;
// });

// // Put
// Route::put('company/{company}', function (Request $request, $companyId) {
//     $company = Product::findOrFail($companyId);
//     $company->update($request->all());
//     return $company;
// });

// // Delete
// Route::delete('company/{company}', function ($companyId) {
//     Product::find($companyId)->delete();
//     return 204;
// });
