// topic8_questions.js
// CBSE Class XI Computer Science (083) - Topic 8 FAQs & Questions Bank
// Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)

const questions = [
  {
    id: "q1",
    question: "What is the primary function of an Input Device in computer organisation?",
    answer: "An Input Device captures real-world physical, mechanical, optical, or acoustic signals from users and converts (transduces) them into binary digital machine code consumable by the CPU and primary memory.",
    explanation: "Without input devices, digital processors cannot interact with the external physical environment.",
    explanationBn: "ইনপুট ডিভাইসের প্রধান কাজ হলো মানুষের দেওয়া বিভিন্ন তথ্য ও সংকেতকে কম্পিউটারের বোধগম্য বাইনারি (০ ও ১) সিগন্যালে রূপান্তর করা।",
    category: "Concepts"
  },
  {
    id: "q2",
    question: "Differentiate between an OMR (Optical Mark Reader) and an OCR (Optical Character Recognition) device.",
    answer: "OMR detects the presence or absence of dark marks (pencil/pen bubbles) at pre-defined geometric coordinates on test sheets. OCR scans written or printed text documents and uses pattern recognition to convert pixel images into editable alphanumeric digital text strings.",
    explanation: "OMR is used for objective exam evaluations, while OCR is used for text document digitization.",
    explanationBn: "OMR ওএমআর শিটের কালো বৃত্ত বা মার্ক শনাক্ত করে; আর OCR স্ক্যান করা ছবির ভেতরের লেখা বা অক্ষরগুলোকে এডিটেবল টেক্সটে রূপান্তর করে।",
    category: "Optical Devices"
  },
  {
    id: "q3",
    question: "What is MICR (Magnetic Ink Character Recognition) and where is it primarily used?",
    answer: "MICR reads characters printed using special ink containing magnetized iron oxide particles. It is primarily used by the banking industry to automate the processing and clearing of bank cheques.",
    explanation: "MICR characters can be read reliably even if the cheque has been stamped, written over, or folded.",
    explanationBn: "MICR ম্যাগনেটিক কালিতে লেখা কোড পড়তে পারে এবং এটি প্রধানত ব্যাংকের চেক দ্রুত ও নির্ভুলভাবে প্রসেসিং করার কাজে ব্যবহৃত হয়।",
    category: "MICR"
  },
  {
    id: "q4",
    question: "Differentiate between 'Soft Copy' and 'Hard Copy' output with two examples of each.",
    answer: "Soft Copy output is temporary, digital, and visual/audio in nature, disappearing when the device is powered down (e.g. OLED Monitor display, Speaker audio). Hard Copy output is permanent, physical, and tangible on paper (e.g. Laser Printer page, Plotter architectural blueprint).",
    explanation: "Soft copy offers instant interactive updates; hard copy offers physical permanence.",
    explanationBn: "Soft Copy হলো স্ক্রিনে দেখা বা স্পিকারে শোনা অস্থায়ী ডিজিটাল আউটপুট; আর Hard Copy হলো কাগজে ছাপা স্থায়ী আউটপুট।",
    category: "Output Types"
  },
  {
    id: "q5",
    question: "Explain the fundamental difference between Impact and Non-Impact Printers.",
    answer: "Impact Printers form characters by physically striking an inked ribbon against the paper with mechanical pins or hammers (e.g. Dot Matrix). Non-Impact Printers create images without physical ribbon contact using laser beams, heat, or liquid ink droplets (e.g. Laser, Inkjet).",
    explanation: "Impact printers are noisy but can create multipart carbon copies; non-impact printers are quiet, fast, and deliver high resolution.",
    explanationBn: "Impact প্রিন্টারে যান্ত্রিক পিন ফিতায় আঘাত করে লেখা তৈরি করে (যেমন ডট মেট্রিক্স); আর Non-Impact প্রিন্টারে কোনো আঘাত ছাড়াই লেজার বা কালির স্প্রে দিয়ে ছাপা হয়।",
    category: "Printers"
  },
  {
    id: "q6",
    question: "Why are Dot Matrix Printers still widely used at railway ticket counters and GST billing desks?",
    answer: "Because Dot Matrix Printers use mechanical impact to strike carbon paper sheets, allowing them to produce duplicate and triplicate carbon copies in a single pass at extremely low operating cost per page.",
    explanation: "Non-impact laser/inkjet printers cannot produce simultaneous duplicate carbon copies.",
    explanationBn: "কারণ ডট মেট্রিক্স প্রিন্টার কার্বন পেপারে চাপ দিয়ে একসাথে একাধিক ডুপ্লিকেট কপি (রসিদ বা টিকিট) ছাপতে পারে এবং এর খরচ খুবই কম।",
    category: "Printers"
  },
  {
    id: "q7",
    question: "What is a Plotter and how does it differ from a standard printer?",
    answer: "A Plotter is a specialized vector output device that uses moving ink pens to draw continuous, high-precision smooth lines directly on paper. Standard printers generate raster bitmaps of tiny dots, which pixelate when scaled to massive sizes.",
    explanation: "Plotters are used by architects and engineers for large CAD blueprints, engineering schematics, and maps.",
    explanationBn: "প্লটার হলো সূক্ষ্ম পেন দিয়ে ভেক্টর ড্রয়িং আঁকার বিশেষ ডিভাইস যা ইঞ্জিনিয়ারিং ব্লুপ্রিন্ট ও বড় নকশা নির্ভুলভাবে প্রিন্ট করে।",
    category: "Plotters"
  },
  {
    id: "q8",
    question: "How does a Laser Printer generate printed text on paper?",
    answer: "1. A laser beam discharges electrostatic charges onto a rotating photosensitive drum to draw the document image.\n2. Electrostatically charged dry toner powder clings to the discharged areas.\n3. The toner is transferred to paper and fused permanently using heated pressure rollers (Fuser unit).",
    explanation: "Delivers crisp, high-speed 1200+ DPI text without smudging.",
    explanationBn: "লেজার রশ্মি ঘূর্ণায়মান ড্রামের ওপর চার্জ তৈরি করে, ড্রামে টোনার পাউডার আটকে যায় এবং গরম রোলারের চাপে তা কাগজে স্থায়ীভাবে বসে যায়।",
    category: "Printers"
  },
  {
    id: "q9",
    question: "What does 'DPI' stand for in printer and scanner specifications?",
    answer: "DPI stands for 'Dots Per Inch', a metric measuring spatial printing or scanning resolution. Higher DPI ratings (e.g. 1200 DPI vs 300 DPI) indicate finer detail and sharper images.",
    explanation: "DPI quantifies how many individual dots of ink/toner are placed within one linear inch.",
    explanationBn: "DPI = Dots Per Inch; প্রতি ইঞ্চিতে কতগুলো বিন্দু বসানো হয় তা বোঝায়; DPI বেশি হলে প্রিন্টের মান বেশি স্পষ্ট হয়।",
    category: "Specifications"
  },
  {
    id: "q10",
    question: "What is the difference between a 1D Barcode and a 2D QR (Quick Response) Code?",
    answer: "A 1D Barcode represents data along a single linear horizontal dimension using alternating black/white bars (holding ~20 alphanumeric characters). A 2D QR Code encodes data in both horizontal and vertical matrix patterns, holding up to 4,000+ characters, URLs, and UPI payment strings.",
    explanation: "QR codes also incorporate Reed-Solomon error correction for damaged scan recovery.",
    explanationBn: "১ডি বারকোডে মাত্র ২০টি অক্ষর আঁটে; আর ২ডি কিউআর কোডে উভয় দিকে ডেটা থাকায় কয়েক হাজার অক্ষর ও পেমেন্ট লিঙ্ক রাখা যায়।",
    category: "Scanners"
  },
  {
    id: "q11",
    question: "What is a 'VDU' in computer hardware?",
    answer: "VDU stands for 'Visual Display Unit', the generic term for computer monitors, screens, and display panels used as the primary soft-copy output interface.",
    explanation: "VDUs have evolved from bulky CRTs to thin LCD, LED, and OLED panels.",
    explanationBn: "VDU = Visual Display Unit; এটি মনিটর বা ডিসপ্লে স্ক্রিনকে নির্দেশ করে।",
    category: "Monitors"
  },
  {
    id: "q12",
    question: "How does an Optical Mouse detect movement across a mousepad?",
    answer: "An optical mouse uses a tiny LED or infrared laser diode that illuminates the surface, combined with an optoelectronic sensor (tiny CMOS camera) that captures thousands of surface microscopic snapshots per second and calculates coordinate displacement.",
    explanation: "A Digital Signal Processor (DSP) calculates delta X and delta Y movement vectors.",
    explanationBn: "অপটিক্যাল মাউসের নিচে থাকা লেজার বা LED আলো এবং ছোট ক্যামেরা প্রতি সেকেন্ডে হাজারো ছবি তুলে মাউসের স্থানান্তর হিসেব করে।",
    category: "Input Devices"
  },
  {
    id: "q13",
    question: "What is the purpose of the 'Fuser Unit' inside a laser printer?",
    answer: "The Fuser Unit consists of two heated pressure rollers that melt the resin-based toner powder into the fibers of the paper sheet at ~200°C so the print does not smudge.",
    explanation: "This explains why pages emerging from a laser printer feel warm to the touch.",
    explanationBn: "ফিউজার ইউনিট গরম রোলারের সাহায্যে টোনার পাউডারকে গলিয়ে কাগজের আঁশের সাথে স্থায়ীভাবে মিশিয়ে দেয়।",
    category: "Printers"
  },
  {
    id: "q14",
    question: "True or False: 'A Flatbed Scanner is classified as an Output Device because it produces an image.'",
    answer: "False. A scanner captures physical paper documents and inputs digital pixel data into the computer; hence, it is strictly an Input Device.",
    explanation: "The computer receives the scanned data stream.",
    explanationBn: "ভুল। স্ক্যানার বাইরের কাগজ থেকে ডেটা কম্পিউটারে পাঠায়, তাই এটি একটি ইনপুট ডিভাইস।",
    category: "True/False"
  },
  {
    id: "q15",
    question: "What is a 'Thermal Printer' and where is it commonly encountered in daily life?",
    answer: "A Thermal Printer uses heated thermal printhead pins to produce images on special chemically treated heat-sensitive paper without ink or toner. Commonly seen in ATM receipt printers, POS credit card swipe machines, and bus ticket dispensers.",
    explanation: "Low maintenance with zero ink cartridges, but thermal receipts fade over time when exposed to heat or light.",
    explanationBn: "থার্মাল প্রিন্টার কালির বদলে তাপ-সংবেদনশীল কাগজের ওপর গরম পিনের মাধ্যমে ছবি বা টেক্সট তৈরি করে (যেমন এটিএম ও পিওএস রসিদ)।",
    category: "Printers"
  },
  {
    id: "q16",
    question: "What is the function of a 'Digitizer Graphics Tablet' (Stylus Tablet)?",
    answer: "A graphics tablet allows digital artists and educators to draw and write directly onto a pressure-sensitive surface with a battery-free electronic stylus pen, translating exact pen pressure and tilt angles into digital vector strokes.",
    explanation: "Used extensively in digital animation, online teaching, and CAD sketching.",
    explanationBn: "গ্রাফিক্স ট্যাবলেট বিশেষ পেন (স্টাইলাস) দিয়ে কম্পিউটারে সরাসরি ছবি আঁকা বা নোট লেখার জন্য ব্যবহৃত ইনপুট ডিভাইস।",
    category: "Input Devices"
  },
  {
    id: "q17",
    question: "Differentiate between Drum Plotters and Flatbed Plotters.",
    answer: "In a Drum Plotter, the paper is wrapped around a rotating drum that moves back and forth while the pen moves horizontally. In a Flatbed Plotter, the paper sheet is held completely stationary on a flat rectangular bed while the pen carriage moves across both X and Y axes.",
    explanation: "Drum plotters handle continuous roll paper of arbitrary length.",
    explanationBn: "ড্রাম প্লটারে কাগজ ড্রামের সাথে ঘোরে; আর ফ্ল্যাটবেড প্লটারে কাগজ স্থির থাকে এবং পেন চারদিকে ঘুরে নকশা আঁকে।",
    category: "Plotters"
  },
  {
    id: "q18",
    question: "What is 'Aspect Ratio' and 'Refresh Rate' in computer monitor specifications?",
    answer: "Aspect Ratio is the proportional ratio of a display's width to its height (e.g. 16:9 widescreen, 21:9 ultrawide). Refresh Rate is the number of times per second the monitor redraws the entire display raster (measured in Hertz, e.g. 60 Hz, 144 Hz, 240 Hz).",
    explanation: "Higher refresh rates produce smoother visual motion for fast-moving graphics.",
    explanationBn: "Aspect Ratio হলো স্ক্রিনের দৈর্ঘ্য ও প্রস্থের অনুপাত (১৬:৯); আর Refresh Rate হলো প্রতি সেকেন্ডে স্ক্রিন কতবার রিফ্রেশ হয় (Hz)।",
    category: "Monitors"
  },
  {
    id: "q19",
    question: "Why is a Touchscreen considered a 'Hybrid' (Input/Output) Device?",
    answer: "Because it combines a display screen (Output: renders visual GUI elements) with a transparent capacitive or resistive touch sensor overlay (Input: captures finger touch coordinate gestures).",
    explanation: "A single physical panel performs dual I/O duties simultaneously.",
    explanationBn: "কারণ এটি একসাথে ডিসপ্লে প্রদর্শন করে (আউটপুট) এবং আঙুলের স্পর্শ শনাক্ত করে নির্দেশ গ্রহণ করে (ইনপুট)।",
    category: "Hybrid Devices"
  },
  {
    id: "q20",
    question: "Explain the working principle of a Piezoelectric Inkjet Printer.",
    answer: "Piezoelectric inkjet printers use microscopic piezoelectric crystals behind each ink nozzle. When an electric charge is applied, the crystal changes shape and flexes inward, forcing a microscopic droplet of ink out through the nozzle onto the paper.",
    explanation: "Used by Epson printers for precise drop control without boiling ink.",
    explanationBn: "পাইজোইলেক্ট্রিক ক্রিস্টালে বিদ্যুৎ প্রবাহ দিলে তা বেঁকে যায় এবং নজলের ভেতর দিয়ে কালির ফোঁটা কাগজে নিখুঁতভাবে স্প্রে করে।",
    category: "Printers"
  },
  {
    id: "q21",
    question: "What is an 'OLED' (Organic Light Emitting Diode) monitor?",
    answer: "OLED displays use organic carbon-based semiconductor compounds where each individual pixel emits its own light when electrified (self-emissive). When a pixel is turned off, it produces true pitch black with infinite contrast ratios.",
    explanation: "Unlike LCDs, OLEDs require no separate backlight panel, making screens ultra-thin.",
    explanationBn: "OLED ডিসপ্লেতে প্রতিটি পিক্সেল নিজেই আলো তৈরি করে, তাই কোনো ব্যাকলাইটের প্রয়োজন হয় না এবং নিখুঁত কালো রঙ ফুটে ওঠে।",
    category: "Monitors"
  },
  {
    id: "q22",
    question: "What is a 'Biometric Sensor' and how does it function as an input device?",
    answer: "A biometric sensor (e.g. fingerprint scanner, iris scanner, facial recognition camera) captures unique biological physical traits, converts them into digital biometric hash vectors, and inputs them into the system for secure authentication (e.g. Aadhaar authentication).",
    explanation: "Provides tamper-resistant user identity verification.",
    explanationBn: "বায়োমেট্রিক সেন্সর মানুষের আঙুলের ছাপ বা চোখের মণি স্ক্যান করে ডিজিটাল কোডে রূপান্তর করে পরিচয় শনাক্ত করে।",
    category: "Input Devices"
  },
  {
    id: "q23",
    question: "What is 'PPM' and 'CPM' in printer performance benchmarking?",
    answer: "PPM stands for 'Pages Per Minute' (measuring page printer throughput, e.g. Laser printers: 30-50 PPM). CPM stands for 'Characters Per Second' or Characters Per Minute (measuring serial impact printers, e.g. Dot Matrix).",
    explanation: "PPM measures full-page output speed; CPS measures character-by-character printing speed.",
    explanationBn: "PPM = Pages Per Minute (প্রতি মিনিটে কত পৃষ্ঠা ছাপে); CPS = Characters Per Second (প্রতি সেকেন্ডে কত অক্ষর ছাপে)।",
    category: "Specifications"
  },
  {
    id: "q24",
    question: "True or False: 'A 3D Printer is classified as a mechanical Output Device.'",
    answer: "True. A 3D printer takes digital 3D CAD model coordinates from the computer and outputs a physical 3-dimensional solid object by extruding layers of molten filament plastic.",
    explanation: "It transforms digital bits into physical matter.",
    explanationBn: "সত্য। 3D প্রিন্টার ডিজিটাল নকশাকে প্লাস্টিকের স্তর বসিয়ে বাস্তব ত্রিমাত্রিক বস্তুতে রূপান্তর করে, তাই এটি আউটপুট ডিভাইস।",
    category: "True/False"
  },
  {
    id: "q25",
    question: "Summary Question: Classify each device as Input, Output, or Both: (a) MICR reader at a bank, (b) Braille display terminal for visually impaired students, (c) VR Headset with motion sensors, (d) Interactive Smart Board.",
    answer: "(a) MICR: Input Device.\n(b) Braille Display: Output Device (tactile pins raise to form letters).\n(c) VR Headset with motion tracking: Hybrid (Both Input & Output).\n(d) Interactive Smart Board: Hybrid (Both Input & Output).",
    explanation: "Demonstrates complete real-world proficiency in hardware peripheral classification.",
    explanationBn: "(ক) MICR = Input, (খ) Braille Display = Output, (গ) VR Headset = Both (Input + Output), (ঘ) Smart Board = Both (Input + Output)।",
    category: "Summary"
  }
];

export default questions;
