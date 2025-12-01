<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Service extends Model
{
    protected $table = 'SERVICES'; 
    protected $primaryKey = 'id';            
    public $timestamps = false;  

    protected $fillable = ['name', 'word', 'module_id'];

    public function module(): BelongsTo
    {
        return $this->belongsTo(Module::class, 'module_id');
    }

}
