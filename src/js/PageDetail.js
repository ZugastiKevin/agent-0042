const apikey = "?key=" + process.env.RAWG_API;
const PageDetail = (argument) => {
  const preparePage = () => {
    let cleanedArgument = argument.replace(/\s+/g, "-");

    const fetchGame = (url, argument) => {
      let finalURL = url + argument + apikey;

      fetch(`${finalURL}`)
        .then((response) => response.json())
        .then((response) => {
          let {background_image,website,name,rating,rating_top,ratings_count,released,description,developers,platforms,publishers,genres,tags,stores} = response;

          let backgroundImage = `<img src="${background_image}" alt="" style="width:100%"></img>`;
          let checkWebsite = `<a class="link-website" href="${website}">Check Website ➤</a>`;
          let ratings = rating + "/" + rating_top + " - " + ratings_count + " votes";
          let developer = developerss(developers);
          let platform = platformss(platforms);
          let publisher = publisherss(publishers);
          let genre = genderss(genres);
          let tag = tagss(tags);
          let store = storess(stores);

          let articleDOM = document.querySelector(".page-detail .article");

          articleDOM.querySelector("div.detailimg").innerHTML = backgroundImage;
          articleDOM.querySelector("div.detaillinkweb").innerHTML = checkWebsite;
          articleDOM.querySelector("div.detailtitle").innerHTML = name;
          articleDOM.querySelector("div.detailratings").innerHTML = ratings;
          articleDOM.querySelector("div.detailrelease-date span").innerHTML = released;
          articleDOM.querySelector("div.detaildescription span").innerHTML = description;
          articleDOM.querySelector("div.detaildevelopers span").innerHTML = developer;
          articleDOM.querySelector("div.detailplatforms span").innerHTML = platform;
          articleDOM.querySelector("div.detailpublishers span").innerHTML = publisher;
          articleDOM.querySelector("div.detailgenres span").innerHTML = genre;
          articleDOM.querySelector("div.detailtags span").innerHTML = tag;
          articleDOM.querySelector("div.detailstores span").innerHTML = store;
        });
    };

    const fetchGameScreen = (url, argument) => {
      let finalURL = url + argument + "/screenshots" + apikey;

      fetch(`${finalURL}`)
        .then((response) => response.json())
        .then((response) => {
          let {results} = response;

          let result = resultss(results);

          let articleDOM = document.querySelector(".page-detail .article");

          articleDOM.querySelector("div.card-grid").innerHTML = result;
        });
    };

    fetchGame("https://api.rawg.io/api/games/", cleanedArgument);
    fetchGameScreen("https://api.rawg.io/api/games/", cleanedArgument);
  };

  const developerss = (infos) => {
    let harvester = "";
    if (infos) {
      infos.forEach((index) => {
        harvester += index.name;
      });
    }
    return harvester;
  };

  const platformss = (infos) => {
    let harvester = "";
    if (infos) {
      infos.forEach((index) => {
        harvester += index.platform.name + ", ";
      });
    }
    return harvester;
  };

  const publisherss = (infos) => {
    let harvester = "";
    if (infos) {
      infos.forEach((index) => {
        harvester += index.name;
      });
    }
    return harvester;
  };

  const genderss = (infos) => {
    let harvester = "";
    if (infos) {
      infos.forEach((index) => {
        harvester += index.name + ", ";
      });
    }
    return harvester;
  };

  const tagss = (infos) => {
    let harvester = "";
    if (infos) {
      infos.forEach((index) => {
        if (index.language == "eng") {
          harvester += index.name + ", ";
        }
      });
    }
    return harvester;
  };

  const storess = (infos) => {
    let harvester = "";
    if (infos) {
      infos.forEach((index) => {
        harvester += `<a href="${index.store.domain}">${index.store.name}</a><a href="${index.store.domain}"><img class="logostores" src="src/images/logos/${index.store.slug}.svg"></a>`;
      });
    }
    return harvester;
  };

  const resultss = (infos) => {
    let harvester = "";
    if (infos) {
      infos.forEach((index) => {
        harvester += `<img class="img-size" src="${index.image}">`;
      });
    }
    return harvester;
  };

  const render = () => {
    pageContent.innerHTML = `
      <section class="page-detail">
        <div class="article">
          <div class="detailimg"></div>
          <div class="detaillinkweb"></div>
          <div class="titleAndRatings">
            <div class="detailtitle"></div>
            <div class="detailratings"></div>
          </div>
          <div class="detaildescription"><span></span></div>
          <div class="release-dateToPublishers">
            <div class="detailrelease-date">Release Date <span></span></div>
            <div class="detaildevelopers">Developers <span></span></div>
            <div class="detailplatforms">Platforms <span></span></div>
            <div class="detailpublishers">Publiser <span></span></div>
          </div>
          <div class="genresAndTags">
            <div class="detailgenres">Genre <span></span></div>
            <div class="detailtags">Tags <span></span></div>
          </div>
          <div class="detailstores">Buy<span></span></div>
          <div class="detailscreen">
            <p>Screenshots</p>
            <div class="card-grid"></div>
          </div>
        </div>
      </section>
    `;
    preparePage();
  };

  function itsNone () {
    let pied = document.getElementsByClassName("itsDisplayed");
    pied.innerHTML = ``;
  };

  itsNone();
  render();
};


export { PageDetail };

/*
// fetch pour the most similar Game
          fetch(`https://api.rawg.io/api/genres?key=${process.env.API_KEY}`)
            .then((response) => response.json())
            .then((response) => {
              let MostSimilarGame = [];
              let score = 1;

              genres.forEach((x) => {
                response.results.forEach((genre) => {
                  if (genre.name === x.name) {
                    genre.games.forEach((z) => {
                      if (MostSimilarGame.length === 0) {
                        MostSimilarGame.push([z.name, score, z.id]);
                      } else {
                        let verifyIfAlreadyExist = false;
                        for (let i = 0; i < MostSimilarGame.length; i++)
                          if (MostSimilarGame[i][0].includes(z.name)) {
                            MostSimilarGame[i][1] += 1;
                            verifyIfAlreadyExist = true;
                          }
                        if (verifyIfAlreadyExist === false) {
                          MostSimilarGame.push([z.name, score, z.id]);
                        }
                      }
                    });
                  }
                });
              });
              MostSimilarGame.sort(function (a, b) {
                return b[1] - a[1];
              });

              MostSimilarGame.forEach((game) => {
                if (game[0] != name) {
                  fetch(
                    `https://api.rawg.io/api/games/${game[2]}?key=${process.env.API_KEY}`
                  )
                    .then((response) => response.json())
                    .then((response) => {
                      let tabPlatform = [];
                      let kindOfGame = [];

                      response.genres.forEach((genre) => {
                        kindOfGame.push(genre.name);
                      });

                      response.platforms.forEach((x) => {
                        tabPlatform.push(x.platform.name);
                      });

                      document.querySelector(
                        ".articles"
                      ).innerHTML += `<article>
                      <a href = "#pagedetail/${response.id}">
                     <div class="imageCardPageList">
                     
                     <img src="${response.background_image}">
                     
                     <div class="cardDetailList">
                     <span>${response.released}</span>
                     <span>Developed by </span>
                     <span>${kindOfGame.join(", ")}</span>
                     <span><span class="bigger">${
                       response.rating
                     }</span> Votes ${response.ratings_count}</span>
                     
                     
                     </div>
                     </div>
                     </a>
                     
                     <div class="cardGame">
                     <a href = "#pagedetail/${response.id}">
                     <h3>${response.name} </h3>
                     </a>
                     <span class="platformGame">${tabPlatform.join(" ")}</span>
                    </div>
                    
                </article>
                `;
                    });
                }
              });
            });
*/
