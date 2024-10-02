
# Sistema de Gestión de Tareas - Frontend (Angular) y Backend (.NET)

## Descripción

Este proyecto es una **aplicación de gestión de tareas** que utiliza **Angular** en el frontend y **ASP.NET Core** en el backend. Fue desarrollado como parte de una **prueba técnica interna** en **Double V Partners**, enfocada en la autenticación de usuarios, manejo de roles y administración de tareas. La aplicación permite a los usuarios autenticarse, gestionar tareas según su rol, y acceder a funcionalidades específicas según permisos.

---


## Despliegue en Firebase

El frontend de la aplicación ha sido desplegado en Firebase y puede ser accedido en la siguiente URL:

**URL de Firebase**: https://app-task-manager-firebase.web.app/

### Usuarios configurados:

- **Administrador**: dorado@yopmail.com / Contraseña: 4Mt0XvfT*
- **Supervisor**: maria@yopmail.com / Contraseña: 4Mt0XvfT*
- **Empleado**: yuli@yopmail.com / Contraseña: 4Mt0XvfT*


---

## Requisitos Funcionales Implementados:

1. **Autenticación de Usuarios**:
   - Registro e inicio de sesión de usuarios.
   - Uso de **JWT** (JSON Web Token) para la autenticación segura.
   - Cifrado de información en el almacenamiento local (Session Storage).

2. **Sistema de Roles**:
   - **Administrador**: Puede gestionar usuarios (crear, editar, eliminar) y tareas.
   - **Supervisor**: Puede asignar tareas a empleados y modificar su estado.
   - **Empleado**: Puede ver sus tareas asignadas y actualizar su estado.

3. **Gestión de Tareas**:
   - **CRUD** (Crear, Leer, Actualizar, Eliminar) de tareas.
   - Asignación de tareas a usuarios.
   - Actualización del estado de las tareas: **Pendiente**, **En Proceso**, **Completada**.

4. **Gestión de Usuarios**:
   - **CRUD** de usuarios para el administrador.
   - Asignación de roles a los usuarios.

5. **Cifrado**:
   - **Cifrado de datos** en el almacenamiento de sesión para mayor seguridad.
   - La API backend recibe datos cifrados y los descifra antes de procesarlos.
   - La funcionalidad de cifrado es opcional y puede ser activada o desactivada en los archivos de configuración de ambiente (environment).

---

### Backend (.NET Core):

- **ASP.NET Core** como framework para el backend.
- **Entity Framework Core** para la interacción con la base de datos.
- **JWT** para la autenticación segura.
- **Entity Framework Migrations** para la creación y actualización de la base de datos.
- **Control de acceso** basado en roles (Administrador, Supervisor, Empleado).
  
### Frontend (Angular):

- **Angular** para el desarrollo del frontend.
- Uso de **Guards** para proteger rutas según roles.
- **Interceptores HTTP** para añadir el token JWT en cada petición al backend.
- **Angular Material** para el diseño de la interfaz de usuario.
- Paginación y búsqueda en la gestión de tareas.
  
---

## Instalación y Configuración

### Requisitos Previos:

Para ejecutar este proyecto, necesitas instalar las siguientes herramientas:

- **Node.js** v14.20.0
- **Angular CLI** v15.2.10
- **.NET SDK** v6.0 o superior
- **SQL Server** o una base de datos similar para el backend

### Pasos para Instalar:

1. Clonar el repositorio:

   ```bash
   git clone <repo-url>
   cd <repo-folder>
   ```

3. **Frontend**:

   - Dirígete al directorio del frontend:

     ```bash
     cd <frontend-folder>
     ```

   - Instala las dependencias de Angular:

     ```bash
     npm install
     ```

   - Inicia el servidor frontend:

     ```bash
     ng serve
     ```

4. **Acceso a la aplicación**:

   - Una vez que ambos servidores (frontend y backend) estén en ejecución, puedes acceder a la aplicación desde tu navegador en:

     ```
     http://localhost:4200
     ```

---

## Arquitectura del Sistema

- **Backend**: El backend está desarrollado en ASP.NET Core con Entity Framework Core para la interacción con la base de datos. Las entidades principales incluyen Usuario, Rol y Tarea. La autenticación se gestiona mediante JWT, lo que permite un acceso seguro a las rutas protegidas.
  
- **Frontend**: El frontend utiliza Angular. Se han implementado **guards** para proteger rutas según los roles de usuario, y **interceptores HTTP** para gestionar las peticiones al backend y manejar la autenticación con JWT. El diseño de la interfaz está construido con **Angular Material** para una experiencia de usuario moderna e intuitiva.

---



## Consideraciones Especiales:

- **Cifrado de Sesión**: Todos los datos almacenados en el **Session Storage** están cifrados para garantizar la seguridad de la información sensible.
- **Cifrado opcional**: Se puede habilitar o deshabilitar el cifrado de respuestas desde los archivos de configuración en **environment.ts**.

---

- **Paginación y Búsqueda**: Se ha implementado la paginación en la gestión de tareas para mejorar la experiencia de usuario y permitir búsquedas dinámicas.
- **Seguridad**: Las rutas del backend están protegidas mediante JWT, y el acceso a las diferentes funcionalidades está determinado por los roles del usuario.
