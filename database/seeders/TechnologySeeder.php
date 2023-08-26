<?php

namespace Database\Seeders;

use App\Models\Category;
use Database\Factories\TechnologyFactory;
use Illuminate\Database\Seeder;

class TechnologySeeder extends Seeder
{
    public function run(): void
    {
        $categories = Category::limit(30)->get();

        foreach ($categories as $category) {
            $category->technologies()->createMany(
                TechnologyFactory::new()
                    ->for($category)
                    ->count(random_int(2, 8))
                    ->make()
                    ->toArray()
            );
        }

    }
}
