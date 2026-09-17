import { useMemo, useState ,useEffect } from "react";
import "../../App.css";
import { fetchActivities } from "././data/activityApi";
import ActivityDetails from "./ActivityDetails";

function ActivityHistory() {
  // ✅ useState declarations go here
  const [searchText, setSearchText] = useState("");
  const [activityTrack, setActivityTrack] = useState([]);
  const [source, setSource] = useState("All sources");
  const [outcome, setOutcome] = useState("All outcomes");
  const search = searchText.trim().toLowerCase();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadActivities = async () => {
    try {
      setLoading(true);
      setError("");
      const activities = await fetchActivities();
      setActivityTrack(activities);
    } catch (err) {
      setError(err.message || "Unable to load activities.");
    } finally {
      setLoading(false);
    }
  };
  
  // ✅ useEffect also stays outside useMemo
  useEffect(() => {
    loadActivities();
  }, []);

  // ✅ useMemo comes after useState and useEffect
  const filteredActivities = useMemo(() => {
    return activityTrack.filter((activity) => {
      const matchesSearch =
        !search ||
        [
          activity.time,
          activity.event,
          activity.sourceFile,
          activity.capturedFrom,
          activity.detail,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase()
          .includes(search);

      const matchesSource =
        source === "All sources" ||
        activity.capturedFrom === source;

      const matchesOutcome =
        outcome === "All outcomes" ||
        (outcome === "Success" && activity.type === "success") ||
        (outcome === "Warning" && activity.type === "warning") ||
        (outcome === "Info" && activity.type === "info");

      return matchesSearch && matchesSource && matchesOutcome;
    });
  }, [searchText, source, outcome]);

  return (
   <ActivityDetails
      searchText={searchText}
      setSearchText={setSearchText}
      source={source}
      setSource={setSource}
      outcome={outcome}
      setOutcome={setOutcome}
      filteredActivities={filteredActivities}
      activityTrack={activityTrack}
/>
  );
}

export default ActivityHistory;