import { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
const API = "https://todo-app-9zh6.onrender.com";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [filter, setFilter] = useState("all");
  // GET todos
  const fetchTodos = async () => {
    const res = await axios.get(API);
    setTodos(res.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // ADD todo
  const addTodo = async () => {
    if (!title) return;

    await axios.post(API, {
      title,
      completed: false,
    });
    toast.success("Todo added!");

    setTitle("");
    fetchTodos();
  };
  // Edit todo
  const updateTodo = async (id) => {
    await axios.put(`${API}/${id}`, {
      
      title: editTitle,
      completed: false,
    });
 toast.success("Updated!");
    setEditingId(null);
    setEditTitle("");
    fetchTodos();
  };

  // DELETE todo
  const deleteTodo = async (id) => {
    await axios.delete(`${API}/${id}`);
    toast.error("Todo deleted!");
    fetchTodos();
  };

  // TOGGLE complete
  const toggleTodo = async (todo) => {
    await axios.put(`${API}/${todo.id}`, {
      title: todo.title,
      completed: !todo.completed,
    });

    fetchTodos();
  };
  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          My Tasks
        </h1>

        {/* Input Section */}
        <div className="flex gap-2 mb-6">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter todo..."
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            onClick={addTodo}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
          >
            Add
          </button>
        </div>
        <div className="flex gap-2 mb-4 justify-center">
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1 rounded ${
              filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            All
          </button>

          <button
            onClick={() => setFilter("active")}
            className={`px-3 py-1 rounded ${
              filter === "active" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Active
          </button>

          <button
            onClick={() => setFilter("completed")}
            className={`px-3 py-1 rounded ${
              filter === "completed" ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Completed
          </button>
        </div>
        {/* Todo List */}
        <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
          {todos.length === 0 && (
            <div className="text-center py-10 text-gray-400">
              <p className="text-lg">No tasks yet</p>
              <p className="text-sm">Add your first task 🚀</p>
            </div>
          )}

          {filteredTodos.map((todo) => (
            <div
              key={todo.id}
              className="flex items-center justify-between bg-gray-50 border rounded-lg p-3 hover:shadow-md transition"
            >
              {/* LEFT SIDE */}
              <div className="flex items-center gap-3 flex-1">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo)}
                  className="w-5 h-5 accent-purple-600"
                />

                {/* EDIT MODE */}
                {editingId === todo.id ? (
                  <input
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="border px-2 py-1 rounded w-full"
                  />
                ) : (
                  <span
                    className={`text-gray-700 ${
                      todo.completed ? "line-through text-gray-400" : ""
                    }`}
                  >
                    {todo.title}
                  </span>
                )}
              </div>

              {/* RIGHT SIDE BUTTONS */}
              <div className="flex gap-2">
                {/* EDIT / SAVE BUTTON */}
                {editingId === todo.id ? (
                  <button
                    onClick={() => updateTodo(todo.id)}
                    className="text-green-600 text-sm hover:bg-green-100 px-2 py-1 rounded"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setEditingId(todo.id);
                      setEditTitle(todo.title);
                    }}
                    className="text-blue-600 text-sm hover:bg-blue-100 px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                )}

                {/* DELETE */}
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-red-500 text-sm hover:bg-red-100 px-2 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}
export default App;
