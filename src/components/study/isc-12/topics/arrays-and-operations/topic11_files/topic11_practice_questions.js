const practiceQuestions = [
    { q: "What is the base address?", a: "The memory address of the first element of the array.", explanation: "Starting point for address calculations." },
    { q: "What is element size?", a: "Number of bytes occupied by one array element.", explanation: "Depends on data type." },
    { q: "Given base=1000, int size=4, find address of element at offset 3.", a: "1000 + 3*4 = 1012", explanation: "3 elements * 4 bytes = 12." },
    { q: "Given base=2000, double size=8, find address of element at offset 5.", a: "2000 + 5*8 = 2040", explanation: "5*8=40." },
    { q: "If address of arr[4] is 1024 and base=1000, find element size.", a: "(1024-1000)/4 = 24/4 = 6 bytes (unusual, but possible).", explanation: "Offset 4 elements covers 24 bytes." },
    { q: "What is the size of int in Java?", a: "4 bytes", explanation: "Fixed by Java specification." },
    { q: "What is the size of double in C?", a: "Typically 8 bytes", explanation: "IEEE 754 double precision." },
    { q: "Given base=0x2000, size=2, find address of element at offset 10 in hex.", a: "0x2000 + 10*2 = 0x2000 + 20 = 0x2014", explanation: "20 decimal = 0x14." },
    { q: "If address of arr[3] is 1020 and size=4, find base.", a: "1020 - 3*4 = 1020-12=1008", explanation: "Reverse formula." },
    { q: "What is the address of arr[0] in terms of base?", a: "Base itself", explanation: "First element offset 0." },
    { q: "Can base address be 0? Why?", a: "Usually not, 0 is reserved for null pointer.", explanation: "Null pointer exception if dereferenced." },
    { q: "How do you get base address of a static array in C?", a: "Use the array name: arr", explanation: "Array name decays to pointer to first element." },
    { q: "Given base=5000, char size=1, find address of arr[100].", a: "5000 + 100*1 = 5100", explanation: "char array, each 1 byte." },
    { q: "If base=3000, float size=4, find address of arr[2].", a: "3000 + 2*4 = 3008", explanation: "2*4=8." },
    { q: "What is the formula to find element offset from address?", a: "offset = (address - base) / size", explanation: "Requires integer division." },
    { q: "Why is element size important for pointer arithmetic?", a: "Ensures pointer increments move to next element, not next byte.", explanation: "Automatic scaling." },
    { q: "Given base=1000, size=8, find address of element at offset 7.", a: "1000 + 7*8 = 1056", explanation: "7*8=56." },
    { q: "If address of arr[6] is 1048 and base=1000, find size.", a: "(1048-1000)/6 = 48/6 = 8 bytes", explanation: "6 elements cover 48 bytes." },
    { q: "What is the typical size of a pointer on 32-bit system?", a: "4 bytes", explanation: "32-bit addresses." },
    { q: "True or false: Element size is always the same for all elements in an array.", a: "True", explanation: "Arrays are homogeneous." }
];

export default practiceQuestions;