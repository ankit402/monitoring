import services from "./data/services";
import stages from "./data/stages";

function Main() {
  <>
  <services/>
  <stages/>
  </>

  return (
    <main className="portal-content">
      <section className="service-strip">
        {services.map((service) => (
          <div className="service-item" key={service.name}>
            <span className="service-dot"></span>
            <strong>{service.name}</strong>
            <span className="service-detail">{service.detail}</span>
          </div>
        ))}
      </section>
      <section className="pipeline-section">
        <div className="pipeline-heading">
          <h2>Today's file pipeline</h2>

          <p>
            Bank push → OMA SFTP receipt & acknowledgement → pull to embossing
            → import → card printing
          </p>
        </div>

        <div className="pipeline-container">
          {stages.map((stage) => (
            <div className="pipeline-card" key={stage.step}>
              <span className="pipeline-step">{stage.step}</span>
              <h3>{stage.title}</h3>
              <div className="pipeline-count">
                <strong>{stage.count}</strong>
                {stage.total && (
                  <span className="pipeline-total">{stage.total}</span>
                )}
              </div>
              <p className={`pipeline-description ${stage.type}`}>
                {stage.description}
              </p>
              <div className="pipeline-progress">
                <span
                  style={{ width: `${stage.progress}%` }}
                ></span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Main;