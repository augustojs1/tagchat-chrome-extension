function handleUserEvent(event) {
  const target = event.target;
  const type = event.type;
  if (type === "click") {
    chrome.storage.sync.get(["eventsTeste"], (result) => {
      result.eventsTeste.push({
        URL: target.baseURI,
        target: {
          tag: target.localName,
          class: target.className,
          id: target.id,
          name: target.name,
          href: target.href ? target.href : "",
          value: target.value ? target.value : "",
        },
        type,
      });

      console.log(result);
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
          name: target.name,
          value: target.value,
        },
        type,
      });

      console.log(result);
      console.log("------------------------------------------------------");
      console.log(event);
      console.log("------------------------------------------------------");
      chrome.storage.sync.set({ eventsTeste: result.eventsTeste });
    });
  }
}
