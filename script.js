document.addEventListener('DOMContentLoaded', () => {
    console.log("TOP 2.0 // CLANCY ERA INITIALIZED");

    // Glitch Effect on Hover for Links
    const links = document.querySelectorAll('a');

    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
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

    // Async Data Loading
    async function loadDiscography() {
        try {
            const response = await fetch('data.json');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const albums = await response.json();
            renderAlbums(albums);
        } catch (error) {
            console.error('Error loading discography:', error);
            const albumGrid = document.getElementById('album-grid');
            albumGrid.innerHTML = '<p style="color: red; text-align: center;">Error loading data. Please try again later.</p>';
        }
    }

    function renderAlbums(albums) {
        const albumGrid = document.getElementById('album-grid');
        const discographySection = document.getElementById('discografia');
        const lyricDisplay = document.getElementById('lyric-display');

        albums.forEach(album => {
            const card = document.createElement('div');
            card.classList.add('album-card', 'tape-corner');

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

                // Show Quote
                lyricDisplay.textContent = `"${album.quote}"`;
                lyricDisplay.style.opacity = '0';
                setTimeout(() => {
                    lyricDisplay.style.opacity = '1';
                }, 50);

                // Adjust text color for contrast
                if (album.color === '#fce300' || album.color === '#aebbc9' || album.color === '#00b7ff') {
                    discographySection.style.color = '#000';
                    discographySection.querySelectorAll('h2, h3, p').forEach(el => el.style.color = '#000');
                    lyricDisplay.style.color = '#000';
                    lyricDisplay.style.textShadow = 'none';
                } else {
                    discographySection.style.color = '#f0f0f0';
                    discographySection.querySelectorAll('h2').forEach(el => el.style.color = 'var(--neon-red)');
                    discographySection.querySelectorAll('h3, p').forEach(el => el.style.color = '#f0f0f0');
                    lyricDisplay.style.color = 'var(--text-color)';
                    lyricDisplay.style.textShadow = '2px 2px 0px #000';
                }
            });

            albumGrid.appendChild(card);
        });
    }

    // Load Data
    loadDiscography();

    // Easter Egg: NED Protocol
    const secretCode = 'NED';
    let keyBuffer = [];

    document.addEventListener('keydown', (e) => {
        keyBuffer.push(e.key.toUpperCase());

        if (keyBuffer.length > secretCode.length) {
            keyBuffer.shift();
        }

        if (keyBuffer.join('') === secretCode) {
            activateSecretProtocol();
            keyBuffer = [];
        }
    });

    function activateSecretProtocol() {
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

        document.getElementById('escape-btn').addEventListener('click', () => {
            document.body.removeChild(overlay);
        });
    }
});
