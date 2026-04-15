# Migración a Raspberry Pi 5 — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Desplegar la API FitMeal (Node.js + MySQL) en una Raspberry Pi 5 compartida para que los 3 miembros del equipo accedan a la misma base de datos y API, manteniendo el frontend en local de cada uno.

---

## Estado de despliegue — 2026-04-14

### Completado ✅
- Docker 29.4 + Docker Compose v5 ya estaban instalados
- Repo clonado en `~/projects/fitmeal`
- `.env` creado con secrets reales
- Contenedores corriendo:
  - `FitMeal` (MySQL 8.0) → puerto **3307** externo (3306 ocupado por MariaDB local)
  - `fitmeal-api` (Node.js) → puerto **3000**
  - `fitmeal-phpmyadmin` → puerto **8081**
- Schema importado desde `backup_utf8.sql` (el `fitness_platform_backup.sql` tiene caracteres binarios `\0` y falla — no usar para init)
- API responde en `http://100.111.64.92:3000/` ✓
- Script de actualización creado en `~/update-fitmeal.sh`
- Tailscale descartado (problemas de acceso para compañeros)
- Dominio `fitmeal.website` comprado en Namecheap
- Nameservers de `fitmeal.website` cambiados a Cloudflare (pendiente propagación)

### Arquitectura final decidida
- **Acceso público (API):** Cloudflare Tunnel → `https://fitmeal.website` → Pi:3000
- **Acceso dev (SSH/Docker):** ZeroTier → IP ZeroTier de la Pi

### URLs finales (cuando estén configuradas)
| Acceso | URL |
|---|---|
| API pública | `https://fitmeal.website` |
| phpMyAdmin | `https://fitmeal.website/phpmyadmin` (pendiente) |
| API (red local) | `http://192.168.1.37:3000` |
| MySQL Workbench (ZeroTier) | `IP_ZEROTIER:3307` |
| SSH compañeros (ZeroTier) | `ssh pi@IP_ZEROTIER` |

### Pendiente ⏳
- [ ] Cloudflare confirmar dominio activo (propagación nameservers)
- [ ] Instalar `cloudflared` en la Pi y crear túnel permanente hacia `fitmeal.website`
- [ ] Configurar ZeroTier: crear red, instalar en Pi, instalar en PCs de compañeros
- [ ] Actualizar OAuth callbacks en GitHub y Google → `https://fitmeal.website/auth/github/callback` y `https://fitmeal.website/auth/google/callback`
- [ ] Cada compañero crear `frontend/.env` con `VITE_API_URL=https://fitmeal.website`

### Notas importantes
- `fitness_platform_backup.sql` tiene BOM/caracteres binarios — usar siempre `backup_utf8.sql` para importar
- MySQL expuesto en puerto 3307 (no 3306) porque MariaDB ya ocupa 3306 en la Pi
- Contraseña SSH de la Pi: `123456` (cambiar cuando haya tiempo)
- Para actualizar la API tras un push: `ssh pi@IP_ZEROTIER "~/update-fitmeal.sh"`

---

**Architecture:** La Raspberry Pi 5 actúa como servidor de desarrollo compartido corriendo `docker-compose` con la API y MySQL. Cada desarrollador corre el frontend Vite en su máquina local apuntando a la IP fija de la Pi. GitHub sigue siendo el repositorio central de código; la Pi hace `git pull` para actualizarse.

**Tech Stack:** Raspberry Pi OS (Debian ARM64), Docker, Docker Compose v2, Node.js 20, MySQL 8.0, GitHub

---

## Pre-requisitos

- Raspberry Pi 5 encendida y conectada a la red local
- Acceso SSH habilitado en la Pi (usuario: `pi` o el que se haya configurado)
- Conocer la IP actual de la Pi: ejecutar `hostname -I` en la Pi
- Tener el archivo `.env` del proyecto con los valores reales (JWT_SECRET, SESSION_SECRET, etc.)

---

## Task 1: Asignar IP fija a la Pi en el router

**Objetivo:** Que la Pi siempre tenga la misma IP para que el equipo no tenga que cambiar su `.env`.

**Files:**
- No modifica archivos del proyecto

- [ ] **Step 1: Obtener la MAC address de la Pi**

Ejecutar en la Pi (por SSH o terminal directa):
```bash
ip link show eth0 | grep ether
# Ejemplo salida: link/ether dc:a6:32:xx:xx:xx
```
Si usáis WiFi en vez de cable:
```bash
ip link show wlan0 | grep ether
```

- [ ] **Step 2: Asignar IP estática en el router**

Entrar al panel del router (normalmente `192.168.1.1` o `192.168.0.1` en el navegador) → buscar "DHCP reservations" o "IP fija por MAC" → añadir la MAC de la Pi con una IP como `192.168.1.100`.

- [ ] **Step 3: Verificar la IP desde otra máquina**

```bash
ping 192.168.1.100
# Debe responder sin timeout
```

---

