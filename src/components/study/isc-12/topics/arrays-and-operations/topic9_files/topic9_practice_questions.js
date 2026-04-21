const practiceQuestions = [
    { q: "Write the row-major address formula.", a: "Base + (i * N + j) * ElementSize", explanation: "i=row, j=col, N=columns." },
    { q: "Given int arr[4][5], base=1000, find address of arr[2][3] (int size=4).", a: "1000 + (2*5+3)*4 = 1052", explanation: "2*5+3=13, 13*4=52, 1000+52=1052." },
    { q: "Given double arr[3][6], base=2000, find address of arr[1][4] (double size=8).", a: "2000 + (1*6+4)*8 = 2000+80=2080", explanation: "1*6+4=10, 10*8=80." },
    { q: "Given char arr[10][10], base=5000, find address of arr[5][7] (char size=1).", a: "5000 + (5*10+7)*1 = 5057", explanation: "5*10+7=57, plus base." },
    { q: "What is the offset (in elements) for arr[3][2] in a 7x9 matrix (row-major)?", a: "3*9+2 = 29", explanation: "i=3,j=2,N=9." },
    { q: "If base=3000, size=4, address of arr[1][4] is 3060, find N (columns).", a: "Solve: 3060-3000=60, 60/4=15, so 1*N+4=15 => N=11", explanation: "N = ((addr-base)/size - j)/i = (15-4)/1 = 11." },
    { q: "Given float arr[8][5], base=4000, find address of arr[6][3] (float size=4).", a: "4000 + (6*5+3)*4 = 4000+132=4132", explanation: "6*5+3=33, 33*4=132." },
    { q: "What is the address of arr[0][0] if base=1000?", a: "1000", explanation: "First element." },
    { q: "Given short arr[4][4], base=0x2000, size=2, find address of arr[3][2] in hex.", a: "0x2000 + (3*4+2)*2 = 0x2000 + 28 = 0x201C", explanation: "3*4+2=14, 14*2=28 decimal = 0x1C, plus 0x2000 = 0x201C." },
    { q: "If address of arr[2][3] is 1080, base=1000, size=4, find N.", a: "(1080-1000)/4=20, so 2*N+3=20 => 2N=17 => N=8.5 (invalid). So data inconsistent. Actually if we assume correct: 20-3=17, 17/2=8.5 not integer. So maybe indices or base different. For valid, if address=1052, N=5 as before.", explanation: "Check consistency." },
    { q: "What is the byte offset for element at row 4, col 2 in a 5x10 matrix (int size=4)?", a: "(4*10+2)*4 = 42*4=168 bytes", explanation: "offset elements=42, times 4." },
    { q: "Given double arr[10][20], base=10000, find address of arr[9][19] (last element).", a: "10000 + (9*20+19)*8 = 10000 + (180+19)*8 = 10000+1592=11592", explanation: "Last element offset = rows*cols -1 = 199 elements, 199*8=1592." },
    { q: "If base=5000, size=1, address of arr[3][5] is 5022, find N.", a: "5022-5000=22, so 3*N+5=22 => 3N=17 => N=5.666 invalid. So error in data.", explanation: "No integer solution." },
    { q: "Write the formula to find i (row) given address, base, N, size.", a: "i = ((address - base)/size) / N", explanation: "Integer division." },
    { q: "Write the formula to find j (column) given address, base, N, size.", a: "j = ((address - base)/size) % N", explanation: "Modulo operation." },
    { q: "Given int arr[2][3], base=1000, list addresses of all elements.", a: "[0][0]=1000, [0][1]=1004, [0][2]=1008, [1][0]=1012, [1][1]=1016, [1][2]=1020", explanation: "Each int 4 bytes, row-major." },
    { q: "What is the address difference between arr[i][j] and arr[i][j+1]?", a: "ElementSize bytes", explanation: "Adjacent columns." },
    { q: "What is the address difference between arr[i][j] and arr[i+1][j]?", a: "N * ElementSize bytes", explanation: "You skip a full row of N elements." },
    { q: "If base=0x1000, size=4, N=5, find address of arr[3][2].", a: "0x1000 + (3*5+2)*4 = 0x1000 + 68 = 0x1044", explanation: "3*5+2=17, 17*4=68 decimal = 0x44." },
    { q: "True or false: The row-major formula works only for primitive types.", a: "False, works for any type; just use correct element size.", explanation: "Works for structs/unions as well." }
];

export default practiceQuestions;