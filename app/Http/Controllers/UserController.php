<?php

namespace App\Http\Controllers;

use Error;
use Exception;
use App\Models\User;
use App\Models\Absence;
use App\Helpers\MailHelper;
use App\Models\Departement;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use GuzzleHttp\Psr7\Response;
use Illuminate\Support\Carbon;
use App\Helpers\ResponseHelper;
use App\Helpers\DepartmentHelper;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redis;
use Illuminate\Support\Facades\Storage;


class UserController extends Controller
{
    public function search(){
        try {
            $name = strtolower(request()->input('name'));
            $employees = User::whereHas('roles', function ($query) {
                $query->where('name', 'employee');
            })
            ->where(function ($query) use ($name) {
                $query->whereRaw('LOWER(fname) LIKE ?', ["%{$name}%"])
                      ->orWhereRaw('LOWER(lname) LIKE ?', ["%{$name}%"]);
            })
            ->with(['departement', 'absences' => function ($query) {
                $query->whereMonth('start_date', '=', date('m'))
                      ->whereYear('start_date', '=', date('Y'));
            }])
            ->get();
    
            foreach($employees as $employee){
                $employee->departement->color = DepartmentHelper::getColor($employee->departement->id);
                $employee->avatar = asset("storage/Avatars/{$employee->id}.jpg");
            }
    
            return ResponseHelper::success(null, $employees, 200);
        } catch (Exception $e) {
            return ResponseHelper::error($e->getMessage(), 404);
        }
    }
    


    public function count() 
    {    
        try {
            $count = User::whereHas('roles', function ($query) {
                $query->where('name', 'employee');
            })->count();
            return ResponseHelper::success(null, $count, 200);
        } catch (Exception $e) {
            echo $e->getMessage();
        }
    }
    public function getEmployees() 
    {    
        try {
            $employees = User::whereHas('roles', function ($query) {
                $query->where('name', 'employee');
            })->select('id', 'fname', 'lname')->get();
            return ResponseHelper::success(null, $employees, 200);
        } catch (Exception $e) {
            echo $e->getMessage();
        }
    }

