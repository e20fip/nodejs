require("dotenv").config()
const { OpenAI } = require("openai")

const openai = new OpenAI({
  apiKey: process.env.API_KEY
})

const apiFetch = async (req, res) => {
  if (!req.body.datas.messages) return res.json({ message: "error" })
  const messages = encodeURI(req.body.datas.messages)
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: messages }],
    max_tokens: 100
  })

  res.json({ completion })
}

module.exports = { apiFetch }
