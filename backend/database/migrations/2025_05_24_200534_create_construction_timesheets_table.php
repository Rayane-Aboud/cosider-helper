<?php

     use Illuminate\Database\Migrations\Migration;
     use Illuminate\Database\Schema\Blueprint;
     use Illuminate\Support\Facades\Schema;

     class CreateConstructionTimesheetsTable extends Migration
     {
         public function up()
         {
             Schema::create('construction_timesheets', function (Blueprint $table) {
                 $table->id();
                 $table->string('mois');
                 $table->string('pole');
                 $table->json('weekly_data');
                 $table->json('summary');
                 $table->timestamps();
             });
         }

         public function down()
         {
             Schema::dropIfExists('construction_timesheets');
         }
     }