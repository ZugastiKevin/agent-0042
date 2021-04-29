const Home = () => {

  const innerShow = () => {
    let innerShows = document.getElementById("innerShow");
    innerShows.innerHTML = `
      <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" class="btn btn-red itsDisplayed centering">Show More</a>
    `;
  };

  const innerPlatform = () => {
    let innerPlatforms = document.getElementById("innerPlatform");
    innerPlatforms.innerHTML = `
      <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" class="btn btn-red itsDisplayed">Platform : any ↕</a>
    `;
  };

  const innerText = () => {
    let innerTexts = document.getElementById("innerText");
    innerTexts.innerHTML = `
      <h2 class="itsDisplayed">Welcome,</h2>
      <p class="itsDisplayed">The Hyper Progame is the world’s premier event for computer and video games and related products. At The Hyper Progame,
      the video game industry’s top talent pack the Los Angeles Convention Center, connecting tens of thousands of the best,
      brightest, and most innovative in the interactive entertainment industry. For three exciting days, leading-edge
      companies,
      groundbreaking new technologies, and never-before-seen products will be showcased. The Hyper Progame connects you
      with both new and existing partners, industry executives, gamers, and social influencers providing unprecedented
      exposure</p>
    `;
  };

  innerShow();
  innerPlatform();
  innerText();
};

export { Home };