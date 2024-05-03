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
Route::get('/notify', function () {
    event(new \App\Events\NotificationEvent("Hello World"));
});

Route::post('/login', [UserController::class, 'login']);

Route::get('/getJobs', [AnnouncementController::class, 'getJobs']);




Route::resource("/applicants", ApplicantController::class)
->only(['store']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    $user=$request->user();
    $user->role=$user->getRoleNames()[0];
    unset($user->roles);
    return $user;
});

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [UserController::class, 'logout']);

    Route::get('/search', [UserController::class, 'search'])->middleware('permission:user.search');
    Route::post('/vacation', [AbsenceController::class, 'requestVacation'])->middleware('permission:absence.requestVacation');


    
    //Department routes
    Route::middleware(['permission:departement.index'])->group(function () {
        Route::get('/departments', [DepartementController::class, 'index']);
    });

    Route::middleware(['permission:departement.show'])->group(function () {
        Route::get('/departments/{department}', [DepartementController::class, 'show']);
    });

    Route::middleware(['permission:departement.store'])->group(function () {
        Route::post('/departments', [DepartementController::class, 'store']);
    });

    Route::middleware(['permission:departement.update'])->group(function () {
        Route::put('/departments/{department}', [DepartementController::class, 'update']);
    });

    Route::middleware(['permission:departement.destroy'])->group(function () {
        Route::delete('/departments/{department}', [DepartementController::class, 'destroy']);
    });



    //user routes
    Route::middleware(['permission:user.index'])->group(function () {
        Route::get('/employees', [UserController::class, 'index']);
    });

    Route::middleware(['permission:user.show'])->group(function () {
        Route::get('/employees/{user}', [UserController::class, 'show']);
    });

    Route::middleware(['permission:user.store'])->group(function () {
        Route::post('/employees', [UserController::class, 'store']);
    });

    Route::middleware(['permission:user.update'])->group(function () {
        Route::put('/employees/{user}', [UserController::class, 'update']);
    });

    Route::middleware(['permission:user.destroy'])->group(function () {
        Route::delete('/employees/{user}', [UserController::class, 'destroy']);
    });

    Route::get('/count', [UserController::class, 'count'])->middleware('permission:user.count');
    
    Route::get('/data', [UserController::class, 'getEmployees'])->middleware('permission:user.getEmployees');


    
    //absence routes

    Route::middleware(['permission:absence.index'])->group(function () {
        Route::get('/absences', [AbsenceController::class, 'index']);
    });

    Route::middleware(['permission:absence.show'])->group(function () {
        Route::get('/absences/{absence}', [AbsenceController::class, 'show']);
    });

    Route::middleware(['permission:absence.store'])->group(function () {
        Route::post('/absences', [AbsenceController::class, 'store']);
    });

    Route::middleware(['permission:absence.update'])->group(function () {
        Route::put('/absences/{absence}', [AbsenceController::class, 'update']);
    });

    Route::middleware(['permission:absence.destroy'])->group(function () {
        Route::delete('/absences/{absence}', [AbsenceController::class, 'destroy']);
    });

    Route::get('/dashboard', [AbsenceController::class, 'dashboard'])->middleware('permission:absence.dashboard');

    
    //Announcement routes
    Route::middleware(['permission:announcement.index'])->group(function () {
        Route::get('/announcements', [AnnouncementController::class, 'index']);
    });

    Route::middleware(['permission:announcement.show'])->group(function () {
        Route::get('announcements/{announcement}', [AnnouncementController::class, 'show']);
    });

    Route::middleware(['permission:announcement.store'])->group(function () {
        Route::post('announcements', [AnnouncementController::class, 'store']);
    });

    Route::middleware(['permission:announcement.update'])->group(function () {
        Route::put('announcements/{announcement}', [AnnouncementController::class, 'update']);
    });

    Route::middleware(['permission:announcement.destroy'])->group(function () {
        Route::delete('announcements/{announcement}', [AnnouncementController::class, 'destroy']);
    });


    //applicant routes

    Route::middleware(['permission:applicant.index'])->group(function () {
        Route::get('/applicants', [ApplicantController::class, 'index']);
    });

    Route::middleware(['permission:applicant.show'])->group(function () {
        Route::get('/applicants/{applicant}', [ApplicantController::class, 'show']);
    });



    Route::middleware(['permission:applicant.update'])->group(function () {
        Route::put('/applicants/{applicant}', [ApplicantController::class, 'update']);
    });

    Route::middleware(['permission:applicant.destroy'])->group(function () {
        Route::delete('/applicants/{applicant}', [ApplicantController::class, 'destroy']);
    });
    Route::put('/changeStatus', [ApplicantController::class, 'changeStatus'])->middleware('permission:applicant.changeStatus');
    Route::post('/onboard', [ApplicantController::class, 'onboard'])->middleware('permission:applicant.onboard');



});



