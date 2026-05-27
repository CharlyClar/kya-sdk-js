# @platform-auth/kya-sdk-js

SDK JavaScript pour l'authentification des agents IA — **KYA** (Know Your Agent).

## Présentation

Ce SDK permet à un agent IA de prouver son identité auprès d'une API backend (Laravel) grâce à un système de signature cryptographique **Ed25519**.

Le flux est simple :

1. L'agent génère un couple de clés (publique + secrète).
2. La clé publique est enregistrée côté serveur lors de l'enrôlement.
3. À chaque requête, l'agent signe un message (ex : un challenge ou un timestamp) avec sa clé secrète.
4. Le serveur vérifie la signature avec la clé publique enregistrée.

## Installation

```bash
npm install @platform-auth/kya-sdk-js
```

## Utilisation

### Générer un couple de clés

```js
import { KyaAuth } from '@platform-auth/kya-sdk-js';

const { publicKey, secretKey } = KyaAuth.generateKeyPair();

console.log('Clé publique :', publicKey);
console.log('Clé secrète :', secretKey);
// Stocker la clé secrète de manière sécurisée
// Envoyer la clé publique au serveur lors de l'enrôlement
```

### Signer un message

```js
const kya = new KyaAuth({ baseUrl: 'https://mon-api.com/api' });

const message = 'challenge-unique-du-serveur';
const signature = kya.signMessage(message, secretKey);

// Envoyer la signature dans le header ou le body de la requête
```

### Vérification côté serveur (Laravel)

Le serveur reçoit le message + la signature, puis vérifie avec la clé publique de l'agent enregistrée en base. Si la signature est valide, l'identité de l'agent est confirmée.

## API

| Méthode | Description |
|---------|-------------|
| `KyaAuth.generateKeyPair()` | Génère un couple `{ publicKey, secretKey }` encodé en Base64 |
| `kya.signMessage(message, secretKeyBase64)` | Signe un message et retourne la signature en Base64 |

## Dépendances

- [`tweetnacl`](https://github.com/nicedaemon/tweetnacl-js) — cryptographie Ed25519
- [`tweetnacl-util`](https://github.com/nicedaemon/tweetnacl-util-js) — encodage/décodage Base64

## Licence

MIT — Charly Clar
