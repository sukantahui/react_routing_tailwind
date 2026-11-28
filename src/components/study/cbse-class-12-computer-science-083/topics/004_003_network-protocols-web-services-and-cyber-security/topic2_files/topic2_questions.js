export default [
  {
    "id": 1,
    "question": "What does the acronym HTTP stand for in computer networking?",
    "options": [
      "Hypertext Transfer Protocol",
      "High Transmission Terminal Program",
      "Hyperlink Text Translation Process",
      "Host Telecommunication Packet Protocol"
    ],
    "correctAnswer": 0,
    "explanation": "HTTP stands for Hypertext Transfer Protocol, the foundational protocol for transferring hypermedia documents on the World Wide Web.",
    "hint": "Hypertext Transfer Protocol."
  },
  {
    "id": 2,
    "question": "On which default TCP port number does unencrypted HTTP operate?",
    "options": [
      "Port 21",
      "Port 25",
      "Port 80",
      "Port 443"
    ],
    "correctAnswer": 2,
    "explanation": "Standard plain-text HTTP operates over TCP port 80; encrypted HTTPS operates over TCP port 443.",
    "hint": "Port 80 is HTTP; Port 443 is HTTPS."
  },
  {
    "id": 3,
    "question": "What security layer transforms plain HTTP into HTTPS (Hypertext Transfer Protocol Secure)?",
    "options": [
      "FTP (File Transfer Protocol)",
      "SSL (Secure Sockets Layer) or TLS (Transport Layer Security)",
      "ICMP (Internet Control Message Protocol)",
      "DHCP (Dynamic Host Configuration Protocol)"
    ],
    "correctAnswer": 1,
    "explanation": "HTTPS is HTTP layered over SSL/TLS, providing end-to-end encryption, server authentication, and message integrity.",
    "hint": "SSL or modern TLS."
  },
  {
    "id": 4,
    "question": "Why is plain HTTP completely unsuitable for submitting online banking credentials or credit card numbers?",
    "options": [
      "Because HTTP transmits all requests and responses in plain cleartext, allowing eavesdroppers to intercept passwords using packet sniffers.",
      "Because HTTP only works on monochrome computer monitors.",
      "Because HTTP servers cannot store numbers greater than 100.",
      "Because HTTP requires physical paper slips to authenticate."
    ],
    "correctAnswer": 0,
    "explanation": "Plain HTTP lacks encryption; any eavesdropper or rogue Wi-Fi hotspot intercepting traffic can read passwords, usernames, and session tokens in cleartext.",
    "hint": "Transmits in unencrypted cleartext."
  },
  {
    "id": 5,
    "question": "On which default TCP port does HTTPS listen for secure client connections?",
    "options": [
      "Port 20",
      "Port 80",
      "Port 110",
      "Port 443"
    ],
    "correctAnswer": 3,
    "explanation": "HTTPS uses TCP port 443 by default.",
    "hint": "Port 443."
  },
  {
    "id": 6,
    "question": "What visual indicator in modern web browsers signifies that a website connection is secured using HTTPS?",
    "options": [
      "A spinning red hourglass",
      "A closed padlock icon in the browser address bar alongside https://",
      "A pop-up terminal window",
      "A flashing blue underline beneath the mouse pointer"
    ],
    "correctAnswer": 1,
    "explanation": "Web browsers display a closed padlock icon and 'https://' prefix to confirm a valid TLS certificate and encrypted channel.",
    "hint": "Closed padlock icon."
  },
  {
    "id": 7,
    "question": "What type of cryptographic architecture is employed during the HTTPS TLS handshake to exchange session keys securely?",
    "options": [
      "Purely symmetric encryption only",
      "Asymmetric (Public Key) Cryptography for identity verification and session key exchange, followed by Symmetric Encryption for bulk data transmission",
      "Simple Caesar cipher substitution",
      "ROT13 shifting"
    ],
    "correctAnswer": 1,
    "explanation": "HTTPS uses asymmetric cryptography (RSA or ECC) to authenticate the server and securely negotiate a shared secret key, and then uses fast symmetric encryption (AES) for data.",
    "hint": "Asymmetric for key exchange + Symmetric for bulk data."
  },
  {
    "id": 8,
    "question": "Which entity issues and digitally signs Digital SSL/TLS Certificates to verify the legal identity of a website owner?",
    "options": [
      "Certificate Authority (CA)",
      "Local Post Office",
      "Search Engine Optimization (SEO) agency",
      "Ethernet switch manufacturer"
    ],
    "correctAnswer": 0,
    "explanation": "A Certificate Authority (CA) (e.g., DigiCert, Let's Encrypt) acts as a trusted third party that validates domain ownership and digitally signs TLS certificates.",
    "hint": "Certificate Authority (CA)."
  },
  {
    "id": 9,
    "question": "What is an HTTP 'Request Method' (or Verb)?",
    "options": [
      "An action command indicating the desired operation to be performed on the target web resource (e.g., GET, POST).",
      "The font style used in the HTML web page.",
      "The physical speed of the router in megahertz.",
      "The browser's bookmarks menu."
    ],
    "correctAnswer": 0,
    "explanation": "HTTP methods (GET, POST, PUT, DELETE, HEAD) indicate the specific action to be executed on a specified resource.",
    "hint": "GET, POST, PUT, DELETE."
  },
  {
    "id": 10,
    "question": "Which HTTP request method is typically used by web browsers to retrieve data (e.g., loading an HTML web page or image)?",
    "options": [
      "POST",
      "GET",
      "DELETE",
      "CONNECT"
    ],
    "correctAnswer": 1,
    "explanation": "The GET method requests a representation of the specified resource without modifying server state.",
    "hint": "GET retrieves resources."
  },
  {
    "id": 11,
    "question": "Which HTTP request method is designed to submit form data, passwords, or uploaded files to be processed by the server?",
    "options": [
      "GET",
      "POST",
      "OPTIONS",
      "TRACE"
    ],
    "correctAnswer": 1,
    "explanation": "POST sends data in the HTTP request body to the server, commonly used for form submissions, user logins, and database updates.",
    "hint": "POST sends data in the request body."
  },
  {
    "id": 12,
    "question": "Why should sensitive data like passwords NEVER be submitted using the HTTP GET method?",
    "options": [
      "Because GET requests append parameter data directly onto the URL query string, exposing passwords in browser history, bookmarks, and server access logs.",
      "Because GET requests can only contain capital letters.",
      "Because GET requests are automatically sent to Wikipedia.",
      "Because GET requests can only be sent on Sundays."
    ],
    "correctAnswer": 0,
    "explanation": "GET appends data to the URL (e.g. `login.php?user=admin&pass=123`), making sensitive credentials visible in browser histories, bookmarks, and web server logs.",
    "hint": "GET parameters appear visible in the URL."
  },
  {
    "id": 13,
    "question": "What does HTTP Status Code '200 OK' indicate in a server response?",
    "options": [
      "The requested resource was not found on the server.",
      "The request has succeeded and the server is returning the requested entity.",
      "The client is unauthorized and must log in.",
      "The server has crashed permanently."
    ],
    "correctAnswer": 1,
    "explanation": "200 OK is the standard HTTP response indicating success.",
    "hint": "Standard success code."
  },
  {
    "id": 14,
    "question": "What does the notorious HTTP Status Code '404 Not Found' signify?",
    "options": [
      "The client request timed out.",
      "The server cannot find the requested URL resource.",
      "The server requires a credit card payment.",
      "The user's Wi-Fi card has disconnected."
    ],
    "correctAnswer": 1,
    "explanation": "404 Not Found indicates that the origin server did not find a current representation for the target URL resource.",
    "hint": "Resource does not exist on the server."
  },
  {
    "id": 15,
    "question": "What does HTTP Status Code '500 Internal Server Error' signify?",
    "options": [
      "The client entered an invalid password.",
      "The server encountered an unexpected condition that prevented it from fulfilling the request (e.g., script crash).",
      "The internet cable was unplugged.",
      "The page has moved permanently to another site."
    ],
    "correctAnswer": 1,
    "explanation": "500 Internal Server Error indicates an unhandled exception or backend server script crash.",
    "hint": "Server-side execution failure."
  },
  {
    "id": 16,
    "question": "Why is HTTP described as a 'Stateless Protocol'?",
    "options": [
      "Because it only functions outside of national borders.",
      "Because the server retains no persistent memory or session tracking of previous client requests once the response is sent.",
      "Because it cannot run on laptop computers.",
      "Because it does not require a power source."
    ],
    "correctAnswer": 1,
    "explanation": "HTTP is stateless because each request is executed independently without the server maintaining client state from prior interactions.",
    "hint": "No built-in session memory across requests."
  },
  {
    "id": 17,
    "question": "What mechanism is commonly used by web developers to preserve user login sessions and shopping carts over stateless HTTP/HTTPS?",
    "options": [
      "HTTP Cookies and Session Identifiers",
      "Coaxial Splitters",
      "BNC Connectors",
      "Motherboard BIOS"
    ],
    "correctAnswer": 0,
    "explanation": "HTTP Cookies store small tokens on the client browser that are sent back with subsequent requests to maintain stateful sessions.",
    "hint": "HTTP Cookies."
  },
  {
    "id": 18,
    "question": "What security attack is effectively neutralized by using HTTPS over public airport Wi-Fi networks?",
    "options": [
      "Man-in-the-Middle (MitM) eavesdropping and packet sniffing",
      "Physical theft of the laptop bag",
      "Monitor screen scratching",
      "Keyboard dust accumulation"
    ],
    "correctAnswer": 0,
    "explanation": "HTTPS encrypts the traffic payload using TLS, rendering intercepted packets unreadable to Man-in-the-Middle attackers on shared Wi-Fi networks.",
    "hint": "Prevents packet eavesdropping and MitM tampering."
  },
  {
    "id": 19,
    "question": "What happens if a user visits an HTTPS website whose SSL/TLS certificate has expired or was issued to a different domain name?",
    "options": [
      "The web browser silently downloads a virus.",
      "The browser displays a prominent security warning (e.g., 'Your connection is not private / Potential Security Risk').",
      "The computer's motherboard shuts down.",
      "The website automatically renews its own certificate without user notice."
    ],
    "correctAnswer": 1,
    "explanation": "Browsers enforce strict certificate validation: if the name, validity dates, or signing CA fail verification, a certificate warning is displayed.",
    "hint": "Browser displays a security certificate warning."
  },
  {
    "id": 20,
    "question": "Which of the following headers in an HTTP request informs the server about the client browser and operating system type?",
    "options": [
      "User-Agent",
      "Host",
      "Accept-Encoding",
      "Content-Length"
    ],
    "correctAnswer": 0,
    "explanation": "The `User-Agent` request header contains a characteristic string identifying the browser version and operating system to the web server.",
    "hint": "User-Agent header."
  },
  {
    "id": 21,
    "question": "In HTTP, what does a Status Code in the 3xx range (such as 301 or 302) represent?",
    "options": [
      "Informational request receipt",
      "Successful fulfillment",
      "Redirection: further action must be taken by the client to fulfill the request",
      "Fatal server hardware explosion"
    ],
    "correctAnswer": 2,
    "explanation": "3xx status codes indicate Redirection (e.g. 301 Moved Permanently, 302 Found).",
    "hint": "3xx = Redirection."
  },
  {
    "id": 22,
    "question": "What is the primary operational difference between HTTP/1.1 and modern HTTP/2 or HTTP/3?",
    "options": [
      "HTTP/2 supports multiplexing multiple requests simultaneously over a single TCP connection, drastically reducing latency.",
      "HTTP/1.1 does not support text.",
      "HTTP/2 can only run on Android phones.",
      "HTTP/3 requires analog modems."
    ],
    "correctAnswer": 0,
    "explanation": "HTTP/2 introduces binary framing and multiplexing to pipeline multiple requests and responses over a single TCP stream.",
    "hint": "Multiplexing multiple requests over one connection."
  },
  {
    "id": 23,
    "question": "In a CBSE Class 12 board examination case study, why would an examiner ask you to suggest HTTPS instead of HTTP for an e-commerce website?",
    "options": [
      "To improve website loading speed by 500%.",
      "To secure confidential customer transactions, credit card numbers, and passwords through cryptographic encryption and authentication.",
      "Because HTTP cannot display product photographs.",
      "Because Google prohibits HTTP from accessing the internet."
    ],
    "correctAnswer": 1,
    "explanation": "E-commerce sites handle sensitive financial transactions that mandate HTTPS to prevent data interception, tampering, and identity spoofing.",
    "hint": "Protects sensitive customer data through encryption."
  },
  {
    "id": 24,
    "question": "What is HSTS (HTTP Strict Transport Security)?",
    "options": [
      "A web security policy mechanism that forces browsers to interact with a website only via secure HTTPS connections, never plain HTTP.",
      "A software that restricts internet speed.",
      "An antivirus plugin for email attachments.",
      "A password manager built into keyboards."
    ],
    "correctAnswer": 0,
    "explanation": "HSTS header tells compliant browsers to automatically upgrade all insecure `http://` links to `https://` for that domain.",
    "hint": "Forces browsers to strictly use HTTPS."
  },
  {
    "id": 25,
    "question": "Which of the following correctly pairs the protocol with its standard port and default security posture?",
    "options": [
      "HTTP -> Port 80 (Unencrypted Plaintext); HTTPS -> Port 443 (Encrypted via SSL/TLS)",
      "HTTP -> Port 443 (Encrypted); HTTPS -> Port 80 (Unencrypted)",
      "HTTP -> Port 21 (Plaintext); HTTPS -> Port 25 (Encrypted)",
      "HTTP -> Port 53 (Encrypted); HTTPS -> Port 110 (Plaintext)"
    ],
    "correctAnswer": 0,
    "explanation": "HTTP operates unencrypted over port 80; HTTPS operates securely over port 443 with TLS encryption.",
    "hint": "Port 80 (plain) vs Port 443 (TLS)."
  }
];
