let autoReloadTabId = null;

// Create a context menu item for auto reload
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "autoReload",
        title: "Auto Reload",
        type: "checkbox",
        contexts: ["page"]
    });
});

// Listen for click on context menu item
chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "autoReload") {
        if (info.checked) {
            autoReloadTabId = tab.id;
            chrome.alarms.create("reloadTab", { periodInSeconds: 5 });
            console.log("Auto Reload Enabled on tab ", autoReloadTabId);
        } else {
            chrome.alarms.clear("reloadTab");
            console.log("Auto Reload Disabled on tab ", autoReloadTabId);
            autoReloadTabId = null;
        }
    }
});

// Reload selected tab
chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === "reloadTab" && autoReloadTabId !== null) {
        chrome.tabs.reload(autoReloadTabId);
        console.log("Reloading Tab: ", autoReloadTabId);
    }
});

