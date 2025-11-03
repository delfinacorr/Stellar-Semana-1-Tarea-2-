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

## 🎓 Reflexión Post-implementación del Contrato Soroban
## 1. ¿Cuál fue la parte más difícil? ¿Fue el manejo de errores? ¿La organización del storage? ¿Los tests?
La parte más difícil fue la organización del storage, específicamente:
Identificar qué tipo de almacenamiento usar (Instance o Persistent): Determinar qué datos debían expirar con el contrato (Instance) y cuáles debían permanecer indefinidamente (Persistent, como los contadores por usuario).
Manejar los tipos de claves: Definir el enum de claves (StorageKey) de forma que fuera escalable y fácil de leer. Por ejemplo, definir Admin como una clave única de la instancia, mientras que CuentaContador requería una clave compuesta (la Symbol CONTADOR más la Address del usuario).
El manejo de errores y los tests son cruciales, pero la estructura del storage es el cimiento del contrato; si el estado se almacena incorrectamente, todo lo demás falla.
## 2. ¿Qué aprendiste sobre el operador ?? ¿Dónde lo usaste? ¿Por qué es útil?
## ¿Qué aprendiste sobre el operador ??
El operador ? (el "operador de propagación de errores" en Rust) es una abreviatura sintáctica que simplifica el manejo de los tipos Result<T, E> y Option<T>.
## ¿Dónde lo usaste? 
Se usó principalmente al interactuar con el storage (al leer valores), ya que las funciones como storage().persistent().get() devuelven un Option<T>.
## ¿Por qué es útil?
Reemplaza bloques voluminosos de match o if let con una sola pregunta. Si el valor es None (no se encontró la clave) o un Err, detiene la ejecución de la función actual y devuelve ese valor al llamador, lo que hace el código más legible y conciso.
## 3. ¿Por qué el orden de validaciones importa? ¿Qué validaste primero? ¿Por qué ese orden?
¿Por qué el orden de validaciones importa?
El orden es crucial por seguridad y eficiencia. Las validaciones de seguridad y permisos deben ir primero para evitar la ejecución no autorizada de código. Las validaciones menos costosas deben preceder a las más costosas.
¿Qué validaste primero? ¿Por qué ese orden?
Se valida primero la autorización de la cuenta (require_auth). Esto garantiza que, si una función solo puede ser llamada por una cuenta específica (ej. el administrador), el contrato detenga la ejecución inmediatamente si la cuenta no está autorizada, garantizando la seguridad.
## 4. ¿Entiendes la diferencia entre Instance y Persistent? ¿Qué pusiste en cada uno? ¿Por qué?
Tipo de Storage
Duración/Propósito
¿Qué pusiste?
¿Por qué?
Instance
Persiste solo mientras el contrato sea invocado regularmente.
StorageKey::Admin y StorageKey::Limite
Son metadatos del contrato. Si el contrato deja de usarse, no pasa nada si estos se eliminan.
Persistent
Persiste indefinidamente, independientemente de la actividad del contrato.
StorageKey::CuentaContador
El contador específico de cada usuario debe ser Persistent. El estado del usuario debe recordarse a largo plazo.

## 5. ¿Por qué usamos String en lugar de Symbol? ¿Qué métodos tiene String que Symbol no tiene? ¿En qué casos usarías cada uno?
## ¿Por qué usamos String en lugar de Symbol?
Usamos String cuando el dato a almacenar es variable, viene del usuario (como un nombre), o es intrínsecamente texto arbitrario.
## ¿Qué métodos tiene String que Symbol no tiene?
String permite operaciones de manipulación de texto complejas (concatenación, segmentación, búsqueda) y puede almacenar datos largos (hasta 10MB). Symbol solo tiene métodos de conversión y comparación de igualdad.
## ¿En qué casos usarías cada uno?
| Tipo de Dato | Uso Principal | Ejemplo en el Código |
| :--- | :--- | :--- |
| Symbol | Para identificadores estáticos codificados en el contrato (claves de storage, nombres de funciones). Es más eficiente y barato de comparar. | Claves de storage (ADMIN, LIMITE), nombres de funciones. |
| String | Para almacenar datos variables proporcionados por el usuario, como nombres, mensajes, descripciones o URLs. | Un nombre de usuario (como en la función try_transfer). |


## ⭐ Frase Memorable

> "Los errores no fueron barreras, fueron la prueba de que entendemos el SDK a nivel de constructor. Código 100% verificado."
