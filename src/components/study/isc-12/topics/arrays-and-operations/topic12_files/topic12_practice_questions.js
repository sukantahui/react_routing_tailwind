const practiceQuestions = [
    { q: "Write row-major address formula.", a: "B + (i * N + j) * S", explanation: "i=row, j=col, N=columns, S=element size." },
    { q: "Write column-major address formula.", a: "B + (j * M + i) * S", explanation: "i=row, j=col, M=rows." },
    { q: "Given int arr[4][5], B=1000, find address of arr[2][3] row-major (size=4).", a: "1052", explanation: "2*5+3=13, 13*4=52, 1000+52=1052." },
    { q: "Given double arr[3][6], B=2000, find address of arr[1][4] column-major (size=8).", a: "2104", explanation: "4*3+1=13, 13*8=104, 2000+104=2104." },
    { q: "Given char arr[10][10], B=5000, find address of arr[5][7] row-major (size=1).", a: "5057", explanation: "5*10+7=57, 5000+57=5057." },
    { q: "Given float arr[8][7], B=4000, find address of arr[3][4] column-major (size=4).", a: "4140", explanation: "4*8+3=35, 35*4=140, 4000+140=4140." },
    { q: "What is the address of arr[0][0]?", a: "B", explanation: "First element." },
    { q: "If address of arr[2][3] row-major is 1052, B=1000, S=4, find N.", a: "N=5", explanation: "(1052-1000)/4=13, 2N+3=13 => N=5." },
    { q: "If address of arr[2][3] column-major is 1056, B=1000, S=4, find M.", a: "M=4", explanation: "(1056-1000)/4=14, 3M+2=14 => M=4." },
    { q: "Given 1-based indices (3,4) in a 4x5 int array, B=1000, find address row-major.", a: "1052", explanation: "Convert to 0-based (2,3), then 2*5+3=13, 13*4=52, 1000+52=1052." },
    { q: "Given short arr[4][5], B=0x1000, S=2, find address of arr[2][3] row-major in hex.", a: "0x101A", explanation: "offset=13, 13*2=26=0x1A, 0x1000+0x1A=0x101A." },
    { q: "What is the offset for arr[3][2] in a 5x7 row-major array?", a: "3*7+2 = 23", explanation: "i=3, j=2, N=7." },
    { q: "What is the offset for same element in column-major (5 rows)?", a: "2*5+3 = 13", explanation: "j=2, M=5, i=3." },
    { q: "Given B=3000, S=4, row-major, N=6, find address of arr[4][5].", a: "3000 + (4*6+5)*4 = 3000+116=3116", explanation: "offset=24+5=29, 29*4=116." },
    { q: "Given B=6000, S=8, column-major, M=5, find address of arr[2][4].", a: "6000 + (4*5+2)*8 = 6000+176=6176", explanation: "j=4,M=5,i=2, offset=20+2=22, 22*8=176." },
    { q: "What is the address of last element in a 3x4 int array, B=1000, row-major?", a: "1000 + (3*4-1)*4 = 1000+44=1044", explanation: "total elements=12, last offset=11, 11*4=44." },
    { q: "In row-major, what is the distance between arr[i][j] and arr[i][j+1]?", a: "S bytes", explanation: "Adjacent columns." },
    { q: "In column-major, what is the distance between arr[i][j] and arr[i+1][j]?", a: "S bytes", explanation: "Adjacent rows within same column." },
    { q: "If padding makes stride=10 instead of actual N=8, B=1000, S=4, i=2,j=3, find row-major address.", a: "1000 + (2*10+3)*4 = 1000+92=1092", explanation: "Using stride=10." },
    { q: "True or false: Row-major and column-major always give different addresses for non-square matrices when i!=j.", a: "True, generally different.", explanation: "Offsets differ unless M=N and i=j." }
];

export default practiceQuestions;