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


// Capture input from Instagram chat (execute only on Instagram)
if (window.location.hostname === "www.instagram.com") {
  // Identify the input field for Instagram chat
  const instagramChatInput = document.querySelector('[data-lexical-text="true"]');

  // Identify the send button for Instagram chat
  const sendButton = document.querySelector('.x1i10hfl.xjqpnuy.xa49m3k.xqeqjp1.x2hbi6w.xdl72j9.x2lah0s.xe8uvvx.xdj266r.xat24cr.x1mh8g0r.x2lwn1j.xeuugli.x1hl2dhg.xggy1nq.x1ja2u2z.x1t137rt.x1q0g3np.x1lku1pv.x1a2a7pz.x6s0dn4.xjyslct.x1ejq31n.xd10rxx.x1sy0etr.x17r0tee.x9f619.x1ypdohk.x1i0vuye.x1f6kntn.xwhw2v2.xl56j7k.x17ydfre.x2b8uid.xlyipyv.x87ps6o.x14atkfc.xcdnw81.xjbqb8w.xm3z3ea.x1x8b98j.x131883w.x16mih1h.x972fbf.xcfux6l.x1qhh985.xm0m39n.xt7dq6l.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x1n2onr6.x1n5bzlp.x173jzuc.x1yc6y37.xfs2ol5');

  if (instagramChatInput && sendButton) {
    // Listen for Enter key press in the Instagram chat input field
    instagramChatInput.addEventListener('keydown', function(event) {
      if (event.key === 'Enter') {
        const inputValue = instagramChatInput.textContent.trim();
        console.log("Input Value:", inputValue); // Log the input value
        captureInput(inputValue);
      }
    });

    // Listen for click event on the Instagram chat send button
    sendButton.addEventListener('click', function() {
      const inputValue = instagramChatInput.textContent.trim();
      console.log("Input Value:", inputValue); // Log the input value
      captureInput(inputValue);
    });
  }
}



// ...


// ...

