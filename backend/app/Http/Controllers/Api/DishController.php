<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Dish;
use App\Http\Resources\DishResource;

class DishController extends Controller
{
   public function index()
{
    $dishes = Dish::with('prices')->get();
    return DishResource::collection($dishes);
}
public function show(Dish $dish)
{
    return new DishResource($dish->load('prices'));
}
}