import { useState } from "react";

function App() {
  const [form, setForm] = useState({
    email: "",
    city: "",
    frequency: "daily",
  });
  const [status, setStatus] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://56.228.26.197/weatherapi.app/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.status);
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <div style={{ padding: 30 }}>
      <h2>Subscribe to Weather</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        /><br /><br />
        <input
          type="text"
          name="city"
          placeholder="City"
          value={form.city}
          onChange={handleChange}
          required
        /><br /><br />
        <select name="frequency" value={form.frequency} onChange={handleChange}>
          <option value="daily">Daily</option>
          <option value="hourly">Hourly</option>
        </select><br /><br />
        <button type="submit">Subscribe</button>
      </form>
      {status && <p>Status: {status}</p>}
    </div>
  );
}

export default App;
