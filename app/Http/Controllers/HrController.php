<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\User;
use App\Models\Absence;
use App\Helpers\MailHelper;
use App\Models\Departement;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Helpers\ResponseHelper;
use App\Helpers\DepartmentHelper;
use Illuminate\Support\Facades\Storage;

class HrController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $hrs=User::whereHas('roles', function ($query) {
            $query->where('name', 'hr');
        })->where('id','!=',$request->user()->id)->get();       
        return ResponseHelper::success(null, $hrs, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
            $validatedData=$request->validate([
                    'cin' => ['required', 'min:7'],
                    'fname' => ['required', 'min:3'],
                    'lname' => ['required', 'min:3'],
                    'departement_id' => ['required'],
                    'position' => ['required'],
                    'salary' => ['required', 'numeric'],
                    'phone' => ['required'],
                    'address' => ['required', 'min:10'],
                    'email' => ['required', 'email'],
                    'avatar' => ['required', 'file', 'mimes:jpeg,jpg,png', 'max:2048']
            ]);
    
            $password=Str::random(10);
            $validatedData['password']=bcrypt($password);
            $validatedData['doj']=now();
            unset($validatedData['avatar']);
    
            $employee=User::create($validatedData);
            $request->file('avatar')->storeAs('public/Avatars', $employee->id.'.jpg');
    
            $employee->avatar=asset("storage/Avatars/".$employee->id.".jpg");
            $employee->assignRole('hr');

            $message=Storage::disk('local')->get('Data/WelcomingEmail.txt');
            $message=str_replace('[Fname]', $employee->fname, $message);
            $message=str_replace('[Lname]', $employee->lname, $message);
            $message=str_replace('[Password]', $password, $message);
            MailHelper::sendEmail($employee->email, "Dev's Empire", $message);

            return ResponseHelper::success('The HR was created successfully', $employee, 201);

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
       try {
        $employee=User::find($id);
        if($employee){
            $validatedData=$request->validate([
                'cin' => ['required', 'min:7'],
                'fname' => ['required', 'min:3'],
                'lname' => ['required', 'min:3'],
                'departement' => ['required'],
                'position' => ['required'],
                'salary' => ['required', 'numeric'],
                'phone' => ['required'],
                'address' => ['required', 'min:10'],
                'email' => ['required', 'email'],
            ]);

            $employee->assignRole('hr');
            $employee->update($validatedData);

            $employee->departement->color=DepartmentHelper::getColor($employee->departement->id);
            $employee->avatar=asset("storage/Avatars/".$employee->id.".jpg");


            return ResponseHelper::success('The HR was updated successfully', $employee, 200);
        }else{
            return ResponseHelper::error('The HR was not found', 404);
        }
       } catch (Exception $e) {
            return ResponseHelper::error($e->getMessage(), 404);

       }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, string $id)
    {
        $employee=User::find($id);
        if($employee){
            $employee->delete();
            Storage::disk('local')->delete("public/Avatars/$id.jpg");

            return ResponseHelper::success('The HR was deleted successfully', null, 200);
        }else{
            return ResponseHelper::error('The HR was not found', 404);
        }
    }
}
