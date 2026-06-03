public class RowMajorPracticeProblems {
    public static void main(String[] args) {
        // Problem 1: int arr[8][7], base=3000, find arr[3][5]
        int addr1 = 3000 + (3*7 + 5) * 4;
        System.out.println("1. Address: " + addr1); // 3000 + (21+5)*4 = 3104
        
        // Problem 2: double mat[12][10], base=4000, mat[7][2]
        int addr2 = 4000 + (7*10 + 2) * 8;
        System.out.println("2. Address: " + addr2); // 4000 + (70+2)*8 = 4576
        
        // Problem 3: char screen[25][80], base=0xB8000, screen[10][40]
        int addr3 = 0xB8000 + (10*80 + 40) * 1;
        System.out.println("3. Address (hex): " + Integer.toHexString(addr3)); // B8000 + 840 = B8840
        
        // Problem 4: float data[15][9], base=10000, data[14][8]
        int addr4 = 10000 + (14*9 + 8) * 4;
        System.out.println("4. Address: " + addr4); // 10000 + (126+8)*4 = 10536
        
        // Problem 5: Given address=1056, base=1000, N=5, size=4, find i,j
        // Solve: 1056 = 1000 + (i*5+j)*4 => 56 = (5i+j)*4 => 14 = 5i+j
        // Possible (i=2,j=4) because 5*2+4=14
        System.out.println("5. i=2, j=4 (since 5*2+4=14, offset=14, 14*4=56)");
    }
}