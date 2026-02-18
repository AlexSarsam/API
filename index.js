// Cargar variables de entorno
require('dotenv').config();

const express = require('express');
const session = require('express-session');
const passport = require('./config/passport');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const app = express();
const port = process.env.PORT || 3000;

// Cargar documentación Swagger
const swaggerDocument = YAML.load('./monlau-FitMealAPI-1.0.0-resolved.yaml');

// ============================================
// MIDDLEWARES
// ============================================

app.use(cors()); // Permitir CORS
app.use(express.json()); // Parser JSON
app.use(express.urlencoded({ extended: true })); // Parser URL-encoded

// Configuración de sesiones (necesario para Passport)
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Cambiar a true en producción con HTTPS
}));

// Inicializar Passport
app.use(passport.initialize());
app.use(passport.session());

// ============================================
// SWAGGER DOCUMENTATION
// ============================================

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ============================================
// RUTAS
// ============================================

// Rutas de autenticación (JWT)
const authRouter = require('./routes/auth');
app.use('/auth', authRouter);

// Rutas de OAuth (GitHub y Google)
const oauthRouter = require('./routes/oauth');
app.use('/auth', oauthRouter);

// Rutas CRUD protegidas
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const plansRouter = require('./routes/plans');

app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);
app.use('/api/plans', plansRouter);

// ============================================
// RUTA DE BIENVENIDA
// ============================================

app.get('/', (req, res) => {
  res.json({
    message: '🎯 Bienvenido a FitMeal API',
    version: '1.0.0',
    documentation: `http://localhost:${port}/api-docs`,
    endpoints: {
      authentication: {
        register: 'POST /auth/register',
        login: 'POST /auth/login',
        verify: 'GET /auth/verify',
        github: 'GET /auth/github',
        google: 'GET /auth/google'
      },
      users: {
        list: 'GET /api/users',
        get: 'GET /api/users/:id',
        update: 'PUT /api/users/:id',
        delete: 'DELETE /api/users/:id'
      },
      products: {
        list: 'GET /api/products',
        create: 'POST /api/products',
        get: 'GET /api/products/:id',
        update: 'PUT /api/products/:id',
        delete: 'DELETE /api/products/:id'
      },
      plans: {
        list: 'GET /api/plans',
        create: 'POST /api/plans',
        get: 'GET /api/plans/:id',
        update: 'PUT /api/plans/:id',
        delete: 'DELETE /api/plans/:id'
      }
    },
    status: 'online'
  });
});

// ============================================
// MANEJO DE ERRORES
// ============================================

// Ruta no encontrada
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error('Error:', err);
  const response = { error: 'Error interno del servidor' };
  if (process.env.NODE_ENV !== 'production') {
    response.details = err.message;
  }
  res.status(err.status || 500).json(response);
});

// ============================================
// INICIAR SERVIDOR
// ============================================

app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
  console.log(`📖 Documentación en http://localhost:${port}/api-docs`);
});
