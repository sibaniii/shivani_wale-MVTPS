import React from "react";

function VesselSearchPanel({
  filters,
  onChange,
  onClear,
}) {
  return (
    <div className="panel-section">
      <h3>Vessel Search & Filters</h3>

      <label className="label">Name / ID</label>
      <input
        className="input"
        type="text"
        placeholder="e.g. VS-101 or Ocean Star"
        value={filters.query}
        onChange={(e) => onChange({ ...filters, query: e.target.value })}
      />

      <label className="label">Type</label>
      <select
        className="input"
        value={filters.type}
        onChange={(e) => onChange({ ...filters, type: e.target.value })}
      >
        <option value="">All</option>
        <option value="Container">Container</option>
        <option value="Tanker">Tanker</option>
        <option value="Passenger">Passenger</option>
      </select>

      <label className="label">Flag</label>
      <select
        className="input"
        value={filters.flag}
        onChange={(e) => onChange({ ...filters, flag: e.target.value })}
      >
        <option value="">All</option>
        <option value="IN">India</option>
        <option value="SG">Singapore</option>
        <option value="US">USA</option>
      </select>

      <label className="label">Status</label>
      <select
        className="input"
        value={filters.status}
        onChange={(e) => onChange({ ...filters, status: e.target.value })}
      >
        <option value="">All</option>
        <option value="In Port">In Port</option>
        <option value="At Sea">At Sea</option>
        <option value="Delayed">Delayed</option>
      </select>

      <button
        className="secondary-btn"
        style={{ marginTop: "10px" }}
        onClick={onClear}
      >
        Clear filters
      </button>
    </div>
  );
}

export default VesselSearchPanel;
