<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Models\Category;

class CategoryController extends Controller
{
    public function store(StoreCategoryRequest $request)
    {
        Category::create($request->validated());

        return to_route('dashboard.categories')
            ->with('message', 'Category added successfully');
    }

    public function update(UpdateCategoryRequest $request, Category $category)
    {
        $category->update($request->validated());

        return to_route('dashboard.categories')
            ->with('message', 'Category updated successfully');
    }
}
