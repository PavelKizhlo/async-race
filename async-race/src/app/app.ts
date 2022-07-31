import CommonView from '../view/commonView';
import PageController from '../controllers/pageController';

class App {
    private commonView: CommonView;

    private pageController: PageController;

    constructor() {
        this.commonView = new CommonView();
        this.pageController = new PageController();
    }

    start() {
        this.commonView.render();
        this.pageController.start();
    }
}

export default App;
