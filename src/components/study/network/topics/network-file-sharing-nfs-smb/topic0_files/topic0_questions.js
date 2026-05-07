const questions = [
  {
    question: "What is the primary benefit of centralized file access over local storage?",
    shortAnswer: "Data consistency and simplified backup.",
    explanation: "Centralized storage ensures everyone sees the same version of a file, reduces duplicate copies, and allows easy scheduled backups from a single location.",
    hint: "Think about version conflicts when multiple people email files.",
    level: "basic"
  },
  {
    question: "Name two popular network file sharing protocols and their native operating systems.",
    shortAnswer: "NFS (Unix/Linux), SMB/CIFS (Windows).",
    explanation: "NFS was developed by Sun for Unix; SMB by Microsoft for Windows. Both can be used cross-platform with additional software (e.g., Samba for Linux SMB server).",
    hint: "Windows shared folders use SMB; Linux `mount -t nfs` uses NFS.",
    level: "basic",
    codeExample: "mount -t nfs server:/export /mnt"
  },
  {
    question: "What was 'sneakernet' and why was it inefficient?",
    shortAnswer: "Physically carrying floppy disks or USB drives between computers.",
    explanation: "Sneakernet is slow, error-prone, lacks version control, and scales poorly. It requires human intervention and causes data inconsistency.",
    hint: "The term is a joke about sneakers (walking) vs. network.",
    level: "basic"
  },
  {
    question: "How does cloud storage (e.g., Google Drive) relate to traditional network file sharing?",
    shortAnswer: "Cloud storage is network file sharing over the internet, often with additional sync and versioning features.",
    explanation: "Both provide remote file access. Cloud adds automatic synchronization across devices, web access, and sharing links. Underlying protocols may be HTTP/REST instead of NFS/SMB.",
    hint: "Think of Google Drive as 'SMB over HTTPS' with caching.",
    level: "intermediate"
  },
  {
    question: "What is a common problem when two users edit the same network file simultaneously?",
    shortAnswer: "A 'lost update' or conflicting changes, requiring concurrency control (locking or merging).",
    explanation: "Without proper locking, the second save overwrites the first. Solutions: file locking (SMB), versioning (cloud), or collaborative editing (Google Docs).",
    hint: "Try: Both Mamata and Mahima edit the same Excel file at once.",
    level: "intermediate"
  },
  {
    question: "Why are backups easier with centralized file storage?",
    shortAnswer: "Only one location (the server) needs to be backed up, not every client.",
    explanation: "Decentralized storage requires backing up every individual computer, which is time-consuming and often forgotten. Centralized storage allows scheduled, incremental, and offsite backups from a single server.",
    hint: "Which is easier: backing up 50 laptops or one NAS?",
    level: "basic"
  },
  {
    question: "What is a NAS device?",
    shortAnswer: "Network Attached Storage – a dedicated file server appliance.",
    explanation: "NAS provides file-level access over NFS, SMB, or AFP. It's optimized for storage, often with RAID, low power, and easy management.",
    hint: "Think of it as a 'shared hard drive' on the network.",
    level: "basic"
  },
  {
    question: "Name three real-world use cases of network file sharing.",
    shortAnswer: "Office shared drives, student home directories in labs, cloud storage backends.",
    explanation: "Also: media servers (Plex), backup targets, print servers, and collaborative document editing.",
    hint: "At school, where do you save your assignments so the teacher can collect them?",
    level: "basic"
  },
  {
    question: "What is the difference between file-level and block-level storage?",
    shortAnswer: "File-level (NAS) shares files via protocols; block-level (SAN) presents raw disk blocks.",
    explanation: "Network file sharing typically uses file-level protocols (NFS, SMB). Block-level (iSCSI, Fibre Channel) is used for databases and VMs where low-level access is needed.",
    hint: "File-level: you ask for a file by name. Block-level: you read/write disk sectors.",
    level: "advanced"
  },
  {
    question: "What historical factor led to the development of distinct protocols like NFS and SMB?",
    shortAnswer: "Different operating systems (Unix vs. Windows) with different file system semantics and security models.",
    explanation: "NFS was designed for Unix's simple permissions (UID/GID) and statelessness; SMB was designed for Windows' complex ACLs and stateful sessions. Interoperability came later via Samba.",
    hint: "Unix and Windows had competing network stacks in the 80s/90s.",
    level: "intermediate"
  },
  {
    question: "Why might a small business choose a local NAS over cloud storage?",
    shortAnswer: "Cost (no subscription), performance (LAN speed), and data sovereignty (no third-party access).",
    explanation: "Cloud storage has recurring fees, depends on internet speed, and may raise privacy/legal concerns. NAS is a one-time purchase, faster locally, and under your control.",
    hint: "Think of a lawyer's office – sensitive client data may not be allowed on public cloud.",
    level: "intermediate"
  },
  {
    question: "What does 'centralized access control' mean?",
    shortAnswer: "Permissions are managed on the server, not per client.",
    explanation: "Administrators set who can read/write a share from a single interface (e.g., Windows Server Manager or Linux /etc/exports). Clients cannot bypass these permissions.",
    hint: "Even if a student has local admin rights, they cannot delete the shared grading folder.",
    level: "basic"
  },
  {
    question: "How does versioning in cloud storage solve the concurrency problem?",
    shortAnswer: "It keeps previous versions of a file, allowing recovery from overwrites.",
    explanation: "While not preventing conflicts, users can restore an earlier version if someone overwrites their changes. Some clouds automatically merge edits (e.g., Google Docs).",
    hint: "Right-click a file in Google Drive → Version history.",
    level: "intermediate"
  },
  {
    question: "What is the '3-2-1 backup rule' and why is it relevant to network file sharing?",
    shortAnswer: "3 copies, 2 different media, 1 offsite – ensures data resilience.",
    explanation: "Network shares are still vulnerable to fire, theft, ransomware. The rule applies to central servers as well: one copy on the NAS, another on external drive, third in cloud.",
    hint: "Your school's file server should not be the only copy of student records.",
    level: "expert"
  },
  {
    question: "What does 'single point of failure' mean in centralized file sharing?",
    shortAnswer: "If the central server fails, all clients lose access.",
    explanation: "Centralization improves manageability but creates a critical failure risk. Mitigations: RAID, redundant servers, backups, and high-availability clustering.",
    hint: "What happens when the school network drive goes down during exam submission?",
    level: "intermediate"
  },
  {
    question: "What is the difference between a 'share' and a 'folder'?",
    shortAnswer: "A share is a folder made accessible over the network (with permissions).",
    explanation: "A local folder is only accessible on that machine. When you 'share' it, you publish it via NFS/SMB, allowing remote clients to mount/access it.",
    hint: "Right-click a folder in Windows → Properties → Sharing.",
    level: "basic"
  },
  {
    question: "How does network file sharing contribute to 'roaming user profiles'?",
    shortAnswer: "User settings and documents are stored on a server and loaded on any client.",
    explanation: "When you log into any lab computer, your desktop and files appear because they reside on a network share (e.g., SMB home directory).",
    hint: "Susmita logs into computer A, then computer B – her wallpapers follow her.",
    level: "intermediate"
  },
  {
    question: "What is a 'mount' in the context of network file sharing?",
    shortAnswer: "Attaching a remote share to a local directory path.",
    explanation: "On Linux, `mount -t nfs server:/export /mnt` makes remote files appear under /mnt. On Windows, mapped drives (Z:) do the same.",
    hint: "Like plugging an external USB drive, but over the network.",
    level: "basic"
  },
  {
    question: "What security risk does network file sharing introduce compared to local storage?",
    shortAnswer: "Data transmitted over the network can be intercepted (eavesdropping) if not encrypted.",
    explanation: "Local storage data never leaves the device. Network shares may send data in plaintext (NFSv3, SMB without signing). Encryption (SMB3, NFSv4+krb5p) mitigates this.",
    hint: "Someone with Wireshark on the same LAN could see files being read.",
    level: "intermediate"
  },
  {
    question: "What is the difference between 'permissions' and 'sharing'?",
    shortAnswer: "Permissions (NTFS/Unix) control local access; sharing controls network access.",
    explanation: "A folder may have 'sharing' enabled (visible on network) but still require appropriate NTFS/Unix permissions to read/write. Both must allow access.",
    hint: "You can share a folder but deny read access – remote users will see but cannot open.",
    level: "intermediate"
  },
  {
    question: "Why did cloud storage become popular despite existing NFS/SMB?",
    shortAnswer: "Access from anywhere, no VPN required, automatic synchronization, and collaboration features.",
    explanation: "Traditional NFS/SMB require VPN or being on the same LAN. Cloud adds web access, mobile apps, file versioning, and sharing links – solving many usability issues.",
    hint: "Debangshu needs to edit a file from home, then from school, then from phone.",
    level: "basic"
  },
  {
    question: "What is the role of a 'file server' in an office network?",
    shortAnswer: "A dedicated computer that provides shared storage and enforces access policies.",
    explanation: "It runs services like Samba or NFS, manages user accounts, logs access, and hosts backups. Usually more reliable than a typical desktop.",
    hint: "It's like a librarian for digital files.",
    level: "basic"
  },
  {
    question: "Explain the term 'data silo' and how network sharing helps avoid it.",
    shortAnswer: "Data silo – isolated data that only one person can access. Sharing breaks down silos.",
    explanation: "When each employee keeps files on their own PC, information is trapped. Centralized shares make data accessible to authorized team members.",
    hint: "Marketing's files on Mark's laptop – what if Mark is sick?",
    level: "intermediate"
  },
  {
    question: "What is the difference between 'synchronous' and 'asynchronous' file sharing?",
    shortAnswer: "Synchronous: real-time locking (e.g., networked database); Asynchronous: eventual sync (e.g., Dropbox).",
    explanation: "Traditional NFS/SMB provide synchronous access (changes appear immediately). Cloud sync is asynchronous – you edit a local copy, then it syncs later, risking conflicts.",
    hint: "Editing a file directly on a network drive vs. editing a local copy that syncs.",
    level: "expert"
  },
  {
    question: "What is a 'file lock' and why is it important?",
    shortAnswer: "A mechanism that prevents simultaneous writes to the same file.",
    explanation: "When a program opens a file for writing, the server grants a lock. Other clients can read but not write until the lock is released. Prevents corruption.",
    hint: "Without locks, two teachers updating the same grade sheet could corrupt it.",
    level: "basic"
  },
  {
    question: "What does the acronym 'CIFS' stand for and how does it relate to SMB?",
    shortAnswer: "Common Internet File System – an old dialect of SMB (SMB 1.0).",
    explanation: "Microsoft rebranded SMB as CIFS in the 90s, but modern SMB (2.x, 3.x) is not CIFS. CIFS is deprecated and insecure.",
    hint: "Never enable CIFS/SMB1 today.",
    level: "intermediate"
  },
  {
    question: "How does a 'mapped drive' in Windows differ from a 'network location'?",
    shortAnswer: "Mapped drive gets a letter (Z:); network location is a shortcut (no letter).",
    explanation: "Mapped drives appear in File Explorer as a disk and are compatible with older apps. Network locations use WebDAV or other protocols and may behave differently.",
    hint: "Try both: Z: vs a link to \\server\share.",
    level: "basic"
  },
  {
    question: "What is the advantage of using a dedicated storage protocol (NFS/SMB) over HTTP for file sharing?",
    shortAnswer: "Lower overhead, stateful operations, file locking, and better performance for random I/O.",
    explanation: "HTTP is stateless and not optimized for frequent small reads/writes. NFS/SMB are designed for file system semantics, including directory listings and byte-range locks.",
    hint: "Why not just use a web server for file sharing? (WebDAV tried but less efficient.)",
    level: "expert"
  },
  {
    question: "Name three common mistakes when setting up a shared folder for a classroom.",
    shortAnswer: "1) Giving 'Everyone' write access. 2) No quota limits. 3) Forgetting to back up.",
    explanation: "Students may accidentally delete files, fill the drive, or lose work. Proper permissions, quotas, and backups are essential.",
    hint: "Observe carefully: Abhronila accidentally dragged the whole class folder into another folder – permissions saved them.",
    level: "intermediate"
  },
  {
    question: "What is the difference between 'file sharing' and 'print sharing'?",
    shortAnswer: "File sharing shares storage; print sharing shares printers over the network.",
    explanation: "Both use similar network protocols (SMB can do both). Print sharing sends print jobs to a network printer or printer attached to a server.",
    hint: "At school, you 'share' a printer so everyone can print.",
    level: "basic"
  }
];

export default questions;