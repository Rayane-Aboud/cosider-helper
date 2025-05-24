<?php

namespace App\Http\Controllers;

use App\Models\NT;
use Illuminate\Http\Request;

class NTController extends Controller
{
    /**
     * Display a listing of all NTs.
     */
    public function index()
    {
        $nts = NT::with('pole')->get();
        return response()->json($nts);
    }

    /**
     * Store a newly created NT.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'pole_id' => 'required|exists:poles,id',
            'code' => 'required|unique:n_ts|max:20',
            'title' => 'required|max:255',
        ]);

        $nt = NT::create($validated);
        return response()->json($nt->load('pole'), 201);
    }

    /**
     * Display the specified NT.
     */
    public function show(NT $nt)
    {
        return response()->json($nt->load('pole'));
    }

    /**
     * Update the specified NT.
     */
    public function update(Request $request, NT $nt)
    {
        $validated = $request->validate([
            'pole_id' => 'sometimes|required|exists:poles,id',
            'code' => 'sometimes|required|max:20|unique:n_ts,code,'.$nt->id,
            'title' => 'sometimes|required|max:255',
        ]);

        $nt->update($validated);
        return response()->json($nt->load('pole'));
    }

    /**
     * Remove the specified NT.
     */
    public function destroy(NT $nt)
    {
        $nt->delete();
        return response()->json(null, 204);
    }

    /**
     * Get NTs by pole
     */
    public function byPole($poleId)
    {
        $nts = NT::where('pole_id', $poleId)
                ->with('pole')
                ->get();
        return response()->json($nts);
    }

    /**
     * Search NTs by title
     */
    public function search(Request $request)
    {
        $query = NT::with('pole');

        if ($request->has('title')) {
            $query->where('title', 'like', '%'.$request->title.'%');
        }

        return response()->json($query->get());
    }
}