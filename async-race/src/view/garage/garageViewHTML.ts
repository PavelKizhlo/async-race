const html = `
  <div class="controls">
  <div class="controls__create-field">
      <input class="text-input" type="text" id="create-name-input" placeholder="Please, enter car name here ...">
      <input class="color-input" type="color" id="create-color-input" value="#ff0000">
      <button class="create-button button" id="create-button">create</button>
  </div>
  <div class="controls__update-field">
      <input class="text-input" type="text" id="update-name-input" placeholder="Please, enter new car name ...">
      <input class="color-input" type="color" id="update-color-input"  value="#9e5b9f">
      <button class="update-button button" id="update-button">update</button>
  </div>
  <button class="race-button button" id="race-button">race</button>
  <button class="reset-button button" id="reset-button">reset</button>
  <button class="generate-button button" id="generate-button">generate cars</button>
  </div>
  <h2 class="cars-title" id="cars-title"></h2>
  <div class="cars-page" id="cars-page"></div>
  <div class="pagination">
    <button class="pagination__button button" id="pagination-prev">prev</button>
    <button class="pagination__button button" id="pagination-next">next</button>
  </div>
`;

export default html;
