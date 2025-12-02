# ⊘ Twenty One Pilots: Interactive Discography Experience

> Un experimento de Frontend centrado en manipulación del DOM, gestión de estados visuales y optimización de rendimiento sin frameworks.

![Project Status](https://img.shields.io/badge/Status-Completed-success)
![Tech Stack](https://img.shields.io/badge/Tech-Vanilla_JS_%7C_CSS3_%7C_HTML5-yellow)

## 📋 Descripción del Proyecto

Este proyecto es una aplicación web SPA (Single Page Application) que explora la narrativa visual de la banda **Twenty One Pilots**. 

Más allá de la temática, el objetivo técnico fue construir una interfaz reactiva e inmersiva utilizando **JavaScript Puro (Vanilla JS)**, demostrando que es posible crear experiencias dinámicas complejas sin la sobrecarga de librerías como React o Vue.

## 🚀 Características Técnicas (Key Features)

### 1. Sistema de Temas Dinámico (State Management)
En lugar de hardcodear estilos CSS para cada sección, implementé un sistema basado en objetos de JavaScript.
- **Lógica:** Un array de objetos contiene la metadata de cada álbum (colores HEX, fuentes, assets).
- **DOM Manipulation:** Al seleccionar una "Era", el script inyecta variables CSS en el `:root` y actualiza el DOM en tiempo real, garantizando accesibilidad (contraste de texto automático).

### 2. Algoritmo de Detección de Patrones ("Easter Egg")
Implementación de un "Keylogger" seguro del lado del cliente para desbloquear contenido oculto.
- **Estructura:** Uso de un *Event Listener* global en `keydown`.
- **Lógica:** Implementación de un **Buffer Circular** que almacena solo las últimas 3 teclas presionadas. Si el array coincide con la secuencia `['n', 'e', 'd']`, se dispara el *modal* secreto.
- **Eficiencia:** El array se gestiona dinámicamente para evitar fugas de memoria.

### 3. Diseño "Brutalista" con CSS Puro
Optimización de assets gráficos para reducir el tiempo de carga (LCP).
- **Texturas:** El efecto de "ruido" (static noise) y las cintas adhesivas se generan matemáticamente con CSS y SVG Data URIs, eliminando la necesidad de cargar imágenes pesadas (.png/.jpg).

## 🛠️ Stack Tecnológico

* **Core:** HTML5 Semántico, CSS3 (Variables & Flexbox/Grid).
* **Scripting:** JavaScript (ES6+).
* **Herramientas:** Desarrollado con asistencia de IA (Antigravity Editor) para aceleración de boilerplate y prototipado rápido.

## 💻 Instalación y Uso Local

Este proyecto no requiere `npm install` ni dependencias externas.

1.  Clona el repositorio:
    ```bash
    git clone https://github.com/KimJesus22/Twenty-2.0.git
    ```
2.  Navega a la carpeta:
    ```bash
    cd TOP 2.0
    ```
3.  Abre el archivo `index.html` en tu navegador de preferencia.

## 🔍 Snippet de Código Destacado

Lógica para el cambio de tema dinámico:

```javascript
// Gestión de estado visual sin frameworks
albums.forEach(album => {
    card.addEventListener('click', () => {
        // Inyección directa de estilos al Body
        body.style.backgroundColor = album.color;
        
# ⊘ Twenty One Pilots: Interactive Discography Experience

> Un experimento de Frontend centrado en manipulación del DOM, gestión de estados visuales y optimización de rendimiento sin frameworks.

![Project Status](https://img.shields.io/badge/Status-Completed-success)
![Tech Stack](https://img.shields.io/badge/Tech-Vanilla_JS_%7C_CSS3_%7C_HTML5-yellow)

## 📋 Descripción del Proyecto

Este proyecto es una aplicación web SPA (Single Page Application) que explora la narrativa visual de la banda **Twenty One Pilots**. 

Más allá de la temática, el objetivo técnico fue construir una interfaz reactiva e inmersiva utilizando **JavaScript Puro (Vanilla JS)**, demostrando que es posible crear experiencias dinámicas complejas sin la sobrecarga de librerías como React o Vue.

## 🚀 Características Técnicas (Key Features)

### 1. Sistema de Temas Dinámico (State Management)
En lugar de hardcodear estilos CSS para cada sección, implementé un sistema basado en objetos de JavaScript.
- **Lógica:** Un array de objetos contiene la metadata de cada álbum (colores HEX, fuentes, assets).
- **DOM Manipulation:** Al seleccionar una "Era", el script inyecta variables CSS en el `:root` y actualiza el DOM en tiempo real, garantizando accesibilidad (contraste de texto automático).

### 2. Algoritmo de Detección de Patrones ("Easter Egg")
Implementación de un "Keylogger" seguro del lado del cliente para desbloquear contenido oculto.
- **Estructura:** Uso de un *Event Listener* global en `keydown`.
- **Lógica:** Implementación de un **Buffer Circular** que almacena solo las últimas 3 teclas presionadas. Si el array coincide con la secuencia `['n', 'e', 'd']`, se dispara el *modal* secreto.
- **Eficiencia:** El array se gestiona dinámicamente para evitar fugas de memoria.

### 3. Diseño "Brutalista" con CSS Puro
Optimización de assets gráficos para reducir el tiempo de carga (LCP).
- **Texturas:** El efecto de "ruido" (static noise) y las cintas adhesivas se generan matemáticamente con CSS y SVG Data URIs, eliminando la necesidad de cargar imágenes pesadas (.png/.jpg).

### 4. 📱 PWA (Progressive Web App)
El sitio es totalmente instalable tanto en dispositivos móviles como de escritorio, ofreciendo una experiencia nativa.
- **Offline First:** Implementación de un **Service Worker** con estrategia de caché agresiva ('Cache First'). Esto permite que la aplicación cargue instantáneamente y funcione sin conexión a internet una vez visitada.
- **Estándares Web:** Cumple con todos los requisitos de instalación modernos: `manifest.json` configurado, servicio a través de HTTPS (en producción) e iconos adaptables.

### 5. 💻 System Override (CLI)
Para los usuarios avanzados, se ha implementado una **Terminal de Comandos Oculta**.
- **Acceso:** Presiona la tecla `F2` o `Backtick ( ` )` para desplegar la consola de sistema.
- **Ingeniería:** Cuenta con un intérprete de comandos personalizado escrito en JavaScript que realiza tokenización y parsing de strings en tiempo real.

| Comando | Descripción |
| :--- | :--- |
| `help` | Muestra la lista de comandos disponibles. |
| `list` | Despliega los álbumes disponibles (desde el JSON). |
| `play [album]` | Reproduce el tema de una era (ej: `play trench`). |
| `clear` | Limpia el buffer de la pantalla. |
| `whoami` | Revela la identidad del usuario actual. |

> **Nota:** Existen comandos ocultos (Easter Eggs) relacionados con el lore de DEMA esperando ser descubiertos.


## 🛠️ Stack Tecnológico

* **Core:** HTML5 Semántico, CSS3 (Variables & Flexbox/Grid).
* **Scripting:** JavaScript (ES6+).
* **Herramientas:** Desarrollado con asistencia de IA (Antigravity Editor) para aceleración de boilerplate y prototipado rápido.

## 💻 Instalación y Uso Local

Este proyecto no requiere `npm install` ni dependencias externas.

1.  Clona el repositorio:
    ```bash
    git clone https://github.com/KimJesus22/Twenty-2.0.git
    ```
2.  Navega a la carpeta:
    ```bash
    cd TOP 2.0
    ```
3.  Abre el archivo `index.html` en tu navegador de preferencia.

## 🔍 Snippet de Código Destacado

Lógica para el cambio de tema dinámico:

```javascript
// Gestión de estado visual sin frameworks
albums.forEach(album => {
    card.addEventListener('click', () => {
        // Inyección directa de estilos al Body
        body.style.backgroundColor = album.color;
        
        // Lógica de contraste condicional
        if(album.textColor === '#000000') {
           disableTextShadow();
        } else {
           enableNeonEffect();
        }
    });
});

## 👤 Autor

**Jesus Ceron** (KimJesus21)
*Estudiante de Ingeniería en Sistemas*

[GitHub](https://github.com/KimJesus22/) | [LinkedIn](https://www.linkedin.com/in/kimjesus21)

> "Power to the local dreamer"
```