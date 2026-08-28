<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Dish extends Model
{
    protected $table = 'dishes';

    protected $fillable = ['name', 'description', 'image_url', 'category_id', 'model_3d_url', 'is_featured'];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }


    public function prices()
    {
        return $this->hasMany(DishPrice::class);
    }
}