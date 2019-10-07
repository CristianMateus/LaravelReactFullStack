<?php

use Illuminate\Database\Seeder;

use Illuminate\Support\Facades\DB;

use Carbon\Carbon;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //
        // $table->integer('personalId')->nullable(false)->unique()->unsigned();
        // $table->string('name')->nullable(false);
        // $table->date('date');
        // $table->string('email');
        // $table->integer('phone');
        DB::table('users')->insert([
            'personalId' => 111,
            'name' => 'Usuario de prueba',
            'date' => Carbon::create('2000', '01', '01'),
            'email' => 'prueba@correo.com',
            'phone' => 320
        ]);
    }
}