## Task 2: Instalar Docker en la Raspberry Pi

**Objetivo:** Instalar Docker Engine y Docker Compose v2 en ARM64.

**Files:**
- No modifica archivos del proyecto

- [ ] **Step 1: Conectarse a la Pi por SSH**

```bash
ssh pi@192.168.1.100
# Sustituir 'pi' por el usuario configurado y la IP asignada en Task 1
```

- [ ] **Step 2: Actualizar el sistema**

```bash
sudo apt update && sudo apt upgrade -y
```

- [ ] **Step 3: Instalar Docker con el script oficial**

```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

- [ ] **Step 4: Añadir el usuario al grupo docker (evitar sudo)**

```bash
sudo usermod -aG docker $USER
newgrp docker
```

- [ ] **Step 5: Verificar instalación**

```bash
docker --version
docker compose version
```
Salida esperada:
```
Docker version 27.x.x, build ...
Docker Compose version v2.x.x
```

---

## Task 3: Clonar el repositorio en la Pi

**Objetivo:** Descargar el código desde GitHub en la Pi.

**Files:**
- No modifica archivos del proyecto

- [ ] **Step 1: Crear directorio para el proyecto**

```bash
mkdir -p ~/projects
cd ~/projects
```

- [ ] **Step 2: Clonar el repo de GitHub**

```bash
git clone https://github.com/Kevcasled/API.git fitmeal
cd fitmeal
```

- [ ] **Step 3: Verificar que el código está completo**

```bash
ls
# Debe mostrar: Dockerfile  docker-compose.yml  index.js  frontend  models  routes  ...
```

---

## Task 4: Configurar el archivo .env en la Pi

**Objetivo:** Crear el `.env` con los secrets reales y las URLs correctas apuntando a la IP de la Pi.

**Files:**
- Crear: `~/projects/fitmeal/.env`

- [ ] **Step 1: Crear el .env en la Pi**

```bash
nano ~/projects/fitmeal/.env
```

Pegar el siguiente contenido, sustituyendo los valores de secretos con los reales del equipo:

```env
# Base de datos
DB_HOST=fitmeal-db
DB_USER=fitmeal_user
DB_PASSWORD=FitMeal123
DB_NAME=fitness_platform
DB_PORT=3306

# Servidor
PORT=3000
NODE_ENV=development

# Secrets — usar los mismos valores que teníais en local
JWT_SECRET=PEGAR_VALOR_REAL_AQUI
SESSION_SECRET=PEGAR_VALOR_REAL_AQUI

# OAuth GitHub (las callback URLs deben cambiar a la IP de la Pi)
GITHUB_CLIENT_ID=PEGAR_VALOR_REAL_AQUI
GITHUB_CLIENT_SECRET=PEGAR_VALOR_REAL_AQUI
GITHUB_CALLBACK_URL=http://192.168.1.100:3000/auth/github/callback

# OAuth Google
GOOGLE_CLIENT_ID=PEGAR_VALOR_REAL_AQUI
GOOGLE_CLIENT_SECRET=PEGAR_VALOR_REAL_AQUI
GOOGLE_CALLBACK_URL=http://192.168.1.100:3000/auth/google/callback

