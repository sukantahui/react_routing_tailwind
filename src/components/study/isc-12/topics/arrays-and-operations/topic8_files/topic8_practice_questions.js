const practiceQuestions = [
    { q: "Write the row-major address formula.", a: "Base + (i * N + j) * Size", explanation: "i=row, j=col, N=columns, Size=element bytes." },
    { q: "Write the column-major address formula.", a: "Base + (j * M + i) * Size", explanation: "i=row, j=col, M=rows." },
    { q: "Given int arr[3][4], base=1000, find address of arr[1][2] row-major (int size=4).", a: "1000 + (1*4+2)*4 = 1024", explanation: "offset 6 elements, 6*4=24, 1000+24=1024." },
    { q: "Given double arr[5][2], base=2000, find address of arr[3][1] column-major (double size=8).", a: "2000 + (1*5+3)*8 = 2000 + 8*8 = 2064", explanation: "j=1,i=3,M=5, offset = 1*5+3=8, 8*8=64." },
    { q: "What is the offset for element at row 2, col 3 in a 6x7 row-major array?", a: "2*7+3 = 17", explanation: "i=2,j=3,N=7." },
    { q: "What is the offset for same element (2,3) in column-major (6 rows,7 cols)?", a: "3*6+2 = 20", explanation: "j=3,i=2,M=6." },
    { q: "If base=5000, size=2, row-major, find address of arr[0][4] in a 4x5 array.", a: "5000 + (0*5+4)*2 = 5008", explanation: "offset 4 elements, 4*2=8." },
    { q: "If base=3000, size=8, column-major, find address of arr[4][2] in a 5x6 array.", a: "3000 + (2*5+4)*8 = 3000 + 14*8 = 3112", explanation: "j=2,i=4,M=5, offset=2*5+4=14." },
    { q: "Which order does C use?", a: "Row-major", explanation: "C stores arrays in row-major order." },
    { q: "Which order does Fortran use?", a: "Column-major", explanation: "Fortran uses column-major order." },
    { q: "Why is row-major traversal faster in C?", a: "Because of spatial locality and cache efficiency.", explanation: "Elements in a row are contiguous in memory." },
    { q: "Calculate address of arr[2][1] in a 3x3 int array (size=4, base=1000) row-major.", a: "1000 + (2*3+1)*4 = 1000+28=1028", explanation: "offset 2*3+1=7, 7*4=28." },
    { q: "Same but column-major.", a: "1000 + (1*3+2)*4 = 1000+20=1020", explanation: "j=1,i=2,M=3, offset=1*3+2=5, 5*4=20." },
    { q: "What is the element size for char in C typically?", a: "1 byte", explanation: "char is 1 byte." },
    { q: "What is the element size for double in Java?", a: "8 bytes", explanation: "double is 64-bit." },
    { q: "Given base=4000, size=4, row-major, 5 rows, 6 cols, find address of arr[4][5].", a: "4000 + (4*6+5)*4 = 4000 + 29*4 = 4116", explanation: "i=4,j=5,N=6, offset=4*6+5=29." },
    { q: "Given base=6000, size=8, column-major, 4 rows, 7 cols, find address of arr[2][6].", a: "6000 + (6*4+2)*8 = 6000 + 26*8 = 6208", explanation: "j=6,i=2,M=4, offset=6*4+2=26." },
    { q: "What is the memory address of arr[0][0] in any order?", a: "Base address", explanation: "First element always at base." },
    { q: "If row-major address of arr[2][3] is 1052 and base=1000, size=4, find number of columns.", a: "N = ( (address - base)/size - i*N? Actually solve: 1052=1000+(2*N+3)*4 => 52=(2N+3)*4 => 13=2N+3 => 2N=10 => N=5", explanation: "Columns = 5." },
    { q: "True or false: Row-major and column-major produce same address for square matrices when i=j.", a: "True", explanation: "Because i*N+j = j*M+i when M=N and i=j." }
];

export default practiceQuestions;