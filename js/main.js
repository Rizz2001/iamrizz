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
        mobileMenu.classList.toggle('is-active');
        navMenu.classList.toggle('active');
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