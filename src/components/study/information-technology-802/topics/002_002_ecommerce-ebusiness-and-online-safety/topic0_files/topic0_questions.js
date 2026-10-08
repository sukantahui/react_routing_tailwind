const questions = [
  {
    "id": "q1",
    "question": "Q1: What is the primary definition of E-Commerce (Electronic Commerce)?",
    "options": [
      "Buying and selling of goods and services over the Internet using digital systems",
      "Manufacturing goods in automated robotic factories only",
      "Physical retail selling in traditional brick-and-mortar stores",
      "Maintaining government tax databases on local offline computers"
    ],
    "answer": "Buying and selling of goods and services over the Internet using digital systems",
    "explanation": "E-Commerce refers to the trading of goods, products, and services across electronic networks such as the Internet.",
    "explanationBn": "ই-কমার্স হলো ইন্টারনেটের মাধ্যমে ডিজিটাল পদ্ধতিতে পণ্য ও সেবা ক্রয়-বিক্রয় করার প্রক্রিয়া।",
    "topic": "Concept of E-Commerce & Online Shopping: Customer Advantages",
    "difficulty": "Easy",
    "hint": "Buying and selling of goods..."
  },
  {
    "id": "q2",
    "question": "Q2: Which of the following is considered a major customer advantage of online shopping?",
    "options": [
      "24x7 round-the-clock shopping convenience from anywhere",
      "Immediate physical touching of products before purchase",
      "Compulsory payment in paper cash currency only",
      "Requirement to travel to a physical central marketplace"
    ],
    "answer": "24x7 round-the-clock shopping convenience from anywhere",
    "explanation": "Online shopping portals are accessible 24 hours a day, 7 days a week, allowing customers to purchase anytime without physical commuting.",
    "explanationBn": "অনলাইন কেনাকাটার প্রধান সুবিধা হলো ২৪ ঘণ্টা যেকোনো স্থান থেকে নিজের সুবিধামতো কেনাকাটা করা যায়।",
    "topic": "Concept of E-Commerce & Online Shopping: Customer Advantages",
    "difficulty": "Easy",
    "hint": "24x7 round-the-clock..."
  },
  {
    "id": "q3",
    "question": "Q3: How does E-Commerce empower customers regarding product pricing?",
    "options": [
      "Allows instant real-time price comparisons across multiple sellers and platforms",
      "Enforces a single non-negotiable price across the entire country",
      "Hides prices until final physical delivery at doorstep",
      "Forces customers to buy in bulk wholesale quantities"
    ],
    "answer": "Allows instant real-time price comparisons across multiple sellers and platforms",
    "explanation": "Consumers can easily compare prices, discounts, specifications, and seller ratings across diverse e-commerce portals within seconds.",
    "explanationBn": "গ্রাহকেরা খুব সহজেই বিভিন্ন বিক্রেতার পণ্যের দাম ও মান তুলনা করে সেরা অফার বেছে নিতে পারেন।",
    "topic": "Concept of E-Commerce & Online Shopping: Customer Advantages",
    "difficulty": "Easy",
    "hint": "Allows instant real-time price..."
  },
  {
    "id": "q4",
    "question": "Q4: Which factor eliminates travel time, fuel expenditure, and parking hassles for consumers in E-Commerce?",
    "options": [
      "Doorstep delivery of ordered goods",
      "High initial registration fee",
      "Mandatory visiting of distribution warehouses",
      "Offline paper catalog distribution"
    ],
    "answer": "Doorstep delivery of ordered goods",
    "explanation": "Courier and logistics partners deliver purchased items directly to the customer's home or office address.",
    "explanationBn": "হোম ডেলিভারি বা ডোরস্টেপ ডেলিভারির কারণে যাতায়াতের সময় ও খরচ সাশ্রয় হয়।",
    "topic": "Concept of E-Commerce & Online Shopping: Customer Advantages",
    "difficulty": "Easy",
    "hint": "Doorstep delivery..."
  },
  {
    "id": "q5",
    "question": "Q5: How do customer reviews and user ratings assist online shoppers?",
    "options": [
      "They provide verified feedback on product quality, durability, and seller reliability",
      "They automatically delete bad products from the database",
      "They replace the need for an internet connection",
      "They change the physical dimensions of the delivered product"
    ],
    "answer": "They provide verified feedback on product quality, durability, and seller reliability",
    "explanation": "User reviews and star ratings offer real-world social proof and experiential feedback from past buyers.",
    "explanationBn": "ক্রেতাদের রিভিউ ও রেটিং পণ্যটির গুণমান ও নির্ভরযোগ্যতা বুঝতে সাহায্য করে।",
    "topic": "Concept of E-Commerce & Online Shopping: Customer Advantages",
    "difficulty": "Medium",
    "hint": "They provide verified feedback..."
  },
  {
    "id": "q6",
    "question": "Q6: Which of the following is NOT a typical customer advantage of E-Commerce?",
    "options": [
      "Ability to physically inspect and try on the product before making the order",
      "Wide assortment and global product catalogue",
      "Doorstep delivery with real-time GPS tracking",
      "Exclusive online discounts and promotional coupon codes"
    ],
    "answer": "Ability to physically inspect and try on the product before making the order",
    "explanation": "The inability to physically touch, feel, or try on products before purchase is an inherent limitation, not an advantage.",
    "explanationBn": "পণ্যটি হাতে ছুঁয়ে পরীক্ষা করতে না পারা ই-কমার্সের একটি সীমাবদ্ধতা, সুবিধা নয়।",
    "topic": "Concept of E-Commerce & Online Shopping: Customer Advantages",
    "difficulty": "Medium",
    "hint": "Ability to physically inspect..."
  },
  {
    "id": "q7",
    "question": "Q7: What is meant by 'B2C' in E-Commerce terminology?",
    "options": [
      "Business-to-Consumer transactions",
      "Business-to-Corporation transactions",
      "Buyer-to-Customer interactions",
      "Banking-to-Commerce protocols"
    ],
    "answer": "Business-to-Consumer transactions",
    "explanation": "B2C refers to commercial transactions conducted directly between a commercial business enterprise and individual end consumers.",
    "explanationBn": "B2C বলতে ব্যবসা প্রতিষ্ঠান ও সাধারণ ক্রেতাদের মধ্যবর্তী লেনদেনকে বোঝায়।",
    "topic": "Concept of E-Commerce & Online Shopping: Customer Advantages",
    "difficulty": "Easy",
    "hint": "Business-to-Consumer..."
  },
  {
    "id": "q8",
    "question": "Q8: What is meant by 'C2C' in E-Commerce models?",
    "options": [
      "Consumer-to-Consumer transactions (e.g., OLX, eBay)",
      "Corporate-to-Client exchanges",
      "Customer-to-Courier communications",
      "Commerce-to-Commerce networks"
    ],
    "answer": "Consumer-to-Consumer transactions (e.g., OLX, eBay)",
    "explanation": "C2C allows individual consumers to sell used or new items directly to other consumers via an intermediary platform.",
    "explanationBn": "C2C হলো এক গ্রাহক থেকে অন্য গ্রাহকের মধ্যে সরাসরি পণ্য ক্রয়-বিক্রয় (যেমন OLX)।",
    "topic": "Concept of E-Commerce & Online Shopping: Customer Advantages",
    "difficulty": "Easy",
    "hint": "Consumer-to-Consumer..."
  },
  {
    "id": "q9",
    "question": "Q9: Which payment method allows a customer to pay in cash or digital scan upon product arrival at home?",
    "options": [
      "Cash on Delivery (CoD) / Pay on Delivery (PoD)",
      "Prepaid Wire Transfer",
      "Advance Banker's Cheque",
      "International Letter of Credit"
    ],
    "answer": "Cash on Delivery (CoD) / Pay on Delivery (PoD)",
    "explanation": "CoD allows buyers to pay at the moment the physical package is delivered to their doorstep.",
    "explanationBn": "ক্যাশ অন ডেলিভারি (CoD) পদ্ধতিতে পণ্য হাতে পাওয়ার পর মূল্য পরিশোধ করা যায়।",
    "topic": "Concept of E-Commerce & Online Shopping: Customer Advantages",
    "difficulty": "Easy",
    "hint": "Cash on Delivery..."
  },
  {
    "id": "q10",
    "question": "Q10: How does E-Commerce overcome geographical limitations for rural and suburban consumers?",
    "options": [
      "Enables consumers in small towns to access national and international inventory without traveling",
      "Forces all consumers to relocate near metropolitan logistics hubs",
      "Restricts delivery only to pin codes within 5 kilometers of the factory",
      "Disables all online stores outside state capitals"
    ],
    "answer": "Enables consumers in small towns to access national and international inventory without traveling",
    "explanation": "E-Commerce bridges the rural-urban divide by delivering branded goods directly to remote pin codes.",
    "explanationBn": "ই-কমার্সের মাধ্যমে গ্রাম বা মফস্বলের মানুষও বড় শহরের ব্র্যান্ডেড পণ্য ঘরে বসে পেয়ে যান।",
    "topic": "Concept of E-Commerce & Online Shopping: Customer Advantages",
    "difficulty": "Medium",
    "hint": "Enables consumers in small towns..."
  },
  {
    "id": "q11",
    "question": "Q11: Which technological component provides real-time updates on parcel dispatch, transit hubs, and expected delivery date?",
    "options": [
      "Shipment Tracking System / Air Waybill (AWB) Tracking",
      "Static Webpage HTML Header",
      "Local Computer BIOS Setup",
      "Browser Bookmark Manager"
    ],
    "answer": "Shipment Tracking System / Air Waybill (AWB) Tracking",
    "explanation": "AWB tracking numbers link with logistics databases to display live package status and GPS milestones.",
    "explanationBn": "শিপমেন্ট ট্র্যাকিং সিস্টেমের মাধ্যমে পার্সেলের প্রতিটি ধাপ ও সম্ভাব্য পৌঁছানোর তারিখ জানা যায়।",
    "topic": "Concept of E-Commerce & Online Shopping: Customer Advantages",
    "difficulty": "Medium",
    "hint": "Shipment Tracking System..."
  },
  {
    "id": "q12",
    "question": "Q12: In traditional commerce, retail stores have fixed operational hours (e.g., 10 AM to 8 PM). What is the operational availability of E-Commerce websites?",
    "options": [
      "24 hours a day, 365 days a year (24x7x365)",
      "Only during banking business hours (10 AM to 4 PM)",
      "Strictly on weekdays excluding public holidays",
      "Only during government office shift timings"
    ],
    "answer": "24 hours a day, 365 days a year (24x7x365)",
    "explanation": "E-Commerce web servers operate continuously, enabling shoppers to place orders even late at night or on holidays.",
    "explanationBn": "ই-কমার্স ওয়েবসাইট সপ্তাহে ৭ দিন ২৪ ঘণ্টাই সক্রিয় থাকে।",
    "topic": "Concept of E-Commerce & Online Shopping: Customer Advantages",
    "difficulty": "Easy",
    "hint": "24 hours a day..."
  },
  {
    "id": "q13",
    "question": "Q13: What term describes the automated return policy where a logistics agent collects an unwanted or damaged product from the customer's home?",
    "options": [
      "Reverse Logistics / Doorstep Return Pickup",
      "Forward Wholesale Distribution",
      "Permanent Liquidation",
      "Retail Confiscation"
    ],
    "answer": "Reverse Logistics / Doorstep Return Pickup",
    "explanation": "Reverse logistics refers to the process of returning goods from the end-consumer back to the seller or warehouse.",
    "explanationBn": "রিভার্স লজিস্টিকসের মাধ্যমে বাড়ি থেকেই ত্রুটিযুক্ত বা অপছন্দের পণ্য ফেরত নেওয়া হয়।",
    "topic": "Concept of E-Commerce & Online Shopping: Customer Advantages",
    "difficulty": "Hard",
    "hint": "Reverse Logistics..."
  },
  {
    "id": "q14",
    "question": "Q14: Why do E-Commerce platforms frequently offer lower prices compared to physical showroom retail stores?",
    "options": [
      "Lower operational overheads such as showroom rent, electricity, and intermediary distributor commissions",
      "They sell only expired or defective merchandise",
      "They are exempt from paying all national and state goods and services taxes",
      "They do not employ software engineers or warehouse workers"
    ],
    "answer": "Lower operational overheads such as showroom rent, electricity, and intermediary distributor commissions",
    "explanation": "Direct manufacturer-to-consumer pipelines and centralized warehousing cut down intermediate markups and overhead costs.",
    "explanationBn": "দোকানের ভাড়া ও মধ্যস্বত্বভোগীদের কমিশন না থাকায় পণ্যের দাম তুলনামূলক কম রাখা সম্ভব হয়।",
    "topic": "Concept of E-Commerce & Online Shopping: Customer Advantages",
    "difficulty": "Medium",
    "hint": "Lower operational overheads..."
  },
  {
    "id": "q15",
    "question": "Q15: What is 'M-Commerce' in the context of digital shopping?",
    "options": [
      "Mobile Commerce: Conducting e-commerce transactions through smartphones and tablet apps",
      "Manual Commerce: Trading goods through physical postal money orders",
      "Metropolitan Commerce: Shopping restricted exclusively to Tier-1 smart cities",
      "Marine Commerce: Maritime cargo auctioning over shortwave radio"
    ],
    "answer": "Mobile Commerce: Conducting e-commerce transactions through smartphones and tablet apps",
    "explanation": "M-Commerce refers to wireless, handheld electronic commerce enabled via mobile devices and apps.",
    "explanationBn": "স্মার্টফোন বা ট্যাবলেটের অ্যাপ ব্যবহার করে কেনাকাটা করাকে এম-কমার্স (M-Commerce) বলে।",
    "topic": "Concept of E-Commerce & Online Shopping: Customer Advantages",
    "difficulty": "Easy",
    "hint": "Mobile Commerce..."
  },
  {
    "id": "q16",
    "question": "Q16: Which feature allows an online shopper to save interesting items for future consideration without purchasing them immediately?",
    "options": [
      "Wishlist / Save for Later",
      "Instant Checkout Order Placement",
      "Immediate Payment Gateway",
      "Database Cascade Deletion"
    ],
    "answer": "Wishlist / Save for Later",
    "explanation": "Wishlists allow consumers to bookmark desired products to track price drops or buy later.",
    "explanationBn": "উইশলিস্ট (Wishlist) ফিচারের মাধ্যমে পছন্দের জিনিস ভবিষ্যতে কেনার জন্য সংরক্ষণ করা যায়।",
    "topic": "Concept of E-Commerce & Online Shopping: Customer Advantages",
    "difficulty": "Easy",
    "hint": "Wishlist / Save for Later..."
  },
  {
    "id": "q17",
    "question": "Q17: In India, which instant real-time payment system has significantly accelerated online shopping transactions?",
    "options": [
      "UPI (Unified Payments Interface) powered by NPCI",
      "Postal Money Order",
      "Telegraphic Wire Remittance",
      "Physical Demand Draft"
    ],
    "answer": "UPI (Unified Payments Interface) powered by NPCI",
    "explanation": "UPI provides seamless, frictionless 24x7 bank-to-bank mobile digital payment.",
    "explanationBn": "NPCI পরিচালিত UPI ভারতের ডিজিটাল কেনাকাটার ক্ষেত্রে বিপ্লব এনেছে।",
    "topic": "Concept of E-Commerce & Online Shopping: Customer Advantages",
    "difficulty": "Easy",
    "hint": "UPI (Unified Payments..."
  },
  {
    "id": "q18",
    "question": "Q18: What is a major environmental benefit of paperless online ordering and electronic invoices?",
    "options": [
      "Reduces paper consumption, saving trees and decreasing billing waste",
      "Increases the physical size of shipping boxes",
      "Eliminates the use of electricity across all servers",
      "Stops all delivery vehicles from consuming fuel"
    ],
    "answer": "Reduces paper consumption, saving trees and decreasing billing waste",
    "explanation": "Digital GST tax invoices and SMS/email receipts eliminate unnecessary paper printing.",
    "explanationBn": "ডিজিটাল ইনভয়েস ও কাগজবিহীন প্রক্রিয়া গাছ বাঁচায় এবং পরিবেশ দূষণ রোধ করে।",
    "topic": "Concept of E-Commerce & Online Shopping: Customer Advantages",
    "difficulty": "Medium",
    "hint": "Reduces paper consumption..."
  },
  {
    "id": "q19",
    "question": "Q19: How do personalized recommendation algorithms benefit online consumers?",
    "options": [
      "They suggest relevant complementary accessories and products based on past browsing preferences",
      "They force the user's browser to lock until a purchase is made",
      "They erase all saved payment methods from the user's profile",
      "They permanently increase the price of viewed items"
    ],
    "answer": "They suggest relevant complementary accessories and products based on past browsing preferences",
    "explanation": "Recommendation engines use machine learning to discover products that match individual user interests.",
    "explanationBn": "পূর্বের পছন্দের ওপর ভিত্তি করে গ্রাহককে তার উপযোগী সঠিক পণ্য খুঁজে পেতে সাহায্য করে।",
    "topic": "Concept of E-Commerce & Online Shopping: Customer Advantages",
    "difficulty": "Medium",
    "hint": "They suggest relevant..."
  },
  {
    "id": "q20",
    "question": "Q20: Which of the following is an example of a Business-to-Business (B2B) E-Commerce portal in India?",
    "options": [
      "IndiaMART / Udaan",
      "BookMyShow",
      "Zomato food delivery for individual diners",
      "IRCTC tatkal ticket counter for tourists"
    ],
    "answer": "IndiaMART / Udaan",
    "explanation": "IndiaMART and Udaan connect wholesale manufacturers and suppliers directly with business retailers.",
    "explanationBn": "IndiaMART এবং Udaan হলো B2B পোর্টাল যেখানে ব্যবসায়ীরা পাইকারি পণ্য কেনাবেচা করেন।",
    "topic": "Concept of E-Commerce & Online Shopping: Customer Advantages",
    "difficulty": "Hard",
    "hint": "IndiaMART / Udaan..."
  },
  {
    "id": "q21",
    "question": "Q21: What is a 'Flash Sale' on an E-Commerce portal?",
    "options": [
      "A high-discount promotional sale lasting for a very brief, fixed time window",
      "A sale of emergency flashlights and electrical torches only",
      "An unexpected power outage on the web server",
      "A government tax audit conducted without prior notice"
    ],
    "answer": "A high-discount promotional sale lasting for a very brief, fixed time window",
    "explanation": "Flash sales offer deep discounts on limited quantities for a short duration, attracting large consumer traffic.",
    "explanationBn": "ফ্ল্যাশ সেল হলো নির্দিষ্ট স্বল্প সময়ের জন্য আকর্ষণীয় ছাড়ে পণ্য বিক্রির আয়োজন।",
    "topic": "Concept of E-Commerce & Online Shopping: Customer Advantages",
    "difficulty": "Easy",
    "hint": "A high-discount promotional sale..."
  },
  {
    "id": "q22",
    "question": "Q22: Which consumer protection law in India regulates unfair trade practices and misleading advertisements on e-commerce platforms?",
    "options": [
      "Consumer Protection (E-Commerce) Rules under Consumer Protection Act 2019",
      "Indian Factories Act 1948",
      "Motor Vehicles Act 1988",
      "Indian Forest Conservation Act 1980"
    ],
    "answer": "Consumer Protection (E-Commerce) Rules under Consumer Protection Act 2019",
    "explanation": "The Consumer Protection Act 2019 explicitly covers e-commerce entities, mandating grievance officers and transparent pricing.",
    "explanationBn": "ভারতে ভোক্তা সুরক্ষা আইন ২০১৯ ই-কমার্সে প্রতারণা ও মিথ্যা বিজ্ঞাপন রোধে কার্যকর।",
    "topic": "Concept of E-Commerce & Online Shopping: Customer Advantages",
    "difficulty": "Hard",
    "hint": "Consumer Protection (E-Commerce)..."
  },
  {
    "id": "q23",
    "question": "Q23: How does E-Commerce provide transparency in customer order fulfillment?",
    "options": [
      "Through automated SMS/Email notifications, digital invoices, and live parcel milestone tracking",
      "By mailing physical postcards after 30 days",
      "By keeping the dispatch location confidential forever",
      "By requiring in-person visits to the central server room"
    ],
    "answer": "Through automated SMS/Email notifications, digital invoices, and live parcel milestone tracking",
    "explanation": "Automated status alerts keep the buyer informed from order placement to final delivery.",
    "explanationBn": "অটোমেটেড SMS/ইমেল ও লাইভ ট্র্যাকিংয়ের মাধ্যমে অর্ডারের প্রতিটি আপডেট স্বচ্ছ থাকে।",
    "topic": "Concept of E-Commerce & Online Shopping: Customer Advantages",
    "difficulty": "Medium",
    "hint": "Through automated SMS/Email..."
  },
  {
    "id": "q24",
    "question": "Q24: What is the primary difference between E-Commerce and Traditional Commerce?",
    "options": [
      "E-Commerce operates electronically over networks without physical store visits, while Traditional Commerce requires physical interaction and stores",
      "E-Commerce does not involve money or currency",
      "Traditional Commerce has 24x7 global automated access",
      "E-Commerce can only sell virtual downloadable software"
    ],
    "answer": "E-Commerce operates electronically over networks without physical store visits, while Traditional Commerce requires physical interaction and stores",
    "explanation": "Traditional commerce relies on face-to-face physical store presence, whereas E-Commerce relies on internet connectivity and digital storefronts.",
    "explanationBn": "ই-কমার্স ইন্টারনেটের মাধ্যমে অনলাইন প্ল্যাটফর্মে চলে, আর সনাতন বাণিজ্যে সশরীরে দোকানে যেতে হয়।",
    "topic": "Concept of E-Commerce & Online Shopping: Customer Advantages",
    "difficulty": "Easy",
    "hint": "E-Commerce operates electronically..."
  },
  {
    "id": "q25",
    "question": "Q25: Which of the following correctly pairs an e-commerce customer advantage with its practical benefit?",
    "options": [
      "Price Transparency -> Customer can review competitor rates before checking out",
      "Doorstep Delivery -> Forces customer to rent a transport truck",
      "24x7 Availability -> Limits purchases only to 12 PM - 1 PM",
      "Product Reviews -> Deletes customer bank accounts"
    ],
    "answer": "Price Transparency -> Customer can review competitor rates before checking out",
    "explanation": "Price transparency empowers buyers to evaluate competitive market rates and choose the best financial deal.",
    "explanationBn": "মূল্যের স্বচ্ছতার কারণে ক্রেতা অন্য প্ল্যাটফর্মের দাম দেখে সেরা সিদ্ধান্ত নিতে পারেন।",
    "topic": "Concept of E-Commerce & Online Shopping: Customer Advantages",
    "difficulty": "Easy",
    "hint": "Price Transparency -> Customer can..."
  }
];

export default questions;
