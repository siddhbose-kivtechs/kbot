// DOM Elements
const send_icon = document.getElementsByClassName("send-icon")[0];
const input = document.getElementsByClassName("InputMSG")[0];
const ContentChat = document.getElementsByClassName("ContentChat")[0];
const send1 = document.getElementById("send1");
const send2 = document.getElementById("send2");

// Event Listeners
send_icon.addEventListener("click", SendMsgUser);
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    SendMsgUser();
  }
});

// Bot Status (0 = ready, 1 = busy)
let status_func_SendMsgBot = 0;

// Helper Function to Get Bot Response
function getBotResponse(msg) {
  const listMSG = {
    hello: ["Hello!", "Hi 👋 ! It's good to see you!", "Great to see you here!"],
    hwa: ["I'm fine!", "I am fine", "I feel good seeing you 😊", "I feel great 🤪"],
    about: [
      "I'm happy you asked about that!",
      "My name is RayBot, I'm a simple and fun bot and I can answer your questions to some extent and do the things you want 😉",
    ],
  };

  const listScan = {
    hello: ["hi", "hello", "hey"],
    hwa: ["how are you", "hwa", "you are good", "you are fine", "are you well", "are you alright"],
    about: ["information", "tell me about yourself", "introduce yourself", "who are you", "how about your self"],
  };

  for (const key in listScan) {
    if (listScan[key].includes(msg)) {
      return listMSG[key][Math.floor(Math.random() * listMSG[key].length)];
    }
  }
  return "😵‍💫 Oops! Sorry, I didn't understand your question.";
}

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
    SendMsgBot(userMessage);
  }
}

// Function to Send Bot Message
function SendMsgBot(msg) {
  status_func_SendMsgBot = 1;

  // Add Loading Animation
  const loadingElement = document.createElement("div");
  loadingElement.classList.add("massage");
  loadingElement.innerHTML = `<div class="bot-response text" text-first="true"><svg>...</svg></div>`;
  ContentChat.appendChild(loadingElement);
  loadingElement.scrollIntoView();

  // Simulate Bot Processing Delay
  setTimeout(() => {
    const botResponse = getBotResponse(msg.toLowerCase());

    // Replace Loading Animation with Bot Response
    loadingElement.innerHTML = `<div class="bot-response text" text-first="true">${botResponse}</div>`;
    loadingElement.scrollIntoView();

    // Reset Bot Status
    status_func_SendMsgBot = 0;
  }, 2000);
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