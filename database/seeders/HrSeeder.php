<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;


class HrSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $hr1 = User::create([
            'cin' => 'G737492',
            'fname' => 'Achraf',
            'lname' => 'Elmahi',
            'doj' => '2021-01-01',
            'departement_id' => 1,
            'position' => 'HR Manager',
            'salary' => 1300,
            'phone' => '0658852014',
            'address' => '123 Main St, Springfield, IL 62701',
            'email' => 'elmahi.achraf9@gmail.com',
            'password' => bcrypt('Killer04728'),
        ]);
        $hr1->assignRole('hr', 'admin');

        $hr2 = User::create([
            'cin' => 'G954126',
            'fname' => 'Olivia',
            'lname' => 'Carter',
            'doj' => '2022-03-14',
            'departement_id' => 1,
            'position' => 'HR employee',
            'salary' => 1000,
            'phone' => '0673749270',
            'address' => '123 Oak Street,Springfield, Anytown, USA',
            'email' => 'olivia.carter@gmail.com',
            'password' => bcrypt('Killer04728'),
        ]);
        $hr2->assignRole('hr');

        $hr2 = User::create([
            'cin' => 'G782103',
            'fname' => 'Alexander',
            'lname' => 'Chambers',
            'doj' => '2023-11-21',
            'departement_id' => 1,
            'position' => 'HR employee',
            'salary' => 1100,
            'phone' => '06142578',
            'address' => '456 Maple Avenue, Willowville, Smalltown, USA',
            'email' => 'alexander.chambers@gmail.com',
            'password' => bcrypt('Killer04728'),
        ]);
        $hr2->assignRole('hr');

    }
}
