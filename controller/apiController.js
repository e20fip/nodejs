require("dotenv").config()
const { OpenAI } = require("openai")

export const config = {
  runtime: "edge"
}

const openai = new OpenAI({
  apiKey: process.env.API_KEY
})

const apiFetch = async (req, res) => {
  if (!req.body.datas.messages) return res.json({ message: "error" })
  const messages = req.body.datas.messages

  const stream = await openai.chat.completions.create(
    {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: messages }],
      //max_tokens: 100,
      stream: true
    },
    { responsType: "stream" }
  )

  for await (const chunk of stream) {
    const dat = chunk.choices[0]?.delta?.content || ""
    res.write(`${dat}`)
    if (chunk.choices[0]?.finish_reason === "stop") {
      return res.end()
    }
  }
}

module.exports = { apiFetch }
