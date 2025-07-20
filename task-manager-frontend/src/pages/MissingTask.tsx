import { useEffect, useState } from "react";
import { getMissingTasks } from "../services/task";

interface Task {
  id: number;
  title: string;
  description?: string;
  deadline: string;
}

const MissingTask = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getMissingTasks();
        setTasks(data);
      } catch {
        setError("Failed to fetch missing tasks.");
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-100 to-red-300">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 border border-red-100 flex flex-col">
        <h2 className="text-3xl font-extrabold text-center text-red-700 mb-6">Missing Tasks</h2>
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : tasks.length === 0 ? (
          <p className="text-center text-gray-600 mb-4">You currently have no missing tasks!</p>
        ) : (
          <ul className="space-y-4 mb-6">
            {tasks.map((task) => (
              <li key={task.id} className="p-4 border rounded bg-red-50">
                <h3 className="font-bold text-lg text-red-700">{task.title}</h3>
                <p className="text-gray-700">{task.description}</p>
                <p className="text-xs text-gray-500">Deadline: {new Date(task.deadline).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        )}
        <button
          onClick={() => window.location.href = '/dashboard'}
          className="mt-auto bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default MissingTask; 