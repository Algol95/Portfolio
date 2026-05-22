# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Portfolio

## reCAPTCHA v3

Para activar Google reCAPTCHA v3 en el formulario de contacto, crea un archivo `.env` a partir de `.env.example` y define:

`VITE_RECAPTCHA_SITE_KEY=tu_site_key`

La app ya queda preparada para:

- cargar el proveedor global de reCAPTCHA
- solicitar un token al enviar el formulario de contacto
- adjuntar ese token al payload enviado al backend
