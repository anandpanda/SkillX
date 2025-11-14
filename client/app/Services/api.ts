import axios from "axios";

const api = axios.create({
    // Production server on Render
    baseURL:
        process.env.EXPO_PUBLIC_API_URL ||
        "https://skillx-server.onrender.com/api",
    // For local development, uncomment and use your local IP:
    // baseURL: "http://192.168.1.4:8080/api",
    timeout: 60000, // Increased timeout for Render (free tier can be slow)
});

export default api;
