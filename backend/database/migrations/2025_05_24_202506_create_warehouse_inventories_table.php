<?php

     use Illuminate\Database\Migrations\Migration;
     use Illuminate\Database\Schema\Blueprint;
     use Illuminate\Support\Facades\Schema;

     class CreateWarehouseInventoriesTable extends Migration
     {
         public function up()
         {
             Schema::create('warehouse_inventories', function (Blueprint $table) {
                 $table->id();
                 $table->string('pole');
                 $table->string('month');
                 $table->decimal('total', 15, 2);
                 $table->json('entries');
                 $table->timestamps();
             });
         }

         public function down()
         {
             Schema::dropIfExists('warehouse_inventories');
         }
     }