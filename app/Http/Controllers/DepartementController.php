<?php

namespace App\Http\Controllers;

use PDO;
use Exception;
use App\Models\Departement;
use Illuminate\Http\Request;

use GuzzleHttp\Psr7\Response;
use App\Helpers\ResponseHelper;
use App\Helpers\DepartmentHelper;
use Illuminate\Support\Facades\Storage;

class DepartementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
   

    public function index()
    {
        $departements=Departement::all();
       
        foreach($departements as $value){
            $value->color=DepartmentHelper::getColor($value->id);
        }
        return ResponseHelper::success(null, $departements, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name'=>['required', 'min:2']
        ]);
        try {
        $departement=Departement::create([
            'name'=>$validatedData['name']
        ]);

        $jsonData=Storage::disk('local')->get('Json/DepartmentColor.json');
        $jsonData=json_decode($jsonData, true);

        foreach($jsonData as $key=>$item){
            if($item['departmentId']==0){
                $jsonData[$key]['departmentId']=$departement->id;
                $departement->color=$item['color'];
                Storage::disk('local')->put('Json/DepartmentColor.json', json_encode($jsonData, JSON_PRETTY_PRINT));
                break;
            }
        }
            return ResponseHelper::success('The department was created successfully', $departement, 201);
        }catch(Exception $e){
            return ResponseHelper::error("Failed to create a department", 500);
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
        if($id == '1') { 
            return ResponseHelper::error('You cannot delete the HR department', 403);
        }

        $departement=Departement::find($id);
        if($departement){
            $departement->delete();
            DepartmentHelper::removeId($id);
            return ResponseHelper::success('The department was deleted successfully', null, 200);
        }else{
            return ResponseHelper::error('The department was not found', 404);
        }
    }
}