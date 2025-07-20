import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/register/", {
        username,
        email,
        password,
      });
      alert("Registration successful. Please login.");
      navigate("/login");
    } catch (error) {
      alert("Registration failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-green-300 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 border border-green-100 flex flex-col">
        <h2 className="text-3xl font-extrabold text-center text-green-700 mb-8">Register</h2>
        <form onSubmit={handleRegister} className="space-y-6">
          <input
            type="text"
            placeholder="Username"
            className="w-full border border-green-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-green-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border border-green-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold p-3 rounded-lg transition text-lg shadow"
          >
            Register
          </button>
          <p className="text-center text-sm mt-4 text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-green-700 hover:underline font-semibold">Login here</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
