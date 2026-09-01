// small_testable.c – A tiny, pure, testable function with a test harness
#include <stdio.h>
#include <assert.h>

// Small, reusable, testable: pure function, no side effects
int add(int a, int b) {
    return a + b;
}

// Simple test harness – can be expanded
void test_add() {
    assert(add(2, 3) == 5);
    assert(add(-1, 1) == 0);
    assert(add(0, 0) == 0);
    assert(add(100, 200) == 300);
    printf("All add() tests passed!\n");
}

int main() {
    test_add();

    // Example usage in main program
    int result = add(15, 27);
    printf("15 + 27 = %d\n", result);
    return 0;
}