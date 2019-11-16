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

// Roles por usuario
Route::get('userRoles/{id}', 'Api\UserController@userRoles');
Route::post('addUserRole/{userId}/{roleId}', 'Api\UserController@addUserRole');
Route::delete('deleteUserRole/{userId}/{roleId}', 'Api\UserController@deleteUserRole');

// Compañías por usuario
Route::get('userCompanies/{id}', 'Api\UserController@userCompanies');
Route::post('addUserCompany/{userId}/{companyId}', 'Api\UserController@addUserCompany');
Route::delete('deleteUserCompany/{userId}/{companyId}', 'Api\UserController@deleteUserCompany');

// Módulo por roles
Route::get('roleModules/{id}', 'Api\RoleController@roleModules');
Route::post('addRoleModule/{roleId}/{moduleId}', 'Api\RoleController@addRoleModule');
Route::delete('deleteRoleModule/{roleId}/{moduleId}', 'Api\RoleController@deleteRoleModule');