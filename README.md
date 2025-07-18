# 📦 BuyOrder Frontend

**BuyOrder Frontend** para **New Stetic S.A.**, la interfaz web de gestión y seguimiento de Órdenes de Compra Nacionales (OCN) utilizada por proveedores, almacén y equipos internos.

## 🚀 Tecnologías

- **React** (JSX + Hooks)
- **Vite** (bundler y servidor de desarrollo ultra rápido)
- **Tailwind CSS** (diseño estilizado y utilitario)
- **JWT / Active Directory (AD)** para autenticación
- Arquitectura de **Microservicios** back-end

## 🎯 Funcionalidades

1. **Seguimiento OCN**
   - Recordatorios automáticos por e-mail: martes y jueves a las 11:00 a.m.
   - Visualización de órdenes completas con estado por ítem
   - Comentarios por ítem con motivos predefinidos
   - Generación automática de cartas de atraso para ítems no entregados

2. **Almacén**
   - Botón único para registrar recepción de cada ítem
   - Registro de fecha y hora guardado automáticamente

3. **Calificación**
   - Evaluación de cumplimiento por ítem y proveedor
   - Cálculo basado en fechas reales vs. pactadas
   - Inclusión de motivos de retraso para ajustes finos

## 🔐 Seguridad

- Autenticación mediante **JWT** y **Active Directory (AD)**
- Roles y permisos:
  - **Proveedor**
  - **Almacén**
  - **Compras**
  - **Administrador**


## ⚙️ Requisitos

- **Node.js** ≥ 18.x  
- **npm** o **yarn**  
- Acceso al backend JSON + SQL Server via API

---

Claro, aquí tienes solo el apartado de variables de entorno:

---

## ⚙️ Variables de Entorno

Para el correcto funcionamiento del microservicio, se deben definir las variables de entorno en un archivo `.env` ubicado en la raíz del proyecto.

### 📄 Ejemplo de `.env`:

```env
# Puerto en el que se ejecuta el microservicio
NODE_ENV=

VITE_APP_NAME=

VITE_AUTH_SERVICE=

```


## 📄 Acerca de New Stetic S.A.

New Stetic S.A. es una empresa colombiana de manufactura y comercialización de productos odontológicos y médico-quirúrgicos con más de 70 años en el mercado, operación en 60+ países, cobertura en 64 países y más de 700 colaboradores ([newstetic.com][1], [newsteticusa.com][2]).

---

## 🧑‍💻 Autoria

* Desarrollado por el equipo TIC con **Andrés Cardona** – desarrollador principal

---

[1]: https://www.newstetic.com/en/?utm_source=chatgpt.com "We offer integral odontological and medical ... - New Stetic S.A."
[2]: https://newsteticusa.com/products/?utm_source=chatgpt.com "Products - Newstetic USA - Dental supply manufacturer."
