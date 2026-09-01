#include <stdio.h>
int main() {
    int arr[] = {2, 3, 2, 4};
    int freq[10] = {0};
    for (int i = 0; i < 4; i++) 
        freq[arr[i]]++;
    for (int i = 0; i < 10; i++)
        if (freq[i] > 0) printf("%d appears %d time(s)\n", i, freq[i]);
    return 0;
}
