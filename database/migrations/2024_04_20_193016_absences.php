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
        Schema::create('absences', function (Blueprint $table) {
            $table->id();
            $table->enum('type', ['sick', 'vacation', 'personal']);
            $table->date('start_date');
            $table->date('end_date');
            $table->string('reason');
            $table->enum('status', ['pending','in process',  'approved', 'rejected'])->default('pending');
            $table->string('review')->nullable();
            $table->timestamps();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->foreignId('hr_id')->nullable()->constrained('users')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