# Frontend — permitir las IPs de todos los devs
FRONTEND_URL=http://192.168.1.100:5173
ALLOWED_ORIGINS=http://192.168.1.101:5173,http://192.168.1.102:5173,http://192.168.1.103:5173
```

> IMPORTANTE: `ALLOWED_ORIGINS` debe incluir las IPs de las máquinas de los 3 miembros del equipo.  
> Guardar con `Ctrl+O`, salir con `Ctrl+X`.

- [ ] **Step 2: Verificar que el .env no tiene valores vacíos**

```bash
grep "PEGAR_VALOR" ~/projects/fitmeal/.env
# No debe devolver ninguna línea — si devuelve, hay valores sin rellenar
```

---

## Task 5: Actualizar OAuth callbacks en GitHub y Google

**Objetivo:** Los proveedores OAuth necesitan saber la nueva URL de callback (la IP de la Pi).

**Files:**
- No modifica archivos del proyecto (configuración externa en GitHub/Google)

- [ ] **Step 1: Actualizar GitHub OAuth App**

Ir a: GitHub → Settings → Developer settings → OAuth Apps → FitMeal  
Cambiar "Authorization callback URL" a:
```
http://192.168.1.100:3000/auth/github/callback
```

- [ ] **Step 2: Actualizar Google OAuth**

Ir a: Google Cloud Console → APIs & Services → Credentials → OAuth 2.0 Client IDs → FitMeal  
Añadir en "Authorized redirect URIs":
```
http://192.168.1.100:3000/auth/google/callback
```

---

## Task 6: Levantar el proyecto con Docker Compose

**Objetivo:** Arrancar la API, MySQL y phpMyAdmin en la Pi.

**Files:**
- No modifica archivos del proyecto

- [ ] **Step 1: Construir e iniciar los contenedores**

```bash
cd ~/projects/fitmeal
docker compose up -d --build
```

Esto tardará varios minutos la primera vez (descarga imágenes ARM64 y compila la app).

- [ ] **Step 2: Verificar que los contenedores están corriendo**

```bash
docker compose ps
```
Salida esperada:
```
NAME                STATUS          PORTS
FitMeal             running         0.0.0.0:3306->3306/tcp
fitmeal-api         running         0.0.0.0:3000->3000/tcp
fitmeal-phpmyadmin  running         0.0.0.0:8081->80/tcp
```

- [ ] **Step 3: Verificar logs de la API**

```bash
docker compose logs fitmeal-api --tail=20
```
Buscar:
```
Server running on port 3000
Database connected
```
Si hay errores de conexión a BD, esperar 30 segundos y reintentar — MySQL tarda en inicializarse la primera vez.

- [ ] **Step 4: Probar la API desde la Pi**

```bash
curl http://localhost:3000/health
# o cualquier endpoint público del proyecto
```

- [ ] **Step 5: Probar la API desde otra máquina del equipo**

Desde el ordenador de cualquier miembro (no la Pi), abrir navegador o ejecutar:
```bash
curl http://192.168.1.100:3000/health
```
Debe responder igual que desde la Pi.

---

## Task 7: Actualizar el frontend de cada desarrollador

**Objetivo:** Que el Vite de cada dev apunte a la API de la Pi en vez de localhost.

**Files:**
- Modificar: `frontend/.env` (en cada máquina local, NO en el repo)

- [ ] **Step 1: Actualizar el .env del frontend en cada máquina**

En el ordenador de cada miembro del equipo:
```bash
# En la raíz del proyecto local (frontend/.env)
echo "VITE_API_URL=http://192.168.1.100:3000" > frontend/.env
```

- [ ] **Step 2: Verificar que frontend/.env está en .gitignore**

```bash
cat .gitignore | grep ".env"
# Debe aparecer .env para evitar que se commitee con la IP local de cada uno
```

Si no está, añadirlo:
```bash
echo "frontend/.env" >> .gitignore
```

- [ ] **Step 3: Arrancar el frontend y probar**

```bash
cd frontend
npm run dev
```
Abrir `http://localhost:5173` — debe conectar con la API de la Pi y funcionar con la base de datos compartida.

---

## Task 8: Crear script de actualización en la Pi

**Objetivo:** Script para que la Pi actualice el código cuando alguien hace push a `main`.

**Files:**
- Crear: `~/update-fitmeal.sh` (en la Pi, fuera del repo)

- [ ] **Step 1: Crear el script**

En la Pi:
```bash
cat > ~/update-fitmeal.sh << 'EOF'
#!/bin/bash
set -e
echo "=== Actualizando FitMeal ==="
cd ~/projects/fitmeal
git pull origin main
docker compose up -d --build fitmeal-api
echo "=== Listo! API actualizada ==="
docker compose ps
EOF
chmod +x ~/update-fitmeal.sh
```

- [ ] **Step 2: Probar el script**

```bash
~/update-fitmeal.sh
```
Salida esperada: git pull (sin cambios o con cambios), rebuild de la API, status de contenedores.

- [ ] **Step 3: Comunicar al equipo el flujo de trabajo**

Cuando alguien mergea a `main`:
1. Avisar al equipo por el canal del grupo
2. Entrar a la Pi por SSH: `ssh pi@192.168.1.100`
3. Ejecutar: `~/update-fitmeal.sh`
4. Confirmar que todos ven los cambios

---

## Task 9: Verificación final del entorno compartido

**Objetivo:** Confirmar que los 3 miembros ven la misma base de datos.

- [ ] **Step 1: Acceder a phpMyAdmin desde cualquier máquina**

Abrir en el navegador: `http://192.168.1.100:8081`  
Usuario: `root` | Contraseña: `FitMealRoot123`  
Verificar que la base de datos `fitness_platform` tiene las tablas correctas.

- [ ] **Step 2: Prueba de escritura compartida**

Desde la máquina del miembro A: crear un registro (usuario, alimento, etc.) desde el frontend.  
Desde la máquina del miembro B: verificar que ese mismo registro aparece sin hacer nada.  
Si ambos ven el mismo dato → la migración es exitosa.

- [ ] **Step 3: Commit del .gitignore actualizado si se modificó**

```bash
git add .gitignore
git commit -m "chore: ensure frontend/.env is gitignored for Pi migration"
git push origin main
```

---

## Resumen de puertos expuestos

| Servicio    | URL desde la red local            |
|-------------|-----------------------------------|
| API         | `http://192.168.1.100:3000`       |
| phpMyAdmin  | `http://192.168.1.100:8081`       |
| MySQL       | `192.168.1.100:3306` (Workbench)  |
| Frontend    | `http://localhost:5173` (local)   |

> Sustituir `192.168.1.100` por la IP real asignada en Task 1.
