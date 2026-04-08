# FitMeal - Guía de inicio

## Requisitos previos

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado y corriendo
- [Node.js](https://nodejs.org/) instalado

---

## Cómo iniciar el proyecto

### 1. Levantar el backend (Docker)

Desde la raíz del proyecto (`/API`):

```powershell
docker-compose up -d
```

Esto arranca 3 contenedores:
- **API** Node.js en el puerto `3000`
- **MySQL 8.0** en el puerto `3306`
- **phpMyAdmin** en el puerto `8080`

### 2. Arrancar el frontend (Vite)

```powershell
cd frontend
npm run dev
```

### Parar todo

```powershell
docker-compose down
```

---

## URLs de acceso

| Servicio | URL |
|---|---|
| **Frontend** | http://localhost:5173 |
| **API REST** | http://localhost:3000 |
| **Swagger Docs** | http://localhost:3000/api-docs |
| **phpMyAdmin** | http://localhost:8080 |

---

## Credenciales por defecto

### Base de datos
| Campo | Valor |
|---|---|
| Host | `localhost` |
| Puerto | `3306` |
| Base de datos | `fitness_platform` |
| Usuario | `root` |
| Contraseña | `FitMealRoot123` |

### Usuario admin de la app
| Campo | Valor |
|---|---|
| Email | `admin@fitmeal.com` |
| Password | `admin123!` |

---

## Comandos Docker útiles

```powershell
# Ver estado de los contenedores
docker-compose ps

# Ver logs de la API
docker logs fitmeal-api -f

# Reiniciar solo la API
docker-compose restart fitmeal-api

# Parar y eliminar contenedores
docker-compose down

# Parar y eliminar también los volúmenes (⚠️ borra la BD)
docker-compose down -v
```
