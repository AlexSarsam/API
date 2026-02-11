# FitMeal API - Backend

API REST para la plataforma FitMeal con arquitectura MVC, Node.js, Express y MySQL.

## 🚀 Setup Rápido para Colaboradores

### 1. Clonar el repositorio
```bash
git clone https://github.com/TU_USUARIO/TU_REPO.git
cd API
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Configurar variables de entorno
```bash
cp .env.example .env
# Editar .env con tus credenciales locales
```

### 4. Levantar contenedores Docker
```bash
docker-compose up -d
```

### 5. Verificar que todo funciona
- API: http://localhost:3000
- Swagger Docs: http://localhost:3000/api-docs
- phpMyAdmin: http://localhost:8080

## 📦 Estructura del Proyecto

```
API/
├── config/          # Configuración (DB, Passport)
├── controllers/     # Controladores MVC
├── models/          # Modelos de datos
├── routes/          # Definición de rutas
├── middleware/      # Middlewares (auth, etc.)
├── docker-compose.yml
├── Dockerfile
└── index.js         # Punto de entrada
```

## 🔑 Endpoints Principales

### Autenticación
- `POST /auth/register` - Registrar usuario
- `POST /auth/login` - Iniciar sesión (devuelve JWT)
- `GET /auth/verify` - Verificar token

### Usuarios (requieren JWT)
- `GET /api/users` - Listar usuarios
- `GET /api/users/:id` - Obtener usuario
- `PUT /api/users/:id` - Actualizar usuario
- `DELETE /api/users/:id` - Eliminar usuario

### Productos (requieren JWT)
- `GET /api/products` - Listar productos
- `POST /api/products` - Crear producto
- `PUT /api/products/:id` - Actualizar producto
- `DELETE /api/products/:id` - Eliminar producto

### Planes (requieren JWT)
- `GET /api/plans` - Listar planes
- `POST /api/plans` - Crear plan
- `PUT /api/plans/:id` - Actualizar plan
- `DELETE /api/plans/:id` - Eliminar plan

## 🧪 Probar la API

### 1. Registrar usuario
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "nombre": "Test",
    "apellidos": "User"
  }'
```

### 2. Login
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### 3. Usar el token
```bash
curl http://localhost:3000/api/users \
  -H "Authorization: Bearer TU_TOKEN_AQUI"
```

## 🐳 Comandos Docker

```bash
# Iniciar contenedores
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener contenedores
docker-compose down

# Reiniciar
docker-compose restart

# Ver contenedores activos
docker ps
```

## 🤝 Workflow de Colaboración

### 1. Antes de empezar a trabajar
```bash
git pull origin main
```

### 2. Crear rama para tu feature
```bash
git checkout -b feature/nombre-feature
```

### 3. Hacer commits
```bash
git add .
git commit -m "Descripción del cambio"
```

### 4. Push y Pull Request
```bash
git push origin feature/nombre-feature
# Crear Pull Request en GitHub
```

## 🛠️ Tecnologías

- **Node.js** + **Express.js**
- **MySQL** 8.0
- **Docker** + **Docker Compose**
- **JWT** para autenticación
- **bcryptjs** para hash de contraseñas
- **Passport.js** para OAuth

## 📝 Variables de Entorno

Ver `.env.example` para la configuración completa.

## 🔐 Usuario Admin por Defecto

- Email: `admin@fitmeal.com`
- Password: `admin123!`

## 📄 Licencia

Proyecto académico - 2DAW - Centre d'Estudis Monlau
