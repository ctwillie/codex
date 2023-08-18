<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('resource_tag', function (Blueprint $table) {
            $table->foreignid('resource_id')->constrained('resources')->cascadeOnDelete();
            $table->foreignid('tag_id')->constrained('tags')->cascadeOnDelete();
            $table->timestamps();

            $table->unique(['resource_id', 'tag_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('resource_tag');
    }
};
