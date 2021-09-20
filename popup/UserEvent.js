let userEvents = [];

chrome.storage.onChanged.addListener(function(changes, namespace) {
    if ("recording" in changes) {
        chrome.storage.sync.get("recording", ({ recording }) => {
            if(recording === "true") {
                document.addEventListener('click', handleUserEvent);
                document.addEventListener('change', handleUserEvent);
            } else {
                document.removeEventListener('click', handleUserEvent);
                document.removeEventListener('change', handleUserEvent);    
    
                const events = { userActions: userEvents }
    
                chrome.storage.sync.set({ events: JSON.stringify(events) });
    
                chrome.storage.sync.get("events", ({ events }) => {
                    console.log(events);
                });
            }
        });
    }
});

function handleUserEvent({ type, target }) {
    if(type === 'click') {
        userEvents.push({ URL: target.baseURI, target: { tag: target.localName, class: target.className, id: target.id }, type });
    }

    if(type === 'change') {
        userEvents.push({  URL: target.baseURI, target: { tag: target.localName, class: target.className, id: target.id }, type, value: target.value });
    }

    console.log(userEvents);
}


