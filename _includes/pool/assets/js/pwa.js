// Progressive Web App Install Prompt

// Browser detection logic
const userAgent = navigator.userAgent.toLowerCase();
let browser = 'other';

if (userAgent.includes('firefox')) {
    browser = 'firefox';
} else if (userAgent.includes('safari') && !userAgent.includes('chrome')) {
    browser = 'safari'; // iOS/Mac Safari
} else if (userAgent.includes('edg/')) {
    browser = 'edge';
} else if (userAgent.includes('chrome')) {
    browser = 'chrome';
}

// Global variable to use in your PWA logic
window.currentBrowser = browser;
// console.log('Detected Browser:', window.currentBrowser);

if ( window.currentBrowser === 'chrome' || window.currentBrowser === 'edge' ) {

    document.getElementById('pwa-install-banner').innerHTML = `
<p><strong>How to Install a Progress Web App</strong></p>
<div class="alert alert-success">
    <div class="d-flex align-items-center">
        <div class="me-3 text-dark">
            <p><strong>Your Browswer Supports Easy Install for Progress Web Apps! Click the button to install this app.</strong></p>
            <button id="btn-install-pwa" type="button" class="btn btn-primary btn-sm me-2">Install</button>
        </div>
    </div>
</div>`;
}


// document.addEventListener('DOMContentLoaded', () => {
//     const installBtn = document.getElementById('btn-install-pwa');
//     const bannerSmallText = document.querySelector('#pwa-install-banner .small');

//     if (window.currentBrowser === 'firefox') {
//         installBtn.style.display = 'none'; // Button won't work in Firefox
//         bannerSmallText.innerHTML = "Tap the menu <strong>(⋮)</strong> and select <strong>'Install'</strong>.";
//     } else if (window.currentBrowser === 'safari') {
//         installBtn.style.display = 'none'; // Button won't work in Safari
//         bannerSmallText.innerHTML = "Tap the <strong>Share</strong> icon and select <strong>'Add to Home Screen'</strong>.";
//     }
// });


let deferredPrompt;
const installButton = document.getElementById('btn-install-pwa');

// 1. Check if the app is already running in "standalone" mode (installed)
const isInstalled = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;

window.addEventListener('beforeinstallprompt', (e) => {
//   e.preventDefault();
  deferredPrompt = e;
});

// Handle the "Install" button click
installButton.addEventListener('click', async () => {

    // console.log("Button clicked!");
  if (deferredPrompt) {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User installed the PWA');
      installBanner.style.display = 'none';
    }
    deferredPrompt = null;
  }
});

// 3. Handle the "Close" button to save dismissal in localStorage
// closeButton.addEventListener('click', () => {
//   // Save a flag so we don't show it again for 7 days (optional duration)
//   localStorage.setItem('pwaPromptDismissed', 'true');
//   installBanner.style.display = 'none';
// });

// 4. Automatically hide if the app is installed while browsing
window.addEventListener('appinstalled', () => {
  console.log('PWA was installed');
  installBanner.style.display = 'none';
  deferredPrompt = null;
});
