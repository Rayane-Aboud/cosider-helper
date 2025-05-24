<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class FlashMensuel extends Model
{
    use HasFactory;

    protected $fillable = [
        'pole_id',
        'mois',
        'pole', // Note: This field may be redundant with pole_id; consider removing
        'nt_rows',
        'travaux_rows',
        'weekly_data',
        'summary'
    ];

    protected $casts = [
        'nt_rows' => 'array',
        'travaux_rows' => 'array',
        'weekly_data' => 'array',
        'summary' => 'array',
    ];

    public function pole()
    {
        return $this->belongsTo(Pole::class);
    }
}