# Mi Portfolio

Portfolio personal desarrollado como single-page application para presentar perfil profesional, experiencia, stack y proyectos destacados, con un formulario de contacto conectado a backend real y protegido con Google reCAPTCHA v3.

## Resumen

Este proyecto esta construido con React 19 y Vite 8, con una interfaz cuidada basada en Tailwind CSS v4 y componentes UI propios. El contenido principal se organiza en secciones de inicio, sobre mi, experiencia, proyectos, contacto y footer, con un enfoque claro en rendimiento, reutilizacion de componentes y experiencia visual.

Incluye una capa de datos local en JSON para proyectos, experiencia y tecnologias, asi como integracion con una API externa para el envio del formulario de contacto.

## Funcionalidades destacables

- Navegacion responsive con menu movil y cambio de tema.
- Fondo decorativo con particulas y animaciones de aparicion al hacer scroll.
- Seccion de experiencia y stack renderizada a partir de datos estructurados.
- Galeria de proyectos con proyectos destacados, tarjetas secundarias y modal de detalle.
- Formulario de contacto con validaciones de cliente, limites de caracteres y contador en el mensaje.
- Integracion opcional con Google reCAPTCHA v3 para proteger el envio frente a spam.
- Consumo de API mediante Axios para enviar mensajes al endpoint de contacto.

## Stack principal

### Frontend

- React 19
- Vite 8
- Tailwind CSS 4
- React Hook Form
- Axios
- Lucide React
- React Icons

### BackEnd

- Java 17
- Spring Boot

### Integraciones

- Google reCAPTCHA v3

### Datos y organizacion

- JSON local para proyectos, experiencia y tecnologias
- Hooks reutilizables para scroll reveal, reCAPTCHA y modal multimedia
- Componentes UI propios dentro de src/components/ui

## Arquitectura del proyecto

```text
src/
	components/
		ui/
	data/
	hooks/
	lib/
	App.jsx
	main.jsx
public/
	images/
	videos/
	docs/
```

### Piezas clave

- src/App.jsx monta la estructura principal del portfolio.
- src/components/AppProviders.jsx registra el proveedor global de reCAPTCHA cuando existe la clave publica.
- src/components/Projects.jsx renderiza los proyectos y abre el modal de detalle.
- src/components/Contact.jsx gestiona validacion, UX del formulario y envio.
- src/lib/api.js centraliza la llamada HTTP al backend de contacto.
- src/data/projects.json, src/data/experience.json y src/data/technologies.json actuan como fuente de contenido y metadatos.

## Formulario de contacto

El formulario de contacto esta preparado para un flujo real de envio:

- validacion de campos con React Hook Form
- limite de caracteres en nombre, email, compania y mensaje
- contador visual de caracteres en el campo mensaje
- generacion de token reCAPTCHA v3 al enviar
- adjunto del token al payload enviado al backend
- control de errores de envio y feedback visual al usuario

Cuando VITE_RECAPTCHA_SITE_KEY esta configurada, la aplicacion carga Google reCAPTCHA v3 de forma global y exige token antes de marcar el envio como correcto.

## Objetivo del proyecto

Este repositorio no busca ser una simple plantilla visual, sino una base de portfolio realista para un perfil Full Stack: presenta experiencia, casos de trabajo, stack tecnico y una via de contacto funcional con integracion backend y proteccion anti-bots.

## Estado actual

- frontend funcional con Vite, React y Tailwind
- secciones principales del portfolio ya integradas
- proyectos y experiencia renderizados desde datos locales
- formulario de contacto conectado a API y preparado para reCAPTCHA v3

## Autor

Angel Aragon

- GitHub: https://github.com/Algol95
- LinkedIn: https://www.linkedin.com/in/angel-dev-aragon/
