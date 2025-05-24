<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PoleController;
use App\Http\Controllers\DirectorController;
use App\Http\Controllers\NTController;
use App\Http\Controllers\ConstructionTimesheetController;
use App\Http\Controllers\FlashMensuelController;
use App\Http\Controllers\RecapSortieAtelierController;
use App\Http\Controllers\RecapSortieChaudronnerieController;
use App\Http\Controllers\WarehouseInventoryController;

// Pole routes
Route::get('/poles', [PoleController::class, 'index']);
Route::post('/poles', [PoleController::class, 'store']);
Route::get('/poles/{pole}', [PoleController::class, 'show']);
Route::put('/poles/{pole}', [PoleController::class, 'update']);
Route::delete('/poles/{pole}', [PoleController::class, 'destroy']);
Route::get('/poles/wilaya/{wilaya}', [PoleController::class, 'byWilaya']);
Route::get('/poles/recent', [PoleController::class, 'recentSubmissions']);

// Director routes
Route::get('/directors', [DirectorController::class, 'index']);
Route::post('/directors', [DirectorController::class, 'store']);
Route::get('/directors/{director}', [DirectorController::class, 'show']);
Route::put('/directors/{director}', [DirectorController::class, 'update']);
Route::delete('/directors/{director}', [DirectorController::class, 'destroy']);
Route::get('/directors/multiple-poles', [DirectorController::class, 'withMultiplePoles']);

// NT routes
Route::get('/nts', [NTController::class, 'index']);
Route::post('/nts', [NTController::class, 'store']);
Route::get('/nts/{nt}', [NTController::class, 'show']);
Route::put('/nts/{nt}', [NTController::class, 'update']);
Route::delete('/nts/{nt}', [NTController::class, 'destroy']);
Route::get('/nts/pole/{poleId}', [NTController::class, 'byPole']);
Route::get('/nts/search', [NTController::class, 'search']);

// Form routes
Route::post('/save-constructiontimesheet', [ConstructionTimesheetController::class, 'save']);
Route::get('/load-constructiontimesheet', [ConstructionTimesheetController::class, 'load']);
Route::post('/save-flashmensuel', [FlashMensuelController::class, 'save']);
Route::get('/load-flashmensuel', [FlashMensuelController::class, 'load']);
Route::post('/save-recapsortieatelier', [RecapSortieAtelierController::class, 'save']);
Route::get('/load-recapsortieatelier', [RecapSortieAtelierController::class, 'load']);
Route::post('/save-recapsortiechaudronnerie', [RecapSortieChaudronnerieController::class, 'save']);
Route::get('/load-recapsortiechaudronnerie', [RecapSortieChaudronnerieController::class, 'load']);
Route::post('/save-warehouseinventoryform', [WarehouseInventoryController::class, 'save']);
Route::get('/load-warehouseinventoryform', [WarehouseInventoryController::class, 'load']);