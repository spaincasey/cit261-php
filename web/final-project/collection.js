function loadCollection() {
    const resultList = document.getElementById('divResults');
    resultList.innerHTML = '';
    for (var i = 0; i < localStorage.length; i++){
        var key = localStorage.key(i);
        var value = localStorage[key];
        console.log("The Key is: " + key);
        console.log("The Value is: " + value);
        loadItem(value);
    }
}

function loadItem(name) {
    console.log(name);
    var url = 'https://www.omdbapi.com/?i=tt3896198&apikey=5797b0b&t=' + name;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = this.response;
            parsed = JSON.parse(data);
            // console.log(data);
            console.log(JSON.parse(data));
            updateResultList(parsed);
        }
      };
    xhttp.open("GET", url, true);
    xhttp.send();
}

function updateResultList(data) {
    const resultList = document.getElementById('divResults');
    const title = data.Title;
    console.log(title);
    const poster = data.Poster;
    console.log(poster);
    const content2 = `<img id='${title}' onclick='searchItem("${title}");' class='thumbnail moveUp' src='${poster}' alt='${title}'/>`;
    resultList.innerHTML += content2;
}

function searchItem(name) {
    clicked = document.getElementById(name);
    clicked.classList.add("clicked");
    console.log(name);
    setTimeout(function(){ 
    var url = 'https://www.omdbapi.com/?i=tt3896198&apikey=5797b0b&t=' + name;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var data = this.response;
            parsed = JSON.parse(data);
            // console.log(data);
            console.log(JSON.parse(data));
            singleItem(parsed);
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
    }, 900);
}

function singleItem(data) {
    console.log("Single Item: ");
    console.log(data);
    const resultList = document.getElementById('divResults');
    resultList.innerHTML = '';
    poster = data.Poster;
    console.log(poster);
    title = data.Title;
    console.log(title);
    year = data.Year;
    console.log(year);
    actors = data.Actors;
    director = data.Director;
    plot = data.Plot;
    rating = data.Rating;
    runtime = data.Runtime;
    imdbRate = data.imdbRating;
    content = `<img class='selected' src='${poster}' alt='${title}'/><br>
                <h3>${title}</h3>
                <div class='details'><p><strong>Year:</strong> ${year}</p>
                <p><strong>Actors:</strong> ${actors}</p>
                <p><strong>Director:</strong> ${director}</p>
                <p><strong>Plot:</strong> ${plot}</p>
                <p><strong>Rating:</strong> ${rating}</p>
                <p><strong>Runtime:</strong> ${runtime}</p>
                <p><strong>imdb Rating:</strong> ${imdbRate}</p></div>
                <button class='button2' onclick='removeFavorite("${title}");'>Remove From Collection</button>
                <br><br><button class='button2' onclick='loadCollection();'>Back to Collection</button>`;
    resultList.innerHTML = content;
}

function removeFavorite(name) {
    for (var i = 0; i < localStorage.length; i++){
        var key = localStorage.key(i);
        var value = localStorage[key];
        if(value == name)
        {
            localStorage.removeItem(key);
        }
    }
    loadCollection();
}