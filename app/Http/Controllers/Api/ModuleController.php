<?php

namespace App\Http\Controllers\Api;

use App\Module;
use App\Role;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ModuleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $modules = Module::all();
        return response()->json($modules);
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
        return Module::create($request->all());
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
    public function update(Request $request, Module $module)
    {
        $module->update($request->all());

        return response()->json($module, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $module = Module::find($id);

        if($module){
            $module->delete();
            return response('Modulo eliminado', 200)
            ->header('Content-Type', 'text/plain');
        }else{
            return response('Modulo no encontrado', 400)
            ->header('Content-Type', 'text/plain');
        }
    }

    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function moduleRoles($id)
    {
        //
        $module = Module::find($id);
        $moduleRoles = $module->roles;

        return response()->json($moduleRoles);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function addModuleRole($moduleId, $roleId)
    {
        $module = Module::find($moduleId);
        $module->modules()->attach($roleId);
        return response('Rol añadido', 200)
            ->header('Content-Type', 'text/plain');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function deleteModuleRole($moduleId, $roleId)
    {
        $module = Module::find($moduleId);
        $role = Role::find($roleId);
        $module->modules()->detach($role);

        return response('Rol eliminado', 200)
            ->header('Content-Type', 'text/plain');
    }
}
