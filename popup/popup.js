const launcher = document.querySelector(".launch-btn");
const exportBtn = document.querySelector(".export-btn");
let isRecording = "false";

// verifica no chrome storage se está ou não gravando e então muda o texto do botão para "Record" ou "Stop"
chrome.storage.sync.get("recording", ({ recording }) => {
  isRecording = recording;

  chrome.storage.sync.get("recording", ({ recording }) => {
    isRecording = recording;
  });

  if (isRecording === "true") {
    launcher.innerText = "Stop";
    launcher.classList.remove("launch-btn");
    exportBtn.style.display = "none";
    launcher.classList.add("stop-btn");
  } else {
    launcher.innerHTML = "Record";
    exportBtn.style.display = "inline";
    launcher.classList.remove("stop-btn");
    launcher.classList.add("launch-btn");

    checkEvents();
  }
});

// adiciona um evento de click no botão, onde ao clicar vai verificar se está ou não gravando com base no chrome storage , mudando o texto do botão e o valor no chrome storage
launcher.addEventListener("click", (event) => {
  event.preventDefault();

  if (isRecording === "true") {
    // quando estiver gravando(true) vai cair aqui ao clicar, parando de gravar
    checkEvents();
    launcher.innerText = "Record";
    launcher.classList.remove("stop-btn");
    exportBtn.style.display = "inline";
    launcher.classList.add("launch-btn");
    isRecording = "false";
    chrome.storage.sync.set({ recording: "false" });

    chrome.storage.sync.get("recording", ({ recording }) => {
      isRecording = recording;
    });

    console.log(isRecording);

    chrome.storage.sync.get("eventsTeste", (data) => {
      console.log(data);
    });
  } else {
    // começa sem gravar e cai aqui para gravar após clicar em record
    launcher.innerText = "Stop";
    launcher.classList.remove("launch-btn");
    exportBtn.style.display = "none";
    launcher.classList.add("stop-btn");
    isRecording = "true";
    chrome.storage.sync.set({ recording: "true" });
    chrome.storage.sync.get("recording", ({ recording }) => {
      isRecording = recording;
    });

    console.log(isRecording);
  }
});

exportBtn.addEventListener("click", (event) => {
  event.preventDefault();

  chrome.storage.sync.set({ eventsTeste: [] });
});

//   headers: {
//   Accept: "application/json",
//   "Content-Type": "application/json; charset=utf-8",
//   "Access-Control-Allow-Origin": "*",
//   "Access-Control-Allow-Headers": "Content-Type",
//   "Access-Control-Allow-Methods": "GET,POST,OPTIONS,DELETE,PUT",

function checkEvents() {
  chrome.storage.sync.get("eventsTeste", ({ eventsTeste }) => {
    if (eventsTeste.length > 0) {
      exportBtn.style.display = "inline";
    } else {
      exportBtn.style.display = "none";
    }
  });
}
