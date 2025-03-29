import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', subject: '' });

  const fetchStudents = async () => {
    const res = await fetch('http://localhost:5000/api/students');
    const data = await res.json();
    setStudents(data);
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.subject) return;

    await fetch('http://localhost:5000/api/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    setForm({ name: '', email: '', subject: '' });
    fetchStudents();
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/students/${id}`, {
      method: 'DELETE',
    });
    fetchStudents();
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">
        📚 <strong>BrainBase - Student Manager</strong>
      </h1>

      <form onSubmit={handleSubmit} className="row g-2 mb-4">
        <div className="col-md-3">
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="form-control"
            value={form.name}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-3">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="form-control"
            value={form.email}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-4">
          <input
            type="text"
            name="subject"
            placeholder="Favorite Subject"
            className="form-control"
            value={form.subject}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-2">
          <button className="btn btn-primary w-100">Add</button>
        </div>
      </form>

      <h4>All Students</h4>
      <ul className="list-group">
        {students.map((student) => (
          <li key={student.id} className="list-group-item d-flex justify-content-between align-items-center">
            <span>
              <strong>{student.name}</strong> ({student.email}) - Likes {student.subject}
            </span>
            <button className="btn btn-danger btn-sm" onClick={() => handleDelete(student.id)}>
              🗑 Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
