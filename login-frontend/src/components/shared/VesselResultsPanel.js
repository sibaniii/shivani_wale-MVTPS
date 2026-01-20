import React from "react";

function VesselResultsPanel({
  vessels,
  selectedId,
  onSelect,
  subscribedIds,
  onToggleSubscribe,
}) {
  return (
    <div className="vessel-results">
      <h2>Vessel Results</h2>
      <table className="vessel-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Flag</th>
            <th>Status</th>
            <th>Sub</th>
          </tr>
        </thead>
        <tbody>
          {vessels.length === 0 && (
            <tr>
              <td colSpan="6" className="empty-row">
                No vessels match filters.
              </td>
            </tr>
          )}
          {vessels.map((v) => (
            <tr
              key={v.id}
              className={v.id === selectedId ? "selected-row" : ""}
              onClick={() => onSelect(v)}
            >
              <td>{v.id}</td>
              <td>{v.name}</td>
              <td>{v.type}</td>
              <td>{v.flag}</td>
              <td>{v.status}</td>
              <td>
                <button
                  className={
                    subscribedIds.includes(v.id)
                      ? "sub-btn sub-btn-on"
                      : "sub-btn"
                  }
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleSubscribe(v.id);
                  }}
                >
                  ★
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="subscribed-box">
        <h3>Subscribed vessels</h3>
        {subscribedIds.length === 0 ? (
          <p className="subscribed-empty">No subscriptions yet.</p>
        ) : (
          <ul>
            {subscribedIds.map((id) => (
              <li key={id}>{id}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default VesselResultsPanel;
