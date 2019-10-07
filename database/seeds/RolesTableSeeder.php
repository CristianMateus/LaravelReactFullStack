<?php

use Illuminate\Database\Seeder;

use Illuminate\Support\Facades\DB;

class RolesTableSeeder extends Seeder
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
        DB::table('roles')->insert([
            'name' => 'Rol de prueba',
        ]);
    }
}
