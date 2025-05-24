<?php

namespace App\Http\Controllers;

use App\Models\RecapSortieChaudronnerie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class RecapSortieChaudronnerieController extends Controller
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
            'codes_nt_rows.*.code' => 'nullable|string',
            'travaux_divers_rows' => 'nullable|array',
            'travaux_divers_rows.*.travaux' => 'nullable|string',
            'travaux_metalliques_rows' => 'nullable|array',
            'travaux_metalliques_rows.*.travaux' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $recapSortieChaudronnerie = RecapSortieChaudronnerie::create($request->all());

        return response()->json(['message' => 'Recap Sortie Chaudronnerie saved successfully', 'data' => $recapSortieChaudronnerie], 201);
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

        $recapSortieChaudronnerie = RecapSortieChaudronnerie::where('pole_id', $poleId)->latest()->first();

        if (!$recapSortieChaudronnerie) {
            return response()->json(['message' => 'No Recap Sortie Chaudronnerie found for this pole'], 404);
        }

        return response()->json($recapSortieChaudronnerie, 200);
    }
}