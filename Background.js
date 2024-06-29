console.log("Service worker started");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  const url = request.url;
  console.log("Received URL in background script:", url);

  // Call the URL analysis function
  const classification = is_legitimate(url);

  // Send the classification back to the content script
  console.log("Sending classification:", classification);
  sendResponse(classification);
});

function is_legitimate(url) {
  const explanation = [];  // Store explanations for suspicious links

  // Check for suspicious factors
  if (url.length > 75) {
    explanation.push("URL length is excessively long.");
  }

  const specialChars = /[~#?+=&*%]+/g;
  if (specialChars.test(url)) {
    explanation.push("URL contains special characters.");
  }

  const parsedUrl = new URL(url);
  if (parsedUrl.protocol !== 'https:') {
    explanation.push("URL does not use HTTPS.");
  }

  const subdomains = parsedUrl.hostname.split('.');
  const suspiciousSubdomains = ["gmail", "hotmail", "yahoo", "aol"];
  for (let subdomain of subdomains) {
    if (suspiciousSubdomains.includes(subdomain)) {
      explanation.push("Suspicious subdomain detected.");
      break;
    }
  }

  if (explanation.length > 0) {
    return { classification: "Suspicious", explanation: 
explanation.join("\n") };
  } else {
    return { classification: "Legitimate" };
  }
}
