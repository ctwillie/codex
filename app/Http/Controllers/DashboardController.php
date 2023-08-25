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
        $queryParams = $request->query();

        $categorySelectOptions = Category::all()->map(function ($category) {
            return [
                'label' => $category->name,
                'value' => $category->uuid,
            ];
        });

        // TODO: refactor this once a filter system is in place
        $resources = Resource::with(['category', 'technology', 'tags'])
            ->when(! empty($queryParams['category']), function ($query) use ($queryParams) {
                $query->whereHas('category', function ($query) use ($queryParams) {
                    $query->where('uuid', $queryParams['category']['value']);
                });
            })
            ->when(! empty($queryParams['isOfficial']), function ($query) use ($queryParams) {
                $query->where('is_official', (bool) $queryParams['isOfficial']);
            })
            ->when(! empty($queryParams['search']), function ($query) use ($queryParams) {
                $query->where('name', 'like', "%{$queryParams['search']}%");
            })
            ->get();

        // lazy load what isn't needed on every request
        return Inertia::render('Dashboard/Resources', [
            'resources' => ResourceResource::collection($resources),
            'resultsCount' => $resources->count(),
            'categorySelectOptions' => $categorySelectOptions,
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
