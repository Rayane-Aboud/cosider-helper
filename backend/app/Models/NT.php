<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class NT extends Model
{
    protected $table = 'nts'; // Explicitly set table name
    
    protected $fillable = [
        'pole_id',
        'code',
        'title'
    ];
    
    public function pole()
    {
        return $this->belongsTo(Pole::class);
    }
}