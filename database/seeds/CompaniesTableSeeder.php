<?php

use Illuminate\Database\Seeder;

use Illuminate\Support\Facades\DB;

class CompaniesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        // $table->integer('nit')->length(10)->nullable(false)->unique()->unsigned();
        // $table->string('name')->nullable(false);
        // $table->string('address')->nullable((false));
        DB::table('companies')->insert([
            'nit' => 1234567890,
            'name' => 'Compañia de prueba',
            'address' => 'Direccion prueb',
        ]);
    }
}
