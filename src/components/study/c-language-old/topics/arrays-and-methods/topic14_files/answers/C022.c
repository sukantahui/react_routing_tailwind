#include <stdio.h>
int main() {
    int arr[] = {1, 2, 3, 2, 1};
    int n = 5, palindrome = 1;
    for (int i = 0; i < n/2; i++)
        if (arr[i] != arr[n-1-i]) { palindrome = 0; break; }
    printf(palindrome ? "Palindrome" : "Not Palindrome");
    return 0;
}
