import User from '../models/User';

class UserController {
  // CREATE
  async store(req, res) {
    try {
      const novoUser = await User.create(req.body);
      const { id, nome, email } = novoUser;
      return res.json({ id, nome, email });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // INDEX
  async index(req, res) {
    try {
      const users = await User.findAll({ attributes: ['id', 'nome', 'email', 'telefone'] });
      return res.json(users);
    } catch (e) {
      return res.json(null);
    }
  }

  // SHOW ONE
  async show(req, res) {
    try {
      const users = await User.findByPk(req.params.id);

      const {
        id, nome, email, telefone,
      } = users;
      return res.json({
        id, nome, email, telefone,
      });
    } catch (e) {
      return res.json(null);
    }
  }

  // UPDATE
  async update(req, res) {
    try {
      const users = await User.findByPk(req.userId);
      if (!users) {
        return res.status(400).json({
          errors: ['Usuário não existe.'],
        });
      }
      const novosDados = await users.update(req.body);
      const {
        id, nome, email, telefone,
      } = novosDados;
      return res.json({
        id, nome, email, telefone,
      });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }

  // DELETE
  async delete(req, res) {
    try {
      if (!req.params.id) {
        return res.status(400).json({
          errors: ['ID não enviado.'],
        });
      }
      const users = await User.findByPk(req.params.id);
      if (!users) {
        return res.status(400).json({
          errors: ['Usuário não existe.'],
        });
      }
      await users.destroy();
      const { id, nome, email } = users;
      return res.json({ id, nome, email });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((err) => err.message),
      });
    }
  }
}

export default new UserController();
