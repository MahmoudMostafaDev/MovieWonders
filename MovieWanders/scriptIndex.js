let AllMovies = [];

const swiper = new Swiper(".swiper", {
  // Optional parameters
  direction: "horizontal",
  loop: true,

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
  },

  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  // And if we need scrollbar
  scrollbar: {
    el: ".swiper-scrollbar",
  },
});
// tailwind

// Nav burger
const navBtn = document.querySelector("#nav-btn");
navBtn.addEventListener("click", () => {
  console.log("clicked");
  document.querySelector(".menu").classList.toggle("dissable");
});

// Speedometer
const bar = document.querySelector("#bar");
let ball = document.querySelector(".ball");

function setPercentage(rate) {
  let percentage = (rate / 10) * 100;
  let angle = (percentage / 100) * 180;
  let y = 150 * Math.sin((angle * Math.PI) / 180);
  let x = 145 * Math.cos((angle * Math.PI) / 180);

  if (percentage <= 50) {
    x = 145 - x;
  } else {
    console.log(x);
    x = 145 + Math.abs(x);
    console.log(x);
  }

  if (percentage > 90) {
    y = y + 10;
    x = x - 3;
  }

  ball.style.bottom = y - 25 + "px";
  ball.style.left = x - 5 + "px";
  bar.setAttribute("stroke-dasharray", `${(percentage / 100) * 155}, 120`);
}

const allTypes = [
  {
    id: 28,
    namee: "Action",
  },
  {
    id: 12,
    namee: "Adventure",
  },
  {
    id: 16,
    namee: "Animation",
  },
  {
    id: 35,
    namee: "Comedy",
  },
  {
    id: 80,
    namee: "Crime",
  },
  {
    id: 99,
    namee: "Documentary",
  },
  {
    id: 18,
    namee: "Drama",
  },
  {
    id: 10751,
    namee: "Family",
  },
  {
    id: 14,
    namee: "Fantasy",
  },
  {
    id: 36,
    namee: "History",
  },
  {
    id: 27,
    namee: "Horror",
  },
  {
    id: 10402,
    namee: "Music",
  },
  {
    id: 9648,
    namee: "Mystery",
  },
  {
    id: 10749,
    namee: "Romance",
  },
  {
    id: 878,
    namee: "Science Fiction",
  },
  {
    id: 10770,
    namee: "TV Movie",
  },
  {
    id: 53,
    namee: "Thriller",
  },
  {
    id: 10752,
    namee: "War",
  },
  {
    id: 37,
    nameee: "Western",
  },
];

console.log(allTypes.length);

// Loading

// ================= Load watch list

let watchList = [];

if (localStorage.getItem("watchlist")) {
  watchList = JSON.parse(localStorage.getItem("watchlist"));
  console.log(watchList);
} else {
  saveWatchList();
}

// ================== Load Favourite

let favouriteList = [];

if (localStorage.getItem("favourite")) {
  favouriteList = JSON.parse(localStorage.getItem("favourite"));
} else {
  saveFavourite();
}

// ================= getting data from api and local storage  (movies based on choosen interests)
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NmI0ZjgwMGI0YTQ2M2UxNWQzY2FlOWI1Y2U1YzRlMSIsIm5iZiI6MTcyMTcxMTUyNy4wNDc5MjYsInN1YiI6IjY2OWYzOWY5NzhhMmFjYWJjNDdkNDliMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wVdFTRWnt1dQmWFhm73W-24svWYFljx_s91gZcNX8j0",
  },
};

let interests = JSON.parse(localStorage.getItem("interests"));

if (interests) {
  let interestsString = interests.join("|");
  if (localStorage.getItem("data") == null) {
    let movies = getJustForYouFromAPI(interestsString);
    movies.then((movie) => displayJustForYou(movie));
  } else {
    displayJustForYou(JSON.parse(localStorage.getItem("data")));
  }
}

// ================= getting data from api  (movies based on only one genere)

if (localStorage.getItem("dataRec") == null) {
  let movies = getMoviesFromAPI(28);
  movies.then((movie) => displayRecommended(movie));
} else {
  displayRecommended(JSON.parse(localStorage.getItem("dataRec")));
}
//Methods

function getMoviesFromAPI(genreId) {
  return fetch(
    `https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=en-US&page=1&sort_by=revenue.desc&with_genres=${genreId}`,
    options
  )
    .then((response) => response.json())
    .then((response) => response.results)
    .catch((err) => console.error(err));
}

