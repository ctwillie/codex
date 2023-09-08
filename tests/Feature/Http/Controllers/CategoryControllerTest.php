<?php

namespace Tests\Feature\Http\Controllers;

use App\Models\Category;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CategoryControllerTest extends TestCase
{
    use WithFaker;

    public function test_a_guest_cannot_create_a_category(): void
    {
        $this->post(route('category.store'))
            ->assertRedirect(route('login'));
    }

    public function test_validation_fails_with_partial_store_data(): void
    {
        $payload = [
            'name' => $this->faker->word,
        ];

        $this->actingAs($this->authUser)
            ->post(route('category.store'), $payload)
            ->assertSessionHasErrors(['description']);

        $payload = [
            'description' => $this->faker->sentence,
        ];

        $this->actingAs($this->authUser)
            ->post(route('category.store'), $payload)
            ->assertSessionHasErrors(['name']);
    }

    public function test_a_category_can_be_created(): void
    {
        $payload = Category::factory()->make()->toArray();

        $this->actingAs($this->authUser)
            ->post(route('category.store'), $payload)
            ->assertRedirect(route('dashboard.categories'))
            ->assertSessionHas('message', 'Category added successfully');

        $this->assertDatabaseHas('categories', $payload);
    }

    public function test_a_guest_cannot_update_a_category(): void
    {
        $category = Category::factory()->create()->refresh();

        $this->patch(route('category.update', $category))
            ->assertRedirect(route('login'));
    }

    public function test_validation_fails_with_partial_update_data(): void
    {
        $category = Category::factory()->create()->refresh();

        $payload = [
            'name' => $this->faker->word,
        ];

        $this->actingAs($this->authUser)
            ->patch(route('category.update', $category), $payload)
            ->assertSessionHasErrors(['description']);

        $payload = [
            'description' => $this->faker->sentence,
        ];

        $this->actingAs($this->authUser)
            ->patch(route('category.update', $category), $payload)
            ->assertSessionHasErrors(['name']);
    }

    public function test_a_category_can_be_updated(): void
    {
        $category = Category::factory()->create()->refresh();
        $payload = Category::factory()->make()->toArray();

        $this->actingAs($this->authUser)
            ->patch(route('category.update', $category), $payload)
            ->assertRedirect(route('dashboard.categories'))
            ->assertSessionHas('message', 'Category updated successfully');

        $this->assertDatabaseHas('categories', $payload);
    }
}
