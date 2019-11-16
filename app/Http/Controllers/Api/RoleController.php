<?php

namespace App\Http\Controllers\Api;

use App\Role;
use App\Module;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $roles = Role::all();
        return response()->json($roles);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        return Role::create($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Role $role)
    {
        $role->update($request->all());

        return response()->json($role, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        {
            $role = Role::find($id);
    
            if($role){
                $role->delete();
                return response('Rol eliminado', 200)
                ->header('Content-Type', 'text/plain');
            }else{
                return response('Rol no encontrado', 400)
                ->header('Content-Type', 'text/plain');
            }
        }
    }

        
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function roleModules($id)
    {
        //
        $role = Role::find($id);
        $roleModules = $role->modules;

        return response()->json($roleModules);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function addRoleModule($roleId, $moduleId)
    {
        $role = Role::find($roleId);
        $role->modules()->attach($moduleId);
        return response('Módulo añadido', 200)
            ->header('Content-Type', 'text/plain');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function deleteRoleModule($moduleId, $roleId)
    {
        $role = Role::find($roleId);
        $module = Module::find($moduleId);
        $role->modules()->detach($module);

        return response('Módulo eliminado', 200)
            ->header('Content-Type', 'text/plain');
    }
}
