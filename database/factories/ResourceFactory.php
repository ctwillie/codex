<?php

namespace Database\Factories;

use App\Models\Category;
use App\Models\Technology;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Resource>
 */
class ResourceFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'category_id' => Category::factory(),
            'technology_id' => Technology::factory(),
            'is_official' => false,
            'name' => fake()->unique()->words(3, true),
            'url' => fake()->unique()->url(),
        ];
    }

    /**
     * Indicate that the resource is official.
     */
    public function official(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_official' => true,
        ]);
    }
}
