<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ConstructionTimesheet extends Model
{
    use HasFactory;

    protected $fillable = [
        'pole_id',
        'mois',
        'pole', // Note: This field may be redundant with pole_id; consider removing
        'weekly_data',
        'summary'
    ];

    protected $casts = [
        'weekly_data' => 'array',
        'summary' => 'array',
    ];

    public function pole()
    {
        return $this->belongsTo(Pole::class);
    }
}