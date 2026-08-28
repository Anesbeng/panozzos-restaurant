<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DishPrice extends Model
{
    protected $table = 'dish_prices';

    protected $fillable = ['price', 'dish_id', 'label'];
    protected $casts = [
        'price' => 'integer',
    ];

    public function dish()
    {
        return $this->belongsTo(Dish::class);
    }
}