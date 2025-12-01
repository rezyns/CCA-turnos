<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Module;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class ModuleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $modules = Module::all();
        if ($modules->isEmpty()) {
            return response()->json(['message' => 'No modules found'], 404);
        }
        return response()->json(['data' => $modules], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'role' => 'required|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'The module could not be created for validation.' ,'errors' => $validator->errors()], 400);
        }

        $module = Module::create([
            'name' => $request->input('name'),
            'role' => $request->input('role'),
        ]);

        if (!$module) {
            return response()->json(['message' => 'Failed to create module'], 500);
        }

        return response()->json(['message' => 'Module created successfully', 'data' => $module], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $module = Module::find($id);
        if (!$module) {
            return response()->json(['message' => 'Module not found'], 404);
        }
        return response()->json(['data' => $module], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $module = Module::find($id);
        if (!$module) {
            return response()->json(['message' => 'Module not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'string|max:255',
            'role' => 'string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'The module could not be updated for validation.' ,'errors' => $validator->errors()], 400);
        }

        if ($request->has('name')) {
            $module->name = $request->input('name');
        }

        if ($request->has('role')) {
            $module->role = $request->input('role');
        }

        $module->save();
        return response()->json(['message' => 'Module updated successfully', 'data' => $module], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $module = Module::find($id);
        if (!$module) {
            return response()->json(['message' => 'Module not found'], 404);
        }

        $module->delete();
        return response()->json(['message' => 'Module deleted successfully'], 200);
    }
}
