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
        return Inertia::render('Dashboard/Search');
    }

    public function search(Request $request): JsonResponse
    {
        return response()->json([
            'postData' => $request->all(),
        ]);
    }
}