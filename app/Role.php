<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    protected $fillable = ['name'];

    /**
     * The users that belong to the role.
     * Primero es la llave que pertenece al modelo role_id
     * Segundo es la llave foránea user_id
     */
    public function roles()
    {
        return $this->belongsToMany('App\Role', 'user_role', 'role_id', 'user_id')->withTimestamps();
    }
    
    /**
     * The modules that belong to the role.
     */
    public function modules()
    {
        return $this->belongsToMany('App\Module', 'role_module', 'role_id', 'module_id')->withTimestamps();
    }
}
