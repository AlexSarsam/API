const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Serializar usuario (solo guardar el ID en la sesion)
passport.serializeUser((user, done) => {
  done(null, user.id_usuario);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Buscar o crear usuario OAuth en la BD
async function findOrCreateOAuthUser(profile, provider) {
  const email = profile.emails?.[0]?.value || null;
  const displayName = profile.displayName || profile.username || provider + '_user';

  // Buscar por email si existe
  if (email) {
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      await User.updateLastAccess(existingUser.id_usuario);
      return existingUser;
    }
  }

  // Crear nuevo usuario con password random (no se usara para login)
  const salt = await bcrypt.genSalt(10);
  const randomPassword = await bcrypt.hash(Math.random().toString(36), salt);

  const newUser = await User.create({
    email: email || `${profile.id}@${provider}.oauth`,
    password_hash: randomPassword,
    nombre: displayName,
    apellidos: '',
    id_rol: 2,
    estado_cuenta: 'activo'
  });

  // Obtener el usuario completo con su id_usuario real
  const createdUser = await User.findById(newUser.id);
  return createdUser;
}

// Estrategia de GitHub
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const user = await findOrCreateOAuthUser(profile, 'github');
      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  }
));

// Estrategia de Google
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const user = await findOrCreateOAuthUser(profile, 'google');
      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  }
));

module.exports = passport;
