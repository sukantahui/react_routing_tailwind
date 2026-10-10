export const topic8Questions = [
  {
    id: 1,
    question: "Which of the following best defines Cloud Computing according to NIST?",
    options: [
      "On-demand network access to a shared pool of configurable computing resources (servers, storage, apps) rapidly provisioned with minimal management effort",
      "Storing files strictly on local USB pen drives",
      "A software program that makes computers run without electricity",
      "A protocol for sending analog radio signals"
    ],
    correctAnswer: 0,
    explanationEn: "Cloud computing enables ubiquitous, on-demand, self-service access to pooled virtual computing resources billed on a pay-as-you-go basis.",
    explanationBn: "ক্লাউড কম্পিউটিং হলো ইন্টারনেটের মাধ্যমে শেয়ার্ড কম্পিউটিং রিসোর্স (যেমন সার্ভার, স্টোরেজ, ডেটাবেস) অন-ডিমান্ড ও ব্যবহারের ওপর ভিত্তি করে ভাড়া নেওয়ার প্রযুক্তি।"
  },
  {
    id: 2,
    question: "What are the three fundamental Cloud Service Delivery Models (SPI Tier)?",
    options: [
      "IaaS (Infrastructure), PaaS (Platform), and SaaS (Software)",
      "HTTP, FTP, and SMTP",
      "CPU, RAM, and ROM",
      "LAN, MAN, and WAN"
    ],
    correctAnswer: 0,
    explanationEn: "The 3 standard cloud delivery models are IaaS (Infrastructure as a Service), PaaS (Platform as a Service), and SaaS (Software as a Service).",
    explanationBn: "ক্লাউড সেবার প্রধান তিনটি ডেলিভারি মডেল হলো: IaaS (ইনফ্রাস্ট্রাকচার), PaaS (প্ল্যাটফর্ম) এবং SaaS (সফটওয়্যার)।"
  },
  {
    id: 3,
    question: "Which cloud service model provides raw virtual machines, storage disks, and virtual networks, leaving the OS and application installation to the consumer?",
    options: [
      "Infrastructure as a Service (IaaS)",
      "Platform as a Service (PaaS)",
      "Software as a Service (SaaS)",
      "Hardware as a Service (HaaS)"
    ],
    correctAnswer: 0,
    explanationEn: "In IaaS (e.g., AWS EC2, Azure VMs), the vendor manages the datacenter/virtualization, while the user chooses, configures, and patches the OS and software stack.",
    explanationBn: "IaaS মডেলে গ্রাহক ভার্চুয়াল সার্ভার ও স্টোরেজ ভাড়া নেন এবং তার ওপর নিজের পছন্দমতো অপারেটিং সিস্টেম ও সফটওয়্যার ইনস্টল ও পরিচালনা করেন।"
  },
  {
    id: 4,
    question: "Google App Engine, Heroku, and AWS Elastic Beanstalk (where developers only deploy code and the vendor manages the OS, runtimes, and scaling) are examples of:",
    options: [
      "Platform as a Service (PaaS)",
      "Infrastructure as a Service (IaaS)",
      "Software as a Service (SaaS)",
      "Desktop as a Service (DaaS)"
    ],
    correctAnswer: 0,
    explanationEn: "PaaS provides pre-configured runtimes (Python, Java, Node.js) and database engines so developers can focus strictly on writing code.",
    explanationBn: "PaaS ডেভেলপারদের রেডিমেড প্ল্যাটফর্ম প্রদান করে যেখানে অপারেটিং সিস্টেম বা সার্ভার রক্ষণাবেক্ষণ না করেই সরাসরি অ্যাপ্লিকেশন কোড রান করা যায়।"
  },
  {
    id: 5,
    question: "Gmail, Google Docs, Microsoft Office 365, and Zoom (where users access fully functional applications directly via web browsers) belong to:",
    options: [
      "Software as a Service (SaaS)",
      "Infrastructure as a Service (IaaS)",
      "Platform as a Service (PaaS)",
      "Database as a Service (DBaaS)"
    ],
    correctAnswer: 0,
    explanationEn: "SaaS provides ready-to-use software applications accessible over the internet with zero software installation or server maintenance required from end-users.",
    explanationBn: "SaaS হলো ইন্টারনেটের মাধ্যমে ওয়েব ব্রাউজারে সরাসরি ব্যবহারযোগ্য সম্পূর্ণ সফটওয়্যার সেবা, যেমন Gmail বা Google Docs।"
  },
  {
    id: 6,
    question: "What does the cloud characteristic 'Rapid Elasticity' mean?",
    options: [
      "The ability to automatically scale computing resources (RAM, CPU, servers) up or down instantaneously based on fluctuating traffic load",
      "The physical flexibility of server cables",
      "The speed of typing on a keyboard",
      "The ability to bend a computer monitor"
    ],
    correctAnswer: 0,
    explanationEn: "Rapid elasticity allows cloud systems to automatically add server capacity during traffic surges (e.g., festival sales) and shrink during quiet hours to save cost.",
    explanationBn: "র‍্যাপিড ইলাস্টিসিটি (Rapid Elasticity) হলো ট্রাফিকের চাপের ওপর ভিত্তি করে স্বয়ংক্রিয়ভাবে ক্লাউড সার্ভারের ক্ষমতা বাড়ানো বা কমানোর সুবিধা।"
  },
  {
    id: 7,
    question: "What does 'On-Demand Self-Service' in cloud computing refer to?",
    options: [
      "A consumer can provision computing resources (such as server time and network storage) automatically without requiring human interaction with the service provider",
      "Servers requiring manual technician approval for every login",
      "Ordering food online using a smartphone",
      "Buying physical computer parts at a store"
    ],
    correctAnswer: 0,
    explanationEn: "On-demand self-service enables users to launch virtual servers or databases in seconds via web portals with zero manual intervention from vendor staff.",
    explanationBn: "অন-ডিমান্ড সেলফ-সার্ভিস হলো গ্রাহক নিজেই ওয়েব পোর্টাল থেকে কোনো মানুষের সাহায্য ছাড়াই কয়েক সেকেন্ডে ভার্চুয়াল সার্ভার তৈরি করতে পারেন।"
  },
  {
    id: 8,
    question: "What does 'Resource Pooling' in multi-tenant cloud architecture signify?",
    options: [
      "The provider's computing resources are pooled to serve multiple consumers using a multi-tenant model with dynamic physical/virtual resource allocation",
      "Building a water swimming pool inside the data center",
      "Sharing a single password among all company employees",
      "Merging multiple emails into one inbox"
    ],
    correctAnswer: 0,
    explanationEn: "Resource pooling dynamically assigns and reassigns shared physical hardware across thousands of client virtual machines securely.",
    explanationBn: "রিসোর্স পুলিং হলো একই ফিজিক্যাল হার্ডওয়্যারকে মাল্টি-টেন্যান্ট পদ্ধতিতে একাধিক গ্রাহকের ভার্চুয়াল সার্ভারের মধ্যে দক্ষভাবে ভাগ করে দেওয়া।"
  },
  {
    id: 9,
    question: "What does 'Measured Service' mean in cloud billing models?",
    options: [
      "Cloud systems automatically meter and control resource usage (storage, CPU hours, bandwidth), billing customers strictly on a pay-as-you-go basis",
      "Measuring the physical height and weight of the server racks",
      "Charging a flat infinite fee regardless of usage",
      "Providing free unlimited compute without tracking"
    ],
    correctAnswer: 0,
    explanationEn: "Measured service operates like a utility (electricity meter): you only pay for the exact gigabytes and CPU-seconds you actually consume.",
    explanationBn: "মেজার্ড সার্ভিস (Measured Service) হলো বৈদ্যুতিক মিটারের মতো গ্রাহক ঠিক যতটুকু সময় বা মেমরি ব্যবহার করবেন কেবল তার বিল প্রদান করবেন।"
  },
  {
    id: 10,
    question: "In the 'Pizza as a Service' analogy for cloud computing, what corresponds to 'Traditional On-Premise' IT?",
    options: [
      "Making pizza entirely at home from scratch (buying dough, toppings, using home oven, gas, and dining table)",
      "Ordering pizza delivery to home",
      "Eating pizza at a fine dining restaurant",
      "Buying a slice from a street food cart"
    ],
    correctAnswer: 0,
    explanationEn: "On-premise IT means buying, maintaining, powering, and cooling your own physical datacenter and managing all hardware, OS, and software layers yourself.",
    explanationBn: "অন-প্রেমিস (On-Premise) হলো বাড়িতে নিজে ময়দা মেখে ওভেনে পিৎজা বানানোর মতো—যেখানে হার্ডওয়্যার, এসি থেকে শুরু করে কোড পর্যন্ত সব নিজেকে সামলাতে হয়।"
  },
  {
    id: 11,
    question: "In the 'Pizza as a Service' analogy, 'Dining Out at a Restaurant' (where the chef prepares, cooks, serves, and washes the dishes) corresponds to:",
    options: [
      "Software as a Service (SaaS)",
      "Infrastructure as a Service (IaaS)",
      "Platform as a Service (PaaS)",
      "Bare-Metal Dedicated Hosting"
    ],
    correctAnswer: 0,
    explanationEn: "SaaS is like eating at a restaurant: the entire underlying service is prepared and maintained by the vendor; the customer simply enjoys the end application.",
    explanationBn: "রেস্টুরেন্টে গিয়ে পিৎজা খাওয়ার সাথে SaaS তুলনীয়—যেখানে রান্না ও বাসন মাজার সব কাজ রেস্টুরেন্ট করে, গ্রাহক শুধু সেবা উপভোগ করেন।"
  },
  {
    id: 12,
    question: "Which of the following is a primary financial advantage of adopting Cloud Computing over on-premise datacenters?",
    options: [
      "Shifting from massive upfront Capital Expenditures (CapEx) to flexible operational pay-as-you-go expenses (OpEx)",
      "Completely eliminating the need for software engineers",
      "Receiving free hardware components by courier",
      "Unlimited free internet connectivity for all employees"
    ],
    correctAnswer: 0,
    explanationEn: "Cloud computing eliminates huge upfront capital investment in physical servers (CapEx), replacing it with predictable operational billing (OpEx).",
    explanationBn: "ক্লাউড কম্পিউটিং প্রাথমিক পর্যায়ে কোটি কোটি টাকার সার্ভার কেনার মূলধনী খরচ (CapEx) কমিয়ে ব্যবহারভিত্তিক পরিচালন ব্যয়ে (OpEx) রূপান্তর করে।"
  },
  {
    id: 13,
    question: "What is 'Broad Network Access' in the context of cloud computing?",
    options: [
      "Capabilities are available over the network and accessed through standard mechanisms promoting use by heterogeneous client platforms (tablets, phones, PCs)",
      "A computer connecting to a printer using a parallel cable",
      "A network cable that is physically wide in diameter",
      "A wireless radio broadcasting on AM frequencies"
    ],
    correctAnswer: 0,
    explanationEn: "Broad network access ensures cloud services can be operated seamlessly from smartphones, tablets, laptops, and thin clients from anywhere globally.",
    explanationBn: "ব্রড নেটওয়ার্ক অ্যাক্সেস বলতে বোঝায় যেকোনো স্থান থেকে মোবাইল, ট্যাব বা ল্যাপটপের মাধ্যমে ইন্টারনেট দিয়ে ক্লাউড সেবা ব্যবহার করার সুবিধা।"
  },
  {
    id: 14,
    question: "Which component sits between the physical hardware and virtual machines in an IaaS cloud datacenter to manage virtualization?",
    options: [
      "Hypervisor (e.g., KVM, VMware ESXi, Hyper-V)",
      "Optical Disk Burner",
      "Microphone Audio Preamp",
      "Mechanical Hard Drive Needle"
    ],
    correctAnswer: 0,
    explanationEn: "A hypervisor (virtual machine monitor) abstracts physical CPU, memory, and storage to create and run isolated virtual machines (VMs).",
    explanationBn: "হাইপারভাইজর (Hypervisor) হলো এমন একটি সফটওয়্যার যা ফিজিক্যাল সার্ভারকে ভাগ করে একাধিক ভার্চুয়াল মেশিন (VM) তৈরি ও পরিচালনা করে।"
  },
  {
    id: 15,
    question: "Under the IaaS Shared Responsibility Model, who is responsible for applying operating system security patches on a launched Linux VM?",
    options: [
      "The Consumer (Client)",
      "The Cloud Vendor (e.g., AWS/Azure)",
      "The Internet Service Provider (ISP)",
      "The Hardware Manufacturer"
    ],
    correctAnswer: 0,
    explanationEn: "In IaaS, the customer retains full administrative control of the guest OS and is responsible for OS updates, antivirus, and software patches.",
    explanationBn: "IaaS মডেলে ভার্চুয়াল সার্ভারের অপারেটিং সিস্টেম আপডেট ও সিকিউরিটি প্যাচ দেওয়ার সম্পূর্ণ দায়িত্ব থাকে গ্রাহকের (Client)।"
  },
  {
    id: 16,
    question: "Under the SaaS Shared Responsibility Model, who is responsible for server maintenance, OS updates, and database backups?",
    options: [
      "The Cloud Service Provider (Vendor)",
      "The End User",
      "The Local Computer Technician",
      "The Power Grid Company"
    ],
    correctAnswer: 0,
    explanationEn: "In SaaS (e.g., Gmail), the cloud provider manages 100% of the underlying infrastructure, server patches, backups, and security.",
    explanationBn: "SaaS মডেলে সার্ভার মেরামত, সফটওয়্যার আপডেট ও ব্যাকআপের শতভাগ দায়িত্ব ক্লাউড সরবরাহকারী প্রতিষ্ঠানের থাকে।"
  },
  {
    id: 17,
    question: "What is 'Auto-Scaling' in cloud infrastructure?",
    options: [
      "Automatically adjusting the number of active server instances up or down based on predefined metrics like CPU utilization or incoming web traffic",
      "Increasing the size of font letters on a screen",
      "Zooming in on a photograph automatically",
      "Scaling the dimensions of a 3D printer model"
    ],
    correctAnswer: 0,
    explanationEn: "Auto-scaling dynamically provisions additional instances during traffic spikes and terminates idle servers during low activity to optimize cost.",
    explanationBn: "অটো-স্কেলিং হলো ওয়েবসাইটে ভিজিটর বাড়লে স্বয়ংক্রিয়ভাবে নতুন সার্ভার যোগ করা এবং ভিজিটর কমলে অতিরিক্ত সার্ভার বন্ধ করে খরচ বাঁচানোর প্রক্রিয়া।"
  },
  {
    id: 18,
    question: "Why is high availability and disaster recovery easier in cloud computing compared to traditional on-premise setups?",
    options: [
      "Cloud providers maintain geographically separated availability zones and datacenters with automated data replication and multi-region failover",
      "Because cloud servers cannot ever experience power cuts",
      "Because cloud servers are built entirely of plastic",
      "Because cloud software has zero lines of code"
    ],
    correctAnswer: 0,
    explanationEn: "Cloud platforms replicate data synchronously across multiple independent physical Availability Zones (AZs) to prevent downtime during outages.",
    explanationBn: "ক্লাউড প্রোভাইডাররা বিভিন্ন ভৌগোলিক অঞ্চলে একাধিক ডেটা সেন্টার বজায় রাখে, ফলে একটি সেন্টারে সমস্যা হলেও অন্য সেন্টার থেকে ব্যাকআপ চালু থাকে।"
  },
  {
    id: 19,
    question: "Which of the following is an example of an IaaS cloud service?",
    options: [
      "Amazon EC2 (Elastic Compute Cloud)",
      "Google Docs",
      "Salesforce CRM",
      "Netflix Web App"
    ],
    correctAnswer: 0,
    explanationEn: "Amazon EC2 is the quintessential IaaS product, allowing users to rent resizable virtual computing capacity in the cloud.",
    explanationBn: "Amazon EC2 হলো একটি জনপ্রিয় IaaS সেবা যার মাধ্যমে ব্যবহারকারী নিজের ইচ্ছামতো ভার্চুয়াল সার্ভার ভাড়া নিতে পারেন।"
  },
  {
    id: 20,
    question: "Which of the following is a classic example of a PaaS cloud platform for Python developers?",
    options: [
      "Google App Engine / Python Heroku",
      "A raw empty bare-metal motherboard",
      "A physical Ethernet network switch",
      "A computer mouse"
    ],
    correctAnswer: 0,
    explanationEn: "Google App Engine and Heroku allow Python developers to deploy scripts directly without managing Linux kernels, web servers, or virtual machines.",
    explanationBn: "Google App Engine এবং Heroku হলো PaaS প্ল্যাটফর্ম যা ডেভেলপারদের সরাসরি পাইথন কোড ডিপ্লয় করার সুবিধা দেয়।"
  },
  {
    id: 21,
    question: "What is 'Multi-Tenancy' in cloud computing architecture?",
    options: [
      "A software architecture where a single instance of software runs on a server and serves multiple distinct customer organizations (tenants) securely",
      "Renting an apartment to ten different students",
      "Plugging 10 keyboards into a single laptop",
      "Installing 10 operating systems on one hard drive"
    ],
    correctAnswer: 0,
    explanationEn: "Multi-tenancy allows cloud vendors to serve multiple independent customers on the same physical infrastructure while keeping their data logically isolated.",
    explanationBn: "মাল্টি-টেন্যান্সি হলো এমন একটি ব্যবস্থা যেখানে একই সফটওয়্যার বা হার্ডওয়্যার সুরক্ষিতভাবে একাধিক গ্রাহককে পৃথকভাবে সেবা প্রদান করে।"
  },
  {
    id: 22,
    question: "What is 'Vendor Lock-in' in cloud computing?",
    options: [
      "A situation where a customer becomes dependent on a single cloud vendor's proprietary tools, making migration to another cloud provider difficult and expensive",
      "Locking the physical door of the server room",
      "Typing the wrong password three times in a row",
      "Purchasing hardware directly from a store"
    ],
    correctAnswer: 0,
    explanationEn: "Vendor lock-in occurs when an enterprise heavily utilizes proprietary vendor APIs, making porting code to another cloud platform costly.",
    explanationBn: "ভেন্ডর লক-ইন (Vendor Lock-in) হলো কোনো একটি নির্দিষ্ট ক্লাউড কোম্পানির নিজস্ব প্রযুক্তির ওপর অতিরিক্ত নির্ভরশীল হয়ে পড়া, যার ফলে অন্য ক্লাউডে যাওয়া কঠিন হয়।"
  },
  {
    id: 23,
    question: "What is 'Serverless Computing' (e.g., AWS Lambda, Google Cloud Functions)?",
    options: [
      "An execution model where the cloud vendor runs the server and dynamically manages the allocation of machine resources, charging strictly per execution millisecond",
      "Running code without any computers existing on Earth",
      "A software that deletes all servers in a datacenter",
      "An offline desktop computer disconnected from Wi-Fi"
    ],
    correctAnswer: 0,
    explanationEn: "Serverless lets developers write small event-triggered code functions; the cloud provider handles all server provisioning, scaling, and execution billing per millisecond.",
    explanationBn: "সার্ভারলেস কম্পিউটিংয়ে ডেভেলপারকে কোনো সার্ভার পরিচালনা করতে হয় না; কোড এক্সিকিউট হওয়ার সময়টুকুর জন্য মিলিসেকেন্ড হিসেবে বিল হিসাব হয়।"
  },
  {
    id: 24,
    question: "Which cloud service model would a school choose if they want a complete turnkey email and classroom suite without managing servers or code?",
    options: [
      "Software as a Service (SaaS - e.g., Google Workspace for Education)",
      "Infrastructure as a Service (IaaS)",
      "Platform as a Service (PaaS)",
      "Bare Metal Rack Server Hosting"
    ],
    correctAnswer: 0,
    explanationEn: "SaaS suites like Google Workspace for Education provide instant email, video meetings, and document editing with zero software development.",
    explanationBn: "বিদ্যালয়ের জন্য Google Workspace for Education-এর মতো SaaS সেবা সেরা, কারণ এতে কোনো সার্ভার বা কোডিং ছাড়াই সরাসরি ইমেল ও ক্লাস ম্যানেজ করা যায়।"
  },
  {
    id: 25,
    question: "What is an SLA (Service Level Agreement) in cloud computing contracts?",
    options: [
      "A formal contract between a cloud service provider and customer defining guaranteed levels of service availability, uptime percentage (e.g., 99.99%), and penalties for outages",
      "A software license for playing video games",
      "A receipt for purchasing computer cables",
      "A certificate for completing a coding course"
    ],
    correctAnswer: 0,
    explanationEn: "An SLA legally guarantees the cloud provider's uptime commitment (e.g., 99.99% availability) and outlines financial credits if downtime occurs.",
    explanationBn: "SLA (সার্ভিস লেভেল অ্যাগ্রিমেন্ট) হলো একটি আইনি চুক্তি যা ক্লাউড সেবার নিরবচ্ছিন্ন প্রাপ্যতা (যেমন ৯৯.৯৯% আপটাইম) নিশ্চিত করে।"
  }
];
