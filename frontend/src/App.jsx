import React, { useState } from "react";

// Use environment variable (works locally and in Docker)
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3901";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  // Update input fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setError("");

    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Something went wrong!");

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("❌ Error sending message:", err);
      setStatus("error");
      setError("Failed to send message. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Contact Us</h1>

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.group}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="John Doe"
            style={styles.input}
          />
        </div>

        <div style={styles.group}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="john@example.com"
            style={styles.input}
          />
        </div>

        <div style={styles.group}>
          <label>Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="Write your message here..."
            style={styles.textarea}
          />
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          style={{
            ...styles.button,
            opacity: status === "loading" ? 0.6 : 1,
          }}
        >
          {status === "loading" ? "Sending..." : "Send Message"}
        </button>

        {status === "success" && (
          <p style={{ color: "green", marginTop: 10 }}>✅ Message sent!</p>
        )}
        {status === "error" && (
          <p style={{ color: "red", marginTop: 10 }}>{error}</p>
        )}
      </form>
    </div>
  );
}

// 💅 Inline styles (simple and clean)
const styles = {
  container: {
    maxWidth: "500px",
    margin: "80px auto",
    padding: "20px",
    background: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    fontFamily: "Arial, sans-serif",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  group: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "16px",
  },
  textarea: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "6px",
    fontSize: "16px",
    minHeight: "100px",
  },
  button: {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "6px",
    padding: "10px",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default App;
