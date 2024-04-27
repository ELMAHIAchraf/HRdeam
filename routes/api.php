<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Response;
use App\Http\Controllers\AbsenceController;
use App\Http\Controllers\AnnouncementController;
use App\Http\Controllers\ApplicantController;
use App\Http\Controllers\DepartementController;
use App\Models\Announcement;
use App\Models\Applicant;

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
Route::resource("/announcements", AnnouncementController::class)
->only(['index']);

Route::resource("/applicants", ApplicantController::class)
->only(['store']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [UserController::class, 'logout']);
    Route::get('/search', [UserController::class, 'search']);
    
    Route::resource("/departments", DepartementController::class)->only([
        'index', 'show', 'store', 'update', 'destroy'
    ]);

    Route::resource("/employees", UserController::class)->only([
        'index', 'show', 'store', 'update', 'destroy', 
    ]);
    Route::get('/count', [UserController::class, 'count']);
    
    Route::get('/data', [UserController::class, 'getEmployees']);


    Route::resource("/absences", AbsenceController::class)->only([
        'index', 'show', 'store', 'update', 'destroy'
    ]);
    Route::get('/dashboard', [AbsenceController::class, 'dashboard']);

    Route::resource("/announcements", AnnouncementController::class)
    ->only(['show', 'store', 'update', 'destroy']);

    Route::resource("/applicants", ApplicantController::class)->only([
        'index', 'show', 'update', 'destroy'
    ]);
    Route::put('/changeStatus', [ApplicantController::class, 'changeStatus']);
    Route::post('/onboard', [ApplicantController::class, 'onboard']);



});



