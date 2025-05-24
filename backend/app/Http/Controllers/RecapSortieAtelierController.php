<?php

namespace App\Http\Controllers;

use App\Models\RecapSortieAtelier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RecapSortieAtelierController extends Controller
{
    public function save(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'pole_id' => 'required|exists:poles,id',
            'mois' => 'required|string|max:255',
            'pole' => 'required|string|max:255', // Optional: Remove if pole_id is sufficient
            'atelier_mecanique' => 'nullable|numeric',
            'atelier_prefa' => 'nullable|numeric',
            'client_externe' => 'nullable|numeric',
            'total' => 'required|numeric',
            'codes_nt_rows' => 'nullable|array',
            'travaux_divers_rows' => 'nullable|array',
            'travaux_metalliques_rows' => 'nullable|array',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $recapSortieAtelier = RecapSortieAtelier::create($request->all());

        return response()->json(['message' => 'Recap Sortie Atelier saved successfully', 'data' => $recapSortieAtelier], 201);
    }

    public function load(Request $request)
    {
        $poleId = $request->query('pole_id');
        $validator = Validator::make(['pole_id' => $poleId], [
            'pole_id' => 'required|exists:poles,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $recapSortieAtelier = RecapSortieAtelier::where('pole_id', $poleId)->latest()->first();

        if (!$recapSortieAtelier) {
            return response()->json(['message' => 'No Recap Sortie Atelier found for this pole'], 404);
        }

        return response()->json($recapSortieAtelier, 200);
    }
}