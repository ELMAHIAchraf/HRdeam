<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Departement extends Model
{
    use HasFactory;
    protected $fillable = [
        'name'
    ];
    public function users(){
        return $this->hasMany(User::class);
    }
    function announcements(){
        return $this->hasMany(Announcement::class);
    }
    protected $hidden = [
        'updated_at',
        'created_at',
    ];

}
