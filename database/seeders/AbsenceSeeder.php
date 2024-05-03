<?php

namespace Database\Seeders;

use App\Models\Absence;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class AbsenceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $absences = [
            [
                'id' => 1,
                'type' => 'vacation',
                'start_date' => '2024-05-01',
                'end_date' => '2024-05-05',
                'reason' => 'Annual leave',
                'created_at' => now(),
                'updated_at' => null,
                'user_id' => 2,
                'status' => 'approved'
            ],
            [
                'id' => 2,
                'type' => 'vacation',
                'start_date' => '2024-04-10',
                'end_date' => '2024-04-15',
                'reason' => 'Family trip',
                'created_at' => now(),
                'updated_at' => null,
                'user_id' => 2,
                'status' => 'approved'
            ],
            [
                'id' => 3,
                'type' => 'sick',
                'start_date' => '2024-05-03',
                'end_date' => '2024-05-04',
                'reason' => 'Flu',
                'created_at' => now(),
                'updated_at' => null,
                'user_id' => 2,
                'status' => 'approved'
            ],
            [
                'id' => 4,
                'type' => 'sick',
                'start_date' => '2024-04-12',
                'end_date' => '2024-04-13',
                'reason' => 'Food poisoning',
                'created_at' => now(),
                'updated_at' => null,
                'user_id' => 2,
                'status' => 'approved'
            ],
            [
                'id' => 5,
                'type' => 'personal',
                'start_date' => '2024-04-05',
                'end_date' => '2024-04-06',
                'reason' => 'Professional development',
                'created_at' => now(),
                'updated_at' => null,
                'user_id' => 3,
                'status' => 'approved'
            ],
            [
                'id' => 6,
                'type' => 'personal',
                'start_date' => '2024-04-20',
                'end_date' => '2024-04-21',
                'reason' => 'New technology training',
                'created_at' => now(),
                'updated_at' => null,
                'user_id' => 3,
                'status' => 'approved'
            ],
            [
                'id' => 7,
                'type' => 'vacation',
                'start_date' => '2024-04-08',
                'end_date' => '2024-04-12',
                'reason' => 'Holiday trip',
                'created_at' => now(),
                'updated_at' => null,
                'user_id' => 4,
                'status' => 'approved'
            ],
            [
                'id' => 8,
                'type' => 'vacation',
                'start_date' => '2024-04-25',
                'end_date' => '2024-04-30',
                'reason' => 'Spring break',
                'created_at' => now(),
                'updated_at' => null,
                'user_id' => 4,
                'status' => 'approved'
            ],
            [
                'id' => 9,
                'type' => 'sick',
                'start_date' => '2024-04-06',
                'end_date' => '2024-04-09',
                'reason' => 'Cold',
                'created_at' => now(),
                'updated_at' => null,
                'user_id' => 5,
                'status' => 'approved'
            ],
            [
                'id' => 10,
                'type' => 'sick',
                'start_date' => '2024-04-18',
                'end_date' => '2024-04-19',
                'reason' => 'Fever',
                'created_at' => now(),
                'updated_at' => null,
                'user_id' => 5,
                'status' => 'approved'
            ],
            [
                'id' => 11,
                'type' => 'personal',
                'start_date' => '2024-04-03',
                'end_date' => '2024-04-04',
                'reason' => 'Leadership workshop',
                'created_at' => now(),
                'updated_at' => null,
                'user_id' => 6,
                'status' => 'approved'
            ],
            [
                'id' => 12,
                'type' => 'personal',
                'start_date' => '2024-04-15',
                'end_date' => '2024-04-16',
                'reason' => 'Communication skills',
                'created_at' => now(),
                'updated_at' => null,
                'user_id' => 6,
                'status' => 'approved'
            ],
            [
                'id' => 13,
                'type' => 'vacation',
                'start_date' => '2024-04-10',
                'end_date' => '2024-04-13',
                'reason' => 'City break',
                'created_at' => now(),
                'updated_at' => null,
                'user_id' => 7,
                'status' => 'approved'
            ],
            [
                'id' => 14,
                'type' => 'vacation',
                'start_date' => '2024-03-22',
                'end_date' => '2024-03-25',
                'reason' => 'Beach holiday',
                'created_at' => now(),
                'updated_at' => null,
                'user_id' => 7,
                'status' => 'approved'
            ],
            [
                'id' => 15,
                'type' => 'sick',
                'start_date' => '2024-04-01',
                'end_date' => '2024-04-02',
                'reason' => 'Migraine',
                'created_at' => now(),
                'updated_at' => null,
                'user_id' => 8,
                'status' => 'approved'
            ],
            [
                'id' => 16,
                'type' => 'sick',
                'start_date' => '2024-04-17',
                'end_date' => '2024-04-18',
                'reason' => 'Allergy',
                'created_at' => now(),
                'updated_at' => null,
                'user_id' => 8,
                'status' => 'approved'
            ],
            [
                'id' => 17,
                'type' => 'personal',
                'start_date' => '2024-04-08',
                'end_date' => '2024-04-10',
                'reason' => 'Software training',
                'created_at' => now(),
                'updated_at' => null,
                'user_id' => 9,
                'status' => 'approved'
            ],
            [
                'id' => 18,
                'type' => 'personal',
                'start_date' => '2024-04-22',
                'end_date' => '2024-04-23',
                'reason' => 'Project management',
                'created_at' => now(),
                'updated_at' => null,
                'user_id' => 9,
                'status' => 'approved'
            ],
            [
                'id' => 19,
                'type' => 'vacation',
                'start_date' => '2024-04-15',
                'end_date' => '2024-04-20',
                'reason' => 'Mountain retreat',
                'created_at' => now(),
                'updated_at' => null,                'user_id' => 10,
                                'status' => 'approved'

            ],
            [
                'id' => 20,
                'type' => 'vacation',
                'start_date' => '2024-04-27',
                'end_date' => '2024-04-28',
                'reason' => 'Camping trip',
                'created_at' => now(),
                'updated_at' => null,                'user_id' => 10,
                                'status' => 'approved'

            ],
        ];

        DB::table('absences')->insert($absences);

    }
}
