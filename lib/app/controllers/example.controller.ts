import Controller from "./controller";

class ExampleController extends Controller {
    index() {
        return request.filledQuery("hi");
    }
}

export default new ExampleController();
