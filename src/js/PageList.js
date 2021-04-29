const apikey = "?key=" + process.env.RAWG_API;
const PageList = (argument = "") => {
  argument = document.querySelector("input").value;
  const preparePage = () => {
    let cleanedArgument = argument.replace(/\s+/g, "-");
    let articles = "";

    const fetchList = (url, argument) => {
      let finalURL = url;
      if (argument) {
        finalURL = url + apikey + "&search=" + cleanedArgument;
      } else {
        finalURL = url + apikey + "&dates=2021-01-01,2022-12-31";
      }

      fetch(`${finalURL}`)
        .then((response) => response.json())
        .then((response) => {
          response.results.forEach((article) => {
            articles += `
              <a href = "#pagedetail/${article.id}">
                <div class="cardGame">
                  <img class="img-size" src="${
                    article.background_image
                  }" alt="">
                  <h3>${article.name}</h3>
                  ${storeSlug(article.parent_platforms)}
                </div>
              </a>
            `;
          });
          document.querySelector(".page-list .card-grid").innerHTML = articles;
        });
    };

    fetchList("https://api.rawg.io/api/games", cleanedArgument);
  };

  const storeSlug = (stores) => {
    let str = "";
    if (stores) {
      stores.forEach((s) => {
        str += `<img class="logo" src="src/images/logos/${s.platform.slug}.svg">`;
      });
    }
    return str;
  };

  const render = () => {
    pageContent.innerHTML = `
      <section class="page-list">
        <div class="card-grid">
        </div>
      </section>
    `;
    preparePage();
  };

  render();
  document.querySelector("form").reset();
  return false;
};

export { PageList };