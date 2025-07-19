import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import AddTask from "./pages/AddTask";
import MissingTask from "./pages/MissingTask";
import PendingTask from "./pages/PendingTask";
import CompletedTask from "./pages/CompletedTask";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={<PrivateRoute><Dashboard /></PrivateRoute>}
        />
        <Route path="/add-task" element={<AddTask />} />
        <Route
          path="/missing-tasks"
          element={<PrivateRoute><MissingTask /></PrivateRoute>}
        />
        <Route
          path="/pending-tasks"
          element={<PrivateRoute><PendingTask /></PrivateRoute>}
        />
        <Route
          path="/completed-tasks"
          element={<PrivateRoute><CompletedTask /></PrivateRoute>}
        />
        <Route path="/" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
