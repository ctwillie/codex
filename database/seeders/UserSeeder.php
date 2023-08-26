<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        User::factory()
            ->unverified()
            ->create([
                'name' => 'Cedric Twillie',
                'email' => config('test.email'),
            ]);

        User::factory(10)
            ->state(new Sequence(
                ['email_verified_at' => now()],
                ['email_verified_at' => null],
            ))->create();
    }
}
