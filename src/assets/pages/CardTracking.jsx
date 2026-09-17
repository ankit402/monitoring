import { useEffect, useMemo, useState } from "react";
import "../../App.css";
import CardTrackingDetails from "./CardTrackingDetails";

const API_URL = "/api/CardTrack";

function CardTracking() {
  const [cardData, setCardData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("All statuses");
  const [fileFilter, setFileFilter] = useState("All files");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch card tracking data from API
  const fetchCards = async () => {
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

      const data = await response.json();

      console.log("CardTrack API Response:", data);

      // Supports:
      // Direct array: [...]
      // Wrapped response: { data: [...] }
      const cards = Array.isArray(data) ? data : data.data;

      if (!Array.isArray(cards)) {
        throw new Error("CardTrack API response is not an array.");
      }

      setCardData(cards);
    } catch (err) {
      console.error("Failed to fetch card tracking data:", err);
      setError(err.message || "Unable to load card tracking data.");
    } finally {
      setLoading(false);
    }
  };

  // Call API when page loads
  useEffect(() => {
    fetchCards();
  }, []);

  // Create file dropdown options
  const fileOptions = useMemo(() => {
    return [
      "All files",
      ...new Set(
        cardData
          .map((card) => card.sourceFile)
          .filter(Boolean)
      ),
    ];
  }, [cardData]);

  // Filter cards
  //useMemo remembers the result of a calculation and
  //  recalculates it only when one of its dependencies changes
  
  const filteredCards = useMemo(() => {
    const search = searchText.trim().toLowerCase();

    return cardData.filter((card) => {
      const searchableValues = [
        card.cardRef,
        card.cardNumber,
        card.cardholder,
        card.product,
        card.sourceFile,
        card.machine,
        card.status,
        card.updated,
      ];

      const matchesSearch =
        !search ||
        searchableValues
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(search);

      const matchesStatus =
        statusFilter === "All statuses" ||
        card.status === statusFilter;

      const matchesFile =
        fileFilter === "All files" ||
        card.sourceFile === fileFilter;

      return matchesSearch && matchesStatus && matchesFile;
    });
  }, [cardData, searchText, statusFilter, fileFilter]);

  return (

    <CardTrackingDetails 
      searchText={searchText}
      setSearchText={setSearchText}
      statusFilter={statusFilter}
      setStatusFilter={setStatusFilter}
      fileFilter={fileFilter}
      setFileFilter={setFileFilter}
      fetchCards={fetchCards}
      filteredCards={filteredCards}
      loading= {loading}
      fileOptions={fileOptions}
      cardData ={cardData}
      error ={error}
      />     
  );
}

export default CardTracking;