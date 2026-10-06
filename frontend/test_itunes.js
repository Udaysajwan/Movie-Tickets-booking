fetch('https://itunes.apple.com/search?term=dune')
  .then(res => res.json())
  .then(data => {
    const movie = data.results.find(r => r.kind === 'feature-movie' || r.wrapperType === 'track');
    if (movie) {
      console.log(movie.artworkUrl100.replace('100x100bb', '600x900bb'));
    }
  })
  .catch(e => console.error(e));
