import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const NVIDIA_API_URL = "https://integrate.api.nvidia.com/v1/chat/completions";
const MODEL_ID = "NVIDIABuild-Autogen-19";
const FALLBACK_MODEL = "meta/llama-3.1-8b-instruct";

const SYSTEM_PROMPT = `You are the Pavni Chemicals AI Assistant. Your purpose is to provide expert information about Pavni Chemicals and its industrial chemical portfolio.

### STRICT FORMATTING RULES:
1. **POINT-WISE ONLY**: Always provide answers using the bullet character "•" for every single point. 
2. **ONE POINT PER LINE**: Every point must be on a new line.
3. **ULTRA-CONCISE**: Provide point-to-point information. Eliminate all conversational filler, lengthy descriptions, or redundant explanations.
4. **NO FLUFF**: Do not use "Certainly!", "I hope this helps", or "Let me know if you need more". Just the facts in points.

### COMPANY CONTEXT:
- **Identity**: Pavni Chemicals, Ankleshwar. Established 2014.
- **Partnership**: Authorized Dealer for Grasim Industries Limited (Aditya Birla Group).
- **Contact**: +91 96873 70005, sales@pavnichemicals.com.

### CORE KNOWLEDGE:
- **Range**: 53+ industrial chemicals (Alkalies, Acids, Solvents, Inorganic).
- **Key Products**: Caustic Soda, HCl, H2O2, Stable Bleaching Powder, Sodium Hypochlorite, etc.

### BEHAVIORAL RULES:
1. **LIMITATION**: Only discuss Pavni Chemicals and chemical specifications.
2. **OUT-OF-SCOPE**: For unrelated topics, say: "• Specialization: Pavni Chemicals & Industrial Portfolio only. • Assistance: Chemical products technicalities."
3. **ACCURACY**: Point-to-point technical data only. Suggest Sales Desk +91 96873 70005 for commercial quotes.`;

app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "Message is required" });

  try {
    let response;
    const requestData = {
      model: "", // Will be set per attempt
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: message }
      ],
      max_tokens: 1024,
    };

    try {
      // Attempt primary model
      requestData.model = MODEL_ID;
      response = await axios.post(NVIDIA_API_URL, requestData, {
        headers: {
          "Authorization": `Bearer ${process.env.NVIDIA_API_KEY}`,
          "Content-Type": "application/json",
        },
      });
    } catch (e) {
      console.warn(`Primary model ${MODEL_ID} unavailable, using fallback.`);
      // Use fallback
      requestData.model = FALLBACK_MODEL;
      response = await axios.post(NVIDIA_API_URL, requestData, {
        headers: {
          "Authorization": `Bearer ${process.env.NVIDIA_API_KEY}`,
          "Content-Type": "application/json",
        },
      });
    }
    
    res.json({ response: response.data.choices[0].message.content });
  } catch (error) {
    console.error("AI Error:", error.message);
    res.status(500).json({ error: "Failed to get AI response" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
