
function getRooms(){
    fetch('api/chat/rooms')
            .then(response => {
                if(response.ok){
                    return response.json();
                }
                throw new Error("Failed to load message from " + this.name);
            })
            .then(messages => {
                postMessage(messages);
            })
            .catch(e=>console.log(e));
    
    setTimeout("getRooms()", 5000);
}
getRooms();