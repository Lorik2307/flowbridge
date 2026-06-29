import "dotenv/config";
import express, { Request, Response } from "express";
import axios from "axios";

const app = express();
app.use(express.json());

const PORT = 3000;

// --- CONFIG ---
const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL || "";
// This is the webhook listener
app.post("/webhook", async (req: Request, res: Response) => {
  const payload = req.body;

  console.log("📥 Received webhook:", JSON.stringify(payload, null, 2));

  // Extract info from the incoming webhook
  const event = payload.event || "Unknown Event";
  const message = payload.message || "No message provided";

  // Forward it to Slack
  try {
    await axios.post(SLACK_WEBHOOK_URL, {
      text: `🔔 *New Event: ${event}*\n${message}`,
    });

    console.log("✅ Forwarded to Slack!");
    res.status(200).json({ success: true, message: "Forwarded to Slack" });
  } catch (error) {
    console.error("❌ Failed to forward:", error);
    res.status(500).json({ success: false });
  }
});

// Health check
app.get("/", (req: Request, res: Response) => {
  res.json({ status: "FlowBridge is running 🚀" });
});

app.listen(PORT, () => {
  console.log(`🌉 FlowBridge running on http://localhost:${PORT}`);
});