# Update `qtyToBePicked` for OutBoundMaterialInfo Table

This script fetches all records from an AWS AppSync GraphQL API and updates the `qtyToBePicked` field based on the formula:


## 📌 Prerequisites
- **Node.js** installed
- **AWS AppSync API Key & URL**
- **Git Installed** (for uploading to GitHub)

## 🚀 Setup Instructions

npm install

## Configure Environment Variables/update  details in .env file

APPSYNC_API_URL=https://your-appsync-endpoint/graphql
APPSYNC_API_KEY=your-appsync-api-key

## Run the Script
node updateQtyToBePicked.js



