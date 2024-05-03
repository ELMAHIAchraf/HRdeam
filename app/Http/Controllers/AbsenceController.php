<?php

namespace App\Http\Controllers;

use App\Helpers\ResponseHelper;
use App\Models\Absence;
use App\Models\Departement;
use App\Models\User;
use Carbon\Carbon;
use Exception;
use GuzzleHttp\Psr7\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AbsenceController extends Controller
{


    public function dashboard(){

        $employees = User::whereHas('roles', function ($query) {
            $query->where('name', 'employee');
        })->get();
        
        foreach ($employees as $employee) {
            $currentMonthAbsences = Absence::where('user_id', $employee->id)
                ->whereMonth('start_date', '=', date('m'))
                ->whereYear('start_date', '=', date('Y'))
                ->get();
        
            $currentMonthAbsenceDays = 0;
            foreach ($currentMonthAbsences as $absence) {
                $start = Carbon::parse($absence->start_date);
                $end = Carbon::parse($absence->end_date);
                $currentMonthAbsenceDays += $start->diffInDays($end);
            }
        
            $previousMonthAbsences = Absence::where('user_id', $employee->id)
                ->whereMonth('start_date', '=', date('m', strtotime("-1 month")))
                ->whereYear('start_date', '=', date('Y', strtotime("-1 month")))
                ->get();
        
            $previousMonthAbsenceDays = 0;
            foreach ($previousMonthAbsences as $absence) {
                $start = Carbon::parse($absence->start_date);
                $end = Carbon::parse($absence->end_date);
                $previousMonthAbsenceDays += $start->diffInDays($end);
            }
        
            $employeeAbsenceData[] = [
                'employee_id' => $employee->id,
                'salary' => $employee->salary,
                'current_month_absence_days' => $currentMonthAbsenceDays,
                'previous_month_absence_days' => $previousMonthAbsenceDays,
            ];

            $currentMonthAbsenceRate=0;
            $lastMonthAbsenceRate=0;
            $currentMonthAbsenceHours=0;
            $lastMonthAbsenceHours=0;
            $currentMonthAbsenceCost=0;
            $lastMonthAbsenceCost=0;
            foreach($employeeAbsenceData as $data){
                $currentMonthAbsenceRate+=$data['current_month_absence_days']/count($employeeAbsenceData)*100;
                $lastMonthAbsenceRate+=$data['previous_month_absence_days']/count($employeeAbsenceData)*100;
                $currentMonthAbsenceHours+=$data['current_month_absence_days']*8;
                $lastMonthAbsenceHours+=$data['previous_month_absence_days']*8;
                $currentMonthAbsenceCost+=$data['current_month_absence_days']*$data['salary'];
                $lastMonthAbsenceCost+=$data['previous_month_absence_days']*$data['salary'];
            }
            $absenceRate=$currentMonthAbsenceRate-$lastMonthAbsenceRate;
            $absenceHours=$currentMonthAbsenceHours-$lastMonthAbsenceHours;
            $absenceCost=$currentMonthAbsenceCost-$lastMonthAbsenceCost;

            $response=[
                'absenceRate'=>$absenceRate,
                'absenceHours'=>$absenceHours,
                'absenceCost'=>$absenceCost
            ];
            
        }   


        return ResponseHelper::success(null, $response, 200);
        
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $page = request()->input('page', 1);
            $employees = User::whereHas('roles', function ($query) {
                $query->where('name', 'employee');
            })
            ->with(['absences' => function ($query) {
                    $query->whereMonth('start_date', '=', date('m'))
                          ->whereYear('start_date', '=', date('Y'))
                          ->where('status', 'approved');
                }])
                ->paginate(5, ['*'], 'page', $page);

                $absentCount = User::whereHas('roles', function ($query) {
                    $query->where('name', 'employee');
                })
                ->whereHas('absences', function ($query) {
                    $query->whereMonth('start_date', '=', date('m'))
                          ->whereYear('start_date', '=', date('Y'));
                })
                ->count();
            
                return ResponseHelper::success(null, ["employees"=>$employees, "absentCount"=> $absentCount], 200);

        } catch (Exception $e) {
            return ResponseHelper::error($e->getMessage(), 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'type' => 'required|string',
                'start_date' => 'required|date',
                'end_date' => 'required|date',
                'reason' => 'required|string',
                'attachment' => 'required|file|mimes:pdf',
                'user_id' => 'required|integer'
            ]);
            unset($validated['attachement']);
            $validated['status']='approved';
            $absence=Absence::create($validated);
            $request->file('attachment')->storeAs('public/Attachments', $absence->id.'.pdf');
            return ResponseHelper::success('Absence has been successfully added', $absence, 201);
        } catch (Exception $e) {
            return ResponseHelper::error($e->getMessage(), 500);
        }

    }
    public function requestVacation(Request $request){
        try {
            $validated = $request->validate([
                'type' => 'required|string',
                'start_date' => 'required|date',
                'end_date' => 'required|date',
                'reason' => 'required|string',
                'attachment' => 'required|file|mimes:pdf',
                'user_id' => 'required|integer'
            ]);
            unset($validated['attachement']);
            $absence=Absence::create($validated);
            $request->file('attachment')->storeAs('public/Attachments', $absence->id.'.pdf');
            return ResponseHelper::success('Absence has been successfully added', $absence, 201);
        } catch (Exception $e) {
            return ResponseHelper::error($e->getMessage(), 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $absences = Absence::where('user_id', $id)
            ->where('start_date', '>=', date('Y-01-01')) 
            ->where('end_date', '<=', date('Y-12-31'))
            ->get();
        return ResponseHelper::success(null, $absences, 200);
        } catch (Exception $e) {
            return ResponseHelper::error($e->getMessage(), 500);
        }
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
