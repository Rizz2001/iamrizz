/* =========================================
   LÓGICA PRINCIPAL DEL PORTAFOLIO | RIZZ
   ========================================= */

// 1. Lógica del Menú Hamburguesa (Móviles)
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');
const navLinksItems = document.querySelectorAll('.nav-links a');

if (mobileMenu && navMenu) {
    // Abrir/Cerrar menú al tocar las 3 rayitas
    mobileMenu.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.toggle('is-active');
        navMenu.classList.toggle('active');
        mobileMenu.setAttribute('aria-expanded', String(isOpen));
    });

    // Cerrar el menú automáticamente cuando el usuario toca un enlace
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('is-active');
            navMenu.classList.remove('active');
        });
    });
}

// 2. Lógica del Botón de WhatsApp
const botonWhatsApp = document.getElementById('btn-ws');

if (botonWhatsApp) {
    botonWhatsApp.addEventListener('click', (e) => {
        e.preventDefault(); 

        // IMPORTANTE: Cambia los ceros por tu número real de Venezuela
        const numeroTelefono = '584220012375'; 
        const mensaje = '¡Hola Aldrin! Estuve viendo tu portafolio web y me gustaría hablar contigo sobre un proyecto.';
        const mensajeCodificado = encodeURIComponent(mensaje);
        const urlWhatsApp = `https://wa.me/${numeroTelefono}?text=${mensajeCodificado}`;
        
        window.open(urlWhatsApp, '_blank');
    });
}

// 3. Lógica para los botones de "Ver Proyecto"
const botonesProyectos = document.querySelectorAll('.btn-proyecto');

botonesProyectos.forEach(boton => {
    boton.addEventListener('click', (e) => {
        if (boton.classList.contains('btn-disabled')) {
            e.preventDefault(); 
            alert('¡Este proyecto aún se está cocinando! 🚀 Vuelve pronto.');
        } 
    });
});

// 4. Animaciones de Scroll (Intersection Observer)
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15 // El elemento animará cuando el 15% sea visible
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            // Dejamos de observar una vez animado para mejor rendimiento
            observer.unobserve(entry.target); 
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// 5. Efecto Parallax en el Hero (Exclusivo para PC)
const heroContent = document.querySelector('.hero-content');
const heroImage = document.querySelector('.hero-image');

window.addEventListener('scroll', () => {
    // Solo aplicamos Parallax en pantallas mayores a 768px
    if (window.innerWidth > 768) {
        const scrolled = window.scrollY;
        if (heroContent && heroImage) {
            // Efecto: el texto baja y se desvanece suavemente, la imagen sube un poco
            heroContent.style.transform = `translateY(${scrolled * 0.35}px)`;
            heroContent.style.opacity = 1 - (scrolled * 0.0025);
            heroImage.style.transform = `translateY(${scrolled * 0.15}px)`;
        }
    } else {
        // En móvil reseteamos los estilos para que fluya natural
        if (heroContent) { heroContent.style.transform = 'translateY(0)'; heroContent.style.opacity = 1; }
        if (heroImage) { heroImage.style.transform = 'translateY(0)'; }
    }
});

// 6. Efecto Máquina de Escribir (Typewriter)
const tituloPrincipal = document.querySelector('.titulo-principal');
if (tituloPrincipal) {
    const textoBase = "Soluciones Web ";
    // Palabras que se irán rotando (puedes añadir las que quieras)
    const palabrasArray = ["Rapidas.", "Creativas.", "Modernas.", "Rápidas."];
    
    // Vaciamos y preparamos el HTML interno con un cursor
    tituloPrincipal.innerHTML = '<span class="type-base"></span><span class="resaltado type-highlight"></span><span class="cursor">|</span>';
    
    const typeBase = tituloPrincipal.querySelector('.type-base');
    const typeHighlight = tituloPrincipal.querySelector('.type-highlight');
    const cursor = tituloPrincipal.querySelector('.cursor');
    
    let baseIndex = 0;
    let palabraIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    // 1. Escribe el texto base fijo una sola vez ("Soluciones Web ")
    function typeBaseText() {
        if (baseIndex < textoBase.length) {
            typeBase.textContent += textoBase.charAt(baseIndex);
            baseIndex++;
            setTimeout(typeBaseText, 60);
        } else {
            setTimeout(typeHighlightText, 200); // Pausa antes de iniciar las palabras rotativas
        }
    }
    
    // 2. Bucle infinito de escritura y borrado para las palabras resaltadas
    function typeHighlightText() {
        const palabraActual = palabrasArray[palabraIndex];
        
        if (isDeleting) {
            // Borrando la palabra
            typeHighlight.textContent = palabraActual.substring(0, charIndex - 1);
            charIndex--;
        } else {
            // Escribiendo la palabra
            typeHighlight.textContent = palabraActual.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 40 : 80; // Borra más rápido de lo que escribe
        
        if (!isDeleting && charIndex === palabraActual.length) {
            // Termina de escribir, hace una pausa larga (2s) y parpadea antes de borrar
            typeSpeed = 2000;
            isDeleting = true;
            cursor.classList.add('blink');
        } else if (isDeleting && charIndex === 0) {
            // Termina de borrar, pasa a la siguiente palabra
            isDeleting = false;
            palabraIndex = (palabraIndex + 1) % palabrasArray.length;
            typeSpeed = 400; // Breve pausa antes de escribir la nueva palabra
            cursor.classList.remove('blink');
        } else {
            // Mientras escribe o borra, el cursor se mantiene sólido (no parpadea)
            cursor.classList.remove('blink');
        }
        
        setTimeout(typeHighlightText, typeSpeed);
    }
    
    // Iniciamos la animación con un retraso (da tiempo a que cargue la vista)
    setTimeout(typeBaseText, 1000);
}

// 7. Lógica del Botón "Volver Arriba"
const btnBackToTop = document.getElementById('btn-back-to-top');

if (btnBackToTop) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) { // Aparece después de hacer scroll 300px
            btnBackToTop.classList.add('show');
        } else {
            btnBackToTop.classList.remove('show');
        }
    });

    btnBackToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}