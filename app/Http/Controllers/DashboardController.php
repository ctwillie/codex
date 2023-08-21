<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoryResource;
use App\Http\Resources\TagResource;
use App\Http\Resources\TechnologyResource;
use App\Models\Category;
use App\Models\Tag;
use App\Models\Technology;
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
        return Inertia::render('Dashboard/Categories', [
            'categories' => CategoryResource::collection(Category::all()),
        ]);
    }

    public function technologies(): InertiaResponse
    {

        $categorySelectOptions = Category::all()->map(function ($category) {
            return [
                'id' => $category->uuid,
                'name' => $category->name,
            ];
        });

        $technologies = Technology::with('category')->get();

        return Inertia::render('Dashboard/Technologies', [
            'categorySelectOptions' => $categorySelectOptions,
            'technologies' => TechnologyResource::collection($technologies),
        ]);
    }

    public function tags(): InertiaResponse
    {
        return Inertia::render('Dashboard/Tags', [
            'tags' => TagResource::collection(Tag::all()),
        ]);
    }
}
