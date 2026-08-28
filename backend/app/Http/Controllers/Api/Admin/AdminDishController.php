<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreDishRequest;
use App\Http\Resources\DishResource;
use App\Models\Dish;
use Illuminate\Support\Facades\Storage;

class AdminDishController extends Controller
{

    public function index()
    {
        return DishResource::collection(Dish::with('prices')->get());
    }

    public function show(Dish $dish)
    {
        return new DishResource($dish->load('prices'));
    }

    public function store(StoreDishRequest $request)
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            // asset() transforme le chemin relatif ("/storage/...") en URL absolue
            // ("http://127.0.0.1:8000/storage/...") pour que le frontend (autre origine)
            // puisse charger le fichier correctement.
            $data['image_url'] = asset(
                Storage::url($request->file('image')->store('dishes', 'public'))
            );
        }

        if ($request->hasFile('model_3d')) {
            $data['model_3d_url'] = asset(
                Storage::url($request->file('model_3d')->store('models', 'public'))
            );
        }

        $dish = Dish::create($data);

        foreach ($request->prices as $price) {
            $dish->prices()->create($price);
        }

        return new DishResource($dish->load('prices'));
    }

    public function update(StoreDishRequest $request, Dish $dish)
    {
        $data = $request->validated();

        if ($request->hasFile('image')) {
            $data['image_url'] = asset(
                Storage::url($request->file('image')->store('dishes', 'public'))
            );
        }

        if ($request->hasFile('model_3d')) {
            $data['model_3d_url'] = asset(
                Storage::url($request->file('model_3d')->store('models', 'public'))
            );
        }

        $dish->update($data);

        $dish->prices()->delete();
        foreach ($request->prices as $price) {
            $dish->prices()->create($price);
        }

        return new DishResource($dish->load('prices'));
    }

    public function destroy(Dish $dish)
    {
        $dish->delete();
        return response()->json(['message' => 'Dish deleted']);
    }
}