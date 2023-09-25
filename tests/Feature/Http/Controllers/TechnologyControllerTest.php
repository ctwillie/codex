<?php

namespace Tests\Feature\Http\Controllers;

use App\Models\Category;
use App\Models\Technology;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class TechnologyControllerTest extends TestCase
{
    use WithFaker;

    public function test_a_guest_cannot_create_a_technology(): void
    {
        $this->post(route('technology.store'))
            ->assertRedirect(route('login'));
    }

    public function test_validation_fails_with_partial_store_data(): void
    {
        $payload = [
            'name' => str($this->faker->unique()->word())->title()->toString(),
        ];

        $this->actingAs($this->authUser)
            ->post(route('technology.store'), $payload)
            ->assertSessionHasErrors(['category_id']);
    }

    public function test_a_technology_can_be_created(): void
    {
        $category = Category::factory()->create()->refresh();

        $payload = [
            'name' => str($this->faker->unique()->word())->title()->toString(),
            'categoryId' => $category->uuid,
        ];

        $this->actingAs($this->authUser)
            ->post(route('technology.store'), $payload)
            ->assertRedirect(route('dashboard.technologies'))
            ->assertSessionHas('message', 'Technology added successfully');

        $this->assertDatabaseHas('technologies', [
            'name' => $payload['name'],
            'category_id' => $category->id,
        ]);
    }

    public function test_a_guest_cannot_update_a_technology(): void
    {
        $technology = Technology::factory()->create()->refresh();

        $this->patch(route('technology.update', $technology))
            ->assertRedirect(route('login'));
    }

    public function test_validation_fails_with_partial_update_data(): void
    {
        $technology = Technology::factory()->create()->refresh();

        $payload = [
            'name' => str($this->faker->unique()->word())->title()->toString(),
        ];

        $this->actingAs($this->authUser)
            ->patch(route('technology.update', $technology), $payload)
            ->assertSessionHasErrors(['category_id']);
    }

    public function test_a_technology_can_be_updated(): void
    {
        $technology = Technology::factory()->create()->refresh();
        $category = Category::factory()->create()->refresh();

        $payload = [
            'name' => str($this->faker->unique()->word())->title()->toString(),
            'categoryId' => $category->uuid,
        ];

        $this->actingAs($this->authUser)
            ->patch(route('technology.update', $technology), $payload)
            ->assertRedirect(route('dashboard.technologies'))
            ->assertSessionHas('message', 'Technology updated successfully');

        $this->assertDatabaseHas('technologies', [
            'id' => $technology->id,
            'name' => $payload['name'],
            'category_id' => $category->id,
        ]);
    }
}
