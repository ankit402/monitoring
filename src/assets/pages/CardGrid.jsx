function CardGrid({ selectedFile }) {
  if (!selectedFile) {
    return null;
  }

  return (
    <div className="detail-grid">
      <div>
        <span>Bank</span>
        <strong>{selectedFile.bank}</strong>
      </div>

      <div>
        <span>Cards</span>
        <strong>
          {selectedFile.cards?.toLocaleString() || 0}
        </strong>
      </div>

      <div>
        <span>Status</span>
        <strong>{selectedFile.status}</strong>
      </div>

      <div>
        <span>Progress</span>
        <strong>{selectedFile.progress}%</strong>
      </div>
    </div>
  );
}

export default CardGrid;