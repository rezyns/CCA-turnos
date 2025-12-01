<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Module extends Model
{
    protected $table = 'MODULES'; 
    protected $primaryKey = 'id';            
    public $timestamps = false;  

    protected $fillable = ['name', 'role'];

    public function services(): HasMany
    {
        return $this->hasMany(Service::class, 'module_id');
    }
}
