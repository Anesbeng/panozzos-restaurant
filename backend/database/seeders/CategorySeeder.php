<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
       Category::create(['name' => 'Pizza']);
Category::create(['name' => 'Tacos']);
Category::create(['name' => 'Panozzo']);
Category::create(['name' => 'Burger']);
Category::create(['name' => 'Crêpes']);
Category::create(['name' => 'Entrées']);
Category::create(['name' => 'Omelettes']);
    }
}