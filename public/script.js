//const URL = "http://localhost:8000/api"
const URL = "https://nodejs-e20fip.vercel.app/api"

const output = document.querySelector(".output")
const input = document.getElementById("input")
const send = document.getElementById("send")
const clear = document.getElementById("clear")
let converter = new showdown.Converter()
const fetchAPI = async (msg) => {
  try {
    const resp = await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        datas: {
          messages: msg
        }
      })
    })

    const reader = resp.body.pipeThrough(new TextDecoderStream()).getReader()
    let text = ""
    while (true) {
      const chunk = await reader.read()
      const { done, value } = chunk
      if (value !== undefined) {
        text += value
        output.innerHTML = converter.makeHtml(text)
        output.scrollTop = output.offsetHeight
      }
      if (done) {
        break
      }
    }
  } catch (err) {
    console.error(err)
  } finally {
    send.removeAttribute("disabled")
    input.removeAttribute("disabled")
  }
}
send.addEventListener("click", () => {
  if (!input.value) return
  send.setAttribute("disabled", "true")
  input.setAttribute("disabled", "true")
  fetchAPI(input.value)
})
clear.addEventListener("click", () => {
  input.value = ""
})
