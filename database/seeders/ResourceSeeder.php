<?php

namespace Database\Seeders;

use App\Models\Tag;
use App\Models\Technology;
use Database\Factories\ResourceFactory;
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Database\Seeder;

class ResourceSeeder extends Seeder
{
    public function run(): void
    {
        $technologies = Technology::limit(30)->get();
        $tags = Tag::limit(50)->get();

        foreach ($technologies as $technology) {

            /** Ensure the max random integer is not greater than all tag count */
            $tagLimit = $tags->count() <= 6 ? $tags->count() : 6;
            $randomTags = $tags->random(random_int(2, $tagLimit));

            ResourceFactory::new()
                ->for($technology)
                ->for($technology->category)
                ->hasAttached($randomTags)
                ->state(new Sequence(
                    ['is_official' => false],
                    ['is_official' => false],
                    ['is_official' => false],
                    ['is_official' => true],
                ))
                ->count(random_int(5, 10))
                ->create();
        }
    }
}
