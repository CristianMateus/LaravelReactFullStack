<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $fillable = ['personalId', 'name', 'email', 'phone'];

    /**
     * The roles that belong to the user.
     */
    public function roles()
    {
        return $this->belongsToMany('App\Role', 'user_role', 'user_id', 'role_id')->withTimestamps();
    }
    /**
     * The companies that belong to the user.
     */
    public function companies()
    {
        return $this->belongsToMany('App\Company', 'company_user', 'user_id', 'company_id')->withTimestamps();
    }
}
