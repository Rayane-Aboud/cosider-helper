<?php

namespace App\Http\Controllers;

use App\Models\WarehouseInventory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class WarehouseInventoryController extends Controller
{
    public function save(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'pole_id' => 'required|exists:poles,id',
            'pole' => 'required|string|max:255', // Optional: Remove if pole_id is sufficient
            'month' => 'required|string|max:255',
            'total' => 'required|numeric',
            'entries' => 'required|array',
            'entries.*' => 'nullable|numeric',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $warehouseInventory = WarehouseInventory::create($request->all());

        return response()->json(['message' => 'Warehouse Inventory saved successfully', 'data' => $warehouseInventory], 201);
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

        $warehouseInventory = WarehouseInventory::where('pole_id', $poleId)->latest()->first();

        if (!$warehouseInventory) {
            return response()->json(['message' => 'No Warehouse Inventory found for this pole'], 404);
        }

        return response()->json($warehouseInventory, 200);
    }
}