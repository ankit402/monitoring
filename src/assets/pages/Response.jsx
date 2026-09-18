import { useEffect, useState } from "react";

export default function Response({API_URL}){
    const [responseData, setResponseData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(""); 
     
    useEffect(() => {
        if(!API_URL){
            setError("API_URL is required.");
            setLoading(false);
            return;
        }
        const fetchResponse = async() => {

            try{
                setLoading(true);
                setError("");
                const response = await fetch(API_URL, {
                     method: "GET",
                     headers: { Accept: "application/json", },
                        });

                if (!response.ok) 
                    {
                    throw new Error(
                         `API Error: ${response.status} ${response.statusText}`
                        );
                    }

                    const data = await response.json();
                    console.log("API Response:", data);
                    setResponseData(data);
            }
            catch(err)
            { console.error("Failed to fetch response:", err);

                 setError(
              err.message || "Unable to load response."
                );

            }finally {
        setLoading(false);
      }
        };
         fetchResponse();
  }, [API_URL]);

  if (loading) {
    return <p>Loading response...</p>;
  }

  if (error) {
    return (
      <p className="tracking-error">
        {error}
      </p>
    );
}
    return (
    <div className="response-container">
      <h2>API Response</h2>

      <pre>
        {JSON.stringify(responseData, null, 2)}
      </pre>
    </div>
  );
}