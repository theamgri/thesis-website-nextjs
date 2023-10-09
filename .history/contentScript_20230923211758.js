// Function to capture and store an input
function captureInput(inputValue) {
  if (!inputValue.trim()) {
    return; // Skip empty inputs
  }

  // Send the captured input to the Python server
  sendInputToPython(inputValue);

  chrome.storage.local.get({ inputs: [] }, function(result) {
    const storedInputs = result.inputs;
    storedInputs.push(inputValue);
    chrome.storage.local.set({ inputs: storedInputs }, function() {
      if (chrome.runtime.lastError) {
        console.error('Storage error:', chrome.runtime.lastError);
      }
    });
  });
}

// Function to send input to Python for sentiment analysis
function sendInputToPython(inputValue) {
  const url = 'http://localhost:5000/analyze';
  const options = {
    method: 'POST',
    mode: 'cors',  // Add this line to enable CORS
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text: inputValue }),
  };

  fetch(url, options)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Server response:', data);
    })
    .catch(error => {
      console.error('Fetch Error:', error);
    });
}

// Function to capture input from text areas
function captureTextAreaInput() {
  const textAreas = document.querySelectorAll('.rui-textarea.form-control.w-100.mx-0.mb-2');
  textAreas.forEach(textArea => {
    textArea.addEventListener("keydown", function(event) {
      if (event.key === "Enter") {
        const inputValue = textArea.value;
        captureInput(inputValue);
      }
    });
  });
}

// Function to capture input when the button is clicked
function captureButtonInput() {
  const button = document.querySelector('.btn.btn-primary.mt-1.col.mr-2');
  if (button) {
    button.addEventListener("click", function() {
      const textArea = document.querySelector('.rui-textarea.form-control.w-100.mx-0.mb-2');
      if (textArea) {
        const inputValue = textArea.value;
        console.log("Textarea content: ", inputValue);
        captureInput(inputValue);
      }
    });
  }
}

// Call the functions to capture input from text areas and buttons
captureTextAreaInput();
captureButtonInput();

// Generalized function to capture input from text areas on any website
function captureTextAreaInputs(textAreaSelector, buttonSelector) {
  const textAreas = document.querySelectorAll(textAreaSelector);

  textAreas.forEach(textArea => {
    textArea.addEventListener("keydown", function(event) {
      if (event.key === "Enter") {
        const inputValue = textArea.value;
        captureInput(inputValue);
      }
    });
  });

  const button = document.querySelector(buttonSelector);
  if (button) {
    button.addEventListener("click", function() {
      const textArea = document.querySelector(textAreaSelector);
      if (textArea) {
        const inputValue = textArea.value;
        console.log("Textarea content: ", inputValue);
        captureInput(inputValue);
      }
    });
  }
}

// Define the selectors for text areas and buttons on specific websites
const facebookSelectors = {
  textAreaSelector: '.rui-textarea.form-control.w-100.mx-0.mb-2',
  buttonSelector: '.btn.btn-primary.mt-1.col.mr-2',
};

const youtubeSelectors = {
  textAreaSelector: '.youtube-textarea-class', // Replace with the actual selector
  buttonSelector: '.youtube-button-class', // Replace with the actual selector
};

// Check the current website and capture input accordingly
if (currentUrl.includes("facebook.com")) {
  captureTextAreaInputs(facebookSelectors.textAreaSelector, facebookSelectors.buttonSelector);
} else if (currentUrl.includes("youtube.com")) {
  captureTextAreaInputs(youtubeSelectors.textAreaSelector, youtubeSelectors.buttonSelector);
}

// More website-specific conditions can be added as needed
