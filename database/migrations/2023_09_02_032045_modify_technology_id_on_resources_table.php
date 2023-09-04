<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('resources', function (Blueprint $table) {
            $table->unsignedBigInteger('technology_id')->nullable()->change();
        });
    }

    public function down(): void
    {
        /**
         * This can never be reversed unless you drop the foreign key constraint
         * or populate the column with a default value before making it non-nullable.
         */
        // Schema::table('resources', function (Blueprint $table) {
        //     $table->unsignedBigInteger('technology_id')->nullable(false)->change();
        // });
    }
};
