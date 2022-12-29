class BaseService {
  // static model;

  static async getAll() {
    try {
      return await this.blindModel().findAll();
    } catch (error) {
      throw error;
    }
  }
}

module.exports = BaseService;
