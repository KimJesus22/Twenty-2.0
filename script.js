document.addEventListener('DOMContentLoaded', () => {
    console.log("TOP 2.0 // CLANCY ERA INITIALIZED");

    // Supabase Configuration
    const SUPABASE_URL = 'https://zcnwqpgiwbtmtvpbwomi.supabase.co';
    const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpjbndxcGdpd2J0bXR2cGJ3b21pIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2MzU1ODQsImV4cCI6MjA4MDIxMTU4NH0.7DfcnnYeqqjvu5zP74koP1NrWm6muL1Xo0JfNrBxX4Q';
    const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

    // Cloud Data Functions
    async function addLogToCloud(message) {
        const { data, error } = await supabase
            .from('guestbook')
            .insert([{ username: 'KimJesus21', message: message }]);

        if (error) {
            console.error('Error adding log:', error);
            return false;
        }
        return true;
    }

    async function fetchCloudLogs() {
        const { data, error } = await supabase
            .from('guestbook')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(10);

        if (error) {
            console.error('Error fetching logs:', error);
            return [];
        }
        return data;
    }

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



    // Audio Controller Class
    class AudioController {
        constructor() {
            this.currentAudio = null;
            this.fadeInterval = null;
            this.visualizer = null;
            this.createVisualizer();
        }

        createVisualizer() {
            // Create Equalizer HTML
            const equalizer = document.createElement('div');
            equalizer.classList.add('equalizer');
            equalizer.innerHTML = `
        < span ></span >
                <span></span>
                <span></span>
                <span></span>
    `;

            // Insert into Hero Content (next to CTA or Title)
            const heroContent = document.querySelector('.hero-content');
            if (heroContent) {
                heroContent.appendChild(equalizer);
                this.visualizer = equalizer;
            }
        }

        toggleVisualizer(isPlaying) {
            if (this.visualizer) {
                this.visualizer.style.opacity = isPlaying ? '1' : '0';
            }
        }

        play(url) {
            // 1. Fade Out Current Audio
            if (this.currentAudio) {
                const oldAudio = this.currentAudio;
                this.fadeOut(oldAudio);
            }

            // 2. Setup New Audio
            if (!url) return;

            const newAudio = new Audio(url);
            newAudio.volume = 0; // Start at 0
            this.currentAudio = newAudio;

            const playPromise = newAudio.play();

            if (playPromise !== undefined) {
                playPromise.then(() => {
                    // 3. Fade In New Audio (Target 0.3 in 1s)
                    this.fadeIn(newAudio, 0.3, 1000);
                    this.toggleVisualizer(true);
                }).catch(error => {
                    console.warn("Audio play failed (Autoplay/Missing file):", error);
                    // Even if it fails (e.g. missing file), we might want to show visualizer for effect? 
                    // No, better to keep it hidden if no audio.
                    this.toggleVisualizer(false);
                });
            }
        }

        fadeOut(audio) {
            // Clear any existing fade on this audio to avoid conflicts
            // (Simple implementation: just let it fade out independently)
            const fadeStep = 0.05;
            const intervalTime = 50; // Fast fade out

            const fadeOutInterval = setInterval(() => {
                if (audio.volume > 0.05) {
                    audio.volume -= fadeStep;
                } else {
                    audio.volume = 0;
                    audio.pause();
                    audio.currentTime = 0;
                    clearInterval(fadeOutInterval);

                    // Only hide visualizer if this was the current audio and no new one started
                    // But simpler: if we are fading out, we assume another one might start.
                    // If this is the *current* audio being stopped (e.g. manual stop), hide it.
                    // In this flow, play() calls fadeOut() then starts new audio.
                    // So play() handles showing it.
                }
            }, intervalTime);
        }

        fadeIn(audio, targetVolume, duration) {
            const steps = 20; // Number of steps
            const intervalTime = duration / steps;
            const volumeStep = targetVolume / steps;

            let currentStep = 0;

            const fadeInInterval = setInterval(() => {
                if (currentStep < steps && audio.volume < targetVolume) {
                    // Ensure we don't exceed target volume due to floating point math
                    audio.volume = Math.min(audio.volume + volumeStep, targetVolume);
                    currentStep++;
                } else {
                    audio.volume = targetVolume;
                    clearInterval(fadeInInterval);
                }
            }, intervalTime);
        }
    }

    const audioController = new AudioController();

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
            if (albumGrid) {
                albumGrid.innerHTML = '<p style="color: red; text-align: center;">Error loading data. Please try again later.</p>';
            }
        }
    }

    function renderAlbums(albums) {
        const albumGrid = document.getElementById('album-grid');
        const discographySection = document.getElementById('discografia');
        const lyricDisplay = document.getElementById('lyric-display');

        if (!albumGrid || !discographySection || !lyricDisplay) {
            console.error("Missing DOM elements for discography");
            return;
        }

        albums.forEach(album => {
            const card = document.createElement('div');
            card.classList.add('album-card', 'tape-corner');

            const imgHTML = album.cover ? `< img src = "${album.cover}" alt = "${album.name}" class="album-cover-img" > ` : ` < div class="album-cover placeholder" ></div > `;

            card.innerHTML = `
                ${imgHTML}
                <h3>${album.name}</h3>
                <p>${album.year}</p>
    `;

            // Interaction
            card.addEventListener('click', () => {
                // Change section background
                discographySection.style.backgroundColor = album.color;

                // Play Audio Theme using Class
                audioController.play(album.audioSrc);

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

    // Terminal Controller Class
    class TerminalController {
        constructor(audioController) {
            this.audioController = audioController;
            this.overlay = document.getElementById('terminal-overlay');
            this.output = document.getElementById('terminal-output');
            this.input = document.getElementById('terminal-input');
            this.isOpen = false;
            this.albums = [];

            // Security
            this.isAuthenticated = false;
            this.PASSWORD_HASH = '5e04b2b4800c331730aba213f82332828fbec17a5140a1880bcbe1f3da1055f5'; // Placeholder

            this.init();
        }

        async sha256(message) {
            const msgBuffer = new TextEncoder().encode(message);
            const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
            return hashHex;
        }

        init() {
            // Load albums for 'ls' command
            fetch('data.json')
                .then(response => response.json())
                .then(data => {
                    this.albums = data;
                });

            // Toggle Terminal
            document.addEventListener('keydown', (e) => {
                if (e.key === '`' || e.key === 'F2') {
                    e.preventDefault();
                    this.toggle();
                }
            });

            // Handle Input
            this.input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    const command = this.input.value.trim();
                    if (command) {
                        this.processCommand(command);
                    }
                    this.input.value = '';
                }
            });
        }

        toggle() {
            this.isOpen = !this.isOpen;
            this.overlay.style.display = this.isOpen ? 'block' : 'none';
            if (this.isOpen) {
                this.input.focus();
            }
        }

        log(text, type = 'log') {
            const div = document.createElement('div');
            div.className = `terminal-${type}`;
            div.textContent = text;
            this.output.appendChild(div);
            this.overlay.scrollTop = this.overlay.scrollHeight;
        }

        async processCommand(input) {
            this.log(`user@dema:~$ ${input}`, 'log');

            const parts = input.split(' ');
            const cmd = parts[0].toLowerCase();
            const arg = parts.slice(1).join(' ');

            switch (cmd) {
                case 'help':
                    this.log('Comandos disponibles:\n  help - Mostrar esta lista\n  clear - Limpiar terminal\n  ls - Listar álbumes\n  play [album] - Reproducir audio\n  whoami - Ver usuario actual\n  login [pass] - Autenticarse\n  logout - Cerrar sesión\n  log [msg] - Guardar en nube (Req. Auth)\n  read - Leer logs de nube\n  exit - Cerrar terminal', 'response');
                    break;
                case 'clear':
                    this.output.innerHTML = '';
                    break;
                case 'ls':
                case 'list':
                    const names = this.albums.map(a => a.name).join('\n  ');
                    this.log(`Álbumes Disponibles:\n  ${names}`, 'response');
                    break;
                case 'play':
                    if (!arg) {
                        this.log('Uso: play [nombre álbum]', 'error');
                        return;
                    }
                    const album = this.albums.find(a => a.name.toLowerCase() === arg.toLowerCase());
                    if (album) {
                        this.log(`Reproduciendo: ${album.name}...`, 'response');
                        this.audioController.play(album.audioSrc);
                    } else {
                        this.log(`Error: Álbum '${arg}' no encontrado.`, 'error');
                    }
                    break;
                case 'whoami':
                    this.log(this.isAuthenticated ? 'Clancy - Líder de la Resistencia' : 'KimJesus21 - Admin del Sistema (No Verificado)', 'response');
                    break;
                case 'exit':
                    this.toggle();
                    break;
                case 'east':
                    if (arg.toLowerCase() === 'is up') {
                        this.log("No tengo miedo cuando escucho esto en voz baja.", 'response');
                        // Future: Unlock special content
                    } else {
                        this.log("Dirección no clara.", 'error');
                    }
                    break;
                case 'login':
                    if (!arg) {
                        this.log('Uso: login [contraseña]', 'error');
                        return;
                    }
                    const hash = await this.sha256(arg);
                    if (hash === this.PASSWORD_HASH) {
                        this.isAuthenticated = true;
                        this.log('>> Acceso Concedido. Bienvenido, Clancy.', 'response');
                        const lastLog = this.output.lastElementChild;
                        if (lastLog) lastLog.style.color = '#0f0';
                    } else {
                        this.log('>> Acceso Denegado. Violación de integridad.', 'error');
                    }
                    break;
                case 'logout':
                    this.isAuthenticated = false;
                    this.log('Sesión terminada.', 'response');
                    break;
                case 'log':
                    if (!this.isAuthenticated) {
                        this.log('>> Error: Autorización requerida. Inicia sesión primero.', 'error');
                        return;
                    }
                    if (!arg) {
                        this.log('Uso: log [mensaje]', 'error');
                        return;
                    }
                    this.log('Guardando en archivos de DEMA...', 'response');
                    addLogToCloud(arg).then(success => {
                        if (success) {
                            this.log('>> Log guardado en archivos de DEMA.', 'response');
                            const lastLog = this.output.lastElementChild;
                            if (lastLog) lastLog.style.color = '#0f0';
                        } else {
                            this.log('Error: No se pudo guardar el log.', 'error');
                        }
                    });
                    break;
                case 'read':
                    this.log('Recuperando archivos...', 'response');
                    fetchCloudLogs().then(logs => {
                        if (logs.length === 0) {
                            this.log('No se encontraron archivos.', 'response');
                        } else {
                            logs.forEach(log => {
                                const date = new Date(log.created_at).toLocaleString();
                                this.log(`[${date}] ${log.username}: ${log.message}`, 'response');
                            });
                        }
                    });
                    break;
                default:
                    this.log(`Comando no encontrado: ${cmd}. Escribe 'help' para ver comandos.`, 'error');
            }
        }
    }

    // Initialize Terminal
    const terminal = new TerminalController(audioController);

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

    // Service Worker Registration moved to index.html as per request
});
