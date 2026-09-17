import Refreshbutton from "../Button/Refreshbutton";

export default function CardTrackingDetails({
        
        searchText,
      setSearchText,
      statusFilter,
      setStatusFilter,
      fileFilter,
      setFileFilter,
      fetchCards,
       filteredCards = [],
        loading,
    fileOptions = [],
    cardData = [],
      error 
})
{
    return <><main className="card-tracking-page">
      <section className="card-tracking-panel">
        <div className="card-tracking-toolbar">
          <div className="tracking-filter">
            <label htmlFor="card-search">SEARCH</label>

            <input
              id="card-search"
              type="text"
              placeholder="Card ref, last 4 digits or name"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
            />
          </div>

          <div className="tracking-filter">
            <label htmlFor="card-status">STATUS</label>

            <select
              id="card-status"
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
            >
              <option>All statuses</option>
              <option>Printed</option>
              <option>Pending</option>
              <option>Rejected</option>
              <option>Held for reprint</option>
            </select>
          </div>

          <div className="tracking-filter">
            <label htmlFor="card-file">FILE</label>

            <select
              id="card-file"
              value={fileFilter}
              onChange={(event) => setFileFilter(event.target.value)}
            >
              {fileOptions.map((file) => (
                <option key={file} value={file}>
                  {file}
                </option>
              ))}
            </select>
          </div>

          <div className="tracking-count">
            {filteredCards.length} of {cardData.length} cards
          </div>

            <Refreshbutton
            fetchCards={fetchCards}
            disabled={loading}
            />
          
        </div>

        {loading && (
          <p className="tracking-message">
            Loading card tracking data...
          </p>
        )}

        {error && (
          <div className="tracking-error">
            <p>Failed to load card tracking data.</p>
            <small>{error}</small>

            <button type="button" onClick={fetchCards}>
              Retry
            </button>
          </div>
        )}

        {!loading && !error && (
          <div className="card-tracking-table-wrapper">
            <table className="card-tracking-table">
              <thead>
                <tr>
                  <th>CARD REF</th>
                  <th>CARD NUMBER</th>
                  <th>CARDHOLDER</th>
                  <th>PRODUCT</th>
                  <th>SOURCE FILE</th>
                  <th>MACHINE</th>
                  <th>STATUS</th>
                  <th>UPDATED</th>
                </tr>
              </thead>

              <tbody>
                {filteredCards.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="tracking-empty">
                      No cards found
                    </td>
                  </tr>
                ) : (
                  filteredCards.map((card) => (
                    <tr key={card.cardRef}>
                      <td className="card-ref">
                        {card.cardRef}
                      </td>

                      <td className="card-number">
                        {card.cardNumber}
                      </td>

                      <td>{card.cardholder}</td>

                      <td>{card.product}</td>

                      <td className="source-file">
                        {card.sourceFile}
                      </td>

                      <td>{card.machine}</td>

                      <td>
                        <span
                          className={`card-status-pill ${
                            card.status
                              ?.toLowerCase()
                              .replaceAll(" ", "-")
                          }`}
                        >
                          <span className="status-dot" />
                          {card.status}
                        </span>
                      </td>

                      <td className="updated-time">
                        {card.updated}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
    </>
}