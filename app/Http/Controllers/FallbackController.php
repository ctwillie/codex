<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class FallbackController extends Controller
{
    public function __invoke(Request $request): InertiaResponse|RedirectResponse
    {
        return $request->user()
            ? Inertia::render('Error')
            : redirect()->route('login');
    }
}
