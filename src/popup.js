function scanPage() {
    return document.body.innerText;
}
var a = scanPage();
console.log(a);
var header = document.getElementById("header");
var url = chrome.runtime.getURL("index.html");
document.addEventListener('DOMContentLoaded', function () {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        var _a;
        var header = document.getElementById("header");
        var tabId = (_a = tabs[0]) === null || _a === void 0 ? void 0 : _a.id;
        if (!tabId)
            return;
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            func: function () { return document.body.innerText; },
        }, function (results) {
            var header = document.getElementById("header");
            if (header && results && results[0] && results[0].result) {
                header.innerText = results[0].result.substring(0, 500); // Show first 500 chars
            }
        });
    });
});
