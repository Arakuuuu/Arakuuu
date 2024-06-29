document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('a');
  console.log("Number of links found:", links.length);

  links.forEach(link => {
    link.addEventListener('mouseover', () => {
      const url = link.href;
      console.log("Mouse over link:", url);
      chrome.runtime.sendMessage({ url: url }, (response) => {
        if (response.classification === "Suspicious") {
          console.log("Suspicious link found:", url);
          link.style.backgroundColor = 'red';
          link.title = response.explanation;
        } else {
          console.log("Legitimate link found:", url);
          link.style.backgroundColor = 'green';
        }
        link.style.color = 'white';
      });
    });
  });
});

// Inject CSS for styling (optional)
const css = `
  a[href*="http:"] {
    /* Adjust default styling for HTTP links if needed */
  }
`;

const style = document.createElement('style');
style.textContent = css;
document.head.appendChild(style);

