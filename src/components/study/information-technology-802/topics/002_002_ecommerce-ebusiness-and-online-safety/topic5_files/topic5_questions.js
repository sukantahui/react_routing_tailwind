const questions = [
  {
    "id": "q1",
    "question": "Q1: What is the most fundamental indicator of a secure, encrypted website before entering banking details?",
    "options": [
      "The URL begins with 'https://' along with a closed padlock icon in the browser address bar",
      "The website has bright, flashing animated banner advertisements",
      "The website was shared on a WhatsApp forward group",
      "The URL begins with 'http://' with no padlock"
    ],
    "answer": "The URL begins with 'https://' along with a closed padlock icon in the browser address bar",
    "explanation": "HTTPS and the padlock icon signify that an active SSL/TLS digital certificate is encrypting all transmitted financial data.",
    "explanationBn": "ব্রাউজারের অ্যাড্রেস বারে 'https://' এবং বন্ধ তালার (Padlock) চিহ্ন থাকলে বোঝা যায় ওয়েবসাইটটি এনক্রিপ্টেড ও সুরক্ষিত।",
    "topic": "Online Transaction Safety: Key Precautions while Performing Digital Transactions",
    "difficulty": "Easy",
    "hint": "The URL begins with 'https://'..."
  },
  {
    "id": "q2",
    "question": "Q2: Why should consumers strictly avoid conducting online banking or financial shopping over open public Wi-Fi networks?",
    "options": [
      "Public Wi-Fi networks are unencrypted, allowing nearby hackers to perform packet sniffing and capture sensitive banking credentials",
      "Public Wi-Fi makes the smartphone battery discharge 100 times faster",
      "Public Wi-Fi changes the bank account balance permanently",
      "Public Wi-Fi only allows browsing in black and white"
    ],
    "answer": "Public Wi-Fi networks are unencrypted, allowing nearby hackers to perform packet sniffing and capture sensitive banking credentials",
    "explanation": "Open, unpassworded Wi-Fi hotspots in cafes or airports allow cyber criminals to snoop on network packets or set up rogue 'Evil Twin' fake hotspots.",
    "explanationBn": "পাবলিক ওয়াই-ফাইতে এনক্রিপশন না থাকায় হ্যাকাররা সহজে পাসওয়ার্ড ও ব্যাংকিং তথ্য চুরি করতে পারে।",
    "topic": "Online Transaction Safety: Key Precautions while Performing Digital Transactions",
    "difficulty": "Easy",
    "hint": "Public Wi-Fi networks are unencrypted..."
  },
  {
    "id": "q3",
    "question": "Q3: What does 'CVV' stand for on a debit or credit card, and why must it never be shared?",
    "options": [
      "Card Verification Value; it is a 3-digit security code used to verify card-not-present transactions",
      "Central Virtual Voucher; it gives a ₹100 discount",
      "Customer Valuation Vehicle; it determines car speed",
      "Card Validity Version; it is the card's manufacturing year"
    ],
    "answer": "Card Verification Value; it is a 3-digit security code used to verify card-not-present transactions",
    "explanation": "CVV2 is the 3-digit cryptographic verification code on the signature strip. Sharing it allows unauthorized card transactions.",
    "explanationBn": "CVV (Card Verification Value) হলো কার্ডের পেছনের ৩ অঙ্কের গোপন কোড যা কাউকে দেওয়া উচিত নয়।",
    "topic": "Online Transaction Safety: Key Precautions while Performing Digital Transactions",
    "difficulty": "Easy",
    "hint": "Card Verification Value..."
  },
  {
    "id": "q4",
    "question": "Q4: How does Two-Factor Authentication (2FA) / OTP protect a digital transaction?",
    "options": [
      "Requires a dynamic One-Time Password sent to the registered mobile number in addition to the card/account password",
      "Deletes the user's phone after the payment is made",
      "Requires two different people to click the mouse simultaneously",
      "Charges double the transaction amount"
    ],
    "answer": "Requires a dynamic One-Time Password sent to the registered mobile number in addition to the card/account password",
    "explanation": "2FA combines something you know (password) with something you possess (mobile device receiving OTP), preventing fraud even if password is compromised.",
    "explanationBn": "2FA/OTP পাসওয়ার্ডের পাশাপাশি মোবাইলে আসা এককালীন গোপন কোড দিয়ে লেনদেন নিশ্চিত করে দ্বিগুণ সুরক্ষা দেয়।",
    "topic": "Online Transaction Safety: Key Precautions while Performing Digital Transactions",
    "difficulty": "Easy",
    "hint": "Requires a dynamic One-Time Password..."
  },
  {
    "id": "q5",
    "question": "Q5: What is 'Phishing' in the context of online payment fraud?",
    "options": [
      "Fraudulent emails or SMS messages with deceptive links masquerading as authentic banks to trick users into revealing login passwords and OTPs",
      "Catching fish using electronic fishing rods",
      "Buying fishing equipment on Amazon",
      "Playing video games online"
    ],
    "answer": "Fraudulent emails or SMS messages with deceptive links masquerading as authentic banks to trick users into revealing login passwords and OTPs",
    "explanation": "Phishing mimics genuine bank communications to deceive victims into entering confidential credentials on fake lookalike web forms.",
    "explanationBn": "ফিশিং হলো ব্যাংকের নাম করে ভুয়া ইমেল বা মেসেজ পাঠিয়ে ব্যবহারকারীর পাসওয়ার্ড ও ওটিপি হাতিয়ে নেওয়ার ফাঁদ।",
    "topic": "Online Transaction Safety: Key Precautions while Performing Digital Transactions",
    "difficulty": "Easy",
    "hint": "Fraudulent emails or SMS messages..."
  },
  {
    "id": "q6",
    "question": "Q6: Why is using a 'Virtual On-Screen Keyboard' recommended when entering net banking passwords on public or shared computers?",
    "options": [
      "To prevent hardware and software keyloggers from recording physical keystrokes",
      "To type faster than a physical keyboard",
      "To change the font color to blue",
      "To practice mouse clicking speed"
    ],
    "answer": "To prevent hardware and software keyloggers from recording physical keystrokes",
    "explanation": "Keyloggers capture hardware keyboard signals; clicking randomized on-screen buttons foils keystroke-logging spyware.",
    "explanationBn": "ভার্চুয়াল কীবোর্ড ব্যবহার করলে কোনো কি-লগার সফটওয়্যার বোতামের টাইপিং রেকর্ড করতে পারে না।",
    "topic": "Online Transaction Safety: Key Precautions while Performing Digital Transactions",
    "difficulty": "Medium",
    "hint": "To prevent hardware and software keyloggers..."
  },
  {
    "id": "q7",
    "question": "Q7: What should a consumer immediately do if they receive an SMS alert for an unauthorized debit transaction from their bank account?",
    "options": [
      "Immediately contact the bank's official 24x7 fraud helpline to block the card/account and report the cyber fraud on cybercrime.gov.in (National Helpline 1930)",
      "Wait for 3 months to see if the money returns automatically",
      "Forward the SMS to all WhatsApp friends",
      "Delete the SMS and ignore it"
    ],
    "answer": "Immediately contact the bank's official 24x7 fraud helpline to block the card/account and report the cyber fraud on cybercrime.gov.in (National Helpline 1930)",
    "explanation": "Prompt reporting within the golden hour minimizes financial liability and enables payment gateway fraud freezes.",
    "explanationBn": "অবিলম্বে ব্যাংকের হেল্পলাইনে যোগাযোগ করে কার্ড ব্লক করতে হবে এবং জাতীয় সাইবার ক্রাইম হেল্পলাইন ১৯৩০-এ জানাতে হবে।",
    "topic": "Online Transaction Safety: Key Precautions while Performing Digital Transactions",
    "difficulty": "Easy",
    "hint": "Immediately contact the bank's official..."
  },
  {
    "id": "q8",
    "question": "Q8: Under Reserve Bank of India (RBI) guidelines, does a legitimate bank employee EVER ask for your ATM PIN, Net Banking Password, or OTP over phone call?",
    "options": [
      "NO, genuine banks NEVER ask for confidential PINs, passwords, or OTPs under any circumstance",
      "Yes, banks ask for PINs during routine account verification",
      "Yes, banks require OTPs to update KYC documents",
      "Yes, managers can ask for passwords"
    ],
    "answer": "NO, genuine banks NEVER ask for confidential PINs, passwords, or OTPs under any circumstance",
    "explanation": "No financial institution or law enforcement agency ever asks for confidential authentication secrets.",
    "explanationBn": "কোনো ব্যাংক কর্মকর্তা বা প্রতিনিধি কখনোই গ্রাহকের পিন, পাসওয়ার্ড বা ওটিপি জানতে চান না।",
    "topic": "Online Transaction Safety: Key Precautions while Performing Digital Transactions",
    "difficulty": "Easy",
    "hint": "NO, genuine banks NEVER ask..."
  },
  {
    "id": "q9",
    "question": "Q9: What is 'Shoulder Surfing' in physical/online transaction security?",
    "options": [
      "Looking over someone's shoulder to secretly observe them typing their ATM PIN, UPI PIN, or password",
      "Exercising while working on a computer",
      "Carrying a laptop bag on one shoulder",
      "Surfing the internet while standing"
    ],
    "answer": "Looking over someone's shoulder to secretly observe them typing their ATM PIN, UPI PIN, or password",
    "explanation": "Shoulder surfing is a direct visual observation technique used by criminals to harvest secret credentials in public places.",
    "explanationBn": "কাউকে টাইপ করতে দেখে আড়াল থেকে উঁকি দিয়ে পিন বা পাসওয়ার্ড দেখে নেওয়ার কৌশলকে শোল্ডার সার্ফিং বলে।",
    "topic": "Online Transaction Safety: Key Precautions while Performing Digital Transactions",
    "difficulty": "Medium",
    "hint": "Looking over someone's shoulder..."
  },
  {
    "id": "q10",
    "question": "Q10: Why should you always click 'Log Out' or 'Sign Out' instead of merely closing the browser tab after completing a transaction?",
    "options": [
      "To terminate the active session token on the server, preventing unauthorized session reuse or session hijacking",
      "To turn off the computer monitor",
      "To clear the internet connection bill",
      "To delete the operating system files"
    ],
    "answer": "To terminate the active session token on the server, preventing unauthorized session reuse or session hijacking",
    "explanation": "Logging out invalidates the server-side session, ensuring that subsequent users on the machine cannot access the account.",
    "explanationBn": "লগআউট করলে সার্ভারের সেশন টোকেন ধ্বংস হয়, ফলে অন্য কেউ আপনার অ্যাকাউন্টে ঢুকতে পারে না।",
    "topic": "Online Transaction Safety: Key Precautions while Performing Digital Transactions",
    "difficulty": "Medium",
    "hint": "To terminate the active session token..."
  },
  {
    "id": "q11",
    "question": "Q11: What is 'UPI QR Code Scam' where fraudsters trick victims into scanning a QR code to 'receive money'?",
    "options": [
      "Scanning a UPI QR code and entering your UPI PIN always DEBITS money from your account, it NEVER credits money",
      "Scanning a QR code instantly doubles your bank balance",
      "QR codes are only for taking photographs",
      "Entering UPI PIN gives free shopping coupons"
    ],
    "answer": "Scanning a UPI QR code and entering your UPI PIN always DEBITS money from your account, it NEVER credits money",
    "explanation": "Entering a UPI PIN is strictly an authorization to SEND money; receiving money requires no PIN whatsoever.",
    "explanationBn": "টাকা রিসিভ করতে কোনো পিন লাগে না; UPI PIN দিলে অ্যাকাউন্ট থেকে টাকা কেটে নেওয়া হয়।",
    "topic": "Online Transaction Safety: Key Precautions while Performing Digital Transactions",
    "difficulty": "Medium",
    "hint": "Scanning a UPI QR code and entering..."
  },
  {
    "id": "q12",
    "question": "Q12: Which of the following describes a strong, secure password practice for net banking?",
    "options": [
      "At least 12-16 characters containing uppercase letters, lowercase letters, numbers, and special symbols (e.g., `K@lk@t@#802!Tr@ns`)",
      "Using `password123` or `12345678`",
      "Using your date of birth or pet's name",
      "Using the same password across all 20 of your accounts"
    ],
    "answer": "At least 12-16 characters containing uppercase letters, lowercase letters, numbers, and special symbols (e.g., `K@lk@t@#802!Tr@ns`)",
    "explanation": "High entropy complex passwords resist dictionary attacks and brute-force cracking tools.",
    "explanationBn": "বড় ও ছোট হাতের অক্ষর, সংখ্যা এবং স্পেশাল ক্যারেক্টার মিলিয়ে তৈরি শক্তিশালী পাসওয়ার্ড ব্যবহার করা উচিত।",
    "topic": "Online Transaction Safety: Key Precautions while Performing Digital Transactions",
    "difficulty": "Easy",
    "hint": "At least 12-16 characters containing..."
  },
  {
    "id": "q13",
    "question": "Q13: What is 'Card Tokenization' mandated by RBI for Indian online merchants?",
    "options": [
      "Replacing actual 16-digit card numbers with an encrypted, unique surrogate code ('Token') so merchants never store sensitive card details",
      "Giving physical plastic tokens to online shoppers",
      "Deleting the customer's bank account",
      "Converting credit cards into gold coins"
    ],
    "answer": "Replacing actual 16-digit card numbers with an encrypted, unique surrogate code ('Token') so merchants never store sensitive card details",
    "explanation": "Tokenization prevents merchant data breach fallout by ensuring merchants only store useless randomized tokens.",
    "explanationBn": "টোকেনাইজেশনের মাধ্যমে কার্ডের আসল নম্বরের বদলে একটি এনক্রিপ্টেড টোকেন ব্যবহার করা হয় যাতে তথ্য ফাঁস না হয়।",
    "topic": "Online Transaction Safety: Key Precautions while Performing Digital Transactions",
    "difficulty": "Hard",
    "hint": "Replacing actual 16-digit card numbers..."
  },
  {
    "id": "q14",
    "question": "Q14: What is 'Smishing'?",
    "options": [
      "Phishing attacks conducted specifically via SMS text messages containing malicious links",
      "Sending physical letters through speed post",
      "Talking on a landline telephone",
      "Listening to FM radio broadcasts"
    ],
    "answer": "Phishing attacks conducted specifically via SMS text messages containing malicious links",
    "explanation": "Smishing (SMS + Phishing) deceives mobile users into clicking fake links via deceptive text messages.",
    "explanationBn": "স্মিশিং (Smishing) হলো মোবাইল এসএমএসের মাধ্যমে ফিশিং লিংক পাঠিয়ে প্রতারণা করা।",
    "topic": "Online Transaction Safety: Key Precautions while Performing Digital Transactions",
    "difficulty": "Medium",
    "hint": "Phishing attacks conducted specifically via SMS..."
  },
  {
    "id": "q15",
    "question": "Q15: Why is checking the browser URL spelling (Domain Name) vital before entering credentials?",
    "options": [
      "To detect 'Typosquatting' and phishing domain lookalikes (e.g., `amaz0n-deal.xyz` instead of `amazon.in`)",
      "To check if the font size looks pretty",
      "To count the number of vowels in the company name",
      "To test your typing speed"
    ],
    "answer": "To detect 'Typosquatting' and phishing domain lookalikes (e.g., `amaz0n-deal.xyz` instead of `amazon.in`)",
    "explanation": "Cyber criminals register slight spelling variations to deceive inattentive users into entering passwords on fake sites.",
    "explanationBn": "টাইপোস্কোয়াটিং ও ভুয়া ওয়েবসাইটের বানান ভুল (যেমন `amaz0n.com`) শনাক্ত করে প্রতারণা থেকে বাঁচা যায়।",
    "topic": "Online Transaction Safety: Key Precautions while Performing Digital Transactions",
    "difficulty": "Medium",
    "hint": "To detect 'Typosquatting'..."
  },
  {
    "id": "q16",
    "question": "Q16: Which feature should always be enabled on your bank account to immediately detect unauthorized debits?",
    "options": [
      "Instant SMS and Email Transaction Alerts",
      "Mute all incoming notifications",
      "Turn off mobile network daily",
      "Disable email spam filters"
    ],
    "answer": "Instant SMS and Email Transaction Alerts",
    "explanation": "Real-time alerts ensure that any unauthorized transaction is detected within seconds, enabling immediate response.",
    "explanationBn": "রিয়েল-টাইম SMS ও ইমেল অ্যালার্ট চালু রাখলে যেকোনো লেনদেনের সাথে সাথে নোটিফিকেশন পাওয়া যায়।",
    "topic": "Online Transaction Safety: Key Precautions while Performing Digital Transactions",
    "difficulty": "Easy",
    "hint": "Instant SMS and Email..."
  },
  {
    "id": "q17",
    "question": "Q17: What is 'SIM Swapping Fraud' in cybercrime?",
    "options": [
      "Fraudsters obtain a duplicate SIM card of the victim's phone number using fake ID proofs to intercept banking OTPs",
      "Swapping phone covers with a classmate",
      "Upgrading from a 4G SIM to a 5G SIM legally at an official store",
      "Changing the phone ringtone"
    ],
    "answer": "Fraudsters obtain a duplicate SIM card of the victim's phone number using fake ID proofs to intercept banking OTPs",
    "explanation": "SIM swapping deactivates the victim's genuine SIM and routes all 2FA banking OTPs directly to the criminal's handset.",
    "explanationBn": "সিম সোয়াপিং হলো জালিয়াতির মাধ্যমে ভুক্তভোগীর নম্বরের ডুপ্লিকেট সিম তুলে ওটিপি হাতিয়ে নেওয়া।",
    "topic": "Online Transaction Safety: Key Precautions while Performing Digital Transactions",
    "difficulty": "Hard",
    "hint": "Fraudsters obtain a duplicate SIM..."
  },
  {
    "id": "q18",
    "question": "Q18: What is a 'Payment Gateway' in digital commerce transactions?",
    "options": [
      "A secure merchant service that authorizes credit/debit card or UPI payments by securely encrypting and transmitting data to the bank",
      "A physical toll plaza on a highway",
      "A wooden gate in front of an office",
      "An email inbox folder"
    ],
    "answer": "A secure merchant service that authorizes credit/debit card or UPI payments by securely encrypting and transmitting data to the bank",
    "explanation": "Payment gateways (e.g., Razorpay, CCAvenue, Paytm, BillDesk) act as the encrypted intermediary between merchant apps and banking networks.",
    "explanationBn": "পেমেন্ট গেটওয়ে হলো একটি সুরক্ষিত সেতু যা ক্রেতার অর্থ লেনদেনকে এনক্রিপ্ট করে ব্যাংকে পাঠায়।",
    "topic": "Online Transaction Safety: Key Precautions while Performing Digital Transactions",
    "difficulty": "Easy",
    "hint": "A secure merchant service that authorizes..."
  },
  {
    "id": "q19",
    "question": "Q19: Which device setting should be turned OFF when walking through public train stations or shopping malls to prevent unauthorized pairing attacks?",
    "options": [
      "Bluetooth and Auto-Connect to Open Wi-Fi Networks",
      "Screen Brightness",
      "System Wallpaper",
      "Internal Clock"
    ],
    "answer": "Bluetooth and Auto-Connect to Open Wi-Fi Networks",
    "explanation": "Disabling auto-connect prevents devices from silently latching onto rogue, malicious Wi-Fi hotspots.",
    "explanationBn": "পাবলিক প্লেসে ব্লুটুথ ও ওপেন ওয়াই-ফাই অটো-কানেক্ট বন্ধ রাখা নিরাপদ।",
    "topic": "Online Transaction Safety: Key Precautions while Performing Digital Transactions",
    "difficulty": "Medium",
    "hint": "Bluetooth and Auto-Connect..."
  },
  {
    "id": "q20",
    "question": "Q20: What is 'Vishing' in cyber fraud terminology?",
    "options": [
      "Voice Phishing: Fraudulent phone calls where criminals pose as bank managers or police to manipulate victims into sharing OTPs",
      "Video editing software",
      "Viewing photos on Instagram",
      "Voice recording songs"
    ],
    "answer": "Voice Phishing: Fraudulent phone calls where criminals pose as bank managers or police to manipulate victims into sharing OTPs",
    "explanation": "Vishing uses voice telephone calls and social engineering tricks to extract confidential banking data.",
    "explanationBn": "ভয়েস ফিশিং (Vishing) হলো ফোনে কল করে ভুয়া কর্মকর্তা সেজে ওটিপি বা পিন আদায়ের অপচেষ্টা।",
    "topic": "Online Transaction Safety: Key Precautions while Performing Digital Transactions",
    "difficulty": "Medium",
    "hint": "Voice Phishing: Fraudulent phone calls..."
  },
  {
    "id": "q21",
    "question": "Q21: Why should you never save your card details on shared cybercafe computers?",
    "options": [
      "Subsequent users or keyloggers on that machine could access the cached browser autofill data and misuse it",
      "It makes the computer run out of ink",
      "It deletes the monitor display",
      "It increases the hourly cybercafe rental charge"
    ],
    "answer": "Subsequent users or keyloggers on that machine could access the cached browser autofill data and misuse it",
    "explanation": "Public browsers retain form autofill and cookie caches, creating grave vulnerability for shared users.",
    "explanationBn": "পাবলিক বা সাইবার ক্যাফের কম্পিউটারে কার্ডের তথ্য সেভ রাখলে অন্য কেউ তা পেয়ে অপব্যবহার করতে পারে।",
    "topic": "Online Transaction Safety: Key Precautions while Performing Digital Transactions",
    "difficulty": "Easy",
    "hint": "Subsequent users or keyloggers..."
  },
  {
    "id": "q22",
    "question": "Q22: What is the national cybercrime reporting helpline number in India?",
    "options": [
      "1930 (cybercrime.gov.in)",
      "100",
      "108",
      "139"
    ],
    "answer": "1930 (cybercrime.gov.in)",
    "explanation": "1930 is the dedicated National Cyber Crime Reporting Portal helpline managed by the Ministry of Home Affairs, Govt of India.",
    "explanationBn": "ভারতে জাতীয় সাইবার ক্রাইম হেল্পলাইন নম্বর হলো ১৯৩০ (cybercrime.gov.in)।",
    "topic": "Online Transaction Safety: Key Precautions while Performing Digital Transactions",
    "difficulty": "Medium",
    "hint": "1930 (cybercrime.gov.in)..."
  },
  {
    "id": "q23",
    "question": "Q23: How does keeping your web browser and operating system updated protect digital transactions?",
    "options": [
      "Patches discovered security vulnerabilities and updates SSL/TLS root certificates to block fraudulent domains",
      "Increases the physical size of the laptop",
      "Eliminates the need for a bank account",
      "Makes all items in online stores 50% cheaper"
    ],
    "answer": "Patches discovered security vulnerabilities and updates SSL/TLS root certificates to block fraudulent domains",
    "explanation": "Regular security patches fix zero-day exploits and update malicious domain blacklists inside the browser engine.",
    "explanationBn": "সিস্টেম ও ব্রাউজার আপডেট রাখলে নিরাপত্তা ত্রুটি মেরামত হয় এবং হ্যাকারদের অনুপ্রবেশ বন্ধ থাকে।",
    "topic": "Online Transaction Safety: Key Precautions while Performing Digital Transactions",
    "difficulty": "Easy",
    "hint": "Patches discovered security vulnerabilities..."
  },
  {
    "id": "q24",
    "question": "Q24: In a CBSE Class XII IT question: 'State four precautions to take while performing online transactions', which option lists all four correctly?",
    "options": [
      "(1) Verify HTTPS padlock, (2) Never share OTP/CVV, (3) Avoid public Wi-Fi, (4) Use strong passwords & 2FA",
      "(1) Share OTP with caller, (2) Use public Wi-Fi, (3) Save password on cybercafe PC, (4) Ignore bank SMS alerts",
      "(1) Never use HTTPS, (2) Post card photo online, (3) Disable SMS alerts, (4) Use 1234 as PIN",
      "(1) Write PIN on the card, (2) Turn off 2FA, (3) Click all email links, (4) Never log out"
    ],
    "answer": "(1) Verify HTTPS padlock, (2) Never share OTP/CVV, (3) Avoid public Wi-Fi, (4) Use strong passwords & 2FA",
    "explanation": "These four rules constitute the gold-standard security protocol for online financial safety.",
    "explanationBn": "চারটি প্রধান সতর্কতা: HTTPS পরীক্ষা, ওটিপি/সিভিভি গোপন রাখা, পাবলিক ওয়াই-ফাই বর্জন ও ২এফএ ব্যবহার।",
    "topic": "Online Transaction Safety: Key Precautions while Performing Digital Transactions",
    "difficulty": "Easy",
    "hint": "(1) Verify HTTPS padlock, (2) Never share OTP/CVV..."
  },
  {
    "id": "q25",
    "question": "Q25: What is the golden rule of cyber hygiene when receiving an unsolicited message promising a ₹50,000 lottery prize requiring a ₹500 fee?",
    "options": [
      "It is an Advance-Fee Fraud scam; never click the link, never pay any processing fee, and report the message as spam",
      "Immediately pay ₹500 to collect ₹50,000",
      "Forward the message to family members to help them win",
      "Send your debit card photo to claim the prize"
    ],
    "answer": "It is an Advance-Fee Fraud scam; never click the link, never pay any processing fee, and report the message as spam",
    "explanation": "Lottery scams exploit greed to steal advance processing fees and compromise bank accounts.",
    "explanationBn": "লটারি বা পুরস্কারের লোভ দেখিয়ে টাকা চাওয়া সম্পূর্ণ জালিয়াতি; কোনো লিংক ক্লিক বা ফি দেওয়া যাবে না।",
    "topic": "Online Transaction Safety: Key Precautions while Performing Digital Transactions",
    "difficulty": "Easy",
    "hint": "It is an Advance-Fee Fraud scam..."
  }
];

export default questions;
