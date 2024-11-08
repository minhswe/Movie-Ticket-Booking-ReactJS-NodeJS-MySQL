const getGenres = (Movie) => {
    const genres = Movie.Genres;
    let linkedGenres = "";
    if (genres && genres.length > 0){
        genres.forEach((genre) => {
            linkedGenres += `${genre.GenreName}, `;
        })
        const formatGenres = linkedGenres.slice(0, linkedGenres.length - 2);
        return formatGenres;
    }
    return "";
};

export default getGenres;