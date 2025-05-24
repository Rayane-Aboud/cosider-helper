<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pole extends Model
{
    use HasFactory;

    protected $fillable = [
        'code',
        'title',
        'director_id',
        'commune',
        'wilaya',
        'last_submission'
    ];

    protected $casts = [
        'last_submission' => 'datetime',
    ];

    public function director()
    {
        return $this->belongsTo(Director::class);
    }

    public function nts()
    {
        return $this->hasMany(NT::class);
    }
}