// 50 College / School Level Computer Basics Questions
module.exports = [
  {
    question: "What is the decimal equivalent of the 8-bit binary number 10101010?",
    option_a: "150",
    option_b: "170",
    option_c: "180",
    option_d: "165",
    correct_option: "B",
    explanation: "128 + 0 + 32 + 0 + 8 + 0 + 2 + 0 = 170."
  },
  {
    question: "Which layer of the 7-layer OSI model is responsible for reliable end-to-end transport and flow control?",
    option_a: "Data Link Layer",
    option_b: "Network Layer",
    option_c: "Transport Layer",
    option_d: "Session Layer",
    correct_option: "C",
    explanation: "The Transport Layer (Layer 4) manages protocols like TCP to provide segmentation, reliability, and flow control."
  },
  {
    question: "What is the worst-case time complexity of standard Binary Search on a sorted array of n elements?",
    option_a: "O(1)",
    option_b: "O(log n)",
    option_c: "O(n)",
    option_d: "O(n log n)",
    correct_option: "B",
    explanation: "Binary search cuts the search interval in half at each iteration, yielding logarithmic O(log n) time."
  },
  {
    question: "Which of the following logic gates outputs TRUE (1) only when its two binary inputs are different?",
    option_a: "AND Gate",
    option_b: "OR Gate",
    option_c: "XOR (Exclusive OR) Gate",
    option_d: "NAND Gate",
    correct_option: "C",
    explanation: "An XOR gate yields 1 for inputs (0,1) and (1,0), and yields 0 when inputs match (0,0) or (1,1)."
  },
  {
    question: "In an operating system, what is 'thrashing'?",
    option_a: "When CPU runs at 100% calculation capacity",
    option_b: "Excessive swapping of pages between RAM and disk, severely degrading system performance",
    option_c: "A network denial-of-service attack",
    option_d: "Deleting unused temporary cache files",
    correct_option: "B",
    explanation: "Thrashing occurs when the OS spends more time paging data into and out of virtual memory than executing processes."
  },
  {
    question: "How many bits are used in a standard IPv4 address?",
    option_a: "16 bits",
    option_b: "32 bits",
    option_c: "64 bits",
    option_d: "128 bits",
    correct_option: "B",
    explanation: "IPv4 addresses consist of 32 bits divided into four 8-bit octets (e.g., 192.168.1.1)."
  },
  {
    question: "Which data structure operates on a Last-In, First-Out (LIFO) principle?",
    option_a: "Queue",
    option_b: "Stack",
    option_c: "Linked List",
    option_d: "Binary Tree",
    correct_option: "B",
    explanation: "A Stack pushes elements on top and pops the most recently added element first (LIFO)."
  },
  {
    question: "What is the primary function of the Domain Name System (DNS)?",
    option_a: "Encrypts outgoing HTTP web packets",
    option_b: "Translates human-readable domain names into numerical IP addresses",
    option_c: "Allocates local dynamic IP addresses via DHCP",
    option_d: "Caches database query results",
    correct_option: "B",
    explanation: "DNS acts like the phonebook of the internet, resolving human names like 'example.com' into IP addresses."
  },
  {
    question: "Which CPU register holds the memory address of the next instruction waiting to be executed?",
    option_a: "Accumulator (AC)",
    option_b: "Program Counter (PC)",
    option_c: "Instruction Register (IR)",
    option_d: "Memory Data Register (MDR)",
    correct_option: "B",
    explanation: "The Program Counter (PC) stores the address of the subsequent instruction in the fetch-decode-execute cycle."
  },
  {
    question: "Which of the following is considered volatile primary memory in a personal computer?",
    option_a: "Hard Disk Drive (HDD)",
    option_b: "Random Access Memory (RAM)",
    option_c: "ROM (Read-Only Memory)",
    option_d: "Flash NVMe SSD",
    correct_option: "B",
    explanation: "RAM requires continuous electrical power to retain stored data; turning off the computer clears it."
  },
  {
    question: "What is the standard port number used for secure web browsing over HTTPS?",
    option_a: "21",
    option_b: "25",
    option_c: "80",
    option_d: "443",
    correct_option: "D",
    explanation: "Port 443 is reserved for encrypted HTTPS traffic; standard unencrypted HTTP uses port 80."
  },
  {
    question: "In Boolean algebra, what is the value of expression A + A' (A OR NOT A)?",
    option_a: "0",
    option_b: "1",
    option_c: "A",
    option_d: "A'",
    correct_option: "B",
    explanation: "By the law of complement, either A is 1 or A' is 1, so the OR sum is always 1."
  },
  {
    question: "Which scheduling algorithm in operating systems assigns each process a fixed slice of CPU time in cyclic order?",
    option_a: "First-Come First-Served (FCFS)",
    option_b: "Shortest Job Next (SJN)",
    option_c: "Round Robin (RR)",
    option_d: "Priority Scheduling",
    correct_option: "C",
    explanation: "Round Robin allocates a small unit of CPU time (time quantum) to every process in turn."
  },
  {
    question: "What does the acronym 'URL' stand for in web technology?",
    option_a: "Universal Resource Locator",
    option_b: "Uniform Resource Locator",
    option_c: "Unified Routing Link",
    option_d: "Universal Reference Link",
    correct_option: "B",
    explanation: "URL stands for Uniform Resource Locator, specifying the address of a resource on the web."
  },
  {
    question: "Which data structure is naturally utilized to implement a breadth-first search (BFS) on a graph or tree?",
    option_a: "Stack",
    option_b: "Queue",
    option_c: "Priority Heap",
    option_d: "Hash Table",
    correct_option: "B",
    explanation: "BFS explores neighbor vertices level-by-level using a FIFO Queue."
  },
  {
    question: "How many distinct values can be represented with a single byte (8 bits)?",
    option_a: "64",
    option_b: "128",
    option_c: "256",
    option_d: "512",
    correct_option: "C",
    explanation: "An 8-bit byte can represent 2^8 = 256 distinct unsigned states (0 through 255)."
  },
  {
    question: "What is a 'deadlock' in a multi-threaded or multi-process operating system?",
    option_a: "A CPU running out of clock cycles",
    option_b: "A condition where two or more processes are permanently blocked waiting for resources held by each other",
    option_c: "A memory leak caused by unclosed sockets",
    option_d: "A hardware hard drive disk crash",
    correct_option: "B",
    explanation: "Deadlock occurs when processes in a circular chain cannot proceed because each holds a lock desired by another."
  },
  {
    question: "Which hexadecimal digit represents the decimal number 14?",
    option_a: "B",
    option_b: "C",
    option_c: "D",
    option_d: "E",
    correct_option: "D",
    explanation: "In hexadecimal: A=10, B=11, C=12, D=13, E=14, F=15."
  },
  {
    question: "Which protocol is connectionless and does NOT guarantee packet delivery or order?",
    option_a: "TCP",
    option_b: "UDP",
    option_c: "FTP",
    option_d: "SSH",
    correct_option: "B",
    explanation: "User Datagram Protocol (UDP) sends independent packets without handshakes or delivery confirmation."
  },
  {
    question: "What is the primary purpose of a compiler?",
    option_a: "To execute source code line-by-line interactively",
    option_b: "To translate high-level programming language code into machine-executable binary code",
    option_c: "To scan files for malware signatures",
    option_d: "To clean temporary registry keys",
    correct_option: "B",
    explanation: "A compiler transforms high-level source code into low-level machine code or bytecode ahead of execution."
  },
  {
    question: "What is the 2's complement of the binary number 00000101 (decimal 5) in 8-bit representation?",
    option_a: "11111010",
    option_b: "11111011",
    option_c: "11111100",
    option_d: "10000101",
    correct_option: "B",
    explanation: "Invert bits of 00000101 -> 11111010, then add 1 -> 11111011 (-5 in decimal)."
  },
  {
    question: "Which component of the CPU carries out mathematical additions, subtractions, and bitwise logic operations?",
    option_a: "Control Unit (CU)",
    option_b: "Arithmetic Logic Unit (ALU)",
    option_c: "Instruction Cache",
    option_d: "Direct Memory Access Controller (DMA)",
    correct_option: "B",
    explanation: "The ALU executes all arithmetic (add, subtract) and logical (AND, OR, NOT) calculations."
  },
  {
    question: "Which HTTP request method is typically used to create or insert a new resource on a web server?",
    option_a: "GET",
    option_b: "POST",
    option_c: "DELETE",
    option_d: "HEAD",
    correct_option: "B",
    explanation: "POST is the standard idempotent/action method used to submit payload data to create a resource."
  },
  {
    question: "What does RAID stand for in computer storage systems?",
    option_a: "Redundant Array of Independent Disks",
    option_b: "Rapid Access Integrated Drive",
    option_c: "Random Allocation Internal Disk",
    option_d: "Real-time Automated Interleaved Data",
    correct_option: "A",
    explanation: "RAID combines multiple physical disk drives into a single logical unit for redundancy or performance."
  },
  {
    question: "What is the typical time complexity to access an element by index in a contiguous array of size n?",
    option_a: "O(1)",
    option_b: "O(log n)",
    option_c: "O(n)",
    option_d: "O(n^2)",
    correct_option: "A",
    explanation: "Array elements reside in contiguous memory, allowing constant time direct pointer offset calculation (O(1))."
  },
  {
    question: "De Morgan's first theorem states that (A . B)' is equal to:",
    option_a: "A' . B'",
    option_b: "A' + B'",
    option_c: "A + B",
    option_d: "(A + B)'",
    correct_option: "B",
    explanation: "The complement of a product equals the sum of the complements: NOT(A AND B) = (NOT A) OR (NOT B)."
  },
  {
    question: "Which networking hardware device connects different local area networks (LANs) together by reading IP packet headers?",
    option_a: "Hub",
    option_b: "Switch",
    option_c: "Router",
    option_d: "Repeater",
    correct_option: "C",
    explanation: "A Router operates at Layer 3 (Network layer), inspecting destination IP addresses to route packets between networks."
  },
  {
    question: "What is the key advantage of a singly linked list over a fixed-size array?",
    option_a: "Faster random indexing access",
    option_b: "Dynamic size allocation and efficient insertions/deletions at the head",
    option_c: "Lesser memory consumption per element",
    option_d: "Better CPU cache locality",
    correct_option: "B",
    explanation: "Linked lists grow dynamically at runtime without requiring upfront block reallocation or contiguous memory."
  },
  {
    question: "What is the purpose of the BIOS / UEFI firmware in a computer motherboard?",
    option_a: "Manages virtual memory paging tables",
    option_b: "Initializes hardware components during boot and loads the operating system kernel into RAM",
    option_c: "Compiles source code into assembly",
    option_d: "Controls peripheral GPU rendering pipelines",
    correct_option: "B",
    explanation: "BIOS/UEFI runs Power-On Self-Test (POST) and passes execution control to the bootloader."
  },
  {
    question: "How many bits are used in an IPv6 address?",
    option_a: "32 bits",
    option_b: "64 bits",
    option_c: "128 bits",
    option_d: "256 bits",
    correct_option: "C",
    explanation: "IPv6 uses 128-bit addresses (written in 8 groups of 4 hexadecimal digits), supporting an astronomical address pool."
  },
  {
    question: "Which database language category do commands like SELECT, INSERT, UPDATE, and DELETE belong to?",
    option_a: "DDL (Data Definition Language)",
    option_b: "DML (Data Manipulation Language)",
    option_c: "DCL (Data Control Language)",
    option_d: "TCL (Transaction Control Language)",
    correct_option: "B",
    explanation: "DML statements are used to query and modify actual data stored within table schemas."
  },
  {
    question: "What is a 'Trojan Horse' in cybersecurity?",
    option_a: "A worm that spreads via email attachments automatically",
    option_b: "Malware disguised as legitimate or harmless software to trick users into running it",
    option_c: "Hardware firewall firmware",
    option_d: "A brute-force password cracking tool",
    correct_option: "B",
    explanation: "A Trojan masquerades as an authentic useful utility while secretly executing malicious payloads."
  },
  {
    question: "In a binary search tree (BST), which traversal algorithm visits all node keys in strictly ascending order?",
    option_a: "Pre-order traversal (Root, Left, Right)",
    option_b: "In-order traversal (Left, Root, Right)",
    option_c: "Post-order traversal (Left, Right, Root)",
    option_d: "Level-order traversal",
    correct_option: "B",
    explanation: "In-order traversal visits left subtree, current node, then right subtree, producing a monotonically sorted sequence."
  },
  {
    question: "Which protocol is used to automatically assign IP addresses, subnet masks, and default gateways to client devices on a local network?",
    option_a: "DNS",
    option_b: "DHCP",
    option_c: "SMTP",
    option_d: "SNMP",
    correct_option: "B",
    explanation: "Dynamic Host Configuration Protocol (DHCP) dynamically provisions IP configuration parameters."
  },
  {
    question: "What is the smallest addressable unit of data on modern personal computer systems?",
    option_a: "Bit",
    option_b: "Byte (8 bits)",
    option_c: "Nibble (4 bits)",
    option_d: "Word (64 bits)",
    correct_option: "B",
    explanation: "Memory is organized into 1-byte (8-bit) cells, each possessing its own unique numerical address."
  },
  {
    question: "Which data structure follows the First-In, First-Out (FIFO) principle?",
    option_a: "Stack",
    option_b: "Queue",
    option_c: "Binary Heap",
    option_d: "Trie",
    correct_option: "B",
    explanation: "A Queue enqueues elements at the rear and dequeues from the front, observing FIFO ordering."
  },
  {
    question: "What is the primary role of an Operating System's Kernel?",
    option_a: "Provides the visual desktop interface",
    option_b: "Acts as the core program managing hardware, memory, processes, and system calls",
    option_c: "Scans hard drives for duplicate files",
    option_d: "Connects web browsers to remote hosts",
    correct_option: "B",
    explanation: "The kernel is the foundational core of the OS with complete control over all system resources."
  },
  {
    question: "What does the 'S' stand for in 'HTTPS'?",
    option_a: "Standard",
    option_b: "Secure",
    option_c: "Synchronous",
    option_d: "System",
    correct_option: "B",
    explanation: "HTTPS stands for Hypertext Transfer Protocol Secure, using TLS/SSL encryption."
  },
  {
    question: "Which software architecture model divides an application into presentation, business logic, and database layers?",
    option_a: "Monolithic CLI",
    option_b: "Three-tier architecture",
    option_c: "Peer-to-peer (P2P)",
    option_d: "Batch processing system",
    correct_option: "B",
    explanation: "Three-tier architecture separates client interface, application processing logic, and relational database management."
  },
  {
    question: "Which memory type resides directly inside the CPU chip, providing the fastest access times for frequently used data?",
    option_a: "L1 / L2 Cache Memory",
    option_b: "DDR5 RAM",
    option_c: "PCIe NVMe SSD",
    option_d: "BIOS Flash ROM",
    correct_option: "A",
    explanation: "On-die CPU cache (SRAM) operates at processor clock speeds, much faster than main DRAM memory."
  },
  {
    question: "What does SQL stand for?",
    option_a: "Simple Query Logic",
    option_b: "Structured Query Language",
    option_c: "Standard Queue Language",
    option_d: "System Quality Locator",
    correct_option: "B",
    explanation: "SQL stands for Structured Query Language, the standardized domain-specific language for relational databases."
  },
  {
    question: "Which logic gate is referred to as a 'Universal Gate' because any Boolean logic circuit can be built using only this gate?",
    option_a: "AND Gate",
    option_b: "NAND Gate",
    option_c: "OR Gate",
    option_d: "XOR Gate",
    correct_option: "B",
    explanation: "NAND and NOR gates are universal gates because they can simulate NOT, AND, and OR functions."
  },
  {
    question: "What is the purpose of an 'index' on a relational database column?",
    option_a: "Encrypts confidential text fields",
    option_b: "Speeds up data retrieval operations at the cost of additional storage and slower writes",
    option_c: "Enforces foreign key cascade deletes",
    option_d: "Generates automatic backup snapshots",
    correct_option: "B",
    explanation: "Indexes (often implemented as B-trees) accelerate SELECT queries by providing logarithmic search lookups."
  },
  {
    question: "In computer networks, what is MAC address?",
    option_a: "Machine Allocation Command",
    option_b: "Media Access Control address (hardware physical address)",
    option_c: "Memory Access Code",
    option_d: "Master Administrator Console",
    correct_option: "B",
    explanation: "A MAC address is a globally unique 48-bit identifier assigned to network interface controllers (NICs) at Layer 2."
  },
  {
    question: "What is the time complexity of pushing an element onto an array-based stack?",
    option_a: "O(1) amortized",
    option_b: "O(n)",
    option_c: "O(log n)",
    option_d: "O(n^2)",
    correct_option: "A",
    explanation: "Adding to the end of a dynamic array takes constant O(1) amortized time."
  },
  {
    question: "Which of the following is an example of an open-source operating system kernel?",
    option_a: "Windows NT",
    option_b: "Linux",
    option_c: "macOS Darwin kernel (fully proprietary userland)",
    option_d: "MS-DOS",
    correct_option: "B",
    explanation: "Linux, created by Linus Torvalds in 1991, is released under the GNU General Public License."
  },
  {
    question: "What is the function of a 'firewall' in computer networking?",
    option_a: "Accelerates internet download speeds through compression",
    option_b: "Monitors and filters incoming and outgoing traffic based on predetermined security rules",
    option_c: "Converts fiber optic signals to copper ethernet",
    option_d: "Distributes electrical power to server racks",
    correct_option: "B",
    explanation: "A firewall establishes a barrier between a trusted internal network and untrusted outside networks like the Internet."
  },
  {
    question: "In object-oriented programming, the ability of different classes to respond to the same method call in their own specific way is called:",
    option_a: "Encapsulation",
    option_b: "Polymorphism",
    option_c: "Inheritance",
    option_d: "Abstraction",
    correct_option: "B",
    explanation: "Polymorphism allows objects of different subtypes to be treated through a common interface while exhibiting distinct behaviors."
  },
  {
    question: "What is a 'cookie' in web browsers?",
    option_a: "A small malware program",
    option_b: "A small block of data stored on the client machine by the browser to remember state and session info",
    option_c: "A cached image thumbnail",
    option_d: "A server-side SQL database table",
    correct_option: "B",
    explanation: "HTTP cookies store small state tokens on the client to authenticate logins, maintain sessions, and store preferences."
  },
  {
    question: "What does the 404 HTTP status code signify to a web browser?",
    option_a: "Internal Server Error",
    option_b: "Unauthorized Access",
    option_c: "Not Found (requested resource does not exist on server)",
    option_d: "Bad Gateway",
    correct_option: "C",
    explanation: "404 Not Found indicates that the web server cannot locate the requested endpoint URL."
  }
];

