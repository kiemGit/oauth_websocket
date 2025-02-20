const WebSocket = require("ws");
const axios = require("axios");

async function getAccessToken(username, password) {
    try {
        const response = await axios.post("http://192.168.0.170:4000/oauth/token", { username, password });
        return response.data.access_token;
    } catch (error) {
        // console.error("Failed to get access token:", error.response?.data || error.message);
        console.error("Failed to get access token:", error.response && error.response.data ? error.response.data : error.message);

        return null;
    }
}

async function connectWebSocket() {
    // const token = await getAccessToken("testUser", "password123");
    // const token = await getAccessToken("admin", "adminpass");
    const token = await getAccessToken("guest", "guestpass");

    if (!token) {
        console.error("Authentication failed. Exiting...");
        return;
    }

    const ws = new WebSocket("ws://192.168.0.170:8003");

    ws.on("open", () => {
        console.log("Connected to WebSocket server");

        const requestData = {
            requestId: "12345",
            message: "Hello Server",
            token: token // Send OAuth2 token
        };

        ws.send(JSON.stringify(requestData));
    });

    // ws.on("message", (data) => {
    //     // const data_str = data.toString("utf-8"); // Convert buffer to a readable string
    //     console.log("Received callback response:", data);
    // });

    ws.on("message", (data) => {
        const data_str = Buffer.from(data).toString("utf-8");
        try {
            const jsonData = JSON.parse(data_str);
            console.log("Received JSON:", jsonData);
        } catch (error) {
            console.error("Invalid JSON received:", data_str);
        }
    });

    ws.on("close", () => {
        console.log("Disconnected from server");
    });
}

connectWebSocket();
