<?php

namespace App\Http\Controllers;

use App\Helpers\ResponseHelper;
use App\Models\Absence;
use App\Models\User;
use Exception;
use GuzzleHttp\Psr7\Response;
use Illuminate\Http\Request;

class AbsenceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $page = request()->input('page', 1);
            $employees = User::where('role', 'employee')
                ->with(['absences' => function ($query) {
                    $query->whereMonth('start_date', '=', date('m'))
                          ->whereYear('start_date', '=', date('Y'));
                }])
                ->paginate(5, ['*'], 'page', $page);
            
                return ResponseHelper::success(null, $employees, 200);
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
