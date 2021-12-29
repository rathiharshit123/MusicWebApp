const form = document.getElementById("form");
const search = document.getElementById("search");
const result = document.getElementById("result");


const apiURL = 'https://api.lyrics.ovh';

form.addEventListener('submit', e => {
    e.preventDefault();
    searchValue = search.value.trim();

    //Check if the value entered to search is empty or
    if (!searchValue) {
        alert("Please enter Something to search");
    }
    else {
        searchSong(searchValue);

    }
});

//Searching the song through api calls 

async function searchSong(searchValue) {
    const searchResult = await fetch(`${apiURL}/suggest/${searchValue}`);
    const data = await searchResult.json();
    showData(data);

}
//Showing the result

function showData(data) {

    result.innerHTML = `
   
    <ul class="song-list">
      ${data.data
            .map(song => `<li>
                    <div>
                        <strong>${song.artist.name}</strong> -${song.title} 
                    </div>
                    <span data-artist="${song.artist.name}" data-songtitle="${song.title}"> get lyrics</span>
                </li>`
            )
            .join('')}
    </ul>
  `;
    document.getElementById('video').innerHTML = ''


}

result.addEventListener('click', e => {
    const clickedElement = e.target;
    if (clickedElement.tagName === 'SPAN') {
        const artist = clickedElement.getAttribute('data-artist');
        const songTitle = clickedElement.getAttribute('data-songTitle');
        getLyrics(artist, songTitle);
    }
});

//Getting the lyrics

async function getLyrics(artist, songTitle) {
  
    const res = await fetch(`${apiURL}/v1/${artist}/${songTitle}`);

    const data = await res.json();
    const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
    result.innerHTML = ` 
    <h2 style="margin-bottom:30px;"><strong>${artist}</strong> - ${songTitle}</h2><ul>
    
    <p style="margin-top:20px;">${lyrics}</p>`    
    
}

