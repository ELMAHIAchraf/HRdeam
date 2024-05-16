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
                'reason' => 'Taking an annual leave for a family reunion and some personal relaxation time.',
                'created_at' => now(),
                'updated_at' => null,
                'user_id' => 3,
                'status' => 'pending',
                'review' => null,
                'hr_id' => null
            ],
            [
                'id' => 2,
                'type' => 'vacation',
                'start_date' => '2024-04-10',
                'end_date' => '2024-04-15',
                'reason' => 'Going on a family trip to explore historical sites and spend quality time together.',
                'created_at' => now(),
                'updated_at' => null,
                'user_id' => 3,
                'status' => 'approved',
                'review' => 'Enjoy your trip!',
                'hr_id' => null
            ],
            [
                'id' => 3,
                'type' => 'sick',
                'start_date' => '2024-05-03',
                'end_date' => '2024-05-04',
                'reason' => 'Caught the flu and need time to recover and avoid spreading it to colleagues.',
                'created_at' => now(),
                'updated_at' => null,
                'user_id' => 4,
                'status' => 'pending',
                'review' => null,
                'hr_id' => null
            ],
            [
                'id' => 4,
                'type' => 'sick',
                'start_date' => '2024-04-12',
                'end_date' => '2024-04-13',
                'reason' => 'Suffered from food poisoning, likely due to some contaminated food. Need time to recover and ensure I\'m not contagious before returning to work.',
                'created_at' => now(),
                'updated_at' => null,
                'user_id' => 4,
                'status' => 'approved',
                'review' => 'Get well soon!',
                'hr_id' => null
            ],
            [
                'id' => 5,
                'type' => 'personal',
                'start_date' => '2024-04-05',
                'end_date' => '2024-04-06',
                'reason' => 'Attending a professional development workshop to enhance my skills and knowledge.',
                'created_at' => now(),
                'updated_at' => null,
                'user_id' => 5,
                'status' => 'in process',
                'review' => null,
                'hr_id' => 1
            ],
            [
                'id' => 6,
                'type' => 'personal',
                'start_date' => '2024-04-20',
                'end_date' => '2024-04-21',
                'reason' => 'Attending a training session on new technology trends to stay updated and improve my skills.',
                'created_at' => now(),
                'updated_at' => null,
                'user_id' => 5,
                'status' => 'approved',
                'review' => 'Enjoy the workshop!',
                'hr_id' => null
            ],
            [
                'id' => 7,
                'type' => 'vacation',
                'start_date' => '2024-04-08',
                'end_date' => '2024-04-12',
                'reason' => 'Taking a holiday trip to a beach resort for some relaxation and family time.',
                'created_at' => now(),
                'updated_at' => null,
                'user_id' => 6,
                'status' => 'in process',
                'review' => null,
                'hr_id' => 2
            ],
            [
                'id' => 8,
                'type' => 'vacation',
                'start_date' => '2024-04-25',
                'end_date' => '2024-04-30',
                'reason' => 'Taking time off during the spring break to spend time with family and enjoy the season.',
                'created_at' => now(),
                'updated_at' => null,
                'user_id' => 6,
                'status' => 'pending',
                'review' => null,
                'hr_id' => null
            ],
            [
                'id' => 9,
                'type' => 'sick',
                'start_date' => '2024-04-06',
                'end_date' => '2024-04-09',
                'reason' => 'Caught a cold due to weather changes. Need time to recover and avoid spreading it to colleagues.',
                'created_at' => now(),
                'updated_at' => null,
                'user_id' => 7,
                'status' => 'approved',
                'review' => 'Take care and get well soon!',
                'hr_id' => null
            ],
            [
                'id' => 10,
                'type' => 'sick',
                'start_date' => '2024-04-18',
                'end_date' => '2024-04-19',
                'reason' => 'Running a high fever and doctor advised complete rest for quick recovery.',
                'created_at' => now(),
                'updated_at' => null,
                'user_id' => 7,
                'status' => 'pending',
                'review' => null,
                'hr_id' => null
            ],
            [
                'id' => 11,
                'type' => 'personal',
                'start_date' => '2024-04-03',
                'end_date' => '2024-04-04',
                'reason' => 'Attending a leadership workshop to enhance my managerial skills and team coordination.',
                'created_at' => now(),
                'updated_at' => null,
                'user_id' => 7,
                'status' => 'approved',
                'review' => 'Enjoy the workshop!',
                'hr_id' => null
            ],
            [
                'id' => 12,
                'type' => 'personal',
                'start_date' => '2024-04-15',
                'end_date' => '2024-04-16',
                'reason' => 'Participating in a communication skills seminar to improve my interpersonal and presentation skills.',
                'created_at' => now(),
                'updated_at' => null,
                'user_id' => 8,
                'status' => 'approved',
                'review' => 'Best of luck with the seminar!',
                'hr_id' => null
            ],
            [
                'id' => 13,
                'type' => 'vacation',
                'start_date' => '2024-04-10',
                'end_date' => '2024-04-13',
                'reason' => 'Taking a short city break to explore cultural landmarks and enjoy some leisure time.',
                'created_at' => now(),
                'updated_at' => null,
                'user_id' => 8,
                'status' => 'approved',
                'review' => 'Have a great time!',
                'hr_id' => null
            ],
            [
                'id' => 14,
                'type' => 'vacation',
                'start_date' => '2024-03-22',
                'end_date' => '2024-03-25',
                'reason' => 'Going on a beach holiday to enjoy the sun, sea, and sand with family.',
                'created_at' => now(),
                'updated_at' => null,
                'user_id' => 9,
                'status' => 'approved',
                'review' => 'Have a wonderful vacation!',
                'hr_id' => null
            ],
            [
                'id' => 15,
                'type' => 'sick',
                'start_date' => '2024-04-01',
                'end_date' => '2024-04-02',
                'reason' => 'Suffering from a severe migraine attack, need rest and a calm environment for recovery',
                'created_at' => now(),
                'updated_at' => null,
                'user_id' => 9,
                'status' => 'approved',
                'review' => 'Take care and get well soon!',
                'hr_id' => null
            ],
            [
                'id' => 16,
                'type' => 'sick',
                'start_date' => '2024-04-17',
                'end_date' => '2024-04-18',
                'reason' => 'Experiencing an allergy outbreak, possibly due to seasonal changes. Need time to recover.',
                'created_at' => now(),
                'updated_at' => null,
                'user_id' => 10,
                'status' => 'approved',
                'review' => 'Take care and get well soon!',
                'hr_id' => null
            ],
            [
                'id' => 17,
                'type' => 'personal',
                'start_date' => '2024-04-08',
                'end_date' => '2024-04-10',
                'reason' => 'Attending a software training program to learn about the latest tools and technologies in our field.',
                'created_at' => now(),
                'updated_at' => null,
                'user_id' => 10,
                'status' => 'approved',
                'review' => 'Enjoy the training program!',
                'hr_id' => null
            ],
            [
                'id' => 18,
                'type' => 'personal',
                'start_date' => '2024-04-22',
                'end_date' => '2024-04-23',
                'reason' => 'Participating in a project management course to improve my planning and execution skills.',
                'created_at' => now(),
                'updated_at' => null,
                'user_id' => 11,
                'status' => 'approved',
                'review' => 'Best of luck with the course!',
                'hr_id' => null
            ],
            [
                'id' => 19,
                'type' => 'vacation',
                'start_date' => '2024-04-15',
                'end_date' => '2024-04-20',
                'reason' => 'Planning a mountain retreat for some adventure and to enjoy nature’s tranquility.',
                'created_at' => now(),
                'updated_at' => null,                
                'user_id' => 12,  
                'status' => 'approved',
                'review' => 'Have a great time!',
                'hr_id' => null

            ],
            [
                'id' => 20,
                'type' => 'vacation',
                'start_date' => '2024-04-27',
                'end_date' => '2024-04-28',
                'reason' => 'Going on a camping trip to enjoy outdoor activities and strengthen team bonding.',
                'created_at' => now(),
                'updated_at' => null,                
                'user_id' => 12,
                'status' => 'in process',
                'review' => null,
                'hr_id' => 2

            ],
            [
                'id' => 21,
                'type' => 'vacation',
                'start_date' => '2024-05-10',
                'end_date' => '2024-05-16',
                'reason' => 'Planning a road trip to explore new destinations and experience different cultures.',
                'created_at' => now(),
                'updated_at' => null,
                'user_id' => 4,
                'status' => 'rejected',
                'review' => 'High workload during the requested period.',
                'hr_id' => null
            ]
        ];

        DB::table('absences')->insert($absences);

    }
}
