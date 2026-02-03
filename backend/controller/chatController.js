const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
You are StyleIn AI Assistant.

Brand: Style In (fashion ecommerce)
Founder: Priyadarshi Prince (B.Tech student at IIT Patna)

You help users with:
- products
- orders
- delivery
- returns
- brand information

Tone: friendly, confident, concise.
          `,
        },
        { role: "user", content: message },
      ],
    });

    res.json({
      reply: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error("OpenAI Error:", error.message);

    res.json({
      reply:
        "I can help you with products, orders, delivery, returns, and brand info. Please ask me anything 😊",
    });
  }
};
