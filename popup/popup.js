const launcher = document.querySelector('.launch-btn');

chrome.storage.sync.set({ recording: "true augusto" });
let isRecording = false;

// chrome.storage.sync.get("recording", ({ recording }) => {
//     isRecording = recording;
// });

launcher.addEventListener('click', (event) => {
    if (isRecording === "false") {  // quando estiver gravando(true) vai cair aqui ao clicar, parando de gravar
        launcher.innerHTML = "Record"
        isRecording = false;
        // chrome.storage.sync.set({ recording: "false" });

        chrome.storage.sync.get("recording", ({ recording }) => {
            isRecording = recording;
        });

    } else {  // começa sem gravar e cai aqui para gravar após clicar em record
        launcher.innerHTML = "Stop";
        isRecording = true;
        // chrome.storage.sync.set({ recording: "true" });

        chrome.storage.sync.get("recording", ({ recording }) => {
            isRecording = recording;
        });
    }
});