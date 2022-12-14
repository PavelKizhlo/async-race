class CommonView {
    render() {
        const container = document.getElementById('app') as HTMLBodyElement;

        container.innerHTML = `
          <h1 class="title">Async Race</h1>
          <div class="nav">
            <button class="nav__button button" id="to-garage">to garage</button>
            <button class="nav__button button" id="to-winners">to winners</button>
          </div>
          <div id="view"></div> 
      `;
    }
}

export default CommonView;
