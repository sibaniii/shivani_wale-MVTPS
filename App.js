import React, { useState } from "react";
import "./App.css";

function App() {
  const [mode, setMode] = useState("login"); // "login" | "register" | "admin" | "operator" | "analyst"

  const [role, setRole] = useState("admin");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  const [loggedInUser, setLoggedInUser] = useState(null); // { username, role }
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const resetMessages = () => {
    setIsError(false);
    setMessage("");
  };

  const handleLogin = async () => {
    resetMessages();
    setIsLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, role }),
      });

      const data = await res.json();

      if (!res.ok) {
        setIsError(true);
        setMessage(data.detail || "Login failed");
      } else {
        // Save tokens
        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);

        const userInfo = {
          username: data.user.username,
          role: data.role,
        };
        setLoggedInUser(userInfo);

        // Switch dashboard based on role
        if (data.role === "admin") {
          setMode("admin");
        } else if (data.role === "operator") {
          setMode("operator");
        } else if (data.role === "analyst") {
          setMode("analyst");
        } else {
          setIsError(true);
          setMessage("Unknown role returned from server.");
        }
      }
    } catch (err) {
      setIsError(true);
      setMessage("Network error. Check if backend server is running.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = () => {
    resetMessages();

    if (!username || !password || !confirmPassword) {
      setIsError(true);
      setMessage("Please fill all required fields.");
      return;
    }

    if (password !== confirmPassword) {
      setIsError(true);
      setMessage("Passwords do not match.");
      return;
    }

    console.log("Register data (mock):", { username, email, role });
    setIsError(false);
    setMessage(
      `Registered (mock) as ${username} with role ${role}. Backend will be wired later.`
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setLoggedInUser(null);
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setEmail("");
    setRole("admin");
    resetMessages();
    setMode("login");
  };

  const renderRoleSelect = () => (
    <>
      <label className="label">Role</label>
      <select
        className="input"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option value="admin">Admin</option>
        <option value="operator">Operator</option>
        <option value="analyst">Analyst</option>
      </select>
    </>
  );

  const renderLoginForm = () => (
    <>
      {renderRoleSelect()}

      <label className="label">Username</label>
      <input
        className="input"
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <label className="label">Password</label>
      <input
        className="input"
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="login-btn"
        onClick={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? "Logging in..." : "Login"}
      </button>

      <p className="switch-text">
        Don’t have an account?{" "}
        <span
          className="link"
          onClick={() => {
            resetMessages();
            setMode("register");
          }}
        >
          Register
        </span>
      </p>
    </>
  );

  const renderRegisterForm = () => (
    <>
      {renderRoleSelect()}

      <label className="label">Username</label>
      <input
        className="input"
        type="text"
        placeholder="Choose username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <label className="label">Email (optional)</label>
      <input
        className="input"
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label className="label">Password</label>
      <input
        className="input"
        type="password"
        placeholder="Create password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <label className="label">Confirm Password</label>
      <input
        className="input"
        type="password"
        placeholder="Confirm password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <button className="login-btn" onClick={handleRegister}>
        Register
      </button>

      <p className="switch-text">
        Already have an account?{" "}
        <span
          className="link"
          onClick={() => {
            resetMessages();
            setMode("login");
          }}
        >
          Login
        </span>
      </p>
    </>
  );

  // Shared top bar for dashboards
  const DashboardShell = ({ title, subtitle, children }) => (
    <div className="admin-page">
      <header className="admin-header">
        <div>
          <h1 className="admin-title">{title}</h1>
          <p className="admin-subtitle">{subtitle}</p>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </header>
      <div className="admin-content">{children}</div>
    </div>
  );

  // --- ADMIN DASHBOARD ---
  const AdminDashboard = () => (
    <DashboardShell
      title="Hello, welcome back"
      subtitle={
        <>
          Admin <strong>{loggedInUser?.username || "admin"}</strong>
        </>
      }
    >
      <div className="admin-panel">
        <h2>Vessel Control Panel</h2>

        <div className="panel-section">
          <h3>Vessel Filters</h3>
          <label className="label">Vessel Name / ID</label>
          <input
            className="input"
            type="text"
            placeholder="Search vessel..."
          />
          <label className="label">Status</label>
          <select className="input">
            <option>All</option>
            <option>In Port</option>
            <option>At Sea</option>
            <option>Delayed</option>
          </select>
          <button className="primary-btn">Apply Filters</button>
        </div>

        <div className="panel-section">
          <h3>Alerts & Notifications</h3>
          <ul className="admin-list">
            <li>• Vessel VS-101 delayed at Port A.</li>
            <li>• Weather warning in Zone 3.</li>
            <li>• New voyage request pending approval.</li>
          </ul>
          <button className="secondary-btn">View All Events</button>
        </div>
      </div>

      <div className="admin-map">
        <h2>Live Vessel Map (demo)</h2>
        <div className="map-box">
          <div className="map-vessel" style={{ top: "20%", left: "30%" }}>
            VS-101
          </div>
          <div className="map-vessel" style={{ top: "50%", left: "60%" }}>
            VS-204
          </div>
          <div className="map-vessel" style={{ top: "70%", left: "20%" }}>
            VS-330
          </div>
          <p className="map-caption">
            Static demo map – real tracking will come from backend later.
          </p>
        </div>
      </div>
    </DashboardShell>
  );

  // --- OPERATOR DASHBOARD ---
  const OperatorDashboard = () => (
    <DashboardShell
      title="Operator Console"
      subtitle={
        <>
          Operator <strong>{loggedInUser?.username || "operator"}</strong>
        </>
      }
    >
      <div className="admin-panel">
        <h2>Live Queue & Tasks</h2>

        <div className="panel-section">
          <h3>Assigned Vessels</h3>
          <ul className="admin-list">
            <li>• VS-101 – Boarding in 15 min.</li>
            <li>• VS-204 – Docking complete, start unloading.</li>
            <li>• VS-330 – Waiting at anchorage.</li>
          </ul>
          <button className="primary-btn">Mark Current Task Done</button>
        </div>

        <div className="panel-section">
          <h3>Quick Actions</h3>
          <button className="secondary-btn">Create Incident Report</button>
          <button className="secondary-btn">Request Extra Staff</button>
        </div>
      </div>

      <div className="admin-map">
        <h2>Operations Timeline (demo)</h2>
        <div className="timeline-box">
          <div className="timeline-row">
            <span className="timeline-time">08:30</span>
            <span className="timeline-label green">VS-101 Boarding</span>
          </div>
          <div className="timeline-row">
            <span className="timeline-time">09:00</span>
            <span className="timeline-label orange">VS-204 Unloading</span>
          </div>
          <div className="timeline-row">
            <span className="timeline-time">09:30</span>
            <span className="timeline-label blue">VS-330 Inspection</span>
          </div>
          <p className="map-caption">
            Static operator schedule – later will be filled from database.
          </p>
        </div>
      </div>
    </DashboardShell>
  );

  // --- ANALYST DASHBOARD ---
  const AnalystDashboard = () => (
    <DashboardShell
      title="Analytics Overview"
      subtitle={
        <>
          Analyst <strong>{loggedInUser?.username || "analyst"}</strong>
        </>
      }
    >
      <div className="admin-panel">
        <h2>KPIs (demo)</h2>

        <div className="kpi-grid">
          <div className="kpi-card">
            <div className="kpi-label">Vessels Today</div>
            <div className="kpi-value">27</div>
            <div className="kpi-trend">▲ 8% vs yesterday</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-label">Avg. Turnaround</div>
            <div className="kpi-value">3.4 h</div>
            <div className="kpi-trend">▼ 0.3 h vs last week</div>
          </div>
          <div className="kpi-card">
            <div className="kpi-label">Delay Incidents</div>
            <div className="kpi-value">4</div>
            <div className="kpi-trend">▲ 1 vs target</div>
          </div>
        </div>

        <div className="panel-section">
          <h3>Filters</h3>
          <label className="label">Date Range</label>
          <select className="input">
            <option>Today</option>
            <option>Last 7 days</option>
            <option>Last 30 days</option>
          </select>

          <label className="label">Port / Terminal</label>
          <input
            className="input"
            type="text"
            placeholder="All terminals"
          />

          <button className="primary-btn">Run Analysis</button>
        </div>
      </div>

      <div className="admin-map">
        <h2>Traffic Trend (demo)</h2>
        <div className="chart-box">
          <div className="chart-bar" style={{ height: "35%" }}>
            <span>Mon</span>
          </div>
          <div className="chart-bar" style={{ height: "60%" }}>
            <span>Tue</span>
          </div>
          <div className="chart-bar" style={{ height: "80%" }}>
            <span>Wed</span>
          </div>
          <div className="chart-bar" style={{ height: "50%" }}>
            <span>Thu</span>
          </div>
          <div className="chart-bar" style={{ height: "70%" }}>
            <span>Fri</span>
          </div>
          <p className="map-caption">
            Fake bar chart – later replace with real data from SQLite.
          </p>
        </div>
      </div>
    </DashboardShell>
  );

  let content;
  if (mode === "login") {
    content = (
      <div className="page">
        <div className="login-box">
          <h2 className="title">Login</h2>
          {renderLoginForm()}
          {message && (
            <p className={isError ? "error" : "success"}>{message}</p>
          )}
        </div>
      </div>
    );
  } else if (mode === "register") {
    content = (
      <div className="page">
        <div className="login-box">
          <h2 className="title">Register</h2>
          {renderRegisterForm()}
          {message && (
            <p className={isError ? "error" : "success"}>{message}</p>
          )}
        </div>
      </div>
    );
  } else if (mode === "admin") {
    content = <AdminDashboard />;
  } else if (mode === "operator") {
    content = <OperatorDashboard />;
  } else if (mode === "analyst") {
    content = <AnalystDashboard />;
  }

  return content;
}

export default App;
