import CommonView from '../view/commonView';
import ViewController from '../controllers/viewController';

class App {
    private commonView: CommonView;

    private viewController: ViewController;

    constructor() {
        this.commonView = new CommonView();
        this.viewController = new ViewController();
    }

    async start() {
        this.commonView.render();
        await this.viewController.start();
    }
}

export default App;
