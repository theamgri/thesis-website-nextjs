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
    mode: 'cors', // Add this line to enable CORS
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

// Function to capture and store input on Twitter
function captureTwitterInput() {
  document.body.addEventListener('click', function(event) {
    const postButton = event.target.closest('[data-testid="tweetButtonInline"]');
    if (postButton) {
      const tweetInput = document.querySelector('[aria-label="Tweet text"]');
      if (tweetInput) {
        const inputValue = tweetInput.innerText;
        captureInput(inputValue);
      }
    }
  });

  // Twitter Whats Happening
  document.body.addEventListener('click', function(event) {
    const tweetButton = event.target.closest('[data-testid="tweetButton"]');
    if (tweetButton) {
      const tweetInput = document.querySelector('[data-testid="tweetTextarea"]');
      if (tweetInput) {
        const inputValue = tweetInput.textContent;
        captureInput(inputValue);
      }
    }
  });

  // Twitter Post button and replies
  function captureAndStoreInput() {
    const tweetInput = document.querySelector('[data-testid="tweetTextarea_0"]');
    const postButton = document.querySelector('[data-testid="tweetButton"]');
    if (tweetInput && postButton) {
      postButton.addEventListener('click', function() {
        const inputValue = tweetInput.innerText;
        captureInput(inputValue);
      });
    }
  }

  // Call the Twitter Capture functions
  captureAndStoreInput();
}

// Check the current platform (e.g., Twitter or other websites)
if (window.location.hostname === 'twitter.com') {
  captureTwitterInput();
} else {
  // Code for other websites here
  const textInputs = document.querySelectorAll('input[type="text"], textarea');
  textInputs.forEach(textInput => {
    textInput.addEventListener('keydown', function(event) {
      if (event.key === 'Enter') {
        const inputValue = textInput.value;
        captureInput(inputValue);
      }
    });
  });

  // YouTube
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
}
