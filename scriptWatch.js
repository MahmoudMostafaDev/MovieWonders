let AllMovies = [];
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
// API OPTIONS
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NmI0ZjgwMGI0YTQ2M2UxNWQzY2FlOWI1Y2U1YzRlMSIsIm5iZiI6MTcyMTcxMTUyNy4wNDc5MjYsInN1YiI6IjY2OWYzOWY5NzhhMmFjYWJjNDdkNDliMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wVdFTRWnt1dQmWFhm73W-24svWYFljx_s91gZcNX8j0",
  },
};

// ================= Load watch list

let watchList = [];

if (localStorage.getItem("watchlist")) {
  watchList = JSON.parse(localStorage.getItem("watchlist"));
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

//Load data
displayWatchList();
displayFavourite();

// ================== Methods

function saveWatchList() {
  localStorage.setItem("watchlist", JSON.stringify(watchList));
}

function saveFavourite() {
  localStorage.setItem("favourite", JSON.stringify(favouriteList));
}

function displayWatchList() {
  let largecontainer = document.querySelector(".WatchList");
  watchList.forEach((movie) => {
    AllMovies.push(movie);

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

function displayFavourite() {
  let largecontainer = document.querySelector(".Favourites");
  favouriteList.forEach((movie) => {
    AllMovies.push(movie);

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

function refreshLisner() {
  //films buttons
  const btnsSwiper = document.querySelectorAll(
    ".WatchList-container button , .Favourites-container button  "
  );
  btnsSwiper.forEach((btn) => {
    btn.removeEventListener("click", listenerFilmView);
    btn.addEventListener("click", listenerFilmView);
  });
}

function listenerFilmView(e) {
  //SHOW POP UP AND BLUR THE BACKGROUND
  const filmPopUp = document.querySelector(".film-pop-up");
  console.log(filmPopUp);
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
function addToFavourite(movieObj) {
  if (favouriteList.some((movie) => movie.id == movieObj.id)) {
    return;
  }
  favouriteList.push(movieObj);
  saveFavourite();
}
// todo add pop up
