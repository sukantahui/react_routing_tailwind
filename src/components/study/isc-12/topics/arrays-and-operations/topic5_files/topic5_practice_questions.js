const practiceQuestions = [
    { q: "Write code to declare a 2D array of ints named 'grid' with 4 rows and 5 columns.", a: "int[][] grid = new int[4][5];", explanation: "Rows = 4, columns = 5." },
    { q: "What is the default value of elements in a 2D double array created with new double[2][3]?", a: "0.0", explanation: "Primitive double defaults to 0.0." },
    { q: "Write an array initializer for a 2x3 matrix with first row 1,2,3 and second row 4,5,6.", a: "int[][] matrix = {{1,2,3},{4,5,6}};", explanation: "Nested braces for rows." },
    { q: "What happens if you access arr[2][0] after int[][] arr = new int[2][3];?", a: "ArrayIndexOutOfBoundsException", explanation: "Valid row indices are 0 and 1; row 2 is out of bounds." },
    { q: "How do you declare a jagged array with 3 rows but no column sizes specified?", a: "int[][] jagged = new int[3][];", explanation: "Only outer array size, rows unallocated." },
    { q: "Write code to allocate the rows of a jagged array: first row length 2, second length 3, third length 1.", a: "jagged[0] = new int[2]; jagged[1] = new int[3]; jagged[2] = new int[1];", explanation: "Each row allocated separately." },
    { q: "What is the output of arr.length for int[][] arr = new int[5][10];?", a: "5", explanation: "arr.length gives number of rows." },
    { q: "What is the output of arr[0].length for int[][] arr = new int[5][10];?", a: "10", explanation: "Number of columns from first row." },
    { q: "What exception occurs if you use an uninitialized 2D array variable?", a: "NullPointerException", explanation: "The variable is null until initialized." },
    { q: "Write code to create a 2x2 identity matrix using array initializer.", a: "int[][] identity = {{1,0},{0,1}};", explanation: "1 on diagonal, 0 elsewhere." },
    { q: "How do you fill a 2D array 'data' with the value 99 using Arrays.fill()?", a: "for (int[] row : data) Arrays.fill(row, 99);", explanation: "Loop over rows and fill each." },
    { q: "Can you declare a 2D array as int[] arr[]? Is it valid?", a: "Yes, it's valid but not recommended.", explanation: "It's a mixed style; works but less readable." },
    { q: "What is the default value of a String element in a 2D array created with new String[2][2]?", a: "null", explanation: "Reference types default to null." },
    { q: "Write code to declare a 2D array 'scores' with 3 rows and 4 columns, all initialized to 0.", a: "int[][] scores = new int[3][4];", explanation: "Default values are zero." },
    { q: "What is the difference between int[][] a = new int[2][]; and int[][] b = new int[2][3];?", a: "a is jagged (rows not allocated), b is rectangular.", explanation: "a requires row allocation, b is fully allocated." },
    { q: "Write code to create a 2D array with rows of lengths 1,2,3 using an initializer.", a: "int[][] arr = {{1},{2,3},{4,5,6}};", explanation: "Different inner array sizes." },
    { q: "What is the value of arr[1][1] after int[][] arr = new int[3][3]; arr[0][0] = 5;?", a: "0", explanation: "Only arr[0][0] was set; others default to 0." },
    { q: "How do you find the total number of elements in a 2D array 'matrix' that is rectangular?", a: "matrix.length * matrix[0].length", explanation: "Rows times columns." },
    { q: "Write a statement to declare and initialize a 2D array with 2 rows and 2 columns using new and then assign values 10,20 in first row and 30,40 in second row in two steps.", a: "int[][] arr = new int[2][2]; arr[0][0]=10; arr[0][1]=20; arr[1][0]=30; arr[1][1]=40;", explanation: "Allocate first, then assign." },
    { q: "What is the correct syntax to declare a 2D array of characters named 'board' with 8 rows and 8 columns?", a: "char[][] board = new char[8][8];", explanation: "char type, 8x8." }
];

export default practiceQuestions;