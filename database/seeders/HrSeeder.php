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
        $user = User::create([
            'cin' => 'G737492',
            'fname' => 'Achraf',
            'lname' => 'Elmahi',
            'doj' => '2021-01-01',
            'departement_id' => 1,
            'position' => 'HR Manager',
            'salary' => 1200,
            'phone' => '0658852014',
            'address' => '123 Main St, Springfield, IL 62701',
            'email' => 'elmahi.achraf9@gmail.com',
            'password' => bcrypt('Killer04728'),
        ]);
        $user->assignRole('hr');
    }
}
