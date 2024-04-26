<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Applicant extends Model
{
    use HasFactory;

    protected $fillable = [
        'fname',
        'lname',
        'email',
        'announcement_id'
    ];
    public function announcement()
    {
        return $this->belongsTo(Announcement::class);
    }
    protected $hidden = [
        'updated_at' ,
        'created_at'   
    ];
}
