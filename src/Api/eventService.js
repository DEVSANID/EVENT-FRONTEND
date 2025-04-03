import axios from "axios";

const API_BASE_URL = "http://localhost:5000/events"; // Adjust if needed

// ✅ Fetch all events
export const fetchEvents = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw error;
  }
};

// ✅ Fetch event by ID
export const fetchEventById = async (eventId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${eventId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching event:", error);
    throw error;
  }
};

// ✅ Create new event
export const createEvent = async (formData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/create`, formData, {
      headers: { "Content-Type": "multipart/form-data" }, // For image upload
    });
    return response.data;
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
};

// ✅ Update event
export const updateEvent = async (eventId, formData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/${eventId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating event:", error);
    throw error;
  }
};

// ✅ Delete event
export const deleteEvent = async (eventId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/${eventId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting event:", error);
    throw error;
  }
};
