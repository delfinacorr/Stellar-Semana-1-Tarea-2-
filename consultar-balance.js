// TAREA 2 - EJERCICIO 3: CONSULTA DE BALANCE
// OBJETIVO: Consultar el balance de las 5 cuentas creadas, para verificar las transferencias.

// --- Importación: Usamos 'require' (CommonJS) ---
const { Server } = require('stellar-sdk');

// --- CONFIGURACIÓN DE LA RED ---
const HORIZON_SERVER = new Server('https://horizon-testnet.stellar.org');

// 🚨🚨🚨 INSERTA AQUÍ LAS CLAVES GENERADAS POR 'crear-cuenta.js' 🚨🚨🚨
const PUBLIC_KEYS_A_CONSULTAR = [
    'GDF7AGLAPQUNZDP47ZDHJGAWUQSPQLAJR2VNP6MSSJQ6MSQ277SR5R6T',
    'GAVCXXQND34NWAELOSNCTRPFXSRLKG64HUCBSVNFAS5G7DMXVUUCMINI',
    'GAF4CR37L3XLFYQ2D3IBWI4AQI74BVJHLJTEFE7C6334BOZ5GSRP4X2I',
    'GAF4CR37L3XLFYQ2D3IBWI4AQI74BVJHLJTEFE7C6334BOZ5GSRP4X2I',
    'GAVS2CLE4ZP3N2N4C2WPFSMMXC7DMYN6CAJAYVKH5ACLMSTPUJ3TTMB6'
];

/**
 * 🛠️ CORE: Consulta la data de una cuenta y la formatea.
 */
async function obtenerInfoCuenta(publicKey) {
    try {
        const account = await HORIZON_SERVER.loadAccount(publicKey);
        // Busca el balance nativo (XLM)
        const xlmBalance = account.balances.find(b => b.asset_type === 'native').balance;
        
        return {
            cuenta: publicKey.substring(0, 10) + "...", // Acortar para la tabla
            balance: parseFloat(xlmBalance).toFixed(7), // Mayor precisión
            trustlines: account.balances.length - 1 // Número de activos que no son XLM
        };
    } catch (error) {
        // En caso de error (ej. cuenta no fondeada)
        return { cuenta: publicKey.substring(0, 10) + "...", balance: "NO ENCONTRADA", trustlines: 0 };
    }
}

/**
 * 💡 FUNCIÓN PRINCIPAL: Itera y muestra los resultados.
 */
async function ejecutarMonitor() {
    console.log('\n--- 📈 INICIANDO CONSULTA DE BALANCES ---');
    
    if (PUBLIC_KEYS_A_CONSULTAR[0].includes('INSERTA')) {
        console.error('❌ ERROR: Por favor, actualiza las claves públicas en el código.');
        return;
    }
    
    const resultados = [];
    for (const [index, key] of PUBLIC_KEYS_A_CONSULTAR.entries()) {
        console.log(`-> Consultando Cuenta #${index + 1}...`);
        resultados.push(await obtenerInfoCuenta(key));
    }

    console.log('\n--- 📋 RESULTADOS DEL MONITOREO ---');
    console.table(resultados);
}

ejecutarMonitor();