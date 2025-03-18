# Update `qtyToBePicked` for OutBoundMaterialInfo Table

This script fetches all records from an AWS AppSync GraphQL API and updates the `qtyToBePicked` field based on the formula:


## 📌 Prerequisites
- **Node.js** installed
- **AWS AppSync API Key & URL**
- **Git Installed** (for uploading to GitHub)

## 🚀 Setup Instructions

npm install

## Create .env file and add below details

APPSYNC_API_URL=https://your-appsync-endpoint/graphql
APPSYNC_API_KEY=your-appsync-api-key
AWS_ACCESS_KEY_ID=your-access-key-id
AWS_SECRET_ACCESS_KEY=your-secret-access-key
AWS_REGION=us-east-1


## Run the Script
node updateQtyToBePicked.js



