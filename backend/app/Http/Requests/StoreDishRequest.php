<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreDishRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'category_id' => 'required|exists:categories,id',
            'image' => 'nullable|image|max:4096',
            'is_featured' => 'boolean',
            'prices' => 'required|array|min:1',
            'prices.*.label' => 'required|string|max:10',
            'prices.*.price' => 'required|numeric|min:0',
            'model_3d' => 'nullable|file|extensions:glb|max:102400',
        ];
    }
}