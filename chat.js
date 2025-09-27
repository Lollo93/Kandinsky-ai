// netlify/functions/chat.js
import fetch from 'node-fetch';

export async function handler(event, context) {
  try {
    const body = JSON.parse(event.body);
    const prompt = body.prompt;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "Sei Kandinsky. Rispondi SEMPRE in italiano facile da leggere (easy to read). Usa frasi brevi, parole semplici, massimo 2-3 frasi."},
          { role: "user", content: prompt }
        ],
        max_tokens: 200,
        temperature: 0.6
      })
    });
    const data = await response.json();
    return { statusCode: 200, body: JSON.stringify({ reply: data.choices[0].message.content }) };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
}
