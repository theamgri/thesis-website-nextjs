// background.js
chrome.runtime.onInstalled.addListener(() => {
  // Initialization code, if needed
});
setTimeout(function() {
  chrome.storage.local.get({ inputs: [] }, function(result) {
    // Your code here
  });
}, 1000); // Adjust the delay time as needed