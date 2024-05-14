const CHECK_BLOCK_TIMER = 500;
const CHECK_LOGIN_TIMER = 500;
const CLICK_OPTION_BUTTON_TIMER = 500;
const CLICK_BLOCK_BUTTON_TIMER = 500;
const CONFIRM_BLOCK_BUTTON_TIMER = 500;
const CLICK_DISMISS_BUTTON_TIMER = 500;

// check if user is logged in
async function checkIGLogin() {
  return new Promise((resolve, reject) => {
    const CL = setInterval(() => {
      let links = document.querySelectorAll("a");

      if (links[0]) {
        let logged = true;

        for (let link of links) {
          let linkHref = link.getAttribute("href");
          let linkText = link.textContent.trim().toLowerCase();

          let bool =
            `${linkHref}`.includes("accounts/login/") ||
            `${linkHref}`.includes("accounts/emailsignup/");

          if (bool) {
            if (linkText === "log in" || linkText === "sign up") {
              logged = false;
              break;
            }
          }
        }

        clearInterval(CL);
        resolve(logged);
      }
    }, CHECK_LOGIN_TIMER);
  });
}

async function checkTTLogin() {
  return new Promise((resolve, reject) => {
    const CL = setInterval(() => {
      let buttons = document.querySelectorAll("button");

      if (buttons[0]) {
        let logged = true;

        for (let button of buttons) {
          let buttonText = button.textContent.trim().toLowerCase();

          if (buttonText === "log in" || buttonText === "sign up") {
            logged = false;
            break;
          }
        }

        clearInterval(CL);
        resolve(logged);
      }
    }, CHECK_LOGIN_TIMER);
  });
}

//check if user is already block
async function checkIGBlocked() {
  return new Promise((resolve, reject) => {
    const CB = setInterval(() => {
      let div = document.querySelector(
        'div[class="x6s0dn4 x78zum5 x1q0g3np xs83m0k xeuugli x1n2onr6"]'
      );

      if (div) {
        const btns = div.querySelectorAll("button");
        let blockedBtn;
        for (let btn of btns) {
          if (btn.textContent.trim() === "Unblock") {
            blockedBtn = btn;
            break;
          }
        }

        if (blockedBtn) {
          clearInterval(CB);

          resolve("blocked");
        } else if (div && !blockedBtn) {
          clearInterval(CB);
          resolve("not blocked");
        }
      }
    }, CHECK_BLOCK_TIMER);
  });
}

async function checkTTBlocked() {
  return new Promise((resolve, reject) => {
    const CB = setInterval(() => {
      let div = document.querySelector(
        'div[class="css-1h3j14u-DivFollowButtonWrapper e18e4obn4"]'
      );

      if (div) {
        const btns = div.querySelectorAll("button");
        let blockedBtn;
        for (let btn of btns) {
          if (btn.textContent.trim() === "Unblock") {
            blockedBtn = btn;
            break;
          }
        }

        if (blockedBtn) {
          clearInterval(CB);

          resolve("blocked");
        } else if (div && !blockedBtn) {
          clearInterval(CB);
          resolve("not blocked");
        }
      }
    }, CHECK_BLOCK_TIMER);
  });
}

async function blockTTAccount() {
  return new Promise((resolve, reject) => {
    const hoverButton = document.querySelector('div[data-e2e="user-more"]');
    hoverButton.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
    // Wait for the menu to appear
    setTimeout(() => {
        // Now click the actual block button
        const actualBlockButton = document.querySelector('div[aria-label="Block"]');
        if (actualBlockButton) {
            actualBlockButton.click();

              // Wait for the confirmation modal to appear
              setTimeout(() => {
                const confirmBlockButton = document.querySelector('button[data-e2e="block-popup-block-btn"]');
                if (confirmBlockButton) {
                    confirmBlockButton.click();

                    // Wait 1 second before reloading the page
                    setTimeout(() => {
                        location.reload();
                        setTimeout(() => resolve('proceed'), 1000);
                    }, 500); // 1 second delay before reloading the page
                } else {
                    console.error('Confirmation block button not found');
                }
            }, 500); // Adjust this timeout based on how quickly the modal appears
        } else {
            console.error('Actual block button not found');
        }
    }, 500); // Adjust timeout as need
  });
}

async function hoverTTOptionBtn() {
  return new Promise((resolve, reject) => {
    const COB = setInterval(() => {
      const hoverButton = document.querySelector('div[data-e2e="user-more"]');
      if (hoverButton) {
        hoverButton.dispatchEvent(new MouseEvent('mouseover', { bubbles: true }));
        clearInterval(COB);
        resolve();
      }
    }, CLICK_OPTION_BUTTON_TIMER);
  });
}

async function clickTTBlockBtn() {
  return new Promise((resolve, reject) => {
    const CBB = setInterval(() => {
      const actualBlockButton = document.querySelector('div[aria-label="Block"]');
      if (actualBlockButton) {
        actualBlockButton.click();
        clearInterval(CBB);
        resolve();
      }
    }, CLICK_BLOCK_BUTTON_TIMER);
  });
}

async function clickTTConfirmBlockBtn() {
  return new Promise((resolve, reject) => {
    const CoBB = setInterval(() => {
      const confirmBlockButton = document.querySelector('button[data-e2e="block-popup-block-btn"]');
      if (confirmBlockButton) {
        confirmBlockButton.click();
        clearInterval(CoBB);
        resolve();
      } 
    }, CONFIRM_BLOCK_BUTTON_TIMER);
  });
}


