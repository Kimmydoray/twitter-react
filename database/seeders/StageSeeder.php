<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        \DB::table('stages')->insert(
            [
                'stage' => "1",
                'target_number' => 0,
                'stage_number' => 0
            ]
        );
        \DB::table('stages')->insert(
            [
                'stage' => "2",
                'target_number' => 1,
                'stage_number' => 10
            ]
        );
        \DB::table('stages')->insert(
            [
                'stage' => "3",
                'target_number' => 4,
                'stage_number' => 15
            ]
        );
        \DB::table('stages')->insert(
            [
                'stage' => "4",
                'target_number' => 6,
                'stage_number' => 10
            ]
        );
        \DB::table('stages')->insert(
            [
                'stage' => "5",
                'target_number' => 8,
                'stage_number' => 10
            ]
        );
    }
}
