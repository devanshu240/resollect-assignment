import { useEffect, useState } from "react";
import { getTasks, markTaskComplete, deleteTask } from "../services/task";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

interface Task {
  id: number;
  title: string;
  description: string;
  deadline: string;
  completed: boolean;
  status: string;
}

const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data);
    } catch {
      alert("Session expired. Please login again.");
      navigate("/login");
    }
  };

  const handleComplete = async (id: number) => {
    try {
      await markTaskComplete(id);
      fetchTasks(); // refresh list
    } catch (error) {
      console.error("Failed to mark task complete:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTask(id);
      fetchTasks(); // refresh list
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <Navbar />
      <h2 className="text-2xl font-bold mb-4">Your Tasks</h2>
      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="p-4 border rounded flex justify-between items-center bg-white shadow"
            >
              <div>
                <h3 className="text-lg font-semibold">{task.title}</h3>
                <p>{task.description}</p>
                <p className="text-sm text-gray-500">
                  Deadline: {new Date(task.deadline).toLocaleDateString()}
                </p>
                <p className="text-sm">
                  Status: {task.status === "completed" ? (
                    <span className="text-green-600 font-medium">Completed</span>
                  ) : task.status === "missed" ? (
                    <span className="text-red-600 font-medium">Missed</span>
                  ) : (
                    <span className="text-yellow-600 font-medium">Pending</span>
                  )}
                </p>
              </div>
              <div className="space-x-2">
                {task.status !== "completed" && (
                  <button
                    onClick={() => handleComplete(task.id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                  >
                    Complete
                  </button>
                )}
                <button
                  onClick={() => handleDelete(task.id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
