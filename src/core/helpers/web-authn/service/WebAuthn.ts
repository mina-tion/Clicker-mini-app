import { CreateCredential, WebAuthnClientCredential } from '@core/types/WebAuthn';
// import { CreateCredential } from '@core/types/WebAuthn';
import { randomBytes } from '@core/utils/randomBytes';
import { parseAuthenticatorData } from '@simplewebauthn/server/helpers';
import cbor from 'cbor-js';
import { toHex } from 'viem';

export class WebAuthn {
  private static async _generateRandomBytes(): Promise<Buffer> {
    return randomBytes(16);
  }

  public static isSupportedByBrowser(): boolean {
    console.warn(
      'isSupportedByBrowser',
      window?.PublicKeyCredential !== undefined && typeof window.PublicKeyCredential === 'function',
    );
    return (
      window?.PublicKeyCredential !== undefined && typeof window.PublicKeyCredential === 'function'
    );
  }

  public static async createPasswordCredential({ username }: { username: string }): Promise<Credential | null> {
    this.isSupportedByBrowser();

    const options = {
      id: await this._generateRandomBytes(),
      name: username,
      origin: window.location.hostname,
      password: 'f'
   };

    const credential = await navigator.credentials.create({
      password: options
    } as never);   

    if (!credential) {
      return null;
    }

    return credential;
  }
  
  public static async createFederatedCredential({ username }: { username: string }): Promise<Credential | null> {
    this.isSupportedByBrowser();

    const options = {
      id: await this._generateRandomBytes(),
      provider: 'https://accounts.google.com',
      name: username,
   };

    const credential = await navigator.credentials.create({
      federated: options
    } as never);   

    if (!credential) {
      return null;
    }

    return credential;
  } 

  public static async create({ username }: { username: string }): Promise<CreateCredential | null> {
    this.isSupportedByBrowser();

    const options: PublicKeyCredentialCreationOptions = {
      timeout: 60000,
      rp: {
        name: 'passkeys-4337/smart-wallet',
        id: window.location.hostname,
      },
      user: {
        id: await this._generateRandomBytes(),
        name: username,
        displayName: username,
      },
      pubKeyCredParams: [
        { alg: -7, type: 'public-key' }, // ES256
      ],
      authenticatorSelection: {
        requireResidentKey: true,
        userVerification: 'required',
        authenticatorAttachment: 'platform',
      },
      attestation: 'direct',
      challenge: Uint8Array.from('random-challenge', (c) => c.charCodeAt(0)),
    };

    const credential = await navigator.credentials.create({
      publicKey: options,
    });

    // const credential = await navigator.credentials.create({
    //   publicKey: {
    //     challenge: Uint8Array.from('random-challenge', (c) => c.charCodeAt(0)),
    //     rp: {
    //       name: 'passkeys-4337/smart-wallet',
    //       id: window.location.hostname,
    //     },
    //     user: {
    //       id: await this._generateRandomBytes(),
    //       name: username,
    //       displayName: username,
    //     },
    //     pubKeyCredParams: [ {type: 'public-key', alg: -7} ]
    //   }
    // });    

    if (!credential) {
      return null;
    }

    const webAuthnCredential: WebAuthnClientCredential = credential as unknown as WebAuthnClientCredential;

    // decode attestation object and get public key
    const decodedAttestationObj = cbor.decode(webAuthnCredential.response.attestationObject);
    const authData = parseAuthenticatorData(decodedAttestationObj.authData);
    const publicKey = cbor.decode(authData.credentialPublicKey?.buffer as ArrayBuffer);
    const x = toHex(publicKey[-2]);
    const y = toHex(publicKey[-3]);

    return {
      rawId: toHex(new Uint8Array(webAuthnCredential.rawId)),
      pubKey: {
        x,
        y,
      },
    };   
  }

  // GET CREDENTIALS

  public static async gePasswordCredential(): Promise<Credential | null> {
    const credential = await navigator.credentials.get({
      password: true,
      mediation: 'required'
    } as never);   

    if (!credential) {
      return null;
    }

    return credential;
  } 

  public static async getFederatedCredential(): Promise<Credential | null> {
    const options = {
      protocols: ['openidconnect'],
      providers: [
        'https://accounts.google.com'
      ]
    };

    const credential = await navigator.credentials.get({
      federated: options,
      mediation: 'required'
    } as never);   

    if (!credential) {
      return null;
    }

    return credential;
  } 
}
