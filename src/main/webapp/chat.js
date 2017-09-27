
class ChatForum {
    constructor() {
        this.alias = document.querySelector("#alias");
        this.forum = document.querySelector("#chat");
        this.message = document.querySelector("#message");
        this.rooms = document.querySelector("#rooms");
        var room = sessionStorage.getItem("room");
        document.getElementById("message").disabled = true;



        this.alias.onkeydown = event => {
            if (event.keycode === 13 || event.which === 13) {
                buttonFunction();
            }
        }
        this.message.onchange = event => {
            room = sessionStorage.getItem("room");
            if (room !== null) {
                fetch("api/chat/add?name=" + room,
                        {
                            method: 'POST',
                            body: JSON.stringify(new Message(document.getElementById("alias").value, event.target.value)),
                            headers: {'Content-Type': 'application/json; charset=UTF-8'}
                        })
                        .then(respnse => respnse.json())
                        .then(message => {
                            this.message.value = "";
                        });
            } else {
                sessionStorage.setItem("room", "Welcome");
                this.chatWorker.postMessage({"name": "Welcome"});
                document.querySelector("#chatRoom").innerHTML = "Welcome";
                this.message.value = "";
            }
            ;
        }
        this.roomWorker = new Worker("roomWorker.js");
        this.roomWorker.postMessage({"name": room});

        this.roomWorker.onmessage = event => {
            this.rooms.innerHTML = '';
            let ul = document.createElement('ul');
            event.data.map(room => {
                let li = document.createElement('li');
                li.innerHTML = `${room.id}`;
                li.setAttribute("id", "room");
                styleLiElement(li);
                li.onclick = e => {
                    document.querySelector("#chatRoom").innerHTML = li.innerHTML;
                    this.chatWorker.postMessage({"name": li.innerHTML});
                    sessionStorage.setItem("room", li.innerHTML);
                };
                styleUlElement(ul);
                ul.appendChild(li)
            });
            this.rooms.appendChild(ul);
        }

        this.chatWorker = new Worker("chatworker.js");
        this.chatWorker.postMessage({"name": room});

        this.chatWorker.onmessage = event => {
            this.forum.innerHTML = '';
            let ul = document.createElement('ul');
            event.data.map(message => {
                var img = null;
                if (message.text.includes("IMG:")) {
                    img = getImg(message.text);
                }
                let li = document.createElement('li');
                if (img !== null) {
                    li.innerHTML = `${message.user} - `;
                    li.appendChild(img);
                } else {
                    li.innerHTML = `${message.user} - ${message.text}`;
                }
                ul.appendChild(li);
            });
            this.forum.appendChild(ul);
            if (this.forum.scrollHeight - this.forum.scrollTop < 600) {
                updateScroll();
            }
        };
    }
}
class Message {
    constructor(user, text) {
        this.user = user;
        this.text = text;
        this.timestamp = new Date();
    }
}
let forum = new ChatForum();

function buttonFunction() {
    if (document.getElementById("alias").disabled) {
        document.querySelector("#btn").innerHTML = "Set Display Name";
        document.getElementById("alias").disabled = false;
        document.getElementById("message").disabled = true;
    } else {
        document.querySelector("#btn").innerHTML = "Change Display Name";
        document.getElementById("alias").disabled = true;
        document.getElementById("message").disabled = false;
    }
}
function styleLiElement(li) {
    li.onmouseenter = e => {
        li.style.background = "#AAAAFF";
    }
    li.onmouseleave = e => {
        li.style.background = "#CCCCFF";
    }
    li.style.cursor = 'pointer';
    li.style.background = "#CCCCFF";
    li.style.margin = "3px";
}
function styleUlElement(ul) {
    ul.style.listStyleType = "none";
    ul.style.background = "#EEEEEE";
    ul.style.padding = "10px";

}

function newRoomBtnFunc(e) {
    console.log("key");
    if (e.which === 13 || e.keycode === 13) {
        newRoomFunc();
    }
}
function newRoomFunc() {
    this.roomName = document.querySelector("#newRoom");
    var roomNameStr = document.getElementById("newRoom").value;
    console.log(roomNameStr);
    fetch("api/chat/addroom?room=" + roomNameStr);
    this.roomName.value = '';

}
function updateScroll() {
    var forum = document.querySelector("#chat");
    forum.scrollTop = forum.scrollHeight;
}

function getImg(imgName) {
    imgName = imgName.substring(4);
    let img = document.createElement('img');
    img.src = 'api/store/' + imgName + '?width=50';

    let a = document.createElement('a');
    a.href = "photo.html?photo=" + imgName;
    a.appendChild(img);

    return a;
}