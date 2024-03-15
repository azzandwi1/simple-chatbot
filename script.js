function submitForm() {
    var userInput = document.getElementById("user-input").value;

    // Append user's question to the chat box
    appendMessage(userInput, "You");

    // Send the user's question to the Flask server
    fetch('http://127.0.0.1:5000/jawab_pertanyaan', {
        method: 'POST',
        body: new URLSearchParams({
            'pertanyaan': userInput
        }),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    })
    .then(response => response.text())
    .then(data => {
        // Append chatbot's response to the chat box
        appendMessage(data, "Chatbot");
    })
    .catch(error => console.error('Error:', error));

    // Clear the input field
    document.getElementById("user-input").value = "";
}


function appendMessage(message, sender) {
    var chatBox = document.getElementById("chat-box");
    var newMessage = document.createElement("div");
    newMessage.textContent = message;

    // Add a CSS class based on the sender
    if (sender === "You") {
        newMessage.classList.add("user-message", "message-box");
    } else if (sender === "Chatbot") {
        newMessage.classList.add("chatbot-message", "message-box");
    }

    chatBox.appendChild(newMessage);
    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to the bottom
}

