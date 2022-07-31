import CommonView from '../view/commonView';
import ViewController from '../controllers/viewController';

class App {
    private commonView: CommonView;

    private viewController: ViewController;

    constructor() {
        this.commonView = new CommonView();
        this.viewController = new ViewController();
    }

    start() {
        this.commonView.render();
        this.viewController.start();
    }
}

export default App;
