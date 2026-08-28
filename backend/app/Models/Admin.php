<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Admin extends Model
{
    protected $table = 'admins';
    use HasApiTokens;

    protected $fillable = [
        'name',
        'email',
        'password',
    ];
}