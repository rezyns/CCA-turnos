<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Shift;
use App\Models\Service;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\JsonResponse;

class ShiftController extends Controller
{

    public function index():JsonResponse
    {
        $shifts = Shift::all();
        return response()->json(['shifts' => $shifts], 200);
    }

    public function addShift(string $service_id):JsonResponse
    {
        $serviceId = intval($service_id);

        $service = Service::where('id', $serviceId)->get(); 

        if($service->isEmpty()) {
            return response()->json(['error' => 'Service not found'], 404);
        }

        $serviceWord = Service::where('id', $serviceId)->value('word');

        if(!$serviceWord) {
            return response()->json(['error' => 'Service word not found'], 404);
        }

        $lastShift = Shift::where('service_id', $serviceId)
        ->orderByRaw('id DESC')
        ->value('shift');

        $nextNumber = 1;

        if ($lastShift) {
            if(preg_match('/(\d+)$/', $lastShift, $matches)) {
                $nextNumber = intval($matches[1]) + 1;
            }
        }

        $newShift = $serviceWord . $nextNumber;

        DB::table('SHIFTS')->insert([ 
            'shift' => $newShift,
            'date' => now(),
            'service_id' => $serviceId,
            'called' => false,
            'called_at' => null
        ]);

        return response()->json(['shift' => $newShift], 201);
    }

    public function callNextShift(string $module_id):JsonResponse
    {
        $nextShift = Shift::whereHas('service', function($query) use ($module_id) {
            $query->where('module_id', $module_id);
        })
        ->where('called', false)
        ->orderBy('id', 'asc')
        ->first();

        if(!$nextShift) {
            return response()->json(['message' => 'No pending shifts'], 200);
        }

        $nextShift->called = true;
        $nextShift->called_at = now();
        $nextShift->save();

        return response()->json(['shift' => $nextShift->shift], 200);
    }

    public function upcomingShifts()
    {
        $nextShift = DB::table('SHIFTS')
        ->leftJoin('SERVICES', 'SHIFTS.service_id', '=', 'SERVICES.id')
        ->where('SHIFTS.called', false)
        ->orderBy('SHIFTS.id', 'asc')
        ->get();

        if($nextShift->isEmpty()) {
            return response()->json(['message' => 'No upcoming shifts'], 200);
        }

        return response()->json(['upcoming_shifts' => $nextShift], 200);
    }
}
