// TAREA 2 - CREACIÓN MASIVA DE CUENTAS
const stellarPkg = require('stellar-sdk').default || require('stellar-sdk');
const { Keypair, Server } = stellarPkg;
const { fetch } = require('undici'); // npm i undici

const HORIZON_SERVER = new Server('https://horizon-testnet.stellar.org');
const FRIEND_BOT_URL = 'https://friendbot.stellar.org';
const CUENTAS_A_CREAR = 5;
const RESUMEN_CUENTAS = [];

const pausa = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function crearYActivarCuenta() {
  const keypair = Keypair.random();
  const publicKey = keypair.publicKey();
  const secretKey = keypair.secret();

  console.log(`-> Generando Keypair: ${publicKey}`);

  try {
    const res = await fetch(`${FRIEND_BOT_URL}/?addr=${encodeURIComponent(publicKey)}`);
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      throw new Error(`Friendbot error: ${res.status} ${res.statusText} ${text}`);
    }

    await pausa(1000);
    const account = await HORIZON_SERVER.loadAccount(publicKey);
    const nativeBalanceObj = account.balances.find(b => b.asset_type === 'native');
    const balance = nativeBalanceObj ? nativeBalanceObj.balance : '0';

    return { publicKey, secretKey, balance };
  } catch (error) {
    console.error(`\n❌ ERROR al fondear la cuenta ${publicKey}:`, error.message || error);
    return { publicKey, secretKey, balance: 'FALLO DE FONDEO' };
  }
}

async function ejecutarCreacionMasiva() {
  console.log(`\n--- INICIANDO PROVISIÓN DE CUENTAS (${CUENTAS_A_CREAR}) ---`);
  for (let i = 1; i <= CUENTAS_A_CREAR; i++) {
    console.log(`\n### Procesando Cuenta #${i}...`);
    const cuentaInfo = await crearYActivarCuenta();
    RESUMEN_CUENTAS.push(cuentaInfo);
    console.log(`\n✅ CUENTA ${i} CREADA:`);
    console.log(`   - Public Key: ${cuentaInfo.publicKey}`);
    console.log(`   - Secret Key: ${cuentaInfo.secretKey}`);
    console.log(`   - Balance XLM: ${cuentaInfo.balance === 'FALLO DE FONDEO' ? cuentaInfo.balance : `${cuentaInfo.balance} XLM`}`);
  }
  console.log('\n--- PROCESO FINALIZADO ---');
  console.table(RESUMEN_CUENTAS);
}

ejecutarCreacionMasiva();
