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
    public function addShift(string $service_id):JsonResponse
    {
        $serviceId = intval($service_id);

        $service = Service::where('id', $serviceId)->get(); // QUERY: select * from SERVICES where id = $serviceId

        if($service->isEmpty()) {
            return response()->json(['error' => 'Service not found'], 404);
        }

        $serviceWord = Service::where('id', $serviceId)->value('word'); // QUERY: select word from SERVICES where id = $serviceId

        if(!$serviceWord) {
            return response()->json(['error' => 'Service word not found'], 404);
        }

        $lastShift = Shift::where('service_id', $serviceId) // QUERY: select shift from SHIFTS where service_id = $serviceId order by id desc limit 1
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

    public function callNextShift(){
        $nextShift = Shift::where('called', false) // QUERY: select * from SHIFTS where called = false order by id asc limit 1
        ->orderByRaw('id ASC')
        ->first();

        if(!$nextShift) {
            return response()->json(['message' => 'No pending shifts'], 200);
        }

        $nextShift->called = true;
        $nextShift->called_at = now();
        $nextShift->save();

        return response()->json(['shift' => $nextShift->shift], 200);
    }

    public function upcomingShifts(){
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
