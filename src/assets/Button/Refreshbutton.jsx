export default function RefreshButton({
  fetchCards,
  disabled = false,
}) {
  return (
    <button
      type="button"
      className="refresh-button"
      onClick={fetchCards}
      disabled={disabled}
      aria-label="Refresh card tracking data"
    >
      <span className={`refresh-icon ${disabled ? "is-loading" : ""}`}>
        ↻
      </span>

      <span>
        {disabled ? "Refreshing..." : "Refresh"}
      </span>
    </button>
  );
}