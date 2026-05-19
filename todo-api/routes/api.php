<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TodoController;
Route::apiResource('todos', TodoController::class);

Route::get('/test', function () {
    return response()->json([
        'message' => 'API is working'
    ]);
}); 