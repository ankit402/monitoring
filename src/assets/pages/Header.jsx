function Header({ activePage, setActivePage, count }) {
  const navItems = [
    { label: "Files", count: 7 },
    { label: "Card print tracking", count: 7 },
    { label: "Activity history", count: 12 },
  ];

  return (
    <nav className="top-tabs">
      {navItems.map((item) => (
        <button
          key={item.label}
          type="button"
          className={`top-tab ${
            activePage === item.label ? "active" : ""
          }`}
          onClick={() => setActivePage(item.label)}
        >
          <span>{item.label}</span>
          <span className="tab-count">{item.count}</span>
        </button>
      ))}
    </nav>
  );
}

export default Header;