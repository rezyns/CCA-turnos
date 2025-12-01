<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\ModuleController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/test', function() {
    return response()->json(['message' => 'API is working']);
});

Route::resource('services', ServiceController::class, [
    'services' => 'id'
]);

Route::resource('modules', ModuleController::class, [
    'modules' => 'id'
]);