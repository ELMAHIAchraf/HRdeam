<?php

namespace App\Http\Controllers;

use PDO;
use Exception;
use App\Events\ActionEvent;

use App\Models\Departement;
use Illuminate\Http\Request;
use GuzzleHttp\Psr7\Response;
use App\Helpers\ResponseHelper;
use App\Helpers\DepartmentHelper;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class DepartementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
   

     public function index()
     {
         $departments = Departement::withCount('users as total_employees')->get();
     
         foreach($departments as $department){
             $department->color = DepartmentHelper::getColor($department->id);
         }
     
         return ResponseHelper::success(null, $departments, 200);
     }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'name'=>['required', 'min:2']
            ]);
            $departement = Departement::create([
                'name' => $validatedData['name']
            ]);

            $jsonData=Storage::disk('local')->get('Data/DepartmentColor.json');
            $jsonData=json_decode($jsonData, true);
            $color=0;
            foreach($jsonData as $key=>$item){    
                if($item['departmentId']==0){
                    $jsonData[$key]['departmentId']=$departement->id;
                    $departement->color=$item['color'];
                    $color=$item['color'];
                    Storage::disk('local')->put('Data/DepartmentColor.json', json_encode($jsonData, JSON_PRETTY_PRINT));
                    break;
                }
            }
            event(new \App\Events\ManageDepartmentEvent("create", "Created a new department named {$departement->name}", $request->user()->id, $departement, $color));            
            return ResponseHelper::success('The department was created successfully', $departement, 201);
        }catch(Exception $e){
            return ResponseHelper::error($e->getMessage(), 500);
        }
    }
    

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $departement=Departement::find($id);
        if($departement){
            return ResponseHelper::success(null, $departement, 200);
        }else{
            return ResponseHelper::error('The department was not found', 404);
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
    public function destroy(Request $request, string $id)
    {
        if($id == '1') { 
            return ResponseHelper::error('You cannot delete the HR department', 403);
        }

        $departement=Departement::find($id);
        if($departement){
            $departement->delete();
            DepartmentHelper::removeId($id);
            event(new \App\Events\ManageDepartmentEvent("delete", "Deleted  the {$departement->name} departement", $request->user()->id, $departement->id, null));            
            return ResponseHelper::success('The department was deleted successfully', null, 200);
        }else{
            return ResponseHelper::error('The department was not found', 404);
        }
    }
}