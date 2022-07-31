import CommonView from '../view/commonView';

class App {
    commonView: CommonView;

    constructor() {
        this.commonView = new CommonView();
    }

    start() {
        this.commonView.render();
    }
}

export default App;
