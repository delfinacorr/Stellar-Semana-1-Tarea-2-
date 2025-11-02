// TAREA 2 - EJERCICIO 2: ENVÍO DE PAGOS
// OBJETIVO: Enviar pagos de la CUENTA 1 a CUENTA 2, 3 y 4.

// --- IMPORTACIÓN CORREGIDA (CommonJS) ---
const StellarSdk = require('stellar-sdk');
// Se necesita 'Asset' para definir el activo XLM
const { Keypair, Server, Networks, TransactionBuilder, Operation, Asset } = StellarSdk;

// --- CONFIGURACIÓN DE LA RED ---
const HORIZON_SERVER = new Server('https://horizon-testnet.stellar.org');
const NETWORK_PASSPHRASE = Networks.TESTNET;

// 🚨🚨🚨 INSERTA AQUÍ LAS CLAVES GENERADAS POR 'crear-cuenta.js' 🚨🚨🚨
// Cuenta de Origen (Cuenta 1) - LA QUE ENVIARÁ EL DINERO
const SECRET_KEY_ORIGEN = 'SBMMHUIVPKZNLPW5ZDGDIA6NS7MJMV3ZY4C5DC6ZXWQRPVCKEJ3HPPQ7'; 

// Cuentas Destino (Cuentas 2, 3 y 4)
const DESTINOS = [
    { publicKey: 'GAVCXXQND34NWAELOSNCTRPFXSRLKG64HUCBSVNFAS5G7DMXVUUCMINI', amount: "10.0" },
    { publicKey: 'GAF4CR37L3XLFYQ2D3IBWI4AQI74BVJHLJTEFE7C6334BOZ5GSRP4X2I', amount: "5.0" },
    { publicKey: 'GAVS2CLE4ZP3N2N4C2WPFSMMXC7DMYN6CAJAYVKH5ACLMSTPUJ3TTMB6', amount: "1.0" }
];

// --- FUNCIÓN PRINCIPAL ---
async function enviarPagos() {
    console.log('\n--- 🚀 INICIANDO ENVÍO DE PAGOS MÚLTIPLES ---');

    if (SECRET_KEY_ORIGEN.includes('INSERTA')) {
        console.error('❌ ERROR: Por favor, actualiza las claves en el código.');
        return;
    }
    
    const keypairOrigen = Keypair.fromSecret(SECRET_KEY_ORIGEN);
    const publicKeyOrigen = keypairOrigen.publicKey();

    try {
        // 1. Cargar la cuenta de origen para obtener el sequence number
        const account = await HORIZON_SERVER.loadAccount(publicKeyOrigen);
        console.log(`✅ Cuenta Origen cargada. Balance inicial: ${account.balances[0].balance} XLM.`);
        
        // 2. Construir la Transacción. (Una sola Tx, múltiples Operaciones)
        let txBuilder = new TransactionBuilder(account, {
            // El fee debe ser 100 stroops por operación. Aquí son 3 operaciones.
            fee: (100 * DESTINOS.length).toString(), 
            networkPassphrase: NETWORK_PASSPHRASE,
        });

        // 3. Añadir cada pago como una 'Operation' a la misma transacción
        DESTINOS.forEach((destino, index) => {
            txBuilder = txBuilder.addOperation(Operation.payment({
                destination: destino.publicKey,
                // CORRECCIÓN CLAVE: Usar Asset.native() en lugar de 'native'
                asset: Asset.native(), 
                amount: destino.amount,
            }));
            console.log(`-> Agregada operación de pago #${index + 1}: ${destino.amount} XLM a ${destino.publicKey.substring(0, 5)}...`);
        });

        const transaction = txBuilder.setTimeout(30).build();

        // 4. Firmar con la clave secreta de origen
        transaction.sign(keypairOrigen);

        // 5. Enviar a la red
        console.log("\nEnviando transacción (contiene 3 pagos)...");
        const txResult = await HORIZON_SERVER.submitTransaction(transaction);
        
        console.log('\n--- ✅ ÉXITO: TRANSACCIÓN COMPLETADA ---');
        console.log(`   - Hash de Transacción: ${txResult.hash}`);
        console.log(`   - Puedes verificar en: https://testnet.stellarexpert.io/tx/${txResult.hash}`);

    } catch (error) {
        console.error('\n--- ❌ ERROR FATAL DURANTE LA TRANSACCIÓN ---');
        if (error.response && error.response.data && error.response.data.extras) {
            console.error('CÓDIGOS DE ERROR HORIZON:', error.response.data.extras.result_codes);
        } else {
            console.error('ERROR GENERAL:', error.message);
        }
    }
}

enviarPagos();