/*****************************************************************************************
    Function: search()
    This function takes in the user input, builds the url and does a GET request with that url. 
    It then calls the updateResultList() function to load the data into the HTML 
    *****************************************************************************************/
   function search() {
    /* Get the value from the search box */
    var searchString = document.getElementById('txtSearch').value;
    console.log('Searching for: ' + searchString);
    /* build the url */
    var url = 'https://www.omdbapi.com/?i=tt3896198&apikey=5797b0b&s=' + encodeURIComponent(searchString);
    /* AJAX GET REQUEST */
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

/*****************************************************************************************
Function: updateResultList()
This function retrieves the data from the search function and formats it into HTML by 
creating a thumbnail of each movie poster.
*****************************************************************************************/
function updateResultList(data) {
    if (data.Search && data.Search.length > 0) {
        const resultList = document.getElementById('divResults');
        resultList.innerHTML = '';

        data.Search.forEach(function(item){
            const title = item.Title;
            // console.log('Adding: ' + title);
            // const content = `<li><p>${title}</p></li>`;
            // resultList.innerHTML += content;
            console.log(item);
            if(item.Poster != 'N/A'){
                const poster = item.Poster;
                var image = document.createElement('img');
                image.setAttribute("id", title);
                image.setAttribute("onClick", "searchItem('" + title + "')");
                image.setAttribute("class", "thumbnail");
                image.setAttribute("src", poster);
                image.setAttribute("alt", title);
                image.classList.add("moveUp");
                // const content2 = `<img onclick='searchItem("${title}");' class='thumbnail moveUp' src='${poster}' alt='${title}'/>`;
                resultList.appendChild(image);
                // resultList.innerHTML += image;
            }
        })
    }
}

/*****************************************************************************************
Function: searchItem()
This function takes in the name of the name of the movie that the user clicked on and does 
a GET request for that movie and then calls the singleItem function.
*****************************************************************************************/
function searchItem(name) {
    clicked = document.getElementById(name);
    clicked.setAttribute("class", clicked);
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
    }, 3000);
}

/*****************************************************************************************
Function: searchItem()
This function takes in the name of the data about the selected movie and formats it into 
the HTML.
*****************************************************************************************/
function singleItem(data) {
    // Get the results div from the html
    const resultList = document.getElementById('divResults');
    resultList.innerHTML = '';
    // create and append the movie poster
    var image = document.createElement('img');
    image.setAttribute("class", "selected");
    image.setAttribute("src", data.Poster);
    image.setAttribute("alt", data.Title);
    resultList.appendChild(image);
    // create and append the title
    var title = document.createElement('h3');
    title.innerText= data.Title;
    resultList.appendChild(title);
    // create a div to left aline the rest of the data
    var div = document.createElement('div');
    div.setAttribute("class", "details");
    // create and append the Actors
    var actors = document.createElement('p');
    actors.innerHTML = "<strong>Actors: </strong>" + data.Actors;
    div.appendChild(actors);
    // create and append the Director
    var director = document.createElement('p');
    director.innerHTML = "<strong>Director: </strong>" + data.Director;
    div.appendChild(director);
    // create and append the Plot
    var plot = document.createElement('p');
    plot.innerHTML = "<strong>Plot: </strong>" + data.Plot;
    div.appendChild(plot);
    // create and append the rating
    var rating = document.createElement('p');
    rating.innerHTML = "<strong>Rating: </strong>" + data.Rating;
    div.appendChild(rating);
    // create and append the runtime
    var runtime = document.createElement('p');
    runtime.innerHTML = "<strong>Runtime: </strong>" + data.Runtime;
    div.appendChild(runtime);
    // create and append the imdb rating
    var imdbRate = document.createElement('p');
    imdbRate.innerHTML = "<strong>imdb Rating: </strong>" + data.imdbRating;
    div.appendChild(imdbRate);
    // append the div with all the data
    resultList.appendChild(div);
    //create and append the button to the movie to the collection
    var btn = document.createElement("button");
    btn.setAttribute("class", "button2");
    btn.setAttribute("onclick", "addFavorite('" + data.Title + "')");
    btn.innerHTML = "Add To Collection";
    resultList.appendChild(btn);
    /* A way to do the same thing as above with less code using template literals. I used this before 
    and changed it because I thought the code above better reflected the lessons from the semester. */
    /*poster = data.Poster;
    title = data.Title;
    year = data.Year;
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
                <button class='button2' onclick='addFavorite("${title}");'>Add To Collection</button>`;
    resultList.innerHTML = content;*/
}

/*****************************************************************************************
Function: searchItem()
This function takes in the name of the movie that the user wishes to add to their collection,
loops through the local storage to check if the movie is already in the collection, and either
adds the title to the local storage or alerts the user that it's already in their collection.
*****************************************************************************************/
function addFavorite(name) {
    console.log(name);
    var found = false;
    for (var i = 0; i < localStorage.length; i++){
        var key = localStorage.key(i);
        if(name == key) {
            alert("This movie is already in your collection");
            found = true;
        }
    }
    if(found == false) {
        var url = 'https://www.omdbapi.com/?i=tt3896198&apikey=5797b0b&t=' + name;
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var data = this.response;
                parsed = JSON.parse(data);
                console.log("Adding: " + parsed.Title);
                localStorage.setItem(parsed.Title, parsed.Title);
                alert("Movie Added to Collection");
            }
        };
        xhttp.open("GET", url, true);
        xhttp.send();
    }
}