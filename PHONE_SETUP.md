
**Inbound vs Outbound Settings:**
*   **Inbound Call**: When YOU call the number (This is what you want).
*   **Outbound Call**: When the AI calls YOU (Cold calling).

For this setup, focus on **Inbound Call** settings. You can leave Outbound empty or default.


Since the React app runs in your browser, the **Phone Number** logic happens entirely on Vapi's servers. To make the phone call sound exactly like the web demo (Fast & Human-like), you must update your Vapi Dashboard settings.

## Step 1: Update Assistant Settings (Crucial)
Use the settings from the `VAPI_CONFIG.json` file created in your project folder.

1.  Log in to your **[Vapi Dashboard](https://dashboard.vapi.ai/)**.
2.  Go to **Assistants** and select `SarkariSaathi` (or create a new one).
3.  **Transcriber**:
    *   Provider: `Deepgram`
    *   Model: `Nova-2`
    *   Language: `English (India)` or `Hindi` (Mixed) - Select `en-IN` for best Hinglish support.
4.  **Model**:
    *   Provider: `OpenAI`
    *   Model: `gpt-4o-mini` (Fastest) or `gpt-4`
    *   **System Prompt**: Copy-Paste the context from `VAPI_CONFIG.json`. **This is the most important part.**
5.  **Voice**:
    *   Provider: `11Labs` or `Cartesia`.
    *   Select a voice that sounds Indian (e.g., `Amit` or `Aditi`).
    *   *Pro Tip*: Adjust stability to `0.5` for more emotional range.

## Step 2: Get a Phone Number
You can buy a number directly in Vapi or link a Twilio account.

### Option A: Buy via Vapi (Easiest - US Number)
1.  Go to **Phone Numbers** in Vapi Dashboard.
2.  Click **Buy Number**.
3.  Area Code: Choose any (e.g., `415`).
4.  Cost: Usually ~$2/month.
5.  **Assign Assistant**: Select the `SarkariSaathi` assistant you configured in Step 1.
6.  **Done!** Call that +1 number from your mobile.

### Option B: Use Your Indian Number (+91) via Twilio
*Note: This requires "Business Verification" approved by Indian Telecom regulations.*
1.  Create a **Twilio** account.
2.  Buy a number (starts with +1 for testing, or submit docs for +91).
3.  In Vapi: Go to **Phone Numbers** -> **Import from Twilio**.
4.  Enter your Twilio Account SID and Auth Token.
5.  Assign `SarkariSaathi` to this number.

## Step 3: Test It
1.  Dial the number from your mobile.
2.  Speak in Hindi: *"Arre bhai, passport ka kya scene hai?"*
3.  The agent should reply instantly in the "Sarkari" persona.
