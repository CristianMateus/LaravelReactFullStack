<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Module extends Model
{
    protected $fillable = ['name', 'route'];

    /**
     * The modules that belong to the role.
     */
    // public function roleModules()
    // {
    //     return $this->belongsToMany('App\Role', 'role_module', 'module_id', 'role_id')->withTimestamps();
    // }
}
