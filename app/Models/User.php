<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'cin',
        'fname',
        'lname',
        'doj',
        'departement_id',
        'position',
        'salary',
        'phone',
        'address',
        'role_id',
        'email',
        'password',
    ];
    public function departement(){
        return $this->belongsTo(Departement::class, 'departement_id');
    }
    public function absences(){
        return $this->hasMany(Absence::class);
    }
    public function announcements(){
        return $this->hasMany(Announcement::class);
    }
    public function role()
    {
        return $this->belongsTo(Role::class);
    }
    public function hasPermission($permission)
    {
        return $this->role->permissions->contains('name', $permission);
    }
    

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'departement_id',
        'email_verified_at',
        'remember_token',
        'created_at',
        'updated_at'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];
}
