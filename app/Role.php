<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    protected $fillable = ['name'];
    
    /**
     * The modules that belong to the role.
     */
    public function modules()
    {
        return $this->belongsToMany('App\Module', 'role_module', 'role_id', 'module_id')->withTimestamps();
    }
}
