<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class AnnouncementSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $announcements = [
            [
                'id' => 1,
                'title' => 'IT Support Specialist',
                'description' => 'Providing technical support to users, troubleshooting hardware and software issues, maintaining IT systems.',
                'profile' => '-Bachelor\'s degree in Computer Science or related field, -strong problem-solving skills, excellent communication.',
                'departement_id' => 2,
                'position' => 'Support Specialist',
                'advantages' => 'Health insurance, flexible working hours',
                'salary' => '50000',
                'user_id' => 1,
                'created_at' => now(),
                'updated_at' => null,
            ],
            [
                'id' => 2,
                'title' => 'Software Engineer',
                'description' => 'Developing, testing, and maintaining software applications, collaborating with other team members on projects.',
                'profile' => '-Bachelor\'s degree in Computer Science or equivalent experience,-proficiency in programming languages such as Java, Python, or C++.',
                'departement_id' => 2,
                'position' => 'Software Engineer',
                'advantages' => 'Competitive salary, remote work options',
                'salary' => '80000',
                'user_id' => 1,
                'created_at' => now(),
                'updated_at' => null,
            ],
            [
                'id' => 3,
                'title' => 'Network Administrator',
                'description' => 'Configuring and maintaining network infrastructure, troubleshooting network issues, ensuring network security.',
                'profile' => '-Bachelor\'s degree in Information Technology or related field, -Cisco or CompTIA certification preferred, strong knowledge of TCP/IP and networking protocols.',
                'departement_id' => 2,
                'position' => 'Network Administrator',
                'advantages' => 'Professional development opportunities, company-sponsored training',
                'salary' => '60000',
                'user_id' => 1,
                'created_at' => now(),
                'updated_at' => null,
            ],
            [
                'id' => 4,
                'title' => 'IT Project Manager',
                'description' => 'Leading IT projects from initiation to completion, managing project teams, and ensuring projects meet deadlines and objectives.',
                'profile' => '-Bachelor\'s degree in Computer Science or related field, -project management experience, strong -leadership skills.',
                'departement_id' => 2,
                'position' => 'Project Manager',
                'advantages' => 'Performance bonuses, flexible work environment',
                'salary' => '90000',
                'user_id' => 1,
                'created_at' => now(),
                'updated_at' => null,
            ],
        ];

        DB::table('announcements')->insert($announcements);
    }
}
