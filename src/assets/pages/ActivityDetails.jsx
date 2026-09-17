export default function ActivityDetails({
        searchText,
        setSearchText,
        source,
        setSource,
        outcome,
        setOutcome,
        filteredActivities,
        activityTrack,
}) {
  return (
    <main className="activity-page">
      <div className="activity-panel">
        <div className="activity-toolbar">
          <div className="activity-filter">
            <label htmlFor="activity-search">SEARCH</label>

            <input
              id="activity-search"
              type="text"
              placeholder="File name, event or ACK ID"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
            />
          </div>

          <div className="activity-filter">
            <label htmlFor="activity-source">CAPTURED FROM</label>

            <select
              id="activity-source"
              value={source}
              onChange={(event) => setSource(event.target.value)}
            >
              <option>All sources</option>
              <option>Embossing system</option>
            </select>
          </div>

          <div className="activity-filter">
            <label htmlFor="activity-outcome">OUTCOME</label>

            <select
              id="activity-outcome"
              value={outcome}
              onChange={(event) => setOutcome(event.target.value)}
            >
              <option>All outcomes</option>
              <option>Success</option>
              <option>Warning</option>
              <option>Info</option>
            </select>
          </div>

          <div className="activity-total">
            {filteredActivities.length} of {activityTrack.length} events
          </div>
        </div>

        <div className="activity-table-wrapper">
          <table className="activity-table">
            <thead>
              <tr>
                <th>TIME</th>
                <th>EVENT</th>
                <th>SOURCE FILE</th>
                <th>CAPTURED FROM</th>
                <th>DETAIL</th>
              </tr>
            </thead>

            <tbody>
              {filteredActivities.length === 0 ? (
                <tr>
                  <td colSpan="5" className="activity-empty">
                    No activity found
                  </td>
                </tr>
              ) : (
                filteredActivities.map((activity, index) => (
                  <tr key={`${activity.time}-${index}`}>
                    <td className="activity-time">
                      {activity.time}
                    </td>

                    <td>
                      <span
                        className={`event-name ${activity.type || ""}`}
                      >
                        <span className="event-dot" />
                        {activity.event}
                      </span>
                    </td>

                    <td className="activity-file">
                      {activity.sourceFile}
                    </td>

                    <td>{activity.capturedFrom}</td>

                    <td className="activity-detail">
                      {activity.detail}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}