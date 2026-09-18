import { useEffect, useMemo, useState } from "react";
import "../../App.css";
import FileDetails from "./FileDetails";

const API_URL = "/api/File";

function Files() {
  const [filesData, setFilesData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch file data from API
  const fetchFiles = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(
          `API Error: ${response.status} ${response.statusText}`
        );
      }

      const result = await response.json();

      console.log("Files API Response:", result);

      // Supports both:
      // 1. Direct array response: [...]
      // 2. Wrapped response: { data: [...] }
      const data = Array.isArray(result)
        ? result
        : Array.isArray(result.data)
        ? result.data
        : [];

      setFilesData(data);

      // Keep selected file if it still exists
      setSelectedFile((previousFile) => {
        if (previousFile) {
          return (
            data.find((file) => file.id === previousFile.id) ||
            data[0] ||
            null
          );
        }

        return data[0] || null;
      });
    } catch (err) {
      console.error("Failed to fetch files:", err);

      setError(err.message || "Unable to load files.");
      setFilesData([]);
      setSelectedFile(null);
    } finally {
      setLoading(false);
    }
  };

  // Call API when page loads
  useEffect(() => {
    fetchFiles();
  }, []);

  // Search API data
  const filteredFiles = useMemo(() => {
    const search = searchText.trim().toLowerCase();

    if (!search) {
      return filesData;
    }

    return filesData.filter((file) =>
      [
        file.name,
        file.product,
        file.size,
        file.pushed,
        file.destination,
        file.path,
        file.status,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(search)
    );
  }, [searchText, filesData]);

  return (
    <main className="files-page">
      <div className="files-layout">
        {/* LEFT SIDE - TABLE */}
        <section className="files-panel">
          <div className="files-panel-header">
            <h2>Files pushed today</h2>

            <span className="folder-path">
              sftp.oma · /inbound/BK07/
            </span>
          </div>

          <div className="files-toolbar">
            <input
              type="text"
              className="files-search"
              placeholder="Search file, product, status..."
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
            />

            <span className="files-count">
              {filteredFiles.length} files
            </span>

            <button
              type="button"
              onClick={fetchFiles}
              disabled={loading}
            >
              {loading ? "Loading..." : "Refresh"}
            </button>
          </div>

          {/* LOADING */}
          {loading && (
            <div className="files-loading">
              Loading files from API...
            </div>
          )}

          {/* ERROR */}
          {error && (
            <div className="files-error">
              <p>{error}</p>

              <button type="button" onClick={fetchFiles}>
                Retry
              </button>
            </div>
          )}

          {/* TABLE */}
          {!loading && !error && filteredFiles.length > 0 && (
            <div className="files-table-container">
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
                  {filteredFiles.map((file) => (
                    <tr
                      key={file.id}
                      className={
                        selectedFile?.id === file.id
                          ? "selected-file-row"
                          : ""
                      }
                      onClick={() => setSelectedFile(file)}
                    >
                      <td className="source-file-cell">
                        <strong>{file.name}</strong>

                        <span>
                          {file.records} records · {file.product}
                        </span>
                      </td>

                      <td>{file.size}</td>

                      <td className="pushed-time">
                        {file.pushed}
                      </td>

                      <td className="destination-cell">
                        <strong>{file.destination}</strong>
                        <span>{file.path}</span>
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
          )}

          {/* NO FILES */}
          {!loading && !error && filteredFiles.length === 0 && (
            <div className="files-loading">
              No files found.
            </div>
          )}
        </section>

        {/* RIGHT SIDE - DETAILS */}
        <FileDetails selectedFile={selectedFile} />
      </div>
    </main>
  );
}

export default Files;