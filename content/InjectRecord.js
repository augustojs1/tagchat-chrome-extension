chrome.storage.sync.get("recording", ({ recording }) => {
    if (recording === "true") {
      document.addEventListener("click", handleUserEvent);
      document.addEventListener("change", handleUserEvent);
    } else {
      document.removeEventListener("click", handleUserEvent);
      document.removeEventListener("change", handleUserEvent);

      let retorno;
      chrome.storage.sync.get("eventsTeste", ({ eventsTeste }) => {
        retorno = eventsTeste;
      });

      chrome.storage.sync.set({ eventsTeste: [] });

      // lugar onde irá exportar a gravação para o puppeteer
      // sendToPuppeteer();
    }
  });

  function handleUserEvent({ type, target }) {
    if (type === "click") {
      chrome.storage.sync.get(["eventsTeste"], (result) => {
        result.eventsTeste.push({
          URL: target.baseURI,
          target: {
            tag: target.localName,
            class: target.className,
            id: target.id,
          },
          type,
        });
        chrome.storage.sync.set({ eventsTeste: result.eventsTeste });
      });
    }
  
    if (type === "change") {
      chrome.storage.sync.get(["eventsTeste"], (result) => {
        result.eventsTeste.push({
          URL: target.baseURI,
          target: {
            tag: target.localName,
            class: target.className,
            id: target.id,
          },
          type,
          value: target.value,
        });
        chrome.storage.sync.set({ eventsTeste: result.eventsTeste });
      });
    }
  }