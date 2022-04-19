const axios = require("axios")
const APIKey = "YOUR-API-KEY"

// AssemblyAI Headers
const assembly = axios.create({
  baseURL: "https://api.assemblyai.com/v2",
  headers: {
    authorization: APIKey,
    "content-type": "application/json",
  },
})

module.exports = { assembly: assembly }
