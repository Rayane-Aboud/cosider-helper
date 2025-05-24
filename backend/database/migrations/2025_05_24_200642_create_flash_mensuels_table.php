<?php

     use Illuminate\Database\Migrations\Migration;
     use Illuminate\Database\Schema\Blueprint;
     use Illuminate\Support\Facades\Schema;

     class CreateFlashMensuelsTable extends Migration
     {
         public function up()
         {
             Schema::create('flash_mensuels', function (Blueprint $table) {
                 $table->id();
                 $table->string('mois');
                 $table->string('pole');
                 $table->json('nt_rows');
                 $table->json('travaux_rows');
                 $table->json('weekly_data');
                 $table->json('summary');
                 $table->timestamps();
             });
         }

         public function down()
         {
             Schema::dropIfExists('flash_mensuels');
         }
     }