<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreResourceRequest;
use App\Http\Requests\UpdateResourceRequest;
use App\Models\Resource;

class ResourceController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreResourceRequest $request)
    {
        $resource = Resource::create($request->validated());

        $resource->tags()->attach($request->validated('tag_ids'));

        return to_route('dashboard')
            ->with('message', 'Resource added successfully');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateResourceRequest $request, Resource $resource)
    {
        $resource->update($request->validated());

        $resource->tags()->sync($request->validated('tag_ids'));

        return to_route('dashboard')
            ->with('message', 'Resource updated successfully');
    }
}