function getJustForYouFromAPI(interests) {
  return fetch(
    `https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=${interests}`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      localStorage.setItem("data", JSON.stringify(response.results));
      return response.results;
    })
    .catch((err) => console.error(err));
}

function displayRecommended(movies) {
  let largecontainer = document.querySelector(".movies1");
  largecontainer.innerHTML = "";
  largecontainer = document.querySelector(".movies2");
  largecontainer.innerHTML = "";
  movies.forEach((movie, i, arr) => {
    AllMovies.push(movie);
    if (i % 2 === 0) {
      largecontainer = document.querySelector(".movies1");
    } else {
      largecontainer = document.querySelector(".movies2");
    }

    const container = document.createElement("div");
    container.classList.add("w-60");
    container.classList.add("h-auto");
    container.classList.add("max-w-60");
    container.classList.add("shadow-2xl");
    container.classList.add("bg-secondary");
    container.classList.add("p-4");
    container.classList.add("rounded-xl");
    container.classList.add("relative");
    container.classList.add("overflow-visible");
    container.classList.add("flex-none");

    container.innerHTML = `<div
            class="overflow-hidden absolute -top-24 left-2/4 h-56 w-52 -translate-x-1/2 "
          >
            <img class="rounded-xl w-full" src="https://image.tmdb.org/t/p/original/${
              movie.poster_path
            }" alt="" />
          </div>
          <div class="text mt-28">
            <h2 class="text-xl text-white font-bold">${movie.title}</h2>
            <div class="rateDate flex gap-2 mb-3">
              <p class="text-sm text-gray-400">${movie.release_date}</p>
              <div class="rate text-white text-sm mx-1">
                ${movie.vote_average.toFixed(
                  1
                )} <i class="fa-regular fa-star text-yellow-500"></i>
              </div>
            </div>
            <button id="${movie.id}"
              class="btn btn-primary bg-accent-primary px-3 py-1 rounded-full"
            >
              See more
            </button>
          </div>
    `;

    largecontainer.appendChild(container);
  });
  refreshLisner();
}

