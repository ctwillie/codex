<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTechnologyRequest;
use App\Http\Requests\UpdateTechnologyRequest;
use App\Models\Technology;

class TechnologyController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTechnologyRequest $request)
    {
        Technology::create($request->validated());

        return to_route('dashboard.technologies')
            ->with('message', 'Technology added successfully');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTechnologyRequest $request, Technology $technology)
    {
        $technology->update($request->validated());

        return to_route('dashboard.technologies')
            ->with('message', 'Technology updated successfully');
    }
}
