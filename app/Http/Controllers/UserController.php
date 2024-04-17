<?php

namespace App\Http\Controllers;

use App\Helpers\ResponseHelper;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{

    public function login(Request $request){
        $credentials=$request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'min:8']
        ]);
        
        try{
            if(Auth::attempt($credentials)){
                $user=Auth::user();
                $user->avatar=asset("Avatars/".$user->id.".jpg");
                $token=$user->createToken('hr_token')->plainTextToken;
                return ResponseHelper::success('You are now logged in', [
                    'user' => $user,
                    'token' => $token
                ], 200);
            }else{
                return ResponseHelper::error('Invalid credentials', 401);
            }
        }catch(Exception $e){
            return response()->json([
                'message'=>$e->getMessage()
            ], 500);
        }
    }

    public function logout(Request $request){
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return ResponseHelper::success('You are now logged out', null, 200);
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
