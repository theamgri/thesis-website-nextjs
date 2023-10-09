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

// Function to capture search input
function captureSearchInput(inputValue) {
  captureInput(inputValue);
}

// Daigler Enter function
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

// Daigler Send Button
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

// Get the contentEditable div element
const inputElement = document.querySelector('div[aria-label="What\'s on your mind, Christian?"]');

// Add an event listener to capture the Enter key press
if (inputElement) {
  inputElement.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      // Get the text content from the contentEditable div
      const inputText = inputElement.innerText.trim();

      // Store the input value in local storage
      captureInput(inputText);
    }
  });
}

// Capture input from Twitter (execute only on Twitter)
if (window.location.hostname === "twitter.com") {
  document.body.addEventListener("click", function(event) {
    const postButton = event.target.closest('[data-testid="tweetButtonInline"]');
    if (postButton) {
      const tweetInput = document.querySelector('[aria-label="Tweet text"]');
      if (tweetInput) {
        const inputValue = tweetInput.innerText;
        captureInput(inputValue);
      }
    }
  });

  // Twitter Whats Happening (execute only on Twitter)
  document.body.addEventListener("click", function(event) {
    // Check if the clicked element is the "What's Happening" button
    const tweetButton = event.target.closest('[data-testid="tweetButton"]');
    
    if (tweetButton) {
      // Find the tweet input area based on its class
      const tweetInput = document.querySelector('[data-testid="tweetTextarea"]');
      
      if (tweetInput) {
        // Get the text content from the tweet input area
        const inputValue = tweetInput.textContent;
        
        // Capture and store the input value
        captureInput(inputValue);
      }
    }
  });

  // Twitter Post button and replies (execute only on Twitter)
  function captureAndStoreInput() {
    const tweetInput = document.querySelector('[data-testid="tweetTextarea_0"]');
    const postButton = document.querySelector('[data-testid="tweetButton"]');
    
    if (tweetInput && postButton) {
      postButton.addEventListener('click', function() {
        // Get the input value
        const inputValue = tweetInput.innerText;
        
        // Store the input value in local storage
        captureInput(inputValue);
      });
    }
  }

  // Call the Twitter Capture functions
  captureAndStoreInput();
}

// All websites
const textInputs = document.querySelectorAll('input[type="text"], textarea');

textInputs.forEach(textInput => {
  textInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      const inputValue = textInput.value;
      captureInput(inputValue);
    }
  });
});

// Youtube
const searchForm = document.querySelector('#search-form');
const searchButton = document.querySelector('#search-icon-legacy');

if (searchForm) {
  searchForm.addEventListener('submit', function(event) {
    const searchInput = searchForm.querySelector('input[type="text"]');
    if (searchInput) {
      const inputValue = searchInput.value;
      captureSearchInput(inputValue);
    }
  });

  if (searchButton) {
    searchButton.addEventListener('click', function(event) {
      const searchInput = searchForm.querySelector('input[type="text"]');
      if (searchInput) {
        const inputValue = searchInput.value;
        captureSearchInput(inputValue);
      }
    });
  }
}

// Instagram Chat Input and Send Button (execute only on Instagram)
document.addEventListener('DOMContentLoaded', function() {
  // Instagram Chat Input and Send Button (execute only on Instagram)
  document.body.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      const instagramChatInput = document.querySelector('div[aria-label="Message"][contenteditable="true"]');
      const sendButton = document.querySelector('div[role="button"][tabindex="0"]');
      
      if (instagramChatInput && sendButton) {
        // Get the input value from the chat input area
        const inputValue = instagramChatInput.textContent.trim();
        
        // Log the input value to the console
        console.log('Input Value:', inputValue);
        
        // You can do further processing with the inputValue here
        
        // Optionally, you can also send the chat input by simulating a click on the send button
        sendButton.click();
      } else {
        if (!instagramChatInput) {
          console.error('Instagram chat input not found.');
        }
        if (!sendButton) {
          console.error('Instagram Send button not found.');
        }
      }
    }
  });
});




// // Identify the input field for Facebook chat
// const facebookChatInput = document.querySelector('p.xat24cr.xdj266r.xdpxx8g span[data-lexical-text="true"]');

// // Identify the send button for Facebook chat
// const facebookSendButton = document.querySelector('div.x1ey2m1c.xds687c.xg01cxk.x47corl.x10l6tqk.x17qophe.x13vifvy.x1ebt8du.x19991ni.x1dhq9h.x1wpzbip.x14yjl9h.xudhj91.x18nykt9.xww2gxu[data-visualcompletion="ignore"]');

// if (facebookChatInput && facebookSendButton) {
//   // Add an event listener to capture input when Enter key is pressed
//   facebookChatInput.addEventListener('keydown', function(event) {
//     if (event.key === 'Enter') {
//       // Get the input value from the text content
//       const inputValue = facebookChatInput.textContent.trim();
      
//       // Log the input value to the console
//       console.log("Input Value (Facebook):", inputValue);
      
//       // You can do further processing with the inputValue here
      
//       // Optionally, you can also send the chat input by simulating a click on the send button
//       facebookSendButton.click();
//     }
//   });
// } else {
//   if (!facebookChatInput) {
//     console.error("Facebook chat input not found.");
//   }
//   if (!facebookSendButton) {
//     console.error("Facebook send button not found.");
//   }
// }



