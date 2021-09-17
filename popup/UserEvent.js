const body = document.querySelector('body');
let recording = false;
let userEvents = [];

if(body) {
    const button = document.createElement('button');
    button.innerHTML = "Record"
    button.classList.add('launch-btn');
    body.appendChild(button);

    button.addEventListener('click', (event) => {
        if(recording) {  // quando estiver gravando(true) vai cair aqui ao clicar, parando de gravar
            button.innerHTML = "Record"
            recording = false;
            document.removeEventListener('click', handleUserEvent);
            document.removeEventListener('change', handleUserEvent);
            button.style.backgroundColor = "#1B402E";
        } else {  // começa sem gravar e cai aqui para gravar após clicar em record
            button.innerHTML = "Stop";
            recording = true;
            document.addEventListener('click', handleUserEvent);
            document.addEventListener('change', handleUserEvent);
            button.style.backgroundColor = "tomato";
        }
    });
}

function handleUserEvent({ type, target }) {
    if(type === 'click') {
        userEvents.push({ URL: target.baseURI, target: { tag: target.localName, class: target.className, id: target.id }, type });
    }

    if(type === 'change') {
        userEvents.push({  URL: target.baseURI, target: { tag: target.localName, class: target.className, id: target.id }, type, value: target.value });
    }

    console.log(userEvents);
}


