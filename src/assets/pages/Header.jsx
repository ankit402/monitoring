function Header({ activePage, setActivePage }) {
  const navItems = [
    { label: "Files", count: 7 },
    { label: "Card print tracking", count: 180 },
    { label: "Activity history", count: 54 },
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