<?php

namespace Database\Seeders;

use App\Models\Departement;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DepartementSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Departement::create(['name' => 'IT']);
        Departement::create(['name' => 'Finance']);
        Departement::create(['name' => 'Human Resources']);
    }
}
