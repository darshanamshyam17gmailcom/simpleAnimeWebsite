// Wait for the DOM to fully load before executing scripts
document.addEventListener('DOMContentLoaded', () => {
    // Sample anime data to simulate a database or API response
    const animeList = [
        {
            title: 'Naruto',
            description: 'A young ninja...',
            episodes: 220,
            rating: 8.2,
            genres: ['Action', 'Adventure'],
            videoUrl: 'https://geo.dailymotion.com/player/xb9cu.html?video=k1bF2eNucIEQKWyMu7e',
            imageUrl: 'https://static1.srcdn.com/wordpress/wp-content/uploads/2021/10/one-piece-naruto-featured.jpg' // Add thumbnail URL
        },
        {
            title: 'One Piece',
            description: 'Pirate adventure...',
            episodes: 1000,
            rating: 9.0,
            genres: ['Action', 'Adventure'],
            videoUrl: 'https://geo.dailymotion.com/player.html?video=k5DTLzG3fqwVZgAL3Qw&',
            imageUrl: 'https://static1.cbrimages.com/wordpress/wp-content/uploads/2020/04/naruto-one-piece.jpg' // Add thumbnail URL
        }
        // Add more anime data as needed
    ];

    // Function to display anime list
    const displayAnimeList = (animes, containerId) => {
        const animeListContainer = document.getElementById(containerId);
        if (!animeListContainer) return;
        animeListContainer.innerHTML = ''; // Clear the container before adding new items
        animes.forEach(anime => {
            const animeItem = document.createElement('div');
            animeItem.classList.add('anime-item');
            animeItem.innerHTML = `
                <img src="${anime.imageUrl}" alt="${anime.title} Thumbnail" class="anime-thumbnail">
                <h3>${anime.title}</h3>
                <p>${anime.description}</p>
                <button class="view-details-btn">View Details</button>
            `;
            animeListContainer.appendChild(animeItem);

            // Add event listener to the button
            const viewDetailsBtn = animeItem.querySelector('.view-details-btn');
            viewDetailsBtn.addEventListener('click', () => {
                viewAnimeDetails(anime.title);
            });
        });
    };

    // Function to display anime list on homepage
    const displayAnimeListOnHomepage = () => {
        displayAnimeList(animeList, 'anime-list-container');
    };

    // Function to search for anime based on the input query
    const searchAnime = () => {
        const query = document.getElementById('search-input').value.toLowerCase();
        const results = animeList.filter(anime => anime.title.toLowerCase().includes(query));
        displayAnimeList(results, 'anime-list');
    };

    // Function to view detailed information of a selected anime
    const viewAnimeDetails = (title) => {
        const anime = animeList.find(anime => anime.title === title);
        localStorage.setItem('animeDetails', JSON.stringify(anime));
        window.location.href = 'anime-details.html';
    };

    // Function to load anime details from localStorage and display them
    const loadAnimeDetails = () => {
        const anime = JSON.parse(localStorage.getItem('animeDetails'));
        const animeDetailsContainer = document.getElementById('anime-info');
        if (!animeDetailsContainer) return;
        animeDetailsContainer.innerHTML = `
            <h2>${anime.title}</h2>
            <p>${anime.description}</p>
            <p>Episodes: ${anime.episodes}</p>
            <p>Rating: ${anime.rating}</p>
            <p>Genres: ${anime.genres.join(', ')}</p>
            <button onclick="playAnime('${anime.videoUrl}')">Play</button>
        `;
    };

    // Function to play the selected anime by setting the iframe source
    const playAnime = (videoUrl) => {
        localStorage.setItem('videoUrl', videoUrl);
        window.location.href = 'anime-playback.html';
    };

    // Make the playAnime function globally accessible
    window.playAnime = playAnime;

    // Function to load the anime video into the iframe on the playback page
    const loadAnimeVideo = () => {
        const iframe = document.getElementById('anime-iframe');
        if (!iframe) return;
        iframe.src = localStorage.getItem('videoUrl');
    };

    // Event listener for the search input to trigger search on 'Enter' key press
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                searchAnime();
            }
        });
    }

    // Load anime details if the anime-info section is present
    if (document.getElementById('anime-info')) {
        loadAnimeDetails();
    }

    // Load the anime video if the iframe is present
    if (document.getElementById('anime-iframe')) {
        loadAnimeVideo();
    }

    // Display anime list on homepage if the container is present
    if (document.getElementById('anime-list-container')) {
        displayAnimeListOnHomepage();
    }
});
