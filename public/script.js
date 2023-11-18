const socket = io(); //creating instance

//getting html elements
const form = document.getElementById("form");
const input = document.getElementById("input");
const messages = document.getElementById("messages");
const history = document.getElementById("history");

//from client on submit-event emitting a massage to server
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value) {
    socket.emit("chat message", input.value); //emit massage
    input.value = "";
  }
});

//received massage from server and then display it on dom.
socket.on("chat message", (msg) => {
  const item = document.createElement("li");

  //showing prompt asked by user
  if (msg.hasOwnProperty("client")) {
    item.textContent = `You: ${msg.client}`;
    messages.appendChild(item);

    const loaderDiv = document.createElement("div");
    loaderDiv.setAttribute("class", "loader");
    loaderDiv.textContent =
      "Please wait, Bob is getting the best response for you...";
    messages.appendChild(loaderDiv);
  } else {
    //showing response of prompt
    let element = messages.getElementsByClassName("loader");
    element[0].remove();
    item.textContent = `Bob: ${msg.chatGpt}`;
    messages.appendChild(item);
    messages.innerHTML = " "; //tricking the dom
  }
  window.scrollTo(0, document.body.scrollHeight);
});

//sending event to get data from the mongodb on first load of application
socket.emit("historyData", "onload");

//listening event when "historyData" event emit value from server side.
socket.on("historyData", (data) => {
  if (data.length) {
    renderHistory(data);
  }
});

//render function to display history data in the dom.
function renderHistory(data) {
  history.innerHTML = " ";
  data.forEach((obj) => {
    const dateString = obj.date;
    const date = new Date(dateString);

    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    const formattedDate = new Intl.DateTimeFormat("en", options).format(date);

    let i = document.createElement("li");
    let p1 = `<p>${obj.prompt}</p>`;
    let p2 = `<p>${obj.response}</p>`;

    let html = `<div class="promptContainer">
                        <span class="promptDate">${formattedDate}</span>
                        <div class="promptWrapper">
                           <p>You: ${obj.prompt}</P
                           <p>Bob: ${obj.response}</P
                        </div>
                      </div>`;

    i.innerHTML = html;
    history.appendChild(i);
  });
}
