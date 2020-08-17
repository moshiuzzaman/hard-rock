// get SearchBox And SearchButton
const searchBox = document.getElementById("searchBox");
const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener('click', function() {
    fetch(`https://api.lyrics.ovh/suggest/${searchBox.value}`)
        .then(res => res.json())
        .then(showResult)
})

function showResult(a) {
    const searchResult = document.getElementById('searchResult');
    searchResult.innerHTML = ""
    for (let i = 0; i < 10; i++) {
        const data = a.data[i];
            searchResult.innerHTML += ` <div class="single-result row align-items-center my-3 p-3">
                                    <div class="col-md-9">
                                        <h3 class="lyrics-name">${data.title}</h3>
                                        <p class="author lead">Album by : ${data.artist.name}</p>
                                        <p class="author lead">Album Name :${data.album.title}</p>
                                    </div>
                                    <div class="col-md-3 text-md-right text-center">
                                        <button id ="" onclick="demo('${data.title}' , '${data.artist.name}')" class="getLysicsBtn btn btn-success">Get Lyrics</button>
                                    </div>
                                    </div>`;
    }
}

function demo(title, artist) {
    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
        .then(res => res.json())
        .then(data => {
            const lyrics = document.getElementById('lyrics');
            lyrics.innerHTML = "";
            if (data.lyrics == undefined) {
                lyrics.innerHTML = `<button   class="btn go-back bg-info"><a class="go-top" href="#main">Go To Top</a></button><br>
                    <h2 class="text-success mb-4">${title}</h2>
                    <pre class="lyric text-white">Sorry😋 ! ThiS Song Has No lyric. Try Another One</pre>`
                alert("Sorry😋 ! ThiS Song Has No lyric. Try Another One")
            } else {
                lyrics.innerHTML = `<button   class="btn go-back bg-info"><a class="go-top" href="#main">Go To Top</a></button><br>
                    <h2 class="text-success mb-4">${title}</h2>
                    <pre class="lyric text-white">${data.lyrics} </pre>`
            }
        })
}