function displayJustForYou(movies) {
  movies.forEach((element, i, arr) => {
    AllMovies.push(element);
    const landingSwiper = document.querySelector(".swiper-wrapper");
    const RecommendGrid = document.querySelector(".best .grid");
    if (i < 3) {
      console.log(element);
      // slide
      const slide = document.createElement("div");
      slide.classList.add("swiper-slide");

      // layer
      const layer = document.createElement("div");
      layer.classList.add("layer");
      layer.classList.add("landingMovie");

      // big container
      const bigContainer = document.createElement("div");
      bigContainer.classList.add("big-container");
      bigContainer.classList.add("relative");
      bigContainer.classList.add("lg:h-132");
      bigContainer.classList.add("h-128");

      // container
      const container = document.createElement("div");
      container.classList.add("container");
      container.classList.add("mx-auto");

      // text
      const text = document.createElement("div");
      text.classList.add("text");
      text.classList.add("absolute");
      text.classList.add("bottom-28");
      text.classList.add("lg:w-1/3");
      text.classList.add("md:w-2/3");
      text.classList.add("px-10");
      //getting genre names
      let generesids = element.genre_ids;
      let generenamesRaw = generesids.map((el, i, arr) => {
        return allTypes.filter((element) => element.id == el);
      });
      let generenames = "";
      generenamesRaw.forEach((el, i, arr) => {
        generenames += el[0].namee + ", ";
      });

      text.innerHTML = `<h1 class="text-white text-4xl">${element.title}</h1>
      <p class="text-gray-400 font-bold text-md my-2">${generenames}</p>
      <div class="rate text-white text-lg mx-1">
        ${element.vote_average.toFixed(
          1
        )} <i class="fa-regular fa-star text-yellow-500"></i>
      </div>
      <p class="text-gray-300 my-5">
        ${element.overview}
      </p>
      <button id="${element.id}"
        class="btn btn-primary bg-accent-primary px-4 py-2 rounded-full font-bold"
      >
        Let's see more
      </button>`;

      // set image
      layer.style.backgroundImage = `url("https://image.tmdb.org/t/p/original/${element.backdrop_path}")`;

      container.appendChild(text);
      bigContainer.appendChild(container);
      layer.appendChild(bigContainer);
      slide.appendChild(layer);
      landingSwiper.appendChild(slide);
    } else if (i == 3) {
      const mainMovie = document.createElement("div");
      console.log(element.title);
      mainMovie.classList.add("main-movie");
      mainMovie.classList.add("shadow-2xl");
      mainMovie.classList.add("h-auto");
      mainMovie.classList.add("my-16");
      mainMovie.classList.add("rounded-xl");
      mainMovie.classList.add("col-span-2");
      mainMovie.classList.add("lg:col-span-4");
      mainMovie.classList.add("relative");
      mainMovie.classList.add("overflow-hidden");
      mainMovie.classList.add("sm:block");
      mainMovie.classList.add("hidden");

      mainMovie.innerHTML = ` <div class="layer p-4 h-full">
            <div class="text mt-28">
              <h2 class="text-xl text-white font-bold">${element.title}</h2>
              <div class="rateDate flex gap-2 mb-3">
                <p class="text-sm text-gray-400">${element.release_date}</p>
                <div class="rate text-white text-sm mx-1">
                   ${element.vote_average.toFixed(
                     1
                   )}  <i class="fa-regular fa-star text-yellow-500"></i>
                </div>
              </div>
              <button
                class="btn btn-primary bg-accent-primary px-3 py-1 rounded-full" id="${
                  element.id
                }"
              >
                See more
              </button>
            </div>
          </div>`;

      mainMovie.style.backgroundImage = `url("https://image.tmdb.org/t/p/original/${element.poster_path}")`;
      RecommendGrid.appendChild(mainMovie);
    } else if (i < 8) {
      console.log(i);
      const container = document.createElement("div");
      if (i == 4) {
        container.classList.add("md:my-16");
        container.classList.add("lg:my-24");
      } else {
        container.classList.add("lg:my-24");
        container.classList.add("md:my-16");
      }
      container.classList.add("w-60");
      container.classList.add("h-auto");
      container.classList.add("max-w-60");
      container.classList.add("shadow-2xl");
      container.classList.add("bg-secondary");
      container.classList.add("p-4");
      container.classList.add("rounded-xl");
      container.classList.add("relative");
      container.classList.add("overflow-visible");
      container.classList.add("mx-auto");

      // rest of things

      container.innerHTML = ` <div
            class="overflow-hidden absolute -top-28 left-2/4 h-60 w-52 -translate-x-1/2"
          >
            <img class="rounded-xl min-w-full" src="https://image.tmdb.org/t/p/original/${
              element.poster_path
            }" alt="" />
          </div>
          <div class="text mt-28 ">
            <h2 class="text-xl text-white font-bold">${element.title}</h2>
            <div class="rateDate flex gap-2 mb-3">
              <p class="text-sm text-gray-400">${element.release_date}</p>
              <div class="rate text-white text-sm mx-1">
                ${element.vote_average.toFixed(
                  1
                )} <i class="fa-regular fa-star text-yellow-500"></i>
              </div>
            </div>
            <button id="${element.id}"
              class="btn btn-primary bg-accent-primary px-3 py-1 rounded-full"
            >
              See more
            </button>
          </div>`;
      RecommendGrid.appendChild(container);
    }
  });
  refreshLisner();
}

function refreshLisner() {
  //films buttons
  const btnsSwiper = document.querySelectorAll(
    ".swiper-slide button , .best button , .movies button "
  );
  btnsSwiper.forEach((btn) => {
    btn.removeEventListener("click", listenerFilmView);
    btn.addEventListener("click", listenerFilmView);
  });
}

function hidePopUp() {
  const filmPopUp = document.querySelector(".film-pop-up");
  const hidder = document.querySelector(".hidder");
  hidder.classList.add("hidden");
  filmPopUp.classList.add("hidden");
  const theGrandFatherContainer = document.querySelector(
    ".theGrandFatherContainer"
  );
  theGrandFatherContainer.removeEventListener("click", hidePopUp);
}

