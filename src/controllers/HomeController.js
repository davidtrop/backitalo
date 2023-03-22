class HomeController {
  async index(req, res) {
    res.json('Hello my dear.');
  }
}

export default new HomeController();
