<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class DashboardController extends Controller
{
    public function index(): InertiaResponse
    {
        return Inertia::render('Dashboard/Resources');
    }

    public function search(Request $request): JsonResponse
    {
        return response()->json([
            'postData' => $request->all(),
        ]);
    }

    public function categories(): InertiaResponse
    {
        return Inertia::render('Dashboard/Categories');
    }

    public function technologies(): InertiaResponse
    {
        return Inertia::render('Dashboard/Technologies');
    }

    public function tags(): InertiaResponse
    {
        return Inertia::render('Dashboard/Tags');
    }
}
