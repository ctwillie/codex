<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreResourceRequest;
use App\Models\Resource;

class ResourceController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreResourceRequest $request)
    {
        Resource::create($request->validated());

        return to_route('dashboard')
            ->with('message', 'Resource added successfully');
    }

    /**
     * Update the specified resource in storage.
     */
    // public function update(UpdateTechnologyRequest $request, Resource $resource)
    // {
    //     $resource->update($request->validated());

    //     return to_route('dashboard')
    //         ->with('message', 'Resource updated successfully');
    // }
}
