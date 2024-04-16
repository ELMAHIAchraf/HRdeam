<?php

namespace App\Http\Controllers;

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
                return response()->json([
                    'message'=>'You are now logged in',
                    'data'=>[
                        'user'=>$user,
                        'token'=>$token
                    ]
                    ], 200);
            }else{
                return response()->json([
                    'message'=>"Invalid email or password"
                ], 401);
            }
        }catch(Exception $e){
            return response()->json([
                'success'=>false,
                'message'=>$e->getMessage()
            ], 500);
        }
    }

    public function logout(Request $request){
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return response()->json([
            'message' => 'Successfully logged out',
        ], 200);
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
