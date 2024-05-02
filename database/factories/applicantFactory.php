<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\applicant>
 */
class applicantFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'fname' => $this->faker->firstName,
            'lname' => $this->faker->lastName,
            'email' => $this->faker->unique()->safeEmail,
            'status' => $this->faker->randomElement(['Applied', 'Interviewed', 'Made offer', 'Hired']),
            'announcement_id' => $this->faker->numberBetween(1, 4),
        ];
    }
}
