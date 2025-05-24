<?php

     use Illuminate\Database\Migrations\Migration;
     use Illuminate\Database\Schema\Blueprint;
     use Illuminate\Support\Facades\Schema;

     class CreateRecapSortieChaudronneriesTable extends Migration
     {
         public function up()
         {
             Schema::create('recap_sortie_chaudronneries', function (Blueprint $table) {
                 $table->id();
                 $table->string('mois');
                 $table->string('pole');
                 $table->decimal('atelier_mecanique', 10, 2)->nullable();
                 $table->decimal('atelier_prefa', 10, 2)->nullable();
                 $table->decimal('client_externe', 10, 2)->nullable();
                 $table->decimal('total', 10, 2);
                 $table->json('codes_nt_rows')->nullable();
                 $table->json('travaux_divers_rows')->nullable();
                 $table->json('travaux_metalliques_rows')->nullable();
                 $table->timestamps();
             });
         }

         public function down()
         {
             Schema::dropIfExists('recap_sortie_chaudronneries');
         }
     }