<?php

use Illuminate\Database\Seeder;

use Illuminate\Support\Facades\DB;

class ModulesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        // $table->string('name')->nullable(false);
        // $table->string('route');
        DB::table('modules')->insert([
            'name' => 'Modelo de prueba',
            'route' => 'Ruta de prueba',
        ]);
    }
}
