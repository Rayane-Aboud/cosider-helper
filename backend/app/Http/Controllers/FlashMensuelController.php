<?php

namespace App\Http\Controllers;

use App\Models\FlashMensuel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class FlashMensuelController extends Controller
{
    public function save(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'pole_id' => 'required|exists:poles,id',
            'mois' => 'required|string|max:255',
            'pole' => 'required|string|max:255', // Optional: Remove if pole_id is sufficient
            'nt_rows' => 'required|array',
            'travaux_rows' => 'required|array',
            'weekly_data' => 'required|array',
            'summary' => 'required|array',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $flashMensuel = FlashMensuel::create($request->all());

        return response()->json(['message' => 'Flash Mensuel saved successfully', 'data' => $flashMensuel], 201);
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

        $flashMensuel = FlashMensuel::where('pole_id', $poleId)->latest()->first();

        if (!$flashMensuel) {
            return response()->json(['message' => 'No Flash Mensuel found for this pole'], 404);
        }

        return response()->json($flashMensuel, 200);
    }
}