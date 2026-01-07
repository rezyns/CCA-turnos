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
        Schema::create('MODULES', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name')->unique();
            $table->string('role');

        });

        Schema::create('SERVICES', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('name')->unique();
            $table->string('word')->unique();
            $table->unsignedBigInteger('module_id');
            $table->foreign('module_id')->references('id')->on('MODULES');

            $table->timestamps();
        });

        Schema::create('SHIFTS', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('shift')->unique();
            $table->dateTime('date');
            $table->boolean('called')->default(false);
            $table->dateTime('called_at')->nullable();
            $table->unsignedBigInteger('service_id');
            $table->foreign('service_id')->references('id')->on('SERVICES');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('MODULES');
        Schema::dropIfExists('SERVICES');
        Schema::dropIfExists('SHIFTS');
    }
};
