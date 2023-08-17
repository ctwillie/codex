<?php

namespace App\Http\Controllers;

use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;

class HomeController extends Controller
{
    public function __invoke(): RedirectResponse
    {
        return Redirect::route('dashboard');
    }
}
