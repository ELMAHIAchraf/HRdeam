<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Announcement extends Model
{
    use HasFactory;
    protected $fillable = [
        'title',
        'description',
        'profile',
        'departement_id',
        'position',
        'advantages',
        'salary',
        'user_id'
    ];
    public function user(){
        return $this->belongsTo(User::class);
    }
    public function applicants()
    {
        return $this->hasMany(Applicant::class);
    }
    public function departement(){
        return $this->belongsTo(Departement::class);
    }
    protected $hidden = [
        'updated_at',
        'departement_id',
   
    ];
}
