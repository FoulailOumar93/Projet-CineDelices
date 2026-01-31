import jwt from 'jsonwebtoken';
import argon2 from 'argon2';
import { Op } from 'sequelize';
import { User } from '../models/user.model.js';

export const userController = {
  /* =========================
     LOGIN (USERNAME OU EMAIL)
  ========================= */
  async login(req, res) {
    try {
      const { identifier, password } = req.body;

      console.log('LOGIN BODY:', req.body);

      if (!identifier || !password) {
        return res.status(400).json({
          message: 'Nom d\'utilisateur/email et mot de passe requis',
        });
      }

      const user = await User.findOne({
        where: {
          [Op.or]: [{ username: identifier }, { email: identifier }],
        },
      });

      if (!user) {
        return res.status(401).json({
          message: 'Compte inexistant. Veuillez créer un compte.',
        });
      }

      const ok = await argon2.verify(user.password, password);
      if (!ok) {
        return res.status(401).json({
          message: 'Nom d\'utilisateur/email ou mot de passe incorrect',
        });
      }

      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '3d' },
      );

      return res.json({
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt,
        },
      });
    } catch (error) {
      console.error('LOGIN ERROR:', error);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
  },

  /* =========================
     REGISTER
  ========================= */
  async register(req, res) {
    try {
      const { username, email, password } = req.body;

      console.log('REGISTER BODY:', req.body);

      if (!username || !email || !password) {
        return res.status(400).json({ message: 'Champs manquants' });
      }

      // ✅ check username/email déjà utilisés
      const existing = await User.findOne({
        where: {
          [Op.or]: [{ username }, { email }],
        },
      });

      if (existing) {
        // message précis
        if (existing.username === username) {
          return res.status(409).json({ message: 'Ce nom d\'utilisateur existe déjà' });
        }
        if (existing.email === email) {
          return res.status(409).json({ message: 'Cette adresse email existe déjà' });
        }
        return res.status(409).json({ message: 'Compte déjà existant' });
      }

      const hashed = await argon2.hash(password);

      // ✅ role = member (aligné enum)
      const user = await User.create({
        username,
        email,
        password: hashed,
        role: 'member',
      });

      // (Optionnel) auto-login après inscription
      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '3d' },
      );

      return res.status(201).json({
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt,
        },
      });
    } catch (error) {
      console.error('REGISTER ERROR:', error);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
  },

  /* =========================
     GET CURRENT USER (/me)
  ========================= */
  async getCurrentUserInfo(req, res) {
    try {
      const user = await User.findByPk(req.user.id, {
        attributes: ['id', 'username', 'email', 'role', 'createdAt'],
      });

      if (!user) {
        return res.status(404).json({ message: 'Utilisateur introuvable' });
      }

      return res.json(user);
    } catch (error) {
      console.error('ME ERROR:', error);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
  },

  /* =========================
     UPDATE CURRENT USER (/me)
     - empêche mot de passe déjà utilisé
  ========================= */
  async updateMe(req, res) {
    try {
      const { username, email, password } = req.body;

      const user = await User.findByPk(req.user.id);
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur introuvable' });
      }

      // ✅ vérifier conflits username/email (si modifiés)
      if (username && username !== user.username) {
        const usernameExists = await User.findOne({ where: { username } });
        if (usernameExists) {
          return res.status(409).json({ message: 'Ce nom d\'utilisateur existe déjà' });
        }
        user.username = username;
      }

      if (email && email !== user.email) {
        const emailExists = await User.findOne({ where: { email } });
        if (emailExists) {
          return res.status(409).json({ message: 'Cette adresse email existe déjà' });
        }
        user.email = email;
      }

      // ✅ password
      if (password) {
        // interdit de remettre le même mdp
        const same = await argon2.verify(user.password, password);
        if (same) {
          return res.status(409).json({ message: 'Mot de passe déjà utilisé' });
        }
        user.password = await argon2.hash(password);
      }

      await user.save();

      return res.json({
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt,
      });
    } catch (error) {
      console.error('UPDATE ME ERROR:', error);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
  },

  /* =========================
     DELETE CURRENT USER (/me)
  ========================= */
  async deleteMe(req, res) {
    try {
      const user = await User.findByPk(req.user.id);
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur introuvable' });
      }

      await user.destroy();
      return res.status(204).send();
    } catch (error) {
      console.error('DELETE ME ERROR:', error);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
  },
};
