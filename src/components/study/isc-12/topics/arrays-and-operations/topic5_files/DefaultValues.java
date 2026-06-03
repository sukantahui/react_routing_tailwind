public class DefaultValues {
    public static void main(String[] args) {
        int[][] intArr = new int[2][2];
        boolean[][] boolArr = new boolean[2][2];
        double[][] doubleArr = new double[2][2];
        String[][] strArr = new String[2][2];
        
        System.out.println("Default int value: " + intArr[0][0]);      // 0
        System.out.println("Default boolean value: " + boolArr[0][0]); // false
        System.out.println("Default double value: " + doubleArr[0][0]); // 0.0
        System.out.println("Default String value: " + strArr[0][0]);   // null
    }
}