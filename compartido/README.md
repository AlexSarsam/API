# 📦 Carpeta Compartida - FitMeal

Esta carpeta contiene los archivos necesarios para compartir el proyecto con tu compañero.

## 📄 Archivos incluidos

- `fitness_platform_backup.sql` - Backup completo de la base de datos MySQL

## 🚀 Instrucciones para tu compañero

### 1. Clonar el repositorio
```bash
git clone [URL_DEL_REPO]
cd API
```

### 2. Levantar el proyecto con Docker
```bash
docker-compose up -d
```

### 3. Importar la base de datos
```bash
# Esperar a que la base de datos esté lista (unos 10-15 segundos)
docker exec -i FitMeal mysql -u root -pFitMealRoot123 fitness_platform < compartido/fitness_platform_backup.sql
```

### 4. Verificar que todo funciona
- API: http://localhost:3000
- phpMyAdmin: http://localhost:8080
- Frontend: Ejecutar `cd frontend && npm install && npm run dev`

## 🔄 Actualizar la base de datos

Si haces cambios en la base de datos y quieres compartirlos, ejecuta:

```bash
docker exec FitMeal mysqldump -u root -pFitMealRoot123 fitness_platform > compartido/fitness_platform_backup.sql
git add compartido/fitness_platform_backup.sql
git commit -m "Actualizar backup de base de datos"
git push
```

Tu compañero solo necesita hacer:
```bash
git pull
docker exec -i FitMeal mysql -u root -pFitMealRoot123 fitness_platform < compartido/fitness_platform_backup.sql
```

## 📝 Notas

- El archivo SQL se actualiza manualmente (no automáticamente)
- Asegúrate de hacer commit del backup cuando hagas cambios importantes en la BD
- Ambos deben tener Docker instalado y corriendo
