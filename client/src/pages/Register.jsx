import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const navigate = useNavigate();

    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
        const res = await axios.post("http://localhost:5000/register", form);
        navigate("/login"); // redirect after registration
        } catch (err) {
            alert("Sign In Failed")
        }
  };

  return (
    <div className='p-6 mt-20 border-t border-b border-gray-600'>
        <h2 className=' text-5xl'>Register</h2>
        <br/>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
            <input
                className="bg-white text-black rounded-2xl text-center mb-3 mt-10"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                required
            />
            <br />
            <input
                className="bg-white text-black rounded-2xl text-center mb-5"
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Password"
                required
            />
            <br />
            <button type="submit" id="btn">Sign In</button>
        </form>
    </div>
  );
}