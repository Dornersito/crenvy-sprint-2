
class SongRanking {
    constructor(songs) {
        this.songs = songs
    }

    render() {
      // Ordena las canciones por cantidad de likes
        this.songs.sort((a, b) => b.likes - a.likes)
    
      // Recorre cada canción y muestra su nombre y cantidad de likes
        this.songs.forEach((song, index) => {
        console.log(`${index + 1}. ${song.name} - ${song.likes} likes`)
        })
    }
}