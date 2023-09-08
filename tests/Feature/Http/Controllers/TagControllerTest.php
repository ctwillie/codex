<?php

namespace Tests\Feature\Http\Controllers;

use App\Models\Tag;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class TagControllerTest extends TestCase
{
    use WithFaker;

    public function test_a_guest_cannot_create_a_tag(): void
    {
        $this->post(route('tag.store'))
            ->assertRedirect(route('login'));
    }

    public function test_validation_fails_with_partial_store_data(): void
    {
        $payload = [];

        $this->actingAs($this->authUser)
            ->post(route('tag.store'), $payload)
            ->assertSessionHasErrors(['name', 'slug']);
    }

    public function test_a_tag_can_be_created(): void
    {
        $payload = [
            'name' => str($this->faker->unique()->word())->title()->toString(),
        ];

        $this->actingAs($this->authUser)
            ->post(route('tag.store'), $payload)
            ->assertRedirect(route('dashboard.tags'))
            ->assertSessionHas('message', 'Tag added successfully');

        $this->assertDatabaseHas('tags', $payload);
    }

    public function test_a_guest_cannot_update_a_tag(): void
    {
        $tag = Tag::factory()->create()->refresh();

        $this->patch(route('tag.update', $tag))
            ->assertRedirect(route('login'));
    }

    public function test_validation_fails_with_partial_update_data(): void
    {
        $tag = Tag::factory()->create()->refresh();
        $payload = [];

        $this->actingAs($this->authUser)
            ->patch(route('tag.update', $tag), $payload)
            ->assertSessionHasErrors(['name', 'slug']);
    }

    public function test_a_tag_can_be_updated(): void
    {
        $tag = Tag::factory()->create()->refresh();

        $payload = [
            'name' => str($this->faker->unique()->word())->title()->toString(),
        ];

        $this->actingAs($this->authUser)
            ->patch(route('tag.update', $tag), $payload)
            ->assertRedirect(route('dashboard.tags'))
            ->assertSessionHas('message', 'Tag updated successfully');

        $this->assertDatabaseHas('tags', [
            'id' => $tag->id,
            'name' => $payload['name'],
        ]);
    }
}
