//verifica clicks no botão, adicionando e removendo as funções toda vez
//que o storage mudar, ou seja, toda vez que gravar ou parar.
chrome.storage.onChanged.addListener(function (changes, namespace) {
  if ("recording" in changes) {
    chrome.storage.sync.get("recording", ({ recording }) => {
      if (recording === "true") {
        document.addEventListener("click", handleUserEvent);
        document.addEventListener("change", handleUserEvent);
      } else {
        document.removeEventListener("click", handleUserEvent);
        document.removeEventListener("change", handleUserEvent);

        chrome.storage.sync.get("eventsTeste", ({ eventsTeste }) => {
          console.log(eventsTeste);
        });
      }
    });
  }
});
