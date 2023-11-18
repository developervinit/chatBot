const openAiResponse = require("../controllers/openAiController");
const savingPromptAndResponseToDatabase = require("../controllers/historyController");
const getData = require("../controllers/historyController");
const axios = require("axios");

test("openApi testing", async () => {
        let prompt = "hello";
        const response = await axios.get(`http://localhost:3001/openai/response/${prompt}`);
        expect(response.status).toBe(200);
});

test("history endpoint test-1", async () => {
        let payload = {
            prompt: "Prompt for testing",
            response: "response for testing"
        }
        const response = await axios.post(`http://localhost:3001/history/makeHistory`, payload);
        expect(response.data).toBe("success");
});

test("history endpoint test-2", async () => {
    let response = await axios.get(`http://localhost:3001/history/getHistory`);
    expect(response.status).toBe(200)
});