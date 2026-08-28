<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Dish;

class DishSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Dish::create([
            'name' => 'Spaghetti Bolognese',
            'description' => 'Classic Italian pasta dish with rich meat sauce.',
            'category_id' => 1,
            
        ]); 

        $dish = Dish::where('name', 'Spaghetti Bolognese')->first();
        $dish->prices()->create(['label' => 'Normal', 'price' => 700]);
    }
}