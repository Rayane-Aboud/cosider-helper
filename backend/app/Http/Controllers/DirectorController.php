<?php

namespace App\Http\Controllers;

use App\Models\Director;
use Illuminate\Http\Request;

class DirectorController extends Controller
{
    /**
     * Display a listing of all directors.
     */
    public function index()
    {
        $directors = Director::with('poles')->get();
        return response()->json($directors);
    }

    /**
     * Store a newly created director.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|max:255',
            'email' => 'required|email|unique:directors|max:255',
            'phone' => 'required|max:20',
        ]);

        $director = Director::create($validated);
        return response()->json($director->load('poles'), 201);
    }

    /**
     * Display the specified director.
     */
    public function show(Director $director)
    {
        return response()->json($director->load('poles'));
    }

    /**
     * Update the specified director.
     */
    public function update(Request $request, Director $director)
    {
        $validated = $request->validate([
            'name' => 'sometimes|required|max:255',
            'email' => 'sometimes|required|email|max:255|unique:directors,email,'.$director->id,
            'phone' => 'sometimes|required|max:20',
        ]);

        $director->update($validated);
        return response()->json($director->load('poles'));
    }

    /**
     * Remove the specified director.
     */
    public function destroy(Director $director)
    {
        $director->delete();
        return response()->json(null, 204);
    }

    /**
     * Get directors with multiple poles
     */
    public function withMultiplePoles()
    {
        $directors = Director::has('poles', '>', 1)
                           ->with('poles')
                           ->get();
        return response()->json($directors);
    }
}