function listenerFilmView(e) {
  //SHOW POP UP AND BLUR THE BACKGROUND
  const filmPopUp = document.querySelector(".film-pop-up");
  const hidder = document.querySelector(".hidder");
  const theGrandFatherContainer = document.querySelector(
    ".theGrandFatherContainer"
  );
  setTimeout(function () {
    theGrandFatherContainer.addEventListener("click", hidePopUp);
  }, 1000);
  let id = e.target.id;
  let movieObj = AllMovies.find((movie) => movie.id == id);
  console.log(movieObj);
  hidder.classList.remove("hidden");
  filmPopUp.classList.remove("hidden");

  //ADD DATA
  const filmPopUpImg = document.querySelector(".film-pop-up .img");
  filmPopUpImg.style.backgroundImage = `url("https://image.tmdb.org/t/p/original/${movieObj.poster_path}")`;

  const filmPopUpTitle = document.querySelector(".film-pop-up .title");
  filmPopUpTitle.textContent = movieObj.title;

  const filmPopUpDesc = document.querySelector(".film-pop-up .desc");
  filmPopUpDesc.textContent = movieObj.overview;

  const filmPopUpRate = document.querySelector(".film-pop-up .rate");
  filmPopUpRate.textContent = `${movieObj.vote_average.toFixed(1)}`;

  const filmPopUpGenre = document.querySelector(".film-pop-up .genere");
  let generesids = movieObj.genre_ids;
  let generenamesRaw = generesids.map((el, i, arr) => {
    return allTypes.filter((element) => element.id == el);
  });
  let generenames = "";
  generenamesRaw.forEach((el, i, arr) => {
    generenames += el[0].namee + ", ";
  });
  filmPopUpGenre.textContent = generenames;

  const filmPopUpAddtoWatchlist = document.querySelector(
    ".film-pop-up button:first-of-type"
  );
  if (watchList.some((movie) => movie.id == movieObj.id)) {
    filmPopUpAddtoWatchlist.textContent = "Added";
  } else {
    filmPopUpAddtoWatchlist.textContent = "Add to watchlist";
    filmPopUpAddtoWatchlist.addEventListener("click", () => {
      addToWatchList(movieObj);
      filmPopUpAddtoWatchlist.textContent = "Added";
    });
  }
  const filmPopupFavBtn = document.querySelector(".film-pop-up .fav-btn");
  if (favouriteList.some((movie) => movie.id == movieObj.id)) {
    filmPopupFavBtn.innerHTML = `<i class="fa-solid fa-heart text-2xl text-red-500" ></i>`;
    console.log(favouriteList);
  } else {
    filmPopupFavBtn.innerHTML = `<i class="fa-regular fa-heart text-2xl text-red-500" ></i>`;
    filmPopupFavBtn.addEventListener("click", () => {
      addToFavourite(movieObj);
      filmPopupFavBtn.innerHTML = `<i class="fa-solid fa-heart text-2xl text-red-500" ></i>`;
      console.log(favouriteList);
    });
  }

  filmPopUpVoteCount = document.querySelector(".film-pop-up .vote-count");
  filmPopUpVoteCount.textContent = `${movieObj.vote_count}`;

  const filmPopUpRate2 = document.querySelector(".film-pop-up .rate2");
  filmPopUpRate2.textContent = `${movieObj.vote_average.toFixed(1)}`;

  setPercentage(movieObj.vote_average);

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

function addToWatchList(movieObj) {
  if (watchList.some((movie) => movie.id == movieObj.id)) {
    return;
  }
  watchList.push(movieObj);
  saveWatchList();
}

function addToFavourite(movieObj) {
  if (favouriteList.some((movie) => movie.id == movieObj.id)) {
    return;
  }
  favouriteList.push(movieObj);
  saveFavourite();
}

function saveWatchList() {
  localStorage.setItem("watchlist", JSON.stringify(watchList));
}

function saveFavourite() {
  localStorage.setItem("favourite", JSON.stringify(favouriteList));
}

// Static event Listenrs

const interestsBtns = document.querySelectorAll(".looking .category");

interestsBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let id = e.currentTarget.id;
    e.currentTarget.firstElementChild.classList.add("active");
    let movies = getMoviesFromAPI(id);
    movies.then((movie) => displayRecommended(movie));
    interestsBtns.forEach((btn) => {
      if (btn.id != id) {
        btn.firstElementChild.classList.remove("active");
      }
    });
  });
});

//TODO: add to watch list (Done) , BUTTONS CLICK EFFECTS (Done), ADD TO FAV ( Done) , ALERADY FAVOURITE (Done ), ALREADY WATCH LIST (Done) , close pop up (Done)
