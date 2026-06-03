const practiceQuestions = [
    { q: "Write the column-major address formula.", a: "Base + (j * M + i) * ElementSize", explanation: "i=row, j=col, M=rows." },
    { q: "Given int arr[4][5], base=1000, find address of arr[2][3] in column-major (int size=4).", a: "1000 + (3*4+2)*4 = 1056", explanation: "j=3,M=4,i=2, offset=12+2=14, 14*4=56." },
    { q: "Given double arr[3][6], base=2000, find address of arr[1][4] column-major (size=8).", a: "2000 + (4*3+1)*8 = 2104", explanation: "j=4,M=3,i=1, offset=12+1=13, 13*8=104." },
    { q: "Given char arr[10][10], base=5000, find address of arr[5][7] column-major (size=1).", a: "5000 + (7*10+5)*1 = 5075", explanation: "j=7,M=10,i=5, offset=70+5=75." },
    { q: "What is the offset for arr[3][2] in a 7x9 matrix (column-major)?", a: "2*7+3 = 17", explanation: "j=2, M=7, i=3." },
    { q: "If base=3000, size=4, address of arr[1][4] is 3060 in column-major, find M (rows).", a: "Solve: (3060-3000)/4=15, so 4*M+1=15 => 4M=14 => M=3.5 invalid. So data inconsistent. For valid: if address=3020, then 20/4=5, 4M+1=5 => M=1.", explanation: "Use formula backwards." },
    { q: "Given float arr[8][5], base=4000, find address of arr[6][3] column-major (size=4).", a: "4000 + (3*8+6)*4 = 4000+120=4120", explanation: "j=3,M=8,i=6, offset=24+6=30, 30*4=120." },
    { q: "What is the address of arr[0][0] in column-major?", a: "Base address", explanation: "First element." },
    { q: "Given short arr[4][4], base=0x2000, size=2, find address of arr[3][2] in column-major hex.", a: "0x2000 + (2*4+3)*2 = 0x2000 + 22 = 0x2016", explanation: "j=2,M=4,i=3, offset=8+3=11, 11*2=22 decimal=0x16." },
    { q: "If address of arr[2][3] is 1080, base=1000, size=4, M=5, find i,j?", a: "Solve: (1080-1000)/4=20, so j*5+2=20 => 5j=18 => j=3.6 no integer. If we assume i=2,j=3 gives 3*5+2=17, 17*4=68, address=1068. So not matching. So data inconsistent.", explanation: "Check consistency." },
    { q: "What is the byte offset for element at row 4, col 2 in a 5x10 matrix column-major (int size=4)?", a: "(2*5+4)*4 = (10+4)*4=14*4=56 bytes", explanation: "j=2,M=5,i=4." },
    { q: "Given double arr[10][20], base=10000, find address of arr[9][19] (last element) column-major.", a: "10000 + (19*10+9)*8 = 10000 + (190+9)*8 = 10000+1592=11592", explanation: "j=19,M=10,i=9, offset=190+9=199, 199*8=1592." },
    { q: "If base=5000, size=1, address of arr[3][5] is 5022, find M (rows).", a: "5022-5000=22, so 5*M+3=22 => 5M=19 => M=3.8 invalid.", explanation: "No integer solution." },
    { q: "Write formula to find j (column) given address, base, M, size.", a: "j = ((address - base)/size) / M", explanation: "Integer division." },
    { q: "Write formula to find i (row) given address, base, M, size.", a: "i = ((address - base)/size) % M", explanation: "Modulo M." },
    { q: "Given int arr[2][3], base=1000, list addresses in column-major.", a: "[0][0]=1000, [1][0]=1004, [0][1]=1008, [1][1]=1012, [0][2]=1016, [1][2]=1020", explanation: "Column by column." },
    { q: "What is the address difference between arr[i][j] and arr[i][j+1] in column-major?", a: "M * ElementSize bytes", explanation: "Skip a full column." },
    { q: "What is the address difference between arr[i][j] and arr[i+1][j] in column-major?", a: "ElementSize bytes", explanation: "Adjacent rows within same column." },
    { q: "If base=0x1000, size=4, M=5, find address of arr[2][3] in column-major.", a: "0x1000 + (3*5+2)*4 = 0x1000 + 68 = 0x1044", explanation: "j=3,M=5,i=2, offset=15+2=17, 17*4=68=0x44." },
    { q: "True or false: Column-major formula works only for numeric types.", a: "False, works for any type.", explanation: "Any type with defined size." }
];

export default practiceQuestions;