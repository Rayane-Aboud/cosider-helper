<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddPoleIdToRecapSortieAteliersTable extends Migration
{
    public function up()
    {
        Schema::table('recap_sortie_ateliers', function (Blueprint $table) {
            $table->unsignedBigInteger('pole_id')->after('id');
            $table->foreign('pole_id')->references('id')->on('poles')->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::table('recap_sortie_ateliers', function (Blueprint $table) {
            $table->dropForeign(['pole_id']);
            $table->dropColumn('pole_id');
        });
    }
}