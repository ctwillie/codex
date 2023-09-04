<?php

namespace App\Http\Requests;

use App\Models\Category;
use App\Models\Technology;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateResourceRequest extends FormRequest
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
            'technology_id' => ['nullable', 'exists:technologies,id'],
            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('resources')->ignore($this->route('resource')->id),
            ],
            'url' => [
                'required',
                'url',
                'max:255',
                Rule::unique('resources')->ignore($this->route('resource')->id),
            ],
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
