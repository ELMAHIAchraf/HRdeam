<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\Announcement;
use Illuminate\Http\Request;
use App\Helpers\ResponseHelper;

class AnnouncementController extends Controller
{
    public function getJobs(){
        $announcements = Announcement::with('departement')->get();
        unset($announcements['departement_id']);
        return ResponseHelper::success(null, $announcements, 200);
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user_id=request()->user()->id;
        $announcements = Announcement::where('user_id',$user_id)->with('departement')->get();
        unset($announcements['departement_id']);
        return ResponseHelper::success(null, $announcements, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
           try {
            $validatedData = $request->validate([
                'title' => 'required|string',
                'description' => 'required|string',
                'profile' => 'required|string',
                'departement_id' => 'required|integer',
                'position' => 'required|string',
                'advantages' => 'required|string',
                'salary' => 'required|numeric',
                'user_id' => 'required|integer',
            ]);
            $announcement = Announcement::create($validatedData); 
            $announcement->load('departement');
            return ResponseHelper::success('Announcement created successfully', $announcement, 201);  
           } catch (Exception $e) {
            return ResponseHelper::error($e->getMessage(), 500);
           }    
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $announcement=Announcement::find($id);
        if($announcement){
            return ResponseHelper::success(null, $announcement, 200);
        }else{
            return ResponseHelper::error('Announcement not found', 404);
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
        $announcement=Announcement::find($id);
        if($announcement){
            $announcement->delete();
            return ResponseHelper::success('Announcement deleted successfully', null, 200);
        }else{
            return ResponseHelper::error('Announcement not found', 404);
        }
    }
}
