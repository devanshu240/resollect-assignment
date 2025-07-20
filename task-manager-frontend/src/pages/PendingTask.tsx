import { useEffect, useState } from "react";
import { getPendingTasks } from "../services/task";
import { useNavigate } from "react-router-dom";

interface Task {
  id: number;
  title: string;
  description?: string;
  deadline: string;
}

const PendingTask = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getPendingTasks();
        setTasks(data);
      } catch {
        setError("Failed to fetch pending tasks.");
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-100 to-yellow-300">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 border border-yellow-100 flex flex-col">
        <h2 className="text-3xl font-extrabold text-center text-yellow-700 mb-6">Pending Tasks</h2>
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : tasks.length === 0 ? (
          <p className="text-center text-gray-600 mb-4">You currently have no pending tasks!</p>
        ) : (
          <ul className="space-y-4 mb-6">
            {tasks.map((task) => (
              <li key={task.id} className="p-4 border rounded bg-yellow-50">
                <h3 className="font-bold text-lg text-yellow-700">{task.title}</h3>
                <p className="text-gray-700">{task.description}</p>
                <p className="text-xs text-gray-500">Deadline: {new Date(task.deadline).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        )}
        <button
          onClick={() => navigate('/dashboard')}
          className="mt-auto bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded transition"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default PendingTask; 