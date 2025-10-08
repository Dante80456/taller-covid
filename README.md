# Autotest COVID-19

Aplicación web para autotest de COVID-19 sin registro, con ID aleatorio y almacenamiento en MongoDB Atlas.

## Estructura del Proyecto

- `frontend/`: Archivos estáticos (HTML, CSS, JS)
- `backend/`: Servidor Node.js con Express y MongoDB

## Opciones de Despliegue

### Opción 1: Render (Recomendado)
#### Backend (Servicio Web)
1. Crea un nuevo servicio web en Render.
2. Conecta tu repositorio Git.
3. Configura:
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Agrega variable de entorno: `MONGODB_URI` con tu cadena de conexión de MongoDB Atlas.
5. Despliega.

#### Frontend (Sitio Estático)
1. Crea un nuevo sitio estático en Render.
2. Conecta el mismo repositorio.
3. Configura:
   - **Build Command**: (vacío, ya que no hay build)
   - **Publish Directory**: `frontend`
4. Despliega.

### Opción 2: Vercel
- **Frontend**: Importa el repo, configura `frontend` como root directory.
- **Backend**: Usa Vercel Functions (renombra `backend/server.js` a `api/submit.js` y ajusta).

### Opción 3: Netlify + Railway
- **Frontend**: Despliega en Netlify, conecta repo, publish `frontend`.
- **Backend**: Despliega en Railway, conecta repo, configura Node.js.

### Opción 4: Heroku + GitHub Pages
- **Frontend**: Sube `frontend` a GitHub Pages.
- **Backend**: Despliega en Heroku, conecta repo, comando `npm start`.

Nota: Para todas, actualiza CORS en `backend/server.js` con la URL del frontend si es necesario.

## Desarrollo Local

### Backend
```bash
cd backend
npm install
# Configura .env con MONGODB_URI
npm start
```

### Frontend
Abre `frontend/index.html` en un navegador. Asegúrate de que el backend esté corriendo para las llamadas API.

## Tecnologías
- Frontend: Vanilla HTML/CSS/JS
- Backend: Node.js, Express, MongoDB Atlas
- Despliegue: Render