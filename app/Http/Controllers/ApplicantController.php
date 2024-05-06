<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\User;
use App\Models\Applicant;
use App\Helpers\MailHelper;
use App\Models\Departement;
use Illuminate\Support\Str;
use App\Models\Announcement;
use Illuminate\Http\Request;

use App\Helpers\ResponseHelper;
use App\Helpers\DepartmentHelper;
use Illuminate\Support\Facades\App;
use function PHPUnit\Framework\isEmpty;
use Illuminate\Support\Facades\Storage;

class ApplicantController extends Controller
{

    public function changeStatus(Request $request)
    {
        try {
        $status=['Applied', 'Interviewed', 'Made offer', 'Hired'];
        $id = $request->input('id');
        $applicant = Applicant::find($id);
        if ($applicant) {
            $key = array_search($applicant->status, $status);
            $applicant->status = $status[$key+1];
            $applicant->save();
            return ResponseHelper::success('Applicant successfully moved to the next stage', $applicant, 200);
        } else {
            return ResponseHelper::error('The applicant was not found', 404);
        }
        } catch (Exception $e) {
            return ResponseHelper::error($e->getMessage(), 500);
        }
    }
    public function onboard(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'id' => 'required|integer',
                'cin' => 'required|string',
                'address' => 'required|string|min:10',
                'phone' => 'required|string',
                'salary' => 'required|string',
                'avatar' => 'required|image|mimes:jpg|max:2048',
            ]);
            
            $applicant = Applicant::with(['announcement.departement'])
            ->find($validatedData['id']);

            $password=Str::random(10);
                $validatedData['password']=bcrypt($password);
                $validatedData['role']='employee';
                $validatedData['doj']=now();
                unset($validatedData['avatar']);
                
            if ($applicant && $applicant->status == 'Hired') {
                $employee = User::create([
                    'fname' => $applicant->fname,
                    'lname' => $applicant->lname,
                    'email' => $applicant->email,
                    'position' => $applicant->announcement->position,
                    'cin' => $validatedData['cin'],
                    'address' => $validatedData['address'],
                    'phone' => $validatedData['phone'],
                    'salary' => $validatedData['salary'],
                    'password' => $validatedData['password'],
                    'doj' => $validatedData['doj'],
                    'departement_id' => $applicant->announcement->departement_id,

                ]);
                $employee->assignRole('employee');
                $request->file('avatar')->storeAs('public/Avatars', $employee->id.'.jpg');

                Storage::disk('local')->delete("public/Resumes/$applicant->id.pdf");
                $applicant->delete();


                $departement=Departement::find($employee->departement_id);
                $departement->color=DepartmentHelper::getColor($departement->id);
                if($departement){
                    $employee->departement=$departement;
                }
            
                $message=Storage::disk('local')->get('Data/WelcomingEmail.txt');
                $message=str_replace('[Fname]', $employee->fname, $message);
                $message=str_replace('[Lname]', $employee->lname, $message);
                $message=str_replace('[Password]', $password, $message);
                MailHelper::sendEmail($employee->email, "Dev's Empire", $message);

                return ResponseHelper::success('Applicant successfully onboarded', $applicant, 200);
            } else {
                return ResponseHelper::error('The applicant was not found', 404);
            }
        } catch (Exception $e) {
            return ResponseHelper::error($e->getMessage(), 500);
        }
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $user_id=request()->user()->id;
            $applicants = Applicant::with(['announcement' => function ($query) {
                $query->select('id', 'position', 'departement_id')
                      ->with(['departement' => function ($query) {
                          $query->select('id', 'name');
                      }]);
            }])->whereHas('announcement', function ($query) use ($user_id) {
                $query->whereHas('user', function ($query) use ($user_id) {
                    $query->where('id', $user_id);
                });
            })->get();
            foreach ($applicants as $applicant) {
                unset($applicant->announcement_id);
            }        
            return ResponseHelper::success(null, $applicants, 200);
        } catch (Exception $e) {
            return ResponseHelper::error($e->getMessage(), 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'announcement_id' => 'required|integer',
            'fname' => 'required|string',
            'lname' => 'required|string',
            'email' => 'required|email',
            'resume'=> 'required|mimes:pdf|max:5000'
        ]);
        try {
            
            $applicant = Applicant::where('announcement_id', $validatedData['announcement_id'])
                                  ->where('email', $validatedData['email'])
                                  ->first();
            if(is_null($applicant)){
                $applicant = Applicant::create($validatedData);
                $request->file('resume')->storeAs('public/Resumes', $applicant->id.'.pdf');
                unset($applicant->resume);
                return ResponseHelper::success('Your application has been submitted successfully', $applicant, 201);

            }
                return ResponseHelper::error('You have already applied for this job', 400);       
        } catch (Exception $e) {
            return ResponseHelper::error($e->getMessage(), 500);
        }
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
    public function destroy(Request $request, string $id)
    {
        $applicant = Applicant::find($id);
        if ($applicant) {
            Storage::delete('public/Resumes/'.$applicant->id.'.pdf');
            $applicant->delete();
            return ResponseHelper::success('The applicant was deleted successfully', null, 200);
        } else {
            return ResponseHelper::error('The applicant was not found', 404);
        }
        
    }
}
