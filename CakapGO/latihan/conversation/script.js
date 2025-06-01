// async function sendMessage() {
//   const input = document.getElementById("userInput");
//   const message = input.value.trim();
//   if (!message) return;

//   const chatBox = document.getElementById("chat-box");
//   chatBox.innerHTML += `<div><strong>Kamu:</strong> ${message}</div>`;
//   input.value = "";

//   try {
//     const response = await fetch("https://api-inference.huggingface.co/models/facebook/blenderbot_small-90M", {
//       method: "POST",
//       headers: {
//         "Authorization": "Bearer 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", // Ganti dengan API key kamu
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({ inputs: message })
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP ${response.status} - ${await response.text()}`);
//     }

//     const result = await response.json();
//     const reply = result.generated_text || result[0]?.generated_text || "[Gagal mendapatkan jawaban]";
//     chatBox.innerHTML += `<div><strong>AI:</strong> ${reply}</div>`;
//     chatBox.scrollTop = chatBox.scrollHeight;
//   } catch (error) {
//     console.error("Fetch error:", error);
//     chatBox.innerHTML += `<div style="color: red;"><strong>Error:</strong> ${error.message}</div>`;
//     chatBox.scrollTop = chatBox.scrollHeight;
//   }
// }
