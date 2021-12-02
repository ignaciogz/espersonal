class Video {
    static cambiarVelocidadDeReproduccion(video, velocidad) {
        video[0].playbackRate = velocidad;
    }
}

export { Video };