<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $hrRole = Role::create(['name' => 'hr','guard_name' => 'web']);
        $employeeRole = Role::create(['name' => 'employee','guard_name' => 'web']);

        $commonPermissions = Permission::whereIn('name', [
            'user.index',
            'absence.show',
        ])->get();

        $hrPermissions = Permission::whereIn('name', [
            'user.index',
            'user.store',
            'user.update',
            'user.destroy',
            'user.search',
            'user.count',
            'user.getEmployees',
            'departement.index',
            'departement.store',
            'departement.update',
            'departement.destroy',
            'absence.store',
            'absence.index',
            'absence.show',
            'absence.update',
            'absence.destroy',
            'absence.dashboard',
            'announcement.index',
            'announcement.store',
            'announcement.show',
            'announcement.update',
            'announcement.destroy',
            'applicant.index',
            'applicant.show',
            'applicant.update',
            'applicant.destroy',
            'applicant.onboard',    
            'applicant.changeStatus',
        ])->get();

        $employeePermissions = Permission::whereIn('name', [
            'absence.requestVacation'
        ])->get();  

        $hrRole->givePermissionTo($hrPermissions);
        $hrRole->givePermissionTo($commonPermissions);

        $employeeRole->givePermissionTo($employeePermissions);
        $employeeRole->givePermissionTo($commonPermissions);

    }
}
