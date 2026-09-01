#include <stdio.h>
#include <stdlib.h>

// Function that returns a pointer to int
int* makeInt(int value) {
    int* p = (int*)malloc(sizeof(int));
    *p = value;
    return p;
}

// Function pointer to function returning int*
int* (*funcPtrToReturnPtr)(int) = makeInt;

// Function that returns a function pointer
int add(int a, int b) { return a + b; }
int sub(int a, int b) { return a - b; }

int (*getOperation(char op))(int, int) {
    if (op == '+') return add;
    if (op == '-') return sub;
    return NULL;
}

// Function that takes a function pointer as parameter and returns a pointer to array
typedef int (*IntFunc)(int);
int* mapArray(int arr[], int n, IntFunc f) {
    int* result = (int*)malloc(n * sizeof(int));
    for (int i = 0; i < n; i++)
        result[i] = f(arr[i]);
    return result;
}

int doubleIt(int x) { return x * 2; }

int main() {
    // Using function pointer to function returning pointer
    int* p = funcPtrToReturnPtr(42);
    printf("*p = %d\n", *p);
    free(p);
    
    // Using function returning function pointer
    int (*op)(int, int) = getOperation('+');
    if (op) printf("5+3 = %d\n", op(5, 3));
    
    op = getOperation('-');
    if (op) printf("5-3 = %d\n", op(5, 3));
    
    // Using map pattern
    int arr[] = {1, 2, 3, 4};
    int* doubled = mapArray(arr, 4, doubleIt);
    for (int i = 0; i < 4; i++) printf("%d ", doubled[i]);
    printf("\n");
    free(doubled);
    
    return 0;
}