let userEvents = [];
let newUserAction;

chrome.storage.onChanged.addListener(function(changes, namespace) {
    if ("recording" in changes) {
        chrome.storage.sync.get("recording", ({ recording }) => {
            if (recording === "true") {
                document.addEventListener('click', handleUserEvent);
                document.addEventListener('change', handleUserEvent);
            } else {
                document.removeEventListener('click', handleUserEvent);
                document.removeEventListener('change', handleUserEvent);    
    
                const events = { userActions: userEvents }
    
                chrome.storage.sync.set({ events: JSON.stringify(events) });
    
                chrome.storage.sync.get("events", ({ events }) => {
                    // console.log(events);
                });
            }
        });
    }
});

function handleUserEvent({ type, target }) {
    if(type === 'click') {
        chrome.storage.sync.get("userActions", ({ userAction }) => {

            if(userAction === undefined) {
                userEvents = [];
            } else {
                userEvents = JSON.parse(userAction);
            }

            console.log(userEvents);
        });

        let newUserAction = { URL: target.baseURI, target: { tag: target.localName, class: target.className, id: target.id }, type };

        userEvents.push(newUserAction);

        chrome.storage.sync.set({ userActions: JSON.stringify(userEvents) });

        // userActions.push(newUserAction);
        // chrome.storage.sync.set({ "userActions": JSON.stringify(userActions) });
        // console.log(userActions);
        // let userActions = JSON.parse(localStorage.getItem('userActions')) || [];
        // let newUserAction = { URL: target.baseURI, target: { tag: target.localName, class: target.className, id: target.id }, type };
        // userActions.push(newUserAction);
        // localStorage.setItem('userActions', JSON.stringify(userActions));
        // userEvents.push({ URL: target.baseURI, target: { tag: target.localName, class: target.className, id: target.id }, type });
    }

    if(type === 'change') {
        // userEvents.push({  URL: target.baseURI, target: { tag: target.localName, class: target.className, id: target.id }, type, value: target.value });
    }
    // console.log(userEvents);
}