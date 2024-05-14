let STATE = "resolve";

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // ES6 destructuring swap
  }
}

async function fetchUserList() {
  console.log("start fetching")
  const storage = await chrome.storage.sync.get(['listItems'])
  const users = storage.listItems.filter(list => list.checked).map(list => list.content).flat()
  console.log(users)
  shuffle(users)
  blockUsers(users);
}


async function blockUsers(users) {
  for (let userUrl of users) {
    if (STATE === "resolve") {
      await openUserAndBlock(userUrl);
    }
  }
}

async function openUserAndBlock(userUrl) {
  console.log("*******************************************");
  return new Promise((resolve) => {
    chrome.tabs.create({ url: userUrl }, (tab) => {
      chrome.tabs.onUpdated.addListener(function listener(
        updatedTabId,
        changeInfo
      ) {
        if (updatedTabId === tab.id && changeInfo.status === "complete") {
          // Once the tab is fully loaded, inject the content script
          // Remove the listener
          chrome.tabs.onUpdated.removeListener(listener);

          chrome.scripting.executeScript(
            {
              target: { tabId: tab.id, allFrames: true },
              files: ["contentScript.js"],
            },
            () => {
              console.log("Content script injected successfully!");
              resolve();
            }
          );
        }
      });
    });
  });
}

chrome.runtime.onMessage.addListener(onMessage);
function onMessage(message, sender, sendResponse) {
  console.log(message)
  if (message.action === "proceed") {
    const tabId = sender.tab.id;
    STATE = "resolve";
    chrome.tabs.remove(tabId, () => {});
  } else if (message.action === "abort") {
    STATE = "reject";
  }
  return undefined;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "startBlocking") {
    STATE = "resolve";
    fetchUserList().catch((error) =>
      console.error("Failed to fetch user list", error)
    );
  }
});
