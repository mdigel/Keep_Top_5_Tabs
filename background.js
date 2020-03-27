
// declare array
const mostRecentTabs = [];

// track most recent tabs
chrome.tabs.onActivated.addListener((tab) => {
  // create array/object to store a tab each time it's activate
  console.log(`hello tab: ${tab.tabId}`);


  // remove tab from array if it already exist
  if (mostRecentTabs.includes(tab.tabId) === true) {
    const index = mostRecentTabs.indexOf(tab.tabId);
    if (index > -1) {
      mostRecentTabs.splice(index, 1);
    }
  }

  // push most recent active tab to the end
  mostRecentTabs.push(tab.tabId);

  // remove oldest tab from the begining
  // only if length is greater than 5
  if (mostRecentTabs.length > 5) {
    mostRecentTabs.shift();
  }

  console.log(mostRecentTabs);
});


// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener((tab) => {
  chrome.tabs.query({}, (tabs) => {
    // filter out mostRecentTabs
    const tabsToClose = tabs.filter((x) => !mostRecentTabs.includes(x.id));

    console.log(tabsToClose);

    chrome.tabs.remove(tabsToClose.map((x) => x.id));
  });
});

// For Saturday
// add current tab by defualt
// track the window
