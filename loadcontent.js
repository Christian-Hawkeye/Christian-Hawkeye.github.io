async function loadgallery() {
    try {
        const response = await fetch('gallery.html');
        const data = await response.text();
        document.getElementById('content-placeholder').innerHTML = data;
    } catch (error) {
        console.error('Error loading gallery:', error);
    }
}


async function loadabout() {
    try {
        const response = await fetch('about.html');
        const data = await response.text();
        document.getElementById('content-placeholder').innerHTML = data;
    } catch (error) {
        console.error('Error loading about:', error);
    }
}

async function loadcontact() {
    try {
        const response = await fetch('contact.html');
        const data = await response.text();

        document.getElementById('content-placeholder').innerHTML = data;

        // Wait until the contact HTML exists, then place stars
        randomizeStars();

    } catch (error) {
        console.error('Error loading contact:', error);
    }
}


async function randomizeStars() {
    const protectedDiv = document.getElementById("contact-text");
    const images = document.querySelectorAll(".red-star");

    if (!protectedDiv) return;

    await Promise.all(
        [...images].map(img => {
            if (img.complete) return Promise.resolve();
            return new Promise(resolve => img.onload = resolve);
        })
    );

    const container = document.getElementById("content-placeholder");
    const containerRect = container.getBoundingClientRect();
    const textRect = protectedDiv.getBoundingClientRect();

    const zones = [
        // top left
        {
            x: 50,
            y: 80,
            w: 250,
            h: 200
        },

        // top right
        {
            x: window.innerWidth - 300,
            y: 80,
            w: 250,
            h: 200
        },

        // middle left
        {
            x: 50,
            y: window.innerHeight / 2 - 100,
            w: 250,
            h: 200
        },

        // middle right
        {
            x: window.innerWidth - 300,
            y: window.innerHeight / 2 - 100,
            w: 250,
            h: 200
        },

        // bottom left
        {
            x: 100,
            y: window.innerHeight - 250,
            w: 250,
            h: 150
        },

        // bottom right
        {
            x: window.innerWidth - 350,
            y: window.innerHeight - 250,
            w: 250,
            h: 150
        }
    ];


    images.forEach((img, index) => {

        const size = Math.floor(Math.random() * 300) + 50;

        img.style.width = `${size}px`;

        const zone = zones[index];

        const x = zone.x + Math.random() * (zone.w - size);
        const y = zone.y + Math.random() * (zone.h - size);

        img.style.left = `${x}px`;
        img.style.top = `${y}px`;

        const rotation = Math.random() * 360;

        img.style.transform =
            `rotate(${rotation}deg)`;
    });
}