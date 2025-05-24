<?php

namespace App\Http\Controllers;

use App\Models\Pole;
use Illuminate\Http\Request;

class PoleController extends Controller
{
    /**
     * Display a listing of all poles.
     */
    public function index()
    {
        $poles = Pole::with(['director', 'nts'])->get();
        return response()->json($poles);
    }

    /**
     * Store a newly created pole.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'code' => 'required|unique:poles|max:10',
            'title' => 'required|max:255',
            'director_id' => 'required|exists:directors,id',
            'commune' => 'required|max:100',
            'wilaya' => 'required|max:100',
            'last_submission' => 'nullable|date',
        ]);

        $pole = Pole::create($validated);
        return response()->json($pole->load(['director', 'nts']), 201);
    }

    /**
     * Display the specified pole.
     */
    public function show(Pole $pole)
    {
        return response()->json($pole->load(['director', 'nts']));
    }

    /**
     * Update the specified pole.
     */
    public function update(Request $request, Pole $pole)
    {
        $validated = $request->validate([
            'code' => 'sometimes|required|max:10|unique:poles,code,'.$pole->id,
            'title' => 'sometimes|required|max:255',
            'director_id' => 'sometimes|required|exists:directors,id',
            'commune' => 'sometimes|required|max:100',
            'wilaya' => 'sometimes|required|max:100',
            'last_submission' => 'nullable|date',
        ]);

        $pole->update($validated);
        return response()->json($pole->load(['director', 'nts']));
    }

    /**
     * Remove the specified pole.
     */
    public function destroy(Pole $pole)
    {
        $pole->delete();
        return response()->json(null, 204);
    }

    /**
     * Get poles by wilaya
     */
    public function byWilaya($wilaya)
    {
        $poles = Pole::where('wilaya', $wilaya)
                    ->with(['director', 'nts'])
                    ->get();
        return response()->json($poles);
    }

    /**
     * Get poles with recent submissions (last 30 days)
     */
    public function recentSubmissions()
    {
        $poles = Pole::where('last_submission', '>=', now()->subDays(30))
                    ->with(['director', 'nts'])
                    ->get();
        return response()->json($poles);
    }
}