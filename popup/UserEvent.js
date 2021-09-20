let recording = false;
let userEvents = [];

chrome.storage.sync.get("recording", ({ recoding }) => {
    console.log(`Recording is set to  ${recording}`);
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


