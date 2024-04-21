<?php

use App\Http\Controllers\AbsenceController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\DepartementController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Route::post('/login', [UserController::class, 'login']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [UserController::class, 'logout']);
    
    Route::resource("/departments", DepartementController::class)->only([
        'index', 'show', 'store', 'update', 'destroy'
    ]);

    Route::resource("/employees", UserController::class)->only([
        'index', 'show', 'store', 'update', 'destroy'
    ]);
    Route::get('/count', [UserController::class, 'count']);
    
    Route::get('/data', [UserController::class, 'getEmployees']);


    Route::resource("/absences", AbsenceController::class)->only([
        'index', 'show', 'store', 'update', 'destroy'
    ]);

});



