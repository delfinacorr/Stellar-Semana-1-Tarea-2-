Tarea 2: Fundamentos del SDK de Stellar (Creación de Cuentas y Pagos XLM)

Este proyecto implementa los pasos fundamentales para interactuar con la Testnet de Stellar utilizando la librería stellar-sdk en un entorno Node.js, siguiendo los objetivos de la Tarea 2.

🎯 Objetivos de la Tarea 2

Generación y Fondeo de Cuentas: Crear cinco pares de claves criptográficas (Public Key y Secret Key) y activarlas en la Testnet mediante el uso de Friendbot, fondeándolas con 10,000 XLM cada una.

Transacciones Múltiples: Demostrar la capacidad de realizar tres pagos diferentes de manera atómica (en una sola transacción) desde la Cuenta 1 a tres cuentas destino distintas (Cuentas 2, 3 y 4).

Auditoría de Balances: Consultar el balance de las cinco cuentas antes y después de la transacción para verificar la correcta transferencia de fondos.

🛠️ Estructura del Proyecto

Archivo

Descripción

Rol en la Tarea

crear-cuenta.js

Genera 5 pares de claves, las activa y las fondea usando Friendbot. Produce las claves necesarias para los otros scripts.

1. Creación

enviar-pago.js

Carga la Cuenta 1, construye una transacción con TRES operaciones de pago simultáneas, la firma y la envía a la red.

2. Transacción Múltiple

consultar-balance.js

Consulta el estado de las 5 cuentas e imprime una tabla de los balances XLM antes y después del pago.

3. Auditoría

🚀 Guía de Ejecución

Esta guía asume que ya ejecutaste los scripts, pero sirve para documentar el proceso correcto:

Paso 0: Instalación de Dependencias

npm install stellar-sdk


Paso 1: Generar Cuentas y Fondeo Inicial

Ejecutar para obtener las 5 claves necesarias.

node crear-cuenta.js


👉 RESULTADO: Se crean y fondean 5 cuentas, cada una con 10,000 XLM.

Paso 2: Ejecutar la Transacción Atómica

Antes de ejecutar, asegúrate de haber insertado las claves secretas y públicas en el script enviar-pago.js.

node enviar-pago.js


👉 RESULTADO: Se verifica que la Cuenta 1 tiene saldo suficiente y se envía una única transacción con 3 pagos a las Cuentas 2, 3 y 4.

Paso 3: Auditoría Final de Balances

Antes de ejecutar, asegúrate de haber insertado las 5 claves públicas en el script consultar-balance.js.

node consultar-balance.js


👉 RESULTADO: Se muestra el balance final, confirmando que la Cuenta 1 disminuyó su saldo y las Cuentas 2, 3 y 4 aumentaron su saldo en la cantidad enviada.

💾 Estado del Repositorio

Este código ha sido confirmado y subido a la rama main del repositorio remoto.
