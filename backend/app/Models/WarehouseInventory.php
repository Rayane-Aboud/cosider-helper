<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WarehouseInventory extends Model
{
    use HasFactory;

    protected $fillable = [
        'pole_id',
        'pole', // Note: This field may be redundant with pole_id; consider removing
        'month',
        'total',
        'entries'
    ];

    protected $casts = [
        'entries' => 'array',
    ];

    public function pole()
    {
        return $this->belongsTo(Pole::class);
    }
}