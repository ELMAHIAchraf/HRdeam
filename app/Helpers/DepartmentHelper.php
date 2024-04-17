<?php

namespace App\Helpers;
use Illuminate\Support\Facades\Storage;

class DepartmentHelper
{
    public static function getColor($id){
        $jsonData=Storage::disk('local')->get('Json/DepartmentColor.json');
        $jsonData=json_decode($jsonData, true);
        foreach($jsonData as $value){
            if($value['departmentId']==$id){
                return $value['color'];
            }
        }
        return null;
    }
    public static function removeId($id){
        $jsonData=Storage::disk('local')->get('Json/DepartmentColor.json');
        $jsonData=json_decode($jsonData, true);
        foreach($jsonData as $key=>$value){
            if($value['departmentId']==$id){
                $jsonData[$key]['departmentId']=0;
                Storage::disk('local')->put('Json/DepartmentColor.json', json_encode($jsonData, JSON_PRETTY_PRINT));
                return;
            }
        }
        return null;
    }
}