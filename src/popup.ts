
function scanPage(){
    return document.body.innerText;
}

let a:string=scanPage();

console.log(a);

const header=document.getElementById("header");

const url:string=chrome.runtime.getURL("index.html");


document.addEventListener('DOMContentLoaded', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const header = document.getElementById("header");
      const tabId = tabs[0]?.id;
    if (!tabId) return;

      chrome.scripting.executeScript(
      {
        target: { tabId: tabId },
        func: () => document.body.innerText,
      },
      (results) => {
        const header = document.getElementById("header");
        if (header && results && results[0] && results[0].result) {
          header.innerText = results[0].result.substring(0, 500); // Show first 500 chars
        }
      }
    );
  });
});