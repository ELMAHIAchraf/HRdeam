<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'cin' => $this->faker->unique()->randomNumber(8), 
            'fname' => $this->faker->firstName(),
            'lname' => $this->faker->lastName(),
            'doj' => $this->faker->date(),
            'departement_id' => 2,
            'position' => $this->faker->jobTitle(),
            'salary' => $this->faker->numberBetween(1000, 5000),
            'phone' => $this->faker->phoneNumber(),
            'address' => $this->faker->address(),
            'role' => 'employee',
            'email' => $this->faker->unique()->safeEmail(),
            'password' => bcrypt('Killer04728'),
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }
}
