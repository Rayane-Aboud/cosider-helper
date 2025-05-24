<?php

namespace App\Http\Controllers;

use App\Models\ConstructionTimesheet;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ConstructionTimesheetController extends Controller
{
    public function save(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'pole_id' => 'required|exists:poles,id',
            'mois' => 'required|string|max:255',
            'pole' => 'required|string|max:255', // Optional: Remove if pole_id is sufficient
            'weekly_data' => 'required|array',
            'summary' => 'required|array',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $timesheet = ConstructionTimesheet::create($request->all());

        return response()->json(['message' => 'Construction Timesheet saved successfully', 'data' => $timesheet], 201);
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

        $timesheet = ConstructionTimesheet::where('pole_id', $poleId)->latest()->first();

        if (!$timesheet) {
            return response()->json(['message' => 'No Construction Timesheet found for this pole'], 404);
        }

        return response()->json($timesheet, 200);
    }
}