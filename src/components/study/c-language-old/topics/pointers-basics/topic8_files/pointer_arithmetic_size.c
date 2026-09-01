#include <stdio.h>

int main() {
    int int_arr[] = {10, 20, 30};
    char char_arr[] = {'A', 'B', 'C'};
    double double_arr[] = {1.1, 2.2, 3.3};

    int *ip = int_arr;
    char *cp = char_arr;
    double *dp = double_arr;

    printf("sizeof(int) = %zu\n", sizeof(int));
    printf("ip = %p, ip+1 = %p, difference = %ld bytes\n",
           (void*)ip, (void*)(ip+1), (char*)(ip+1) - (char*)ip);

    printf("\nsizeof(char) = %zu\n", sizeof(char));
    printf("cp = %p, cp+1 = %p, difference = %ld bytes\n",
           (void*)cp, (void*)(cp+1), (char*)(cp+1) - (char*)cp);

    printf("\nsizeof(double) = %zu\n", sizeof(double));
    printf("dp = %p, dp+1 = %p, difference = %ld bytes\n",
           (void*)dp, (void*)(dp+1), (char*)(dp+1) - (char*)dp);

    return 0;
}