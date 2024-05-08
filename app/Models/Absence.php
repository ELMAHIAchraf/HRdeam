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
        'created_at',
        'user_id',
        'hr_id',
        'status',
        'review'
    ];
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    
    public function hr()
    {
        return $this->belongsTo(User::class, 'hr_id');
    }
    protected $hidden = [
        'updated_at'
    ];
}
