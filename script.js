document.addEventListener("DOMContentLoaded", function () {

    // Reproductor de audio
    const audio = new Audio();

    let botonActual = null;
    let cancionActual = null;

    // Todas las canciones de tu index.html
    const canciones = document.querySelectorAll(".cancion");

    canciones.forEach(function (cancion) {

        const titulo = cancion.querySelector("h4");
        const boton = cancion.querySelector("a");

        if (!titulo || !boton) return;

        const nombreCancion = titulo.textContent.trim();

        boton.addEventListener("click", function (e) {

            e.preventDefault();

            // =====================================
            // SI ES LA MISMA CANCIÓN
            // =====================================

            if (cancionActual === nombreCancion) {

                if (audio.paused) {

                    audio.play();

                    boton.textContent = "⏸ Pausar";

                } else {

                    audio.pause();

                    boton.textContent = "▶ Reproducir";
                }

                return;
            }


            // =====================================
            // DETENER LA CANCIÓN ANTERIOR
            // =====================================

            if (botonActual) {
                botonActual.textContent = "▶ Reproducir";
            }

            audio.pause();


            // =====================================
            // CARGAR NUEVA CANCIÓN
            // =====================================

            cancionActual = nombreCancion;

            const archivo =
                "musica/" +
                encodeURIComponent(nombreCancion) +
                ".mp3";

            audio.src = archivo;


            // =====================================
            // REPRODUCIR
            // =====================================

            audio.play()
                .then(function () {

                    boton.textContent = "⏸ Pausar";

                    botonActual = boton;

                })
                .catch(function (error) {

                    console.error(
                        "No se pudo reproducir:",
                        archivo,
                        error
                    );

                    alert(
                        "No se pudo reproducir:\n\n" +
                        nombreCancion +
                        ".mp3\n\n" +
                        "Comprueba que el archivo esté dentro de la carpeta musica."
                    );

                });

        });

    });


    // =====================================
    // CUANDO TERMINA UNA CANCIÓN
    // =====================================

    audio.addEventListener("ended", function () {

        if (botonActual) {
            botonActual.textContent = "▶ Reproducir";
        }

        botonActual = null;
        cancionActual = null;

    });

});