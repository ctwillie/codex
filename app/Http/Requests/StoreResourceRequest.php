<?php

namespace App\Http\Requests;

use App\Models\Category;
use App\Models\Technology;
use Illuminate\Foundation\Http\FormRequest;

class StoreResourceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'category_id' => ['required', 'exists:categories,id'],
            'is_official' => ['required', 'boolean'],
            'name' => ['required', 'string', 'max:255', 'unique:resources,name'],
            'technology_id' => ['nullable', 'exists:technologies,id'],
            'url' => ['required', 'url', 'max:255'],
        ];
    }

    protected function prepareForValidation(): void
    {
        $category = Category::firstWhere('uuid', $this->input('categoryId'));

        /** Ensure the technology belongs to the request category */
        $technology = Technology::firstWhere([
            'uuid' => $this->input('technologyId'),
            'category_id' => $category?->id,
        ]);

        $this->merge([
            'is_official' => $this->input('isOfficial'),
            'category_id' => $category?->id,
            'technology_id' => $technology?->id,
        ]);
    }
}
