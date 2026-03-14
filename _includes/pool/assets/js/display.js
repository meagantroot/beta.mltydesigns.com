document.addEventListener("DOMContentLoaded", function() {
    // 1. Initialize the Bootstrap Offcanvas instance
    const offcanvasElement = document.getElementById('orientationOffcanvas');
    const bsOffcanvas = new bootstrap.Offcanvas(offcanvasElement);
    
    // 2. Define the media query for landscape orientation
    const landscapeQuery = window.matchMedia("(orientation: landscape)");

    function handleOrientationChange(e) {
        // Only trigger on mobile-sized screens (optional but recommended)
        const isMobile = window.innerWidth < 992; 

        if (e.matches && isMobile) {
            // If landscape AND mobile, show the warning
            bsOffcanvas.show();
        } else {
            // If portrait or desktop, hide the warning
            bsOffcanvas.hide();
        }
    }

    // 3. Listen for changes
    landscapeQuery.addEventListener("change", handleOrientationChange);

    // 4. Run once on load in case the user starts in landscape
    handleOrientationChange(landscapeQuery);
});
