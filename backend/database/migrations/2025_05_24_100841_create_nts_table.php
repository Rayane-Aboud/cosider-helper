<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // database/migrations/YYYY_MM_DD_000003_create_nts_table.php
        Schema::create('nts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('pole_id')->constrained('poles');
            $table->string('code', 20);
            $table->string('title', 100);
            $table->timestamps();
            
            // Optional: composite unique constraint
            $table->unique(['pole_id', 'code']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('nts');
    }
};
