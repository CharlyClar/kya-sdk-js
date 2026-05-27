import nacl from 'tweetnacl';
import pkg from 'tweetnacl-util';
const { decodeBase64, encodeBase64 } = pkg;

export class KyaAuth {
    constructor(config = {}) {
        this.baseUrl = config.baseUrl || 'https://ton-domaine-laravel.com/api';
    }

    /**
     * Génère un nouveau couple de clés pour un agent.
     * Utile pour la phase d'enrôlement sur ton projet Laravel.
     */
    static generateKeyPair() {
        const keyPair = nacl.sign.keyPair();
        return {
            publicKey: encodeBase64(keyPair.publicKey),
            secretKey: encodeBase64(keyPair.secretKey)
        };
    }

    /**
     * Signe un message pour prouver l'identité de l'agent.
     */
    signMessage(message, secretKeyBase64) {
        const messageUint8 = new TextEncoder().encode(message);
        const secretKeyUint8 = decodeBase64(secretKeyBase64);
        const signature = nacl.sign.detached(messageUint8, secretKeyUint8);
        return encodeBase64(signature);
    }
}