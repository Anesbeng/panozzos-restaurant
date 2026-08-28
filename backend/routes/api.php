<?php

use App\Http\Controllers\Api\DishController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\Auth\AuthController;
use App\Http\Controllers\Api\Admin\AdminDishController;
use App\Http\Controllers\Api\Admin\AdminCategoryController;



use Illuminate\Support\Facades\Storage;

Route::get('/media/{path}', function ($path) {
    if (!Storage::disk('public')->exists($path)) {
        abort(404);
    }

    return response(Storage::disk('public')->get($path))
        ->header('Content-Type', Storage::disk('public')->mimeType($path))
        ->header('Access-Control-Allow-Origin', '*');
})->where('path', '.*');

Route::get('/dishes', [DishController::class, 'index']);
Route::get('/dishes/{dish}', [DishController::class, 'show']);
Route::get('/categories', [CategoryController::class, 'index']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->prefix('admin')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
   Route::get('/dishes', [AdminDishController::class, 'index']);
   Route::get('/dishes/{dish}', [AdminDishController::class, 'show']);
   Route::post('/dishes', [AdminDishController::class, 'store']);
   Route::put('/dishes/{dish}', [AdminDishController::class, 'update']);
   Route::delete('/dishes/{dish}', [AdminDishController::class, 'destroy']);
   Route::get('/categories', [AdminCategoryController::class, 'index']);
   Route::get('/categories/{category}', [AdminCategoryController::class, 'show']); 
   Route::post('/categories', [AdminCategoryController::class, 'store']);
   Route::put('/categories/{category}', [AdminCategoryController::class, 'update']);
   Route::delete('/categories/{category}', [AdminCategoryController::class, 'destroy']);

});