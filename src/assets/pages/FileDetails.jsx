function FileDetails({ selectedFile }) {
  if (!selectedFile) {
    return (
      <aside className="file-details-panel empty-details">
        <p>Select a file to view details</p>
      </aside>
    );
  }

  return (
    <aside className="file-details-panel">
      {/* Panel header */}
      <div className="details-header">
        <div>
          <h3>{selectedFile.name}</h3>
          <p>
            Captured by the OMA tracking service from the push service,
            pull service and embossing system.
          </p>
        </div>

        <span
          className={`file-status ${selectedFile.statusType}`}
        >
          <span className="status-dot" />
          {selectedFile.status}
        </span>
      </div>

      {/* File information */}
      <div className="details-grid">
        <div>
          <span>SIZE</span>
          <strong>{selectedFile.size}</strong>
        </div>

        <div>
          <span>RECORDS</span>
          <strong>{selectedFile.records}</strong>
        </div>

        <div>
          <span>PRODUCT</span>
          <strong>{selectedFile.product}</strong>
        </div>

        <div>
          <span>PUSHED BY</span>
          <strong>bk07_push (SFTP)</strong>
        </div>

        <div>
          <span>PUSHED AT</span>
          <strong>{selectedFile.pushed}</strong>
        </div>

        <div>
          <span>DESTINATION</span>
          <strong>{selectedFile.destination}</strong>
        </div>

        <div>
          <span>ACKNOWLEDGEMENT</span>
          <strong>
            {selectedFile.acknowledgement || "Not issued"}
          </strong>
        </div>

        <div>
          <span>IMPORT JOB</span>
          <strong>{selectedFile.importJob || "—"}</strong>
        </div>

        <div className="full-detail">
          <span>SHA-256</span>
          <strong>
            {selectedFile.sha256 ||
              "6e9c6a43151acfb0...584d6cd3"}
          </strong>
        </div>
      </div>

      {/* History */}
      <div className="history-section">
        <div className="history-heading">
          <span>HISTORY CAPTURE</span>
          <span>Gulf Standard Time</span>
        </div>

        <div className="history-list">
          <div className="history-item">
            <time>{selectedFile.pushed}</time>

            <div className="history-line">
              <span className="history-circle" />
            </div>

            <div className="history-content">
              <strong>
                Pushed by bank
                <em>Bank push</em>
              </strong>

              <p>
                SFTP user bk07_push · {selectedFile.size} ·{" "}
                {selectedFile.records} records declared
              </p>
            </div>
          </div>

          <div className="history-item">
            <time>{selectedFile.receivedAt || selectedFile.pushed}</time>

            <div className="history-line">
              <span className="history-circle" />
            </div>

            <div className="history-content">
              <strong>
                Received at OMA SFTP
                <em>Push service</em>
              </strong>

              <p>
                /inbound/BK07/{selectedFile.name} ·{" "}
                {selectedFile.size} written
              </p>
            </div>
          </div>

          <div className="history-item">
            <time>{selectedFile.receivedAt || selectedFile.pushed}</time>

            <div className="history-line">
              <span
                className={`history-circle ${
                  selectedFile.statusType === "rejected"
                    ? "history-error"
                    : "history-success"
                }`}
              />
            </div>

            <div className="history-content">
              <strong>
                {selectedFile.statusType === "rejected"
                  ? "Rejected — checksum mismatch"
                  : "Acknowledgement sent to bank"}

                <em>Push service</em>
              </strong>

              <p>
                {selectedFile.statusType === "rejected"
                  ? "SHA-256 of the received bytes does not match the declared value."
                  : "ACK received and file successfully validated."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default FileDetails;