if (localStorage.getItem("interests")) {
  window.location.href = "index2.html";
}

let interests = [];

// generes
const generes = [
  {
    id: 28,
    namee: "Action",
    imgSrc: "img/action.png",
  },
  {
    id: 12,
    namee: "Adventure",
    imgSrc: "img/adventure.png",
  },
  {
    id: 16,
    namee: "Animation",
    imgSrc: "img/animation.jpeg",
  },
  {
    id: 35,
    namee: "Comedy",
    imgSrc: "img/comedy.png",
  },
  {
    id: 80,
    namee: "Crime",
    imgSrc: "img/crime.png",
  },
  {
    id: 99,
    namee: "Documentary",
    imgSrc: "img/domentary.jpg",
  },
  {
    id: 18,
    namee: "Drama",
    imgSrc: "img/drama.jpeg",
  },
  {
    id: 10751,
    namee: "Family",
    imgSrc: "img/family.jpg",
  },
  {
    id: 14,
    namee: "Fantasy",
    imgSrc: "img/fantasy.jpeg",
  },
  {
    id: 36,
    namee: "History",
    imgSrc: "img/history.jpeg",
  },
  {
    id: 27,
    namee: "Horror",
    imgSrc: "img/horror.jpg",
  },
  {
    id: 10402,
    namee: "Music",
    imgSrc: "img/music.jpg",
  },
  {
    id: 9648,
    namee: "Mystery",
    imgSrc: "img/mystery.png",
  },
  {
    id: 10749,
    namee: "Romance",
    imgSrc: "img/romance.jpeg",
  },
  {
    id: 878,
    namee: "Science Fiction",
    imgSrc: "img/scince.jpeg",
  },
  {
    id: 10770,
    namee: "TV Movie",
    imgSrc: "img/tv movie.jpeg",
  },
  {
    id: 53,
    namee: "Thriller",
    imgSrc: "img/thriller.jpeg",
  },
  {
    id: 10752,
    namee: "War",
    imgSrc: "img/war.jpeg",
  },
  {
    id: 37,
    namee: "Western",
    imgSrc: "img/westren.jpeg",
  },
];

// Events
console.log(generes);
let type = generes.find((genre) => genre.id == 10752);
console.log(type.imgSrc);

const buttons = document.querySelectorAll(".generes button");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const id = parseInt(button.id);

    if (
      button.firstElementChild.firstElementChild.getAttribute("src") ==
      "img/right.png"
    ) {
      let src = generes.find((genre) => genre.id == id).imgSrc;
      button.firstElementChild.firstElementChild.setAttribute("src", src);
      interests.splice(interests.indexOf(id), 1);
    } else {
      button.firstElementChild.firstElementChild.setAttribute(
        "src",
        "img/right.png"
      );
      interests.push(id);
    }
  });
});

const startBtn = document.querySelector(".start-journey");
startBtn.addEventListener("click", () => {
  if (interests.length == 0) {
    alert("Please select at least one genre");
  } else {
    localStorage.setItem("interests", JSON.stringify(interests));
    window.location.href = "index2.html";
  }
});
