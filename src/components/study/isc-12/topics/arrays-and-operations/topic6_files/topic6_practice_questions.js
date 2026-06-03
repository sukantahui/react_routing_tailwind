const practiceQuestions = [
    { q: "Write code to create a Scanner object for reading from System.in.", a: "Scanner sc = new Scanner(System.in);", explanation: "Scanner is in java.util package." },
    { q: "How do you read an integer from user using Scanner?", a: "int num = sc.nextInt();", explanation: "nextInt() parses the next integer token." },
    { q: "What method prints a 2D array in a readable format for debugging?", a: "Arrays.deepToString(matrix)", explanation: "Returns string with nested brackets." },
    { q: "Write a loop to print a 3x3 matrix row by row with spaces.", a: "for (int i=0; i<3; i++) { for (int j=0; j<3; j++) System.out.print(matrix[i][j] + \" \"); System.out.println(); }", explanation: "Nested loops: outer rows, inner columns." },
    { q: "What happens if you use nextLine() after nextInt() without consuming newline?", a: "nextLine() reads empty string.", explanation: "nextInt() leaves newline; call sc.nextLine() to consume it." },
    { q: "Write code to read a 2x2 matrix from user using Scanner.", a: "int[][] mat = new int[2][2]; for (int i=0; i<2; i++) for (int j=0; j<2; j++) mat[i][j] = sc.nextInt();", explanation: "Assumes dimensions known." },
    { q: "How do you close a Scanner to avoid resource leak?", a: "sc.close();", explanation: "Close when no longer needed." },
    { q: "What is the output of System.out.println(matrix) for a 2D int array?", a: "Something like [[I@15db9742", explanation: "Object reference, not content." },
    { q: "Write code to read matrix dimensions then allocate array.", a: "int rows = sc.nextInt(); int cols = sc.nextInt(); int[][] mat = new int[rows][cols];", explanation: "Dimensions must be positive." },
    { q: "How do you print matrix with column alignment using printf?", a: "System.out.printf(\"%4d\", mat[i][j]);", explanation: "%4d reserves 4 spaces." },
    { q: "What is the advantage of BufferedReader over Scanner for large input?", a: "Faster due to buffering and fewer method calls.", explanation: "Useful in competitive programming." },
    { q: "Write code to read a line of space-separated integers using Scanner.", a: "String line = sc.nextLine(); String[] tokens = line.split(\" \");", explanation: "Then parse each token to int." },
    { q: "What exception is thrown if input is not an integer when calling nextInt()?", a: "InputMismatchException", explanation: "Scanner throws this." },
    { q: "How do you read a matrix from a file named 'data.txt'?", a: "Scanner sc = new Scanner(new File(\"data.txt\"));", explanation: "FileNotFoundException may be thrown." },
    { q: "Write code to output a matrix row by row with row index prefixed.", a: "for (int i=0; i<rows; i++) { System.out.print(\"Row \" + i + \": \"); for (int j=0; j<cols; j++) System.out.print(mat[i][j] + \" \"); System.out.println(); }", explanation: "Adds row label." },
    { q: "What is the purpose of System.out.flush()?", a: "Forces any buffered output to be written.", explanation: "Ensures data is displayed immediately." },
    { q: "How do you read a matrix where each row is given as space-separated values on one line?", a: "for (int i=0; i<rows; i++) { String[] tokens = sc.nextLine().split(\" \"); for (int j=0; j<cols; j++) mat[i][j] = Integer.parseInt(tokens[j]); }", explanation: "Read line, split, parse." },
    { q: "What is the output of Arrays.deepToString(new int[][]{{1,2},{3,4}})?", a: "[[1, 2], [3, 4]]", explanation: "deepToString gives nested array representation." },
    { q: "Write code to read a matrix of doubles using Scanner.", a: "double[][] mat = new double[rows][cols]; for (int i=0; i<rows; i++) for (int j=0; j<cols; j++) mat[i][j] = sc.nextDouble();", explanation: "Use nextDouble() instead of nextInt()." },
    { q: "How do you handle InputMismatchException when reading matrix?", a: "Use try-catch block around input reading.", explanation: "Catch exception and ask user to re-enter." }
];

export default practiceQuestions;