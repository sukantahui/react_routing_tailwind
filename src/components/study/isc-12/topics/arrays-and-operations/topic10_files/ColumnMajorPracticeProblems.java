public class ColumnMajorPracticeProblems {
    public static void main(String[] args) {
        // Problem 1: int arr[8][7], base=3000, find arr[3][5] column-major
        int addr1 = 3000 + (5 * 8 + 3) * 4; // j=5, M=8, i=3
        System.out.println("1. Address: " + addr1); // 3000 + (40+3)*4 = 3000+172=3172
        
        // Problem 2: double mat[12][10], base=4000, mat[7][2] column-major
        int addr2 = 4000 + (2 * 12 + 7) * 8; // j=2, M=12, i=7
        System.out.println("2. Address: " + addr2); // 4000 + (24+7)*8 = 4000+248=4248
        
        // Problem 3: char screen[25][80], base=0xB8000, screen[10][40] column-major
        int addr3 = 0xB8000 + (40 * 25 + 10) * 1; // j=40, M=25, i=10
        System.out.println("3. Address (hex): " + Integer.toHexString(addr3)); // B8000 + (1000+10)=B8000+1010=B8810
        
        // Problem 4: float data[15][9], base=10000, data[14][8] column-major
        int addr4 = 10000 + (8 * 15 + 14) * 4; // j=8, M=15, i=14
        System.out.println("4. Address: " + addr4); // 10000 + (120+14)*4 = 10000+536=10536
        
        // Problem 5: Given address=1080, base=1000, M=5, size=4, find i,j
        // Solve: 1080-1000=80, 80/4=20, so j*5+i=20. Possible (j=4,i=0) because 4*5+0=20.
        System.out.println("5. i=0, j=4 (since 4*5+0=20, 20*4=80)");
    }
}