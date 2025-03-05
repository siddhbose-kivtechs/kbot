
// DOM Elements
const send_icon = document.getElementsByClassName("send-icon")[0];
const input = document.getElementsByClassName("InputMSG")[0];
const ContentChat = document.getElementsByClassName("ContentChat")[0];
const send1 = document.getElementById("send1");
const send2 = document.getElementById("send2");

// Server URL
const SERVER_URL = "https://log-api-hono.vercel.app/api/chat"; // Replace with your server URL

// Event Listeners
send_icon.addEventListener("click", SendMsgUser);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    SendMsgUser();
  }
});

// Bot Status (0 = ready, 1 = busy)
let status_func_SendMsgBot = 0;

// Function to Send User Message
function SendMsgUser() {
  if (input.value.trim() !== "" && status_func_SendMsgBot === 0) {
    const userMessage = input.value.trim();

    // Add User Message to Chat
    const userMsgElement = document.createElement("div");
    userMsgElement.classList.add("massage", "msgCaption");
    userMsgElement.setAttribute("data-user", "true");
    userMsgElement.innerHTML = `<span class="captionUser">You</span><div class="user-response">${userMessage}</div>`;
    ContentChat.appendChild(userMsgElement);
    userMsgElement.scrollIntoView();

    // Clear Input and Send Bot Response
    input.value = "";
    SendMsgToServer(userMessage);
  }
}

// Function to Send Message to Server
function SendMsgToServer(msg) {
  status_func_SendMsgBot = 1;

  // Add Loading Animation
  const loadingElement = document.createElement("div");
  loadingElement.classList.add("massage");
  loadingElement.innerHTML = `<div class="bot-response text" text-first="true"><svg>...</svg></div>`;
  ContentChat.appendChild(loadingElement);
  loadingElement.scrollIntoView();

  // Send Message to Server
  fetch(SERVER_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: msg }),
  })
    .then((response) => response.json())
    .then((data) => {
      // Replace Loading Animation with Bot Response
      loadingElement.innerHTML = `<div class="bot-response text" text-first="true">${data.response}</div>`;
      loadingElement.scrollIntoView();
    })
    .catch((error) => {
      console.error("Error:", error);
      loadingElement.innerHTML = `<div class="bot-response text" text-first="true">😵‍💫 Oops! Something went wrong. Please try again.</div>`;
      loadingElement.scrollIntoView();
    })
    .finally(() => {
      // Reset Bot Status
      status_func_SendMsgBot = 0;
    });
}

// Initial Bot Greeting
function sendInitialGreeting() {
  const greetingElement = document.createElement("div");
  greetingElement.classList.add("massage");
  greetingElement.innerHTML = `<div class="bot-response text" text-first="true">Hi 👋 ! It's good to see you!</div><div class="bot-response text" text-last="true">How can I help you?</div>`;
  ContentChat.appendChild(greetingElement);
  greetingElement.scrollIntoView();
}

// Send Initial Greeting After 2 Seconds
setTimeout(sendInitialGreeting, 2000);