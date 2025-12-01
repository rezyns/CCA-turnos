<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Service;
use Illuminate\Support\Facades\Validator;

class ServiceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $services = Service::all();
        if ($services->isEmpty()) {
            return response()->json(['message' => 'No services found'], 404);
        }
        return response()->json(['data' => $services], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'word' => 'required|string|max:255',
            'module_id' => 'required|integer|exists:MODULES,id',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'The service could not be created for validation.' ,'errors' => $validator->errors()], 400);
        }

        $service = Service::create([
            'name' => $request->input('name'),
            'word' => $request->input('word'),
            'module_id' => $request->input('module_id'),
        ]);

        if (!$service) {
            return response()->json(['message' => 'Failed to create service'], 500);
        }

        return response()->json(['message' => 'Service created successfully', 'data' => $service], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $service = Service::find($id);
        if (!$service) {
            return response()->json(['message' => 'Service not found'], 404);
        }
        return response()->json(['data' => $service], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $service = Service::find($id);

        if (!$service) {
            return response()->json(['message' => 'Service not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'string|max:255',
            'word' => 'string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['message' => 'The service could not be updated for validation.' ,'errors' => $validator->errors()], 400);
        }

        if ($request->has('name')) {
            $service->name = $request->input('name');
        }

        if ($request->has('word')) {
            $service->word = $request->input('word');
        }

        $service->save();
        return response()->json(['message' => 'Service updated successfully', 'data' => $service], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $service = Service::find($id);
        if (!$service) {
            return response()->json(['message' => 'Service not found'], 404);
        }

        $service->delete();
        return response()->json(['message' => 'Service deleted successfully'], 200);
    }
}
