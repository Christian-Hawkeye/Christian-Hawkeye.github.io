function randomizeStars() {
    const protectedDiv = document.getElementById("contact-text");

    // Stop if contact page is not currently loaded
    if (!protectedDiv) {
        console.log("Contact section not loaded yet");
        return;
    }

    const images = document.querySelectorAll(".red-star");

    const protectedRect = protectedDiv.getBoundingClientRect();

    const placedStars = [];

    function overlapsRect(x, y, w, h, rect) {
        return (
            x < rect.right &&
            x + w > rect.left &&
            y < rect.bottom &&
            y + h > rect.top
        );
    }

    function overlapsStar(x, y, w, h) {
        return placedStars.some(star =>
            x < star.x + star.w &&
            x + w > star.x &&
            y < star.y + star.h &&
            y + h > star.y
        );
    }

    images.forEach(img => {
        const w = img.offsetWidth;
        const h = img.offsetHeight;

        let x, y;
        let tries = 0;

        do {
            x = Math.random() * (window.innerWidth - w);
            y = Math.random() * (window.innerHeight - h);
            tries++;
        } while (
            (overlapsRect(x, y, w, h, protectedRect) ||
             overlapsStar(x, y, w, h)) &&
            tries < 500
        );

        img.style.left = `${x}px`;
        img.style.top = `${y}px`;

        placedStars.push({ x, y, w, h });
    });

    console.log("Stars randomized!");
}