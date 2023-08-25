<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ResourceResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->uuid,
            'name' => $this->name,
            'url' => $this->url,
            'isOfficial' => $this->is_official,
            'category' => new CategoryResource($this->whenLoaded('category')),
            'technology' => new TechnologyResource($this->whenLoaded('technology')),
            'tags' => TagResource::collection($this->whenLoaded('tags')),
        ];
    }
}
