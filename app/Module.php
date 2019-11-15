<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Module extends Model
{
    protected $fillable = ['name', 'route'];

    /**
     * The modules that belong to the role.
     */
    public function modules()
    {
        return $this->belongsToMany('App\Role', 'role_module', 'module_id', 'role_id')->withTimestamps();
    }
}
