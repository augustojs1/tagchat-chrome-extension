let userEvents = [];

chrome.storage.onChanged.addListener(function (changes, namespace) {
  if ("recording" in changes) {
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
      }
    });
  }
});

function handleUserEvent({ type, target }) {
  if (type === "click") {
    chrome.storage.sync.get(["eventsTeste"], (result) => {
      console.log("-------------------");
      result.eventsTeste.push({
        URL: target.baseURI,
        target: {
          tag: target.localName,
          class: target.className,
          id: target.id,
          name: target.name,
        },
        type,
      });

      chrome.storage.sync.set({ eventsTeste: result.eventsTeste });
      console.log("-------------------");
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
          name: target.name,
        },
        type,
        value: target.value,
      });
      chrome.storage.sync.set({ eventsTeste: result.eventsTeste });
    });
  }
}
