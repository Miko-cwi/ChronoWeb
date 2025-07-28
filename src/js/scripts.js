document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.getElementById('main-content');

    // 1. Animación de entrada inicial al cargar la página
    if (mainContent) {
        // Asegúrate de que esta clase se añada para disparar la animación de entrada
        mainContent.classList.add('content-fade-in'); 
        mainContent.addEventListener('animationend', function handler() {
            mainContent.classList.remove('content-fade-in');
            mainContent.removeEventListener('animationend', handler);
        }, { once: true });
    }

    // 2. Interceptar clicks para la animación de salida
    document.querySelectorAll('a').forEach(anchor => {
        // ¡Importante! Solo intercepta enlaces internos
        if (anchor.hostname === location.hostname) { 
            anchor.addEventListener('click', (e) => {
                const targetUrl = anchor.href;

                // Evita recargar la misma página si ya estás en ella
                if (targetUrl === window.location.href) {
                    e.preventDefault();
                    return;
                }

                e.preventDefault(); // <--- ESTO EVITA LA NAVEGACIÓN INMEDIATA POR DEFECTO

if (mainContent) {
    mainContent.classList.add('content-fade-out');

    // Usaremos un setTimeout para forzar la navegación después de la duración de la animación
    // Esto es un TEMPORAL HACK para depurar si la navegación es el problema
    setTimeout(() => {
        window.location.href = targetUrl;
        // Opcional: Remueve la clase content-fade-out aquí si no lo haces en animationend
        // mainContent.classList.remove('content-fade-out');
    }, 700); // <-- Ajusta esto para que sea ligeramente mayor que tu animation-duration (ej. 600ms + un buffer)

    // Puedes mantener el listener de animationend si quieres, pero el setTimeout forzará la navegación
    mainContent.addEventListener('animationend', function handler() {
        // console.log('Animation ended, but navigation is handled by setTimeout');
        mainContent.classList.remove('content-fade-out');
        mainContent.removeEventListener('animationend', handler);
    }, { once: true });
} else {
    window.location.href = targetUrl;
}
            });
        }
    });
});