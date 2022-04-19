const { assembly } = require("./assemblyAuth.js")
const audioURL =
  "https://audio-samples.github.io/samples/mp3/blizzard_tts_unbiased/sample-0/real.mp3"
const refreshInterval = 5000

const getTranscript = async () => {
  // Sends the audio file to AssemblyAI for transcription
  const response = await assembly.post("/transcript", {
    audio_url: audioURL,
    sentiment_analysis: true,
  })

  // Interval for checking transcript completion
  const checkAnalysisCompletion = setInterval(async () => {
    const transcript = await assembly.get(`/transcript/${response.data.id}`)
    const transcriptStatus = transcript.data.status

    // Loops over the sentiment analysis results and returns the values
    const returnSentimentResult = (arr) => {
      for (const item of arr) {
        console.log(item)
      }
    }

    // Switch statement that checks the transcript status
    switch (transcriptStatus) {
      case "completed":
        console.log(`Transcript text:${transcript.data.text}`)
        const sentimentAnalysis = transcript.data.sentiment_analysis_results
        returnSentimentResult(sentimentAnalysis)
        clearInterval(checkAnalysisCompletion)
        break
      case "processing":
        console.log("Analysis in progress...")
        break
      case "error":
        clearInterval(checkAnalysisCompletion)
        console.log("There was a problem:", transcript.data)
        break
    }
  }, refreshInterval)
}

getTranscript()
