{
  "manifest_version": 3,
  "name": "Phishing URL Detector",
  "version": "1.0",
  "description": "Highlights potentially suspicious links",
  "permissions": [
    "activeTab",
    "scripting"
  ],
  "background": {
    "service_worker": "background.js"
  },
  "content_scripts": [{
    "matches": ["<all_urls>"],
    "js": ["content.js"]
  }]
}

