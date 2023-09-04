<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoryResource;
use App\Http\Resources\ResourceResource;
use App\Http\Resources\TagResource;
use App\Http\Resources\TechnologyResource;
use App\Models\Category;
use App\Models\Resource;
use App\Models\Tag;
use App\Models\Technology;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response as InertiaResponse;

class DashboardController extends Controller
{
    public function index(Request $request): InertiaResponse
    {
        $categorySelectOptions = Category::all()->map(function ($category) {
            return [
                'label' => $category->name,
                'value' => $category->uuid,
            ];
        });

        $technologySelectOptions = Technology::with('category')
            ->get()->map(function ($technology) {
                return [
                    'label' => $technology->name,
                    'value' => $technology->uuid,
                    'categoryId' => $technology->category->uuid,
                ];
            });

        $resources = Resource::filtered($request->query())
            ->with('category', 'technology', 'tags')
            ->get();

        // TODO: lazy load what isn't needed on every request
        return Inertia::render('Dashboard/Resources', [
            'resources' => ResourceResource::collection($resources),
            'resultsCount' => $resources->count(),
            'categorySelectOptions' => $categorySelectOptions,
            'technologySelectOptions' => $technologySelectOptions,
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
                'label' => $category->name,
                'value' => $category->uuid,
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
