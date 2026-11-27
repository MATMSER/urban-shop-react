# Urban Shop — Proyecto Final React

Tienda online desarrollada como Proyecto Final del curso de React.

## Tecnologías utilizadas

- JavaScript
- React
- Vite
- React Router
- Context API
- Firebase Authentication
- Cloud Firestore
- Bootstrap
- CSS

## Funcionalidades implementadas

- Catálogo de productos conectado a Firestore.
- Búsqueda de productos por nombre y categoría.
- Paginación del catálogo.
- Carrito global mediante Context API.
- Agregar, quitar y vaciar productos del carrito.
- Registro e inicio de sesión con Firebase Authentication.
- Rutas protegidas.
- Panel de administración.
- Alta, edición y eliminación de productos.
- Formularios controlados y validaciones.
- Estados de carga y mensajes de error.
- Diseño responsive.

## Credenciales de acceso al administrador

**Usuario:** admin@gmail.com

**Contraseña:** admin123

Estas credenciales corresponden al usuario administrador creado para la evaluación del Proyecto Final.

## Instalación y ejecución local

1. Instalar Node.js.
2. Abrir el proyecto en Visual Studio Code.
3. Abrir la terminal dentro de la carpeta del proyecto.
4. Ejecutar:

```bash
npm install
```

5. Crear el archivo `.env` en la carpeta raíz y completar las variables de configuración de Firebase.
6. Ejecutar:

```bash
npm run dev
```

7. Abrir la dirección local indicada por Vite.

## Configuración de Firebase

El proyecto utiliza Firebase Authentication con el método Email/Password y Cloud Firestore.

La configuración de Firebase se encuentra en variables de entorno `VITE_FIREBASE_...`.

El archivo `.env` no se incluye en el repositorio.

## Compilación

Para generar la versión de producción:

```bash
npm run build
```

Los archivos generados se guardan en la carpeta `dist`.

## Enlaces de entrega

**Repositorio GitHub:** https://github.com/MATMSER/urban-shop-react

**Aplicación publicada (Deploy):** https://urban-shop-react.netlify.app

Proyecto realizado en JavaScript para la entrega del Proyecto Final de React.