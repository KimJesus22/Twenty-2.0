document.addEventListener('DOMContentLoaded', () => {
    console.log("TOP 2.0 // CLANCY ERA INITIALIZED");

    // Glitch Effect on Hover for Links
    const links = document.querySelectorAll('a');

    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            // Simple random transform for now
            link.style.transform = `translate(${Math.random() * 2 - 1}px, ${Math.random() * 2 - 1}px)`;
        });

        link.addEventListener('mouseleave', () => {
            link.style.transform = 'none';
        });
    });

    // Scroll Reveal Animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section-container').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(section);
    });

    // Add visible class styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
    // Discography Data
    const albums = [
        {
            name: "CLANCY",
            year: "2024",
            color: "#ff0000", // Neon Red
            cover: ""
        },
        {
            name: "SCALED AND ICY",
            year: "2021",
            color: "#00b7ff", // Blue
            cover: ""
        },
        {
            name: "TRENCH",
            year: "2018",
            color: "#fce300", // Yellow
            cover: ""
        },
        {
            name: "BLURRYFACE",
            year: "2015",
            color: "#000000", // Black/Red pattern usually, but using black for contrast
            cover: ""
        },
        {
            name: "VESSEL",
            year: "2013",
            color: "#aebbc9", // Greyish
            cover: ""
        }
    ];

    const albumGrid = document.getElementById('album-grid');
    const discographySection = document.getElementById('discografia');

    // Render Albums
    albums.forEach(album => {
        const card = document.createElement('div');
        card.classList.add('album-card', 'tape-corner');

        // Use placeholder if image fails (or for now if external links are blocked, but trying URLs)
        const imgHTML = album.cover ? `<img src="${album.cover}" alt="${album.name}" class="album-cover-img">` : `<div class="album-cover placeholder"></div>`;

        card.innerHTML = `
            ${imgHTML}
            <h3>${album.name}</h3>
            <p>${album.year}</p>
        `;

        // Interaction
        card.addEventListener('click', () => {
            // Change section background
            discographySection.style.backgroundColor = album.color;

            // Adjust text color for contrast if needed (simple check)
            if (album.color === '#fce300' || album.color === '#aebbc9' || album.color === '#00b7ff') {
                discographySection.style.color = '#000';
                discographySection.querySelectorAll('h2, h3, p').forEach(el => el.style.color = '#000');
            } else {
                discographySection.style.color = '#f0f0f0';
                discographySection.querySelectorAll('h2').forEach(el => el.style.color = 'var(--neon-red)');
                discographySection.querySelectorAll('h3, p').forEach(el => el.style.color = '#f0f0f0');
            }
        });

        albumGrid.appendChild(card);
    });

    // Easter Egg: NED Protocol
    const secretCode = 'NED';
    let keyBuffer = [];

    document.addEventListener('keydown', (e) => {
        // Add key to buffer (uppercase for consistency)
        keyBuffer.push(e.key.toUpperCase());

        // Keep buffer size equal to secret code length
        if (keyBuffer.length > secretCode.length) {
            keyBuffer.shift();
        }

        // Check if buffer matches secret code
        if (keyBuffer.join('') === secretCode) {
            activateSecretProtocol();
            keyBuffer = []; // Reset buffer
        }
    });

    function activateSecretProtocol() {
        // Create Modal Elements
        const overlay = document.createElement('div');
        overlay.classList.add('secret-modal-overlay');

        const modal = document.createElement('div');
        modal.classList.add('secret-modal');

        modal.innerHTML = `
            <h2>⚠ ALERTA: BRECHA EN DEMA DETECTADA</h2>
            <p>Has encontrado a la criatura. El protocolo Cloro está activo.</p>
            <button class="secret-btn" id="escape-btn">ESCAPAR</button>
        `;

        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        // Close functionality
        document.getElementById('escape-btn').addEventListener('click', () => {
            document.body.removeChild(overlay);
        });
    }
});
