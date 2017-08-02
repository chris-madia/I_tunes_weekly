// 1. First select and store the elements you'll be working with
// 2. Create your `submit` event for getting the user's search term
// 3. Create your `fetch` request that is called after a submission
// 4. Create a way to append the fetch results to your page
// 5. Create a way to listen for a click that will play the song in the audio play
const initialUrl = "https://itunes.apple.com/search?term=";
const results = document.querySelector(".results");
const searchBar = document.querySelector(".search-input");
const button = document.querySelector("button");
const player = document.querySelector(".music-player");

document.getElementById("search-button").addEventListener("click", function(e) {
  let userSearch = initialUrl + searchBar.value;
  e.preventDefault();

  fetch(userSearch).then(function(response) {
    if (response.status !== 200) {
      return;
    }
    response.json().then(function(data) {
      let resultsContainer = "";
      data.results.forEach(function(items) {
        if (items.kind === "song") {
          let template = `
             <ul>
               <li>
                 <img src="${items.artworkUrl100}" alt="">
                 <div><a href="${items.artistName}">${items.artistName}</div>
                 <div><a href="${items.trackName}">${items.trackName}</div>
                 <div><a href="${items.collectionName}">${items.collectionName}</div>
                 <div><a href="${items.previewUrl}"></div>
               </li>
             </ul>
           `;
          resultsContainer += template;
        }
      });
      results.innerHTML = resultsContainer;
      searchBar.value = "";
    });
  });
});
