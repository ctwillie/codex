<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        Category::factory()
            ->count(10)
            ->state(new Sequence(
                ['name' => 'Backend Development'],
                ['name' => 'Frontend Development'],
                ['name' => 'DevOps'],
                ['name' => 'Design'],
                ['name' => 'UI/UX'],
                ['name' => 'Databases'],
                ['name' => 'Cloud Computing'],
                ['name' => 'Command Line Interface'],
                ['name' => 'Data Science'],
                ['name' => 'Mobile Development'],
            ))
            ->create();
    }
}
