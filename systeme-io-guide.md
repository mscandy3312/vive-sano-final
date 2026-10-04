# 🚀 Guía de Migración del Proyecto Vive Sano a Systeme.io

Esta guía detalla paso a paso cómo utilizar y conectar este proyecto HTML/CSS/JS con la plataforma **Systeme.io** para capturar prospectos, gestionar ofertas y automatizar la entrega de la **Guía Gratuita de Vive Sano por Gloria Molina**.

---

## 📁 Estructura del Proyecto HTML

```
vive-sano-systeme-io/
├── index.html              # Landing Page principal de captación (Lead Magnet + Campaña Directa)
├── gracias.html            # Página de Confirmación y Descarga (Thank You Page)
├── guia-digestiva.html     # Squeeze Page ultra-optimizada de 2 columnas para anuncios
├── programa.html           # Página de Ventas del programa "Construyendo tu Inmunidad"
├── pago.html               # Pasarela de Pedido / Checkout
├── gracias-compra.html     # Página de Bienvenida y Confirmación de Compra
├── css/
│   └── styles.css          # Sistema de diseño luxury orgánico, animaciones y diseño responsivo
├── js/
│   └── main.js             # Acordeones FAQ, Lightbox, captura de datos y helpers de Systeme.io
└── assets/
    └── images/             # Fotografías lifestyle, mockups 3D de la guía y fotos de Gloria Molina
```

---

## 🛠️ Método 1: Conectar el Formulario HTML Directamente a Systeme.io (Recomendado)

Si hospedas la página HTML en tu propio dominio (Cloudflare Pages, Vercel, Netlify o tu hosting web):

### Paso 1: Obtener la URL del Formulario en Systeme.io
1. Inicia sesión en **Systeme.io**.
2. Ve a **Túneles de venta (Funnels)** -> Crear nuevo túnel -> Tipo **"Construir una audiencia"**.
3. Añade una etapa de tipo **Página de captura (Opt-in page)**.
4. En el editor de Systeme.io, abre el formulario de captura y copia la URL de envío (Form Action URL) o crea un bloque de formulario embebido.

### Paso 2: Configurar `index.html` y `guia-digestiva.html`
Abre el archivo `index.html` o `guia-digestiva.html` y localiza la etiqueta `<form>`:

```html
<!-- Reemplaza YOUR_SYSTEME_IO_FORM_ACTION_URL con tu URL de Systeme.io -->
<form class="systeme-optin-form" action="https://systeme.io/register/TU_ID_DE_FORMULARIO" method="POST">
  
  <input type="text" name="first_name" placeholder="Ej. María García" required>
  <input type="email" name="email" placeholder="tu@correo.com" required>

  <button type="submit">RECIBIR MI GUÍA AHORA</button>
</form>
```

> ⚠️ **Campos obligatorios en Systeme.io:**
> - `name="first_name"` (para el nombre del usuario)
> - `name="email"` (para el correo electrónico)

---

## 🛠️ Método 2: Pegar en el Bloque "HTML Personalizado" dentro del Editor de Systeme.io

Si vas a construir tus páginas directamente en el constructor visual de Systeme.io:

1. Entra al editor visual de tu página en Systeme.io.
2. Arrastra un elemento de **"Código HTML personalizado" (Raw HTML)** a la sección deseada.
3. Copia el bloque de código HTML correspondiente (por ejemplo, el bloque `<div class="optin-box">...</div>` o el `<section id="faq">...</div>`).
4. En la configuración de la página de Systeme.io, ve a **Ajustes > Editar código de cabecera (Header Code)** e inserta:
   ```html
   <link rel="stylesheet" href="URL_A_TU_STYLESHEET/styles.css">
   ```
   o pega el contenido completo de `css/styles.css` dentro de una etiqueta `<style>...</style>`.

---

## ⚙️ Configuración de Automatizaciones y Etiquetas en Systeme.io

### 1. Crear Etiqueta (Tag) para los Leads
- Ve a **Contactos > Etiquetas** -> Crear etiqueta: `Lead - Guía Gratuita Vive Sano`.

### 2. Regla de Automatización para enviar la Guía PDF
- Ve a **Túneles de venta > Tu Túnel > Reglas de automatización**.
- **Disparador (Trigger):** Formulario de etapa del túnel enviado.
- **Acción 1:** Añadir etiqueta -> `Lead - Guía Gratuita Vive Sano`.
- **Acción 2:** Enviar correo -> Asunto: *¡Aquí tienes tu Guía Gratuita de Vive Sano por Gloria Molina!*
- Adjunta o coloca el enlace directo al archivo PDF de la guía en el cuerpo del correo.

### 3. Redirección a la Página de Gracias (`gracias.html`)
- En los ajustes de la etapa del túnel de Systeme.io, configura **"A qué página redirigir a los visitantes tras registrarse"** -> Selecciona la página de gracias `gracias.html`.

---

## 🎨 Paleta de Colores del Sistema de Diseño Vive Sano

| Elemento | Color Hex | Uso |
| :--- | :--- | :--- |
| **Verde Esmeralda Profundo** | `#1B3B2B` | Encabezados, botones primarios, marca |
| **Verde Medio Orgánico** | `#2D5A43` | Badges, elementos secundarios |
| **Crema / Arena Cálido** | `#FAF7F2` | Fondo de la página y secciones |
| **Arena Suave** | `#F4EFE6` | Tarjetas y contenedores |
| **Dorado Cálido Accent** | `#D99B26` | Destacados y botones de llamada a la acción |
| **Texto Principal** | `#1D2722` | Lectura principal |

---

## ✅ Verificación Final

1. Abre `index.html` en tu navegador web.
2. Comprueba que las imágenes, acordeones FAQ y modal Lightbox funcionen sin errores.
3. Ingresa un correo de prueba en el formulario para validar la redirección a `gracias.html`.
