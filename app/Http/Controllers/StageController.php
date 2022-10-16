<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Stage;

class StageController extends Controller
{
    public function index() 
    {

        $stage = Stage::all();

        // return "hello";
        return response()->json($stage);
    }

    /**
     * Get stage by ID
     */
    public function stageById(Request $request)
    {
        $stage = Stage::firstWhere('id', $request->id);

        return $stage;
    }

    /**
     * Udpate stage
     */
    public function update(Request $request)
    {
        $error = '';
        $success = false;
        try {
            $result = Stage::where('id', $request->id)
            ->update([
                'stage_number' => $request->stage_number,
                'target_number' => $request->target_number
            ]);
            $success = true;
        } catch(\Exception $e) {
            $error = $e->getMessage();
            return response()->json($error, 422);
        }
        
        $data = [
            'error' => $error,
            'success' => $success
        ];
        
        return response()->json($data, 200);
    }

}
