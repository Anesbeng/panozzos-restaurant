<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DishResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
   public function toArray(Request $request): array
{
    return [
        'id' => $this->id,
        'name' => $this->name,
        'description' => $this->description,
        'image_url' => $this->image_url,
        'model_3d_url' => $this->model_3d_url,
        'category_id' => $this->category_id,
        'prices' => $this->prices->map(function ($price) {
            return [
                'label' => $price->label,
                'price' => $price->price,
            ];
        }),
    ];
}
}