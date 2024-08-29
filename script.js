// JavaScript to handle video thumbnail clicks
const videoThumbnails = document.querySelectorAll('.video-thumbnails .video');
const mainVideo = document.getElementById('main-video');
const videoThumbnailsContainer = document.getElementById('video-thumbnails-container');

videoThumbnails.forEach(video => {
    video.addEventListener('click', function () {
        const videoUrl = this.getAttribute('data-video-url');
        mainVideo.querySelector('source').src = videoUrl;
        mainVideo.load();
        mainVideo.play();

        // Hide the video thumbnails
        videoThumbnailsContainer.style.display = 'none';
    });
});

// JavaScript to handle play button clicks
const playButtons = document.querySelectorAll('.play-button');

playButtons.forEach(button => {
    button.addEventListener('click', function(event) {
        event.stopPropagation(); // Prevent triggering the parent click event

        const videoUrl = this.parentElement.getAttribute('data-video-url');
        mainVideo.querySelector('source').src = videoUrl;
        mainVideo.load();
        mainVideo.play();

        // Hide the video thumbnails
        videoThumbnailsContainer.style.display = 'none';
    });
});

// Sample data for autocomplete suggestions with video URLs
const videoData = [
    { title: "Video 1", url: "https://drive.google.com/file/d/1pCmzYCTIlJLO6Jnv_udbGs7CMD9cS0oq/view?usp=sharing" },
    { title: "Video 2", url: "video2.mp4" },
    { title: "Video 3", url: "video3.mp4" },
    { title: "Video 4", url: "video4.mp4" }
];

function showSuggestions() {
    const input = document.getElementById('search-input');
    const filter = input.value.toLowerCase();
    const suggestionsContainer = document.getElementById('autocomplete-list');
    
    // Clear previous suggestions
    suggestionsContainer.innerHTML = '';

    if (!filter) return;

    // Filter suggestions based on input
    const suggestions = videoData.filter(video => video.title.toLowerCase().includes(filter));

    // Display suggestions
    suggestions.forEach(video => {
        const suggestionElement = document.createElement('div');
        suggestionElement.className = 'autocomplete-suggestion';
        suggestionElement.textContent = video.title;

        // Handle click on suggestion
        suggestionElement.addEventListener('click', function() {
            input.value = video.title;
            mainVideo.querySelector('source').src = video.url;
            mainVideo.load();
            mainVideo.play();

            // Hide the video thumbnails
            videoThumbnailsContainer.style.display = 'none';

            // Clear the suggestions
            suggestionsContainer.innerHTML = '';
        });

        suggestionsContainer.appendChild(suggestionElement);
    });
}