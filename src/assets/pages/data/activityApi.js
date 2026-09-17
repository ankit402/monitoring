const API_URL = "/api/ActivityTrack";

export const fetchActivities = async () => {
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

  const activities = Array.isArray(data) ? data : data.data;

  if (!Array.isArray(activities)) {
    throw new Error("ActivityTrack API response is not an array.");
  }

  return activities;
};