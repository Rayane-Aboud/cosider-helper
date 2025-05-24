<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RecapSortieChaudronnerie extends Model
{
    use HasFactory;

    protected $fillable = [
        'pole_id',
        'mois',
        'pole', // Note: This field may be redundant with pole_id; consider removing
        'atelier_mecanique',
        'atelier_prefa',
        'client_externe',
        'total',
        'codes_nt_rows',
        'travaux_divers_rows',
        'travaux_metalliques_rows'
    ];

    protected $casts = [
        'codes_nt_rows' => 'array',
        'travaux_divers_rows' => 'array',
        'travaux_metalliques_rows' => 'array',
    ];

    public function pole()
    {
        return $this->belongsTo(Pole::class);
    }
}