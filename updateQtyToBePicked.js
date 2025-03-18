require('dotenv').config(); // Load environment variables
const axios = require('axios');

const APPSYNC_API_URL = process.env.APPSYNC_API_URL;
const APPSYNC_API_KEY = process.env.APPSYNC_API_KEY;

// GraphQL Query to List Records (with pagination)
const LIST_QUERY = `
  query ListOutBoundMaterialInfos($nextToken: String) {
    listOutBoundMaterialInfos(nextToken: $nextToken) {
      nextToken
      items {
        id
        _version
        qtyOrdered
        qtyIssued
        qtyToIssued
        qtyToBePicked
      }
    }
  }
`;

// GraphQL Mutation to Update a Record
const UPDATE_MUTATION = `
  mutation UpdateOutBoundMaterialInfo($id: ID!, $_version: Int!, $qtyToBePicked: Int!) {
    updateOutBoundMaterialInfo(input: { id: $id, _version: $_version, qtyToBePicked: $qtyToBePicked }) {
      id
      qtyToBePicked
      _version
    }
  }
`;

// Function to Make GraphQL Requests
async function makeGraphQLRequest(query, variables = {}) {
    try {
        const response = await axios.post(
            APPSYNC_API_URL,
            { query, variables },
            {
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": APPSYNC_API_KEY, // Using API Key for authentication
                },
            }
        );
        console.log('Response - ', response.data);

        return response.data;
    } catch (error) {
        console.error("GraphQL Request Error:", error.response?.data || error.message);
        throw error;
    }
}

// Function to Fetch All Records (Handling Pagination)
async function fetchAllRecords() {
    let allRecords = [];
    let nextToken = null;

    do {
        // console.log(`Fetching records... Next Token: ${nextToken || "None"}`);
        const response = await makeGraphQLRequest(LIST_QUERY, { nextToken });

        const data = response.data.listOutBoundMaterialInfos;
        if (data && data.items) {
            allRecords = allRecords.concat(data.items);
            nextToken = data.nextToken || null; // Set nextToken for next iteration
        } else {
            nextToken = null; // Stop loop if no more data
        }
    } while (nextToken); // Continue until nextToken is null

    console.log(`✅ Fetched ${allRecords.length} total records.`);
    return allRecords;
}

// Function to Update Records
async function updateQtyToBePicked() {
    try {
        const records = await fetchAllRecords();
        if (!records || records.length === 0) {
            console.log("No records found.");
            return;
        }

        console.log(`Updating ${records.length} records...`);
        for (const record of records) {
            const qtyToBePicked = (record.qtyOrdered || 0) - (record.qtyIssued || 0) - (record.qtyToIssued || 0);

            await makeGraphQLRequest(UPDATE_MUTATION, {
                id: record.id,
                _version: record._version, // Pass _version to avoid conflicts
                qtyToBePicked,
            });

            console.log(`✅ Updated ID ${record.id}: qtyToBePicked = ${qtyToBePicked}`);
        }

        console.log("✅ All records updated successfully!");
    } catch (error) {
        console.error("❌ Error updating records:", error);
    }
}

// Run the Function
updateQtyToBePicked();
