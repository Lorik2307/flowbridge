#  FlowBridge

A TypeScript webhook server that listens for events and forwards them to Slack automatically.

## What it does
- Listens for incoming webhook POST requests
- Extracts event data and formats it
- Forwards notifications to a Slack channel in real time

## Tech Stack
- Node.js
- TypeScript
- Express
- Axios
- Slack Incoming Webhooks

## How to run
1. Clone the repo
2. Run `npm install`
3. Add your Slack webhook URL to a `.env` file
4. Run `npx ts-node src/index.ts`
