import fs from 'fs';

const categories = ["All", "Action", "Sci-Fi", "Comedy", "Horror", "Drama", "Animation"];

const moviesList = [
  { id: 1, title: 'Dune: Part Two', category: 'Sci-Fi', duration: '2h 46m' },
  { id: 2, title: 'Spider-Man: Across the Spider-Verse', category: 'Animation', duration: '2h 20m' },
  { id: 3, title: 'Oppenheimer', category: 'Drama', duration: '3h' },
  { id: 4, title: 'John Wick: Chapter 4', category: 'Action', duration: '2h 49m' },
  { id: 5, title: 'Guardians of the Galaxy Vol. 3', category: 'Sci-Fi', duration: '2h 30m' },
  { id: 6, title: 'Barbie', category: 'Comedy', duration: '1h 54m' },
  { id: 7, title: 'Talk to Me', category: 'Horror', duration: '1h 35m' },
  { id: 8, title: 'Mission: Impossible - Dead Reckoning', category: 'Action', duration: '2h 43m' },
  { id: 9, title: 'Everything Everywhere All at Once', category: 'Sci-Fi', duration: '2h 19m' },
  { id: 10, title: 'The Super Mario Bros. Movie', category: 'Animation', duration: '1h 32m' },
  { id: 11, title: 'The Batman', category: 'Action', duration: '2h 56m' },
  { id: 12, title: 'Avatar: The Way of Water', category: 'Sci-Fi', duration: '3h 12m' },
  { id: 13, title: 'Glass Onion', category: 'Comedy', duration: '2h 19m' },
  { id: 14, title: 'Nope', category: 'Horror', duration: '2h 10m' },
  { id: 15, title: 'Top Gun: Maverick', category: 'Action', duration: '2h 10m' },
  { id: 16, title: 'Parasite', category: 'Drama', duration: '2h 12m' },
  { id: 17, title: 'Knives Out', category: 'Comedy', duration: '2h 10m' },
  { id: 18, title: 'Interstellar', category: 'Sci-Fi', duration: '2h 49m' },
  { id: 19, title: 'Get Out', category: 'Horror', duration: '1h 44m' },
  { id: 20, title: 'Joker', category: 'Drama', duration: '2h 2m' },
  { id: 21, title: 'Avengers: Endgame', category: 'Action', duration: '3h 1m' },
  { id: 22, title: 'Toy Story 4', category: 'Animation', duration: '1h 40m' },
  { id: 23, title: 'A Quiet Place', category: 'Horror', duration: '1h 30m' },
  { id: 24, title: 'Inception', category: 'Sci-Fi', duration: '2h 28m' },
  { id: 25, title: 'The Dark Knight', category: 'Action', duration: '2h 32m' },
  { id: 26, title: 'Deadpool', category: 'Comedy', duration: '1h 48m' },
  { id: 27, title: 'Coco', category: 'Animation', duration: '1h 45m' },
  { id: 28, title: 'Mad Max: Fury Road', category: 'Action', duration: '2h' },
  { id: 29, title: 'It', category: 'Horror', duration: '2h 15m' },
  { id: 30, title: 'The Martian', category: 'Sci-Fi', duration: '2h 24m' },
  { id: 31, title: 'Soul', category: 'Animation', duration: '1h 40m' },
  { id: 32, title: 'The Hangover', category: 'Comedy', duration: '1h 40m' },
  { id: 33, title: 'Gladiator', category: 'Action', duration: '2h 35m' },
  { id: 34, title: 'Hereditary', category: 'Horror', duration: '2h 7m' },
  { id: 35, title: 'The Matrix', category: 'Sci-Fi', duration: '2h 16m' },
  { id: 36, title: 'Forrest Gump', category: 'Drama', duration: '2h 22m' },
  { id: 37, title: 'Up', category: 'Animation', duration: '1h 36m' },
  { id: 38, title: 'Superbad', category: 'Comedy', duration: '1h 53m' },
  { id: 39, title: 'Die Hard', category: 'Action', duration: '2h 12m' },
  { id: 40, title: 'Blade Runner 2049', category: 'Sci-Fi', duration: '2h 44m' },
  { id: 41, title: 'The Conjuring', category: 'Horror', duration: '1h 52m' },
  { id: 42, title: 'Inside Out', category: 'Animation', duration: '1h 35m' },
  { id: 43, title: 'Fight Club', category: 'Drama', duration: '2h 19m' },
  { id: 44, title: 'The Avengers', category: 'Action', duration: '2h 23m' },
  { id: 45, title: 'Step Brothers', category: 'Comedy', duration: '1h 38m' },
  { id: 46, title: 'Alien', category: 'Sci-Fi', duration: '1h 57m' },
  { id: 47, title: 'Halloween', category: 'Horror', duration: '1h 31m' },
  { id: 48, title: 'Finding Nemo', category: 'Animation', duration: '1h 40m' },
  { id: 49, title: 'Jurassic Park', category: 'Action', duration: '2h 7m' },
  { id: 50, title: 'The Truman Show', category: 'Drama', duration: '1h 43m' }
];

async function updateMovies() {
  const updatedMovies = [];
  
  for (const m of moviesList) {
    try {
      const res = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(m.title)}`);
      const data = await res.json();
      let image = 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80';
      
      const movieResult = data.results?.find(r => r.kind === 'feature-movie');
      if (movieResult && movieResult.artworkUrl100) {
        image = movieResult.artworkUrl100.replace('100x100bb', '600x900bb');
      } else if (data.results && data.results.length > 0 && data.results[0].artworkUrl100) {
        image = data.results[0].artworkUrl100.replace('100x100bb', '600x900bb');
      }
      
      updatedMovies.push({
        ...m,
        image
      });
      console.log(`Fetched ${m.title}`);
    } catch (e) {
      updatedMovies.push({ ...m, image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80' });
    }
  }

  const content = `export const categories = ${JSON.stringify(categories)};\n\nexport const movies = ${JSON.stringify(updatedMovies, null, 2)};`;
  fs.writeFileSync('src/data/movies.js', content);
  console.log('Finished updating movies.js');
}

updateMovies();
