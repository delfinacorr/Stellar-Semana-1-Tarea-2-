# 🪐 Tarea 2: Fundamentos del SDK de Stellar (XLM & Pagos Atómicos)

Este proyecto implementa los pasos fundamentales para interactuar con la **Testnet de Stellar** utilizando la librería `stellar-sdk` en un entorno **Node.js**, siguiendo los objetivos de la Tarea 2.

---


## 🎯 Objetivos de la Tarea 2

| # | Objetivo | Estado |
|---|-----------|--------|
| 1 | Generación y Fondeo de Cuentas: Crear 5 pares de claves y fondearlas con 10,000 XLM cada una vía Friendbot. | ✅ Completado |
| 2 | Transacciones Múltiples: Realizar TRES pagos diferentes de forma atómica (en una sola transacción) desde la Cuenta 1 a las Cuentas 2, 3 y 4. | ✅ Completado |
| 3 | Auditoría de Balances: Consultar y verificar los balances finales de las 5 cuentas. | ✅ Completado |

---

## 🛠️ Estructura del Proyecto

| Archivo | Descripción | Rol Clave |
|----------|-------------|-----------|
| `crear-cuenta.js` | Genera 5 pares de claves, las activa y las fondea. Provee las Public/Secret Keys necesarias. | 🔑 Creación & Fondeo |
| `enviar-pago.js` | Construye una transacción única con 3 operaciones de pago simultáneas, la firma y la envía a la red. | 💳 Pago Atómico |
| `consultar-balance.js` | Consulta el estado final de las 5 cuentas e imprime una tabla de saldos XLM para la auditoría post-transacción. | 📊 Auditoría |

---

## 🚀 Guía de Ejecución (Paso a Paso)

### Paso 0: Instalación de Dependencias

Ejecuta este comando solo si no lo hiciste antes:

```bash
npm install stellar-sdk
```

---

### Paso 1: Generar Cuentas y Fondeo Inicial

Ejecuta primero para obtener tus claves. ¡Guárdalas!

```bash
node crear-cuenta.js
```

✅ **Resultado:** Se crean y fondean 5 cuentas, cada una con 10,000 XLM.

---

### Paso 2: Ejecutar la Transacción Atómica

⚠️ **IMPORTANTE:** Asegúrate de haber insertado las claves secretas y públicas en el script `enviar-pago.js`.

```bash
node enviar-pago.js
```

✅ **Resultado:** Se envía una única transacción a la red, confirmando el envío de fondos a las Cuentas 2, 3 y 4.

---

### Paso 3: Auditoría Final de Balances

⚠️ **IMPORTANTE:** Asegúrate de haber insertado las 5 claves públicas en el script `consultar-balance.js`.

```bash
node consultar-balance.js
```

✅ **Resultado:** Se muestra el balance final. La Cuenta 1 disminuye y las Cuentas 2, 3 y 4 aumentan su saldo, verificando la transacción.

---

## 💾 Estado del Repositorio

El código de la **Tarea 2** ha sido confirmado y subido exitosamente a la rama `main` del repositorio remoto, superando los desafíos de autenticación.

## ⭐ Frase Memorable

> "Los errores no fueron barreras, fueron la prueba de que entendemos el SDK a nivel de constructor. Código 100% verificado."