    public function login(Request $request){
        $credentials=$request->validate([
            'email' => ['required', 'email'],
            'password' => ['required', 'min:8']
        ]);
        
        try{
            if(Auth::attempt($credentials)){
                $user=Auth::user();
                $user->avatar=asset("storage/Avatars/".$user->id.".jpg");
                $token=$user->createToken('token')->plainTextToken;
                $user->role = $user->getRoleNames()[0];
                if(count($user->getRoleNames())>1)$user->admin=$user->getRoleNames()[1];
                unset($user->roles);    
                $user->department= $user->departement->name;
                unset($user->departement);
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

    public function changePassword(Request $request){
        $credentials=$request->validate([
            'old_password' => ['required'],
            'new_password' => ['required', 'min:8']
        ]);
        $user = $request->user();
        if(Hash::check($credentials['old_password'], $user->password)){
            $user->password = bcrypt($credentials['new_password']);
            $user->save();
            return ResponseHelper::success('Password changed successfully', null, 200);
        }else{
            return ResponseHelper::error('Invalid Password', 401);
        } 
    }

    /**
     * Display a listing of the resource.
     */
    public function index() 
    {    
        $page = request()->input('page', 1);
        $employees=User::whereHas('roles', function ($query) {
            $query->where('name', 'employee');
        })->with('departement')->paginate(6, ['*'], 'page', $page);

        $count = User::whereHas('roles', function ($query) {
            $query->where('name', 'employee');
        })->count();

        foreach($employees as $employee){
            $employee->departement->color=DepartmentHelper::getColor($employee->departement->id);
            $employee->avatar=asset("storage/Avatars/{$employee->id}.jpg");

            $absences = Absence::where('user_id', $employee->id)
                ->whereMonth('start_date', '=', date('m'))
                ->whereYear('start_date', '=', date('Y'))
                ->get();
            $employee->absences = $absences;
        }
        return ResponseHelper::success(null, ['employees'=>$employees, 'count'=>$count], 200);
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
                    'email' => ['required', 'email', 'unique:users,email'],
                    'avatar' => ['required', 'file', 'mimes:jpeg,jpg,png', 'max:2048']
            ]);
    
            $password=Str::random(10);
            $validatedData['password']=bcrypt($password);
            $validatedData['doj']=now();
            unset($validatedData['avatar']);
    
            $employee=User::create($validatedData);
            $request->file('avatar')->storeAs('public/Avatars', $employee->id.'.jpg');
    
            $employee->avatar=asset("storage/Avatars/".$employee->id.".jpg");
            $employee->assignRole('employee');


            $departement=Departement::find($employee->departement_id);
            $departement->color=DepartmentHelper::getColor($departement->id);
            if($departement){
                $employee->departement=$departement;
            }
            $employee->absences = [];
            $message=Storage::disk('local')->get('Data/WelcomingEmail.txt');
            $message=str_replace('[Fname]', $employee->fname, $message);
            $message=str_replace('[Lname]', $employee->lname, $message);
            $message=str_replace('[Password]', $password, $message);
            MailHelper::sendEmail($employee->email, "Dev's Empire", $message);

            event(new \App\Events\ManageEmployeeEvent("create", "Added a new employee: {$employee->fname} {$employee->lname}", $request->user()->id , $employee));

            return ResponseHelper::success('The employee was created successfully', $employee, 201);

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $employees=User::find($id);
        if($employees){
            $employees->avatar=asset("storage/Avatars/".$employees->id.".jpg");
            return ResponseHelper::success(null, $employees, 200);
        }else{
            return ResponseHelper::error('Employee not found', 404);
        }

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
            $departement_id=Departement::where('name', $request->departement)->first();

            if ($departement_id) {
                $validatedData['departement_id'] = $departement_id->id;
            } else {
                return ResponseHelper::error('The departement was not found', 404);
            }
            $employee->assignRole('employee');
            $employee->update($validatedData);

            $employee->departement->color=DepartmentHelper::getColor($employee->departement->id);
            $employee->avatar=asset("storage/Avatars/".$employee->id.".jpg");

            $absences = Absence::where('user_id', $employee->id)
                ->whereMonth('start_date', '=', date('m'))
                ->whereYear('start_date', '=', date('Y'))
                ->get();
            $employee->absences = $absences;

            event(new \App\Events\ManageEmployeeEvent("update", "Updated the employee profile: {$employee->fname} {$employee->lname}", $request->user()->id , $employee));

            return ResponseHelper::success('The employee was updated successfully', $employee, 200);
        }else{
            return ResponseHelper::error('The employee was not found', 404);
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
            event(new \App\Events\ManageEmployeeEvent("delete", "Deleted the employee: {$employee->fname} {$employee->lname}", $request->user()->id , $employee));
            $employee->delete();
            Storage::disk('local')->delete("public/Avatars/$id.jpg");

            return ResponseHelper::success('The employee was deleted successfully', null, 200);
        }else{
            return ResponseHelper::error('The employee was not found', 404);
        }
    }

//     public function dashboard()
// {
//     $employees = User::whereHas('roles', function ($query) {
//         $query->where('name', 'employee');
//     })->get();

//     $currentMonthAbsenceDays = 0;
//     $previousMonthAbsenceDays = 0;
//     $currentMonthEmployees = 0;
//     $previousMonthEmployees = 0;

//     foreach ($employees as $employee) {
//         $currentMonthAbsences = Absence::where('user_id', $employee->id)
//             ->whereMonth('start_date', '=', date('m'))
//             ->whereYear('start_date', '=', date('Y'))
//             ->get();

//         $currentMonthAbsenceDaysForEmployee = 0;
//         foreach ($currentMonthAbsences as $absence) {
//             $start = Carbon::parse($absence->start_date);
//             $end = Carbon::parse($absence->end_date);
//             $currentMonthAbsenceDaysForEmployee += $start->diffInDays($end);
//         }
//         $currentMonthAbsenceDays += $currentMonthAbsenceDaysForEmployee;
//         $currentMonthEmployees++;

//         $previousMonthAbsences = Absence::where('user_id', $employee->id)
//             ->whereMonth('start_date', '=', date('m', strtotime("-1 month")))
//             ->whereYear('start_date', '=', date('Y', strtotime("-1 month")))
//             ->get();

//         $previousMonthAbsenceDaysForEmployee = 0;
//         foreach ($previousMonthAbsences as $absence) {
//             $start = Carbon::parse($absence->start_date);
//             $end = Carbon::parse($absence->end_date);
//             $previousMonthAbsenceDaysForEmployee += $start->diffInDays($end);
//         }
//         $previousMonthAbsenceDays += $previousMonthAbsenceDaysForEmployee;
//         $previousMonthEmployees++;
//     }

//     $currentMonthAbsenceRate = ($currentMonthAbsenceDays / ($currentMonthEmployees * 30)) * 100;
//     $previousMonthAbsenceRate = ($previousMonthAbsenceDays / ($previousMonthEmployees * 30)) * 100;
//     $absenceRateDifference = $currentMonthAbsenceRate - $previousMonthAbsenceRate;

//     return ResponseHelper::success(null, $absenceRateDifference, 200);
// }
}