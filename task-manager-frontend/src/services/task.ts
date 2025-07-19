import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";
const API_URL = `${BASE_URL}/api/tasks/`;

// ✅ Create Task
export const createTask = async (task: {
  title: string;
  description: string;
  deadline: string;
}) => {
  const token = localStorage.getItem("access");
  const res = await fetch(`${API_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(task),
  });

  if (!res.ok) throw new Error("Error creating task");
  return await res.json();
};

// ✅ Get Tasks
export const getTasks = async () => {
  const res = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    },
  });
  return res.data.results || res.data; // if paginated
};

// ✅ Mark Task as Complete
export const markTaskComplete = async (id: number) => {
  await axios.post(
    `${API_URL}${id}/mark_complete/`,
    {},
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    }
  );
};

// ✅ Delete Task
export const deleteTask = async (id: number) => {
  await axios.delete(`${API_URL}${id}/`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    },
  });
};

// ✅ Get Missing Tasks
export const getMissingTasks = async () => {
  const res = await axios.get(`${API_URL}?status=missed`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    },
  });
  return res.data.results || res.data;
};

// ✅ Get Pending Tasks
export const getPendingTasks = async () => {
  const res = await axios.get(`${API_URL}?status=upcoming`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    },
  });
  return res.data.results || res.data;
};

// ✅ Get Completed Tasks
export const getCompletedTasks = async () => {
  const res = await axios.get(`${API_URL}?status=completed`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
    },
  });
  return res.data.results || res.data;
};
