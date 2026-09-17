import { useState } from "react";
import "../../App.css";
import files from "./data/Menu";
import stages from "./data/list";
import Header from "./Header";
import Main from "./Main";
import CardGrid from "./CardGrid";
import Files from "./Files";
import ActivityHistory from "./ActivityHistory";
import CardTracking from "./CardTracking"; 

function Dashboard() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [selectedFile, setSelectedFile] = useState(null);

  return (
    <div className="dashboard">
      
      <Main
        activePage={activePage}
        stages={stages}
        files={files}
        setSelectedFile={setSelectedFile}
      />
     <Header
        activePage={activePage}
        setActivePage={setActivePage}
      />
      {activePage === "Files" && (
        <Files />
      )}
      {activePage === "Activity history" && (
        <ActivityHistory />
      )}
      {activePage === "Card print tracking" && (
        <CardTracking />
      )}
      {selectedFile && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedFile(null)}
        >
          <div
            className="file-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setSelectedFile(null)}
            >
              ×
            </button>
            <p className="eyebrow">FILE DETAILS</p>
            <h2>{selectedFile.name}</h2>
            <CardGrid selectedFile={selectedFile} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;