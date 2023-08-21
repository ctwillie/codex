<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FallbackController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TagController;
use App\Http\Controllers\TechnologyController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

/**
 * Home
 */
Route::get('/', HomeController::class)->name('home');

Route::middleware('auth')->group(function () {
    /**
     * Categories
     */
    Route::post('category', [CategoryController::class, 'store'])->name('category.store');
    Route::patch('category/{category:uuid}', [CategoryController::class, 'update'])->name('category.update');

    /**
     * Dashboard
     */
    Route::prefix('dashboard')
        ->group(function () {
            Route::get('resources', [DashboardController::class, 'index'])->name('dashboard');
            Route::post('search', [DashboardController::class, 'search'])->name('dashboard.search');
            Route::get('categories', [DashboardController::class, 'categories'])->name('dashboard.categories');
            Route::get('technologies', [DashboardController::class, 'technologies'])->name('dashboard.technologies');
            Route::get('tags', [DashboardController::class, 'tags'])->name('dashboard.tags');
        });

    /**
     * Profile
     */
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    /**
     * Tags
     */
    Route::post('tag', [TagController::class, 'store'])->name('tag.store');
    Route::patch('tag/{tag:uuid}', [TagController::class, 'update'])->name('tag.update');

    /**
     * Technologies
     */
    Route::post('technology', [TechnologyController::class, 'store'])->name('technology.store');
    Route::patch('technology/{technology:uuid}', [TechnologyController::class, 'update'])->name('technology.update');
});

require __DIR__.'/auth.php';

Route::fallback(FallbackController::class);