// click option button
async function cilckOptionBtn() {
  return new Promise((resolve, reject) => {
    const COB = setInterval(() => {
      let optionsButton = document.querySelector(
        'div[class="x1i10hfl x972fbf xcfux6l x1qhh985 xm0m39n x9f619 xe8uvvx xdj266r x11i5rnm xat24cr x1mh8g0r x16tdsg8 x1hl2dhg xggy1nq x1a2a7pz x6s0dn4 xjbqb8w x1ejq31n xd10rxx x1sy0etr x17r0tee x1ypdohk x78zum5 xl56j7k x1y1aw1k x1sxyh0 xwib8y2 xurb0ha xcdnw81"]'
      );
      if (optionsButton) {
        optionsButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        clearInterval(COB);
        resolve();
      }
    }, CLICK_OPTION_BUTTON_TIMER);
  });
}

// click block button
async function clickBlockBtn() {
  return new Promise((resolve, reject) => {
    const CBB = setInterval(() => {
      let div = document.querySelector(
        `div[class="x7r02ix xf1ldfh x131esax xdajt7p xxfnqb6 xb88tzc xw2csxc x1odjw0f x5fp0pe"]`
      );
      if (div) {
        const btns = div.querySelectorAll("button");
        let firstButton;

        for (let btn of btns) {
          if (btn.textContent.trim() === "Block") {
            firstButton = btn;
            break;
          }
        }

        if (firstButton) {
          firstButton.click();
          clearInterval(CBB);
          resolve();
        }
      }
    }, CLICK_BLOCK_BUTTON_TIMER);
  });
}

// click the second block button to confirm it
async function clickConfirmBlockBtn() {
  return new Promise((resolve, reject) => {
    const CoBB = setInterval(() => {
      let div = document.querySelector('div[class="x78zum5 xdt5ytf xl56j7k"]');

      if (div) {
        const btns = div.querySelectorAll("button");
        let confirmBlockButton;
        for (let btn of btns) {
          if (btn.textContent.trim() === "Block") {
            confirmBlockButton = btn;
            break;
          }
        }

        if (confirmBlockButton) {
          confirmBlockButton.click();
          clearInterval(CoBB);
          resolve();
        }
      }
    }, CONFIRM_BLOCK_BUTTON_TIMER);
  });
}

async function clickDismissBtn() {
  return new Promise((resolve, reject) => {
    const CDB = setInterval(() => {
      let div = document.querySelector('div[class="x78zum5 xdt5ytf xl56j7k"]');

      if (div) {
        const btns = div.querySelectorAll("button");
        let dismissBtn;
        for (let btn of btns) {
          if (btn.textContent.trim() === "Dismiss") {
            dismissBtn = btn;
            break;
          }
        }

        if (dismissBtn) {
          clearInterval(CDB);
          resolve("proceed");
        }
      }
    }, CLICK_DISMISS_BUTTON_TIMER);
  });
}

//Send message to background script
async function sendMessage(message) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({ action: message }, () => {
      resolve();
    });
  });
}

async function waitASecond(sec = 1) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, sec * 1000);
  });
}

async function waitRandomSeconds(min = 1, max = 4) {
  const seconds = Math.floor(Math.random() * (max - min + 1)) + min;
  return new Promise(resolve => setTimeout(resolve, seconds * 1000));
}


function getAccountType(url){
  if(url.includes('instagram')) return 'instagram';
  if(url.includes('tiktok')) return 'tiktok';
}

(async function () {
  try {
    let message;
    const accountType = getAccountType(window.location.href)
    console.log(window.location.href)
    console.log(accountType)
    if(accountType === 'instagram'){
      const logged = await checkIGLogin();
      console.log(logged);
      if (!logged) {
        sendMessage("abort");
        alert(
          "IG blocker: Please log in to your account in order to block users"
        );
        return;
      }
      const blockedState = await checkIGBlocked();
      if (blockedState === "blocked") {
        await sendMessage("proceed");
        return;
      }
      await waitRandomSeconds(); 
      await cilckOptionBtn();
      await waitRandomSeconds(); 
      await clickBlockBtn();
      await waitRandomSeconds(); 
      await clickConfirmBlockBtn();
      await waitRandomSeconds(); 
      message = await clickDismissBtn();
      await waitRandomSeconds(); 
      await waitASecond(1)
      await sendMessage(message);
    }

    else if (accountType === 'tiktok'){
      const logged = await checkTTLogin();
      console.log(logged);
      if (!logged) {
        sendMessage("abort");
        alert(
          "Tiktok blocker: Please log in to your account in order to block users"
        );
        return;
      }
      const blockedState = await checkTTBlocked();
      if (blockedState === "blocked") {
        await sendMessage("proceed");
        return;
      }
      await waitRandomSeconds(); 
      await hoverTTOptionBtn();
      await waitRandomSeconds(); 
      await clickTTBlockBtn();
      await waitRandomSeconds(); 
      await clickTTConfirmBlockBtn();
      await waitRandomSeconds(); 
      await waitASecond(1)
      await sendMessage('proceed');
      await waitASecond(5)
    }
  } catch (error) {
    console.error("Error in handling the block action:", error);
  }
})();
