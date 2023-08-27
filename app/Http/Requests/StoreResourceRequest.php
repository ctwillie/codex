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
            'technology_id' => ['required', 'exists:technologies,id'],
            'url' => ['required', 'url', 'max:255'],
        ];
    }

    protected function prepareForValidation(): void
    {
        $this->merge([
            'category_id' => Category::firstWhere('uuid', $this->input('categoryId'))?->id,
            'is_official' => $this->input('isOfficial'),
            'technology_id' => Technology::firstWhere('uuid', $this->input('technologyId'))?->id,
        ]);
    }
}
