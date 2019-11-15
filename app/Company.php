<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    protected $fillable = ['nit', 'name', 'address'];

    /**
     * The companies that belong to the user.
     */
    public function companies()
    {
        return $this->belongsToMany('App\Company', 'company_user', 'company_id', 'user_id')->withTimestamps();
    }
}
