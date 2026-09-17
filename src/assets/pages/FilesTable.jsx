function FilesTable({ files, selectedFile, setSelectedFile }) {
  return (
    <section className="files-panel">
      <div className="files-panel-header">
        <h2>Files pushed today</h2>

        <p>sftp.oma · /inbound/BK07/</p>
      </div>

      <div className="files-table-wrapper">
        <table className="files-table">
          <thead>
            <tr>
              <th>Source file</th>
              <th>Size</th>
              <th>Pushed</th>
              <th>Destination</th>
              <th>Progress</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {files.map((file) => (
              <tr
                key={file.id}
                className={
                  selectedFile?.id === file.id
                    ? "selected-row"
                    : ""
                }
                onClick={() => setSelectedFile(file)}
              >
                <td>
                  <div className="file-name">
                    {file.name}
                  </div>

                  <div className="file-subtitle">
                    {file.records} records · {file.product}
                  </div>
                </td>

                <td>{file.size}</td>

                <td className="time-cell">
                  {file.pushed}
                </td>

                <td>
                  <div>{file.destination}</div>

                  <div className="file-subtitle">
                    {file.path}
                  </div>
                </td>

                <td>
                  <div className="progress-blocks">
                    {Array.from({ length: 6 }).map(
                      (_, index) => (
                        <span
                          key={index}
                          className={
                            index < file.progress
                              ? file.statusType === "rejected" &&
                                index === 1
                                ? "progress-error"
                                : "progress-completed"
                              : "progress-empty"
                          }
                        />
                      )
                    )}
                  </div>
                </td>

                <td>
                  <span
                    className={`file-status ${file.statusType}`}
                  >
                    <span className="status-dot" />
                    {file.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default FilesTable;