<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Admin;
use Illuminate\Support\Facades\Hash;

Admin::create([
    'name' => 'Admin',
    'email' => 'admin10@gmail.com',
    'password' => Hash::make('Admin123456'),
]);