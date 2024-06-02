document.addEventListener("DOMContentLoaded", function() {
    fetch('anime-data.json')
       .then(response => response.json())
       .then(data => {
            displayAnimeList(data);
            setupAnimeDetails(data);
            setupAnimePlayback(data);
        })
       .catch(error => console.error('Error fetching data:', error));

    document.getElementById('search-input').addEventListener('input', searchAnime);
});

function displayAnimeList(data) {
    const animeListContainer = document.getElementById('anime-list-container');
    if (animeListContainer) {
        animeListContainer.innerHTML = '';
        data.forEach(anime => {
            const animeItem = document.createElement('div');
            animeItem.classList.add('anime-item');
            animeItem.innerHTML = `
                <img src="${anime.thumbnail}" alt="${anime.title}">
                <h3>${anime.title}</h3>
                <p>${anime.description}</p>
                <a href="anime-details.html?title=${encodeURIComponent(anime.title)}">View Details</a>
            `;
            animeListContainer.appendChild(animeItem);
        });
    }
}

function setupAnimeDetails(data) {
    const urlParams = new URLSearchParams(window.location.search);
    const animeTitle = urlParams.get('title');
    if (animeTitle) {
        const anime = data.find(a => a.title === animeTitle);
        if (anime) {
            const animeInfo = document.getElementById('anime-info');
            if (animeInfo) {
                animeInfo.innerHTML = `
                    <img src="${anime.thumbnail}" alt="${anime.title}">
                    <h2>${anime.title}</h2>
                    <p>${anime.description}</p>
                    <a href="anime-playback.html?video=${encodeURIComponent(anime.videoLink)}">Watch Now</a>
                `;
            }
        }
    }
}

function setupAnimePlayback(data) {
    const urlParams = new URLSearchParams(window.location.search);
    const videoUrl = urlParams.get('video');
    if (videoUrl) {
        const animeIframe = document.getElementById('anime-iframe');
        if (animeIframe) {
            animeIframe.src = videoUrl;
        }
    }
}

function searchAnime() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const animeItems = document.querySelectorAll('.anime-item');

    animeItems.forEach(item => {
        const title = item.querySelector('h3').textContent.toLowerCase();
        if (title.includes(query)) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}