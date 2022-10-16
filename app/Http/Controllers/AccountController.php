<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\TwitterAccount;
use App\Models\Hashtag;

class AccountController extends Controller
{
    public function index()
    {
        $account = TwitterAccount::first();
        $hashtag = Hashtag::first();

        $data = [
            'account_id' => '',
            'hashtag' => ''
        ];
        if(isset($account)) {
            $data['account_id'] = $account->account_id;
        }
        if(isset($hashtag)) {
            $data['hashtag'] = $hashtag->hashtag;
        }
    
        // return "hello";
        return response()->json($data);
    }

    /**
     * Update account
     */
    public function update(Request $request)
    {
        $error = '';
        $success = false;
        try {
            $result = TwitterAccount::where('id', 1)
            ->update([
                'account_id' => $request->account_id
            ]);
            $result = Hashtag::where('id', 1)
            ->update([
                'hashtag' => $request->hashtag
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
