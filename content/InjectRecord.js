//sempre que abrir uma página vai verificar se está ou não gravando,
//adicionando ou removendo as funções
chrome.storage.sync.get("recording", ({ recording }) => {
  if (recording === "true") {
    document.addEventListener("click", handleUserEvent);
    document.addEventListener("change", handleUserEvent);
  } else {
    document.removeEventListener("click", handleUserEvent);
    document.removeEventListener("change", handleUserEvent);
  }
});
