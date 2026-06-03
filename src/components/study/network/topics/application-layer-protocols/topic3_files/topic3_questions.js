// topic3_files/topic3_questions.js
const questions = [
  {
    question: "What does SNMP stand for and what is its primary purpose?",
    shortAnswer: "Simple Network Management Protocol – used to monitor and manage network devices.",
    explanation: "SNMP allows network administrators to collect information (bandwidth, CPU, errors) and modify configuration on routers, switches, servers, printers, and IoT devices remotely.",
    hint: "Think of it as 'remote health monitoring' for network equipment.",
    level: "basic"
  },
  {
    question: "What are the three main components of SNMP architecture?",
    shortAnswer: "Managed device (with agent), NMS (manager), and MIB.",
    explanation: "Managed device runs SNMP agent. NMS polls agents or receives traps. MIB defines available data objects (OIDs).",
    hint: "Agent = software on device, Manager = central monitoring station.",
    level: "basic"
  },
  {
    question: "What are SNMP community strings and why are they considered insecure?",
    shortAnswer: "Community strings act as passwords for SNMPv1/v2c. They are transmitted in plaintext.",
    explanation: "Read-only (public) and read-write (private) strings. Anyone sniffing the network can capture them and query or reconfigure devices.",
    hint: "Like 'public' – it's literally public.",
    level: "basic"
  },
  {
    question: "What is the difference between SNMPv1, v2c, and v3?",
    shortAnswer: "v1 original; v2c adds GETBULK; v3 adds authentication and encryption.",
    explanation: "v1 – basic operations, plaintext. v2c – performance improvements, still insecure. v3 – user-based security model (USM) with auth/privacy.",
    hint: "Only v3 should be used on untrusted networks.",
    level: "intermediate"
  },
  {
    question: "What is an OID and how is it structured?",
    shortAnswer: "Object Identifier – numeric hierarchical address for a management variable.",
    explanation: "OIDs are organized in a tree: iso(1) → org(3) → dod(6) → internet(1) → private(4) → enterprises(1) → vendor-specific. Example: .1.3.6.1.2.1.1.1 = sysDescr.",
    hint: "It's like a phone number for each data point.",
    level: "intermediate"
  },
  {
    question: "What is a MIB (Management Information Base)?",
    shortAnswer: "Text file defining OIDs and their data types, making OIDs human-readable.",
    explanation: "MIB translates numeric OIDs to names, defines syntax (INTEGER, STRING, GAUGE), and describes OID hierarchy. Without MIB, you see numbers only.",
    hint: "MIB = dictionary for OIDs.",
    level: "intermediate"
  },
  {
    question: "What UDP ports does SNMP use and for what purpose?",
    shortAnswer: "UDP 161 for manager-agent queries (GET/SET), UDP 162 for agent->manager traps/informs.",
    explanation: "Agents listen on 161. Traps are sent to manager's 162. Informs also use 162.",
    hint: "Which port would you open on a firewall for a monitoring server to receive alerts?",
    level: "basic"
  },
  {
    question: "Explain the difference between a TRAP and an INFORM.",
    shortAnswer: "Trap is unacknowledged (UDP). Inform is acknowledged (requires response from manager).",
    explanation: "Traps may be lost. Informs retransmit until ACK, providing reliability at cost of more traffic.",
    hint: "Which one would you use for critical alerts?",
    level: "intermediate"
  },
  {
    question: "What is the purpose of the GETBULK operation?",
    shortAnswer: "Retrieves multiple OIDs in one request, introduced in SNMPv2c.",
    explanation: "GETBULK combines GETNEXT repeated internally. Efficient for walking tables (like interface statistics).",
    hint: "How to collect a full routing table efficiently?",
    level: "intermediate"
  },
  {
    question: "What is sysDescr and sysUpTime OIDs?",
    shortAnswer: "sysDescr (.1.3.6.1.2.1.1.1) = system description; sysUpTime (.1.3.6.1.2.1.1.3) = device uptime.",
    explanation: "These are mandatory in standard MIB-II. sysDescr includes OS, hardware version. sysUpTime in hundredths of seconds since last reboot.",
    hint: "Basic information for any SNMP query.",
    level: "basic"
  },
  {
    question: "What is the difference between SNMP GET and GETNEXT?",
    shortAnswer: "GET fetches a specific OID. GETNEXT fetches the next OID in the tree.",
    explanation: "GET .1.3.6.1.2.1.1.1 returns sysDescr. GETNEXT on same OID returns .1.3.6.1.2.1.1.2 (sysObjectID). Walking the tree uses repeated GETNEXT.",
    hint: "How would you build an MIB walker?",
    level: "intermediate"
  },
  {
    question: "What is the SNMP SET operation used for?",
    shortAnswer: "Modifies a writable OID on a managed device (e.g., disable port, change hostname, reboot).",
    explanation: "Requires read-write community (v2c) or authenticated user (v3). Dangerous if misused.",
    hint: "Why would you restrict SET access to specific IPs?",
    level: "intermediate"
  },
  {
    question: "What are typical security risks of SNMPv1/v2c?",
    shortAnswer: "Plaintext community strings, replay attacks, unauthorized configuration changes.",
    explanation: "Sniffing gives attacker full read/write access. Spoofed traps can cause false alarms.",
    hint: "Why do security audits flag SNMPv2c even on internal networks?",
    level: "advanced"
  },
  {
    question: "How does SNMPv3 improve security?",
    shortAnswer: "Provides authentication (MD5/SHA) to verify agent/manager, and privacy (DES/AES) for encryption.",
    explanation: "USM (User-based Security Model) requires usernames, auth passwords, and priv passwords. Packets cannot be read or altered without keys.",
    hint: "What does 'authPriv' security level mean?",
    level: "advanced"
  },
  {
    question: "What are SNMP MIB modules and how do you load them?",
    shortAnswer: "MIB modules are definitions (RFCs or vendor). Tools like net-snmp load them from /usr/share/snmp/mibs.",
    explanation: "Without appropriate MIB, snmpwalk shows numeric OIDs. Set environment `export MIBS=+CISCO-SMI` or edit snmp.conf.",
    hint: "Why do you see `iso.3.6.1.4.1.9...` instead of 'cisco'? Missing MIB.",
    level: "intermediate"
  },
  {
    question: "What is the difference between SNMPv2c and SNMPv3's security model?",
    shortAnswer: "v2c uses community strings (plain); v3 uses user-based model with auth/privacy.",
    explanation: "v3 defines three security levels: noAuthNoPriv (like v1), authNoPriv (integrity only), authPriv (encrypted).",
    hint: "Which level is equivalent to v2c?",
    level: "intermediate"
  },
  {
    question: "What is the purpose of SNMP 'views' (VACM)?",
    shortAnswer: "View-based Access Control Model restricts which OIDs a user can read/write.",
    explanation: "Define a view (e.g., 'systemView' covering only .1.3.6.1.2.1.1), then assign to group/user. Prevents browsing sensitive data.",
    hint: "How to let a monitoring user see only interface counters, not routing tables?",
    level: "expert"
  },
  {
    question: "What is an SNMP trap receiver and how does it work?",
    shortAnswer: "A daemon that listens on UDP 162 for incoming traps and takes action (log, email, script).",
    explanation: "Example: snmptrapd (net-snmp) logs traps or executes custom handlers.",
    hint: "What would you use to forward SNMP traps to a central alerting system?",
    level: "intermediate"
  },
  {
    question: "How can you test SNMP connectivity from command line?",
    shortAnswer: "Use `snmpget -v2c -c public host OID` or `snmpwalk`.",
    explanation: "Linux tools: snmpget, snmpwalk, snmpset (net-snmp-utils). Also `snmptrap` to send test traps.",
    hint: "What command would you run to confirm an agent responds?",
    level: "basic",
    codeExample: "snmpget -v2c -c public localhost .1.3.6.1.2.1.1.1.0"
  },
  {
    question: "What are some common SNMP monitoring tools?",
    shortAnswer: "Zabbix, PRTG, Nagios, LibreNMS, Cacti, SolarWinds, Prometheus with snmp_exporter.",
    explanation: "They poll SNMP agents, store data, graph, alert. Many support SNMPv3.",
    hint: "Which open-source tool has a built-in SNMP template for routers?",
    level: "basic"
  },
  {
    question: "What is the SNMP 'ifTable' and why is it useful?",
    shortAnswer: "ifTable (OID .1.3.6.1.2.1.2.2) contains interface statistics (bytes in/out, errors, status).",
    explanation: "Each row represents a network interface. Columns include ifDescr, ifOperStatus, ifInOctets, ifOutOctets – key for bandwidth monitoring.",
    hint: "How to find which interface is generating errors?",
    level: "intermediate"
  },
  {
    question: "What is the difference between OID ending with .0 and without?",
    shortAnswer: "Scalar OIDs end with .0; tabular OIDs have column.row indexing (.column.row).",
    explanation: "Scalar objects (single instance) have .0 suffix. Tables e.g., ifDescr.1 (interface 1).",
    hint: "Why does `snmpget .1.3.6.1.2.1.1.1` fail? Missing .0.",
    level: "intermediate"
  },
  {
    question: "What is an SNMP proxy agent?",
    shortAnswer: "Agent that forwards requests to non-SNMP devices (like legacy UPS) or translates SNMP versions.",
    explanation: "Proxy receives SNMP queries, translates to other protocol (Modbus, etc.) or spoofs older version.",
    hint: "How to monitor a device that speaks only telnet?",
    level: "expert"
  },
  {
    question: "What is the maximum size of an SNMPv1 PDU?",
    shortAnswer: "Traditionally 484 bytes, but many implementations support larger (determined by agent's maxMsgSize).",
    explanation: "Ethernet MTU constraints. Larger payloads may require fragmentation, which UDP handles poorly. SNMPv2c/v3 have larger defaults.",
    hint: "Why can a single GETBULK fail on a large table?",
    level: "expert"
  },
  {
    question: "What is the role of the SNMP 'engine ID'?",
    shortAnswer: "Unique identifier for an SNMPv3 engine, used to generate cryptographic keys.",
    explanation: "Engine ID is part of SNMPv3 context. Default generated from MAC/IP. Must be unique per agent for user authentication.",
    hint: "What happens if two devices have duplicate engine IDs?",
    level: "expert"
  },
  {
    question: "How to monitor anything not natively supporting SNMP?",
    shortAnswer: "Use an agent that runs external scripts and returns data via SNMP (e.g., Net-SNMP extend directive).",
    explanation: "`extend` in snmpd.conf allows custom scripts. Agent returns script output as OIDs.",
    hint: "How to monitor room temperature with a USB sensor?",
    level: "advanced"
  },
  {
    question: "What is the SNMP MIB-2 system group?",
    shortAnswer: "System group (OID .1.3.6.1.2.1.1) contains basic device info: description, uptime, contact, location, services.",
    explanation: "Mandatory for all SNMP agents. Provides identification and contact details.",
    hint: "What OID would you check to see who to call during an outage?",
    level: "basic"
  },
  {
    question: "What is the difference between 'snmpwalk' and 'snmpbulkwalk'?",
    shortAnswer: "snmpwalk uses repeated GETNEXT; snmpbulkwalk uses GETBULK for faster retrieval.",
    explanation: "GETBULK reduces round trips for large tables, but not all agents support it.",
    hint: "Which command would you use on a device supporting SNMPv2c?",
    level: "intermediate"
  },
  {
    question: "What is the OID for CPU load in Linux (UCD-SNMP-MIB)?",
    shortAnswer: "laLoad.1, laLoad.2, laLoad.3 – .1.3.6.1.4.1.2021.10.1.3.x (1min,5min,15min load average).",
    explanation: "UCD-SNMP-MIB provides extended system stats. Requires `lm-sensors` and appropriate MIB files.",
    hint: "Why might snmpwalk return unknown OIDs for CPU? Missing MIB or not loaded.",
    level: "advanced"
  },
  {
    question: "What are SNMP 'usmUser' tables used for?",
    shortAnswer: "Define SNMPv3 users, auth/priv protocols, and keys in the agent's configuration.",
    explanation: "Set via `snmpusm` or by editing snmpd.conf. Keys can be generated from passphrases.",
    hint: "How to add a new SNMPv3 monitoring user?",
    level: "expert"
  }
];

export default questions;