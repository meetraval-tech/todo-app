<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;

class TodoController extends Controller
{
    public function index()
    {
        return Todo::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required'
        ]);

        return Todo::create([
            'title' => $request->title,
            'completed' => false
        ]);
    }

    public function show($id)
    {
        return Todo::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $todo = Todo::find($id);

        if (!$todo) {
            return response()->json([
                'message' => 'Todo not found'
            ], 404);
        }

        $todo->update([
            'title' => $request->title,
            'completed' => $request->completed
        ]);

        return response()->json([
            'message' => 'Todo updated successfully',
            'data' => $todo
        ]);
    }

    public function destroy($id)
    {
        $todo = Todo::find($id);

        if (!$todo) {
            return response()->json([
                'message' => 'Todo not found'
            ], 404);
        }

        $todo->delete();

        return response()->json([
            'message' => 'Todo deleted successfully'
        ]);
    }
}