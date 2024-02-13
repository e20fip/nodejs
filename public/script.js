//const URL = "http://localhost:8000/api"
const URL = "https://nodejs-e20fip.vercel.app/api"

const output = document.querySelector(".output")
const input = document.getElementById("input")
const send = document.getElementById("send")
const clear = document.getElementById("clear")
let converter = new showdown.Converter()
const fetchAPI = async (text) => {
  try {
    const resp = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        datas: {
          messages: text
        }
      })
    })
    const datas = await resp.json()
    output.innerHTML = converter.makeHtml(
      datas.completion?.choices[0].message.content
    )
  } catch (err) {
    console.error(err)
  }
}
send.addEventListener("click", () => {
  if (!input.value) return
  fetchAPI(input.value)
})
clear.addEventListener("click", () => {
  input.value = ""
})
