<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\ModuleController;
use App\Http\Controllers\Api\ShiftController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::resource('services', ServiceController::class, [
    'services' => 'id'
]);

Route::resource('modules', ModuleController::class, [
    'modules' => 'id'
]);

Route::get('/shifts/call-next/{module_id}', [ShiftController::class, 'callNextShift']);
Route::get('/shifts/waiting-shifts', [ShiftController::class, 'upcomingShifts']);
Route::get('/shifts/{id}', [ShiftController::class, 'addShift']); 