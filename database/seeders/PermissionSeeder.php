<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Permission::create(['name' => 'departement.index', 'guard_name' => 'web']);
        Permission::create(['name' => 'departement.store', 'guard_name' => 'web']);
        Permission::create(['name' => 'departement.show', 'guard_name' => 'web']);
        Permission::create(['name' => 'departement.update', 'guard_name' => 'web']);
        Permission::create(['name' => 'departement.destroy', 'guard_name' => 'web']);
        

        Permission::create(['name' => 'user.index', 'guard_name' => 'web']);
        Permission::create(['name' => 'user.show', 'guard_name' => 'web']);
        Permission::create(['name' => 'user.store', 'guard_name' => 'web']);
        Permission::create(['name' => 'user.update', 'guard_name' => 'web']);
        Permission::create(['name' => 'user.destroy', 'guard_name' => 'web']);
        Permission::create(['name' => 'user.search', 'guard_name' => 'web']);
        Permission::create(['name' => 'user.count', 'guard_name' => 'web']);
        Permission::create(['name' => 'user.getEmployees', 'guard_name' => 'web']);

        Permission::create(['name' => 'hr.index', 'guard_name' => 'web']);
        Permission::create(['name' => 'hr.store', 'guard_name' => 'web']);
        Permission::create(['name' => 'hr.show', 'guard_name' => 'web']);
        Permission::create(['name' => 'hr.update', 'guard_name' => 'web']);
        Permission::create(['name' => 'hr.destroy', 'guard_name' => 'web']);

        Permission::create(['name' => 'absence.dashboard', 'guard_name' => 'web']);
        Permission::create(['name' => 'absence.index', 'guard_name' => 'web']);
        Permission::create(['name' => 'absence.store', 'guard_name' => 'web']);
        Permission::create(['name' => 'absence.show', 'guard_name' => 'web']);
        Permission::create(['name' => 'absence.update', 'guard_name' => 'web']);
        Permission::create(['name' => 'absence.destroy', 'guard_name' => 'web']);
        Permission::create(['name' => 'absence.getVacationRequests', 'guard_name' => 'web']);
        Permission::create(['name' => 'absence.requestVacation', 'guard_name' => 'web']);
        Permission::create(['name' => 'absence.vacationRequestReview', 'guard_name' => 'web']);
        Permission::create(['name' => 'absence.assignVacationRequest', 'guard_name' => 'web']);

        Permission::create(['name' => 'announcement.index', 'guard_name' => 'web']);
        Permission::create(['name' => 'announcement.store', 'guard_name' => 'web']);
        Permission::create(['name' => 'announcement.show', 'guard_name' => 'web']);
        Permission::create(['name' => 'announcement.update', 'guard_name' => 'web']);
        Permission::create(['name' => 'announcement.destroy', 'guard_name' => 'web']);

        Permission::create(['name' => 'applicant.index', 'guard_name' => 'web']);
        Permission::create(['name' => 'applicant.show', 'guard_name' => 'web']);
        Permission::create(['name' => 'applicant.update', 'guard_name' => 'web']);
        Permission::create(['name' => 'applicant.destroy', 'guard_name' => 'web']);
        Permission::create(['name' => 'applicant.onboard', 'guard_name' => 'web']);
        Permission::create(['name' => 'applicant.changeStatus', 'guard_name' => 'web']);




    }
}
