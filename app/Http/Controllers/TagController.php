<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTagRequest;
use App\Http\Requests\UpdateTagRequest;
use App\Models\Tag;

class TagController extends Controller
{
    public function store(StoreTagRequest $request)
    {
        Tag::create($request->validated());

        return to_route('dashboard.tags')
            ->with('message', 'Tag added successfully');
    }

    public function update(UpdateTagRequest $request, Tag $tag)
    {
        logger('tag update', $request->validated());

        $tag->update($request->validated());

        return to_route('dashboard.tags')
            ->with('message', 'Tag updated successfully');
    }
}
