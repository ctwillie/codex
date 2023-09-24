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
        $categorySelectOptions = Category::orderBy('name')->get()
            ->map(function ($category) {
                return [
                    'label' => $category->name,
                    'value' => $category->uuid,
                ];
            });

        $technologySelectOptions = Technology::orderBy('name')->with('category')->get()
            ->map(function ($technology) {
                return [
                    'label' => $technology->name,
                    'value' => $technology->uuid,
                    'categoryId' => $technology->category->uuid,
                ];
            });

        $tagSelectOptions = Tag::orderBy('name')->get()
            ->map(function ($tag) {
                return [
                    'label' => $tag->name,
                    'value' => $tag->uuid,
                ];
            });

        $resources = Resource::filtered($request->query())
            ->orderBy('name')
            ->with('category', 'technology', 'tags')
            ->get();

        // TODO: lazy load what isn't needed on every request
        return Inertia::render('Dashboard/Resources', [
            'resources' => ResourceResource::collection($resources),
            'resultsCount' => $resources->count(),
            'categorySelectOptions' => $categorySelectOptions,
            'technologySelectOptions' => $technologySelectOptions,
            'tagSelectOptions' => $tagSelectOptions,
        ]);
    }

    public function categories(): InertiaResponse
    {
        $categories = Category::orderBy('name')->get();

        return Inertia::render('Dashboard/Categories', [
            'categories' => CategoryResource::collection($categories),
        ]);
    }

    public function technologies(): InertiaResponse
    {

        $categorySelectOptions = Category::orderBy('name')->get()
            ->map(function ($category) {
                return [
                    'label' => $category->name,
                    'value' => $category->uuid,
                ];
            });

        $technologies = Technology::orderBy('name')->with('category')->get();

        return Inertia::render('Dashboard/Technologies', [
            'categorySelectOptions' => $categorySelectOptions,
            'technologies' => TechnologyResource::collection($technologies),
        ]);
    }

    public function tags(): InertiaResponse
    {
        $tags = Tag::orderBy('name')->get();

        return Inertia::render('Dashboard/Tags', [
            'tags' => TagResource::collection($tags),
        ]);
    }
}
