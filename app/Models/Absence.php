<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Absence extends Model
{
    use HasFactory;
    protected $fillable = [
        'type',
        'start_date',
        'end_date',
        'reason',
        'description',
        'user_id'
    ];
    public function user(){
        return $this->belongsTo(User::class);
    }
    protected $hidden = [
        'updated_at',
        'created_at',
    ];
}
