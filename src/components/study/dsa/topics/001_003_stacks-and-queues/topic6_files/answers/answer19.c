#include <stdio.h>

void sort_stack(int s[], int *top) {
    int tmp_stack[100]; int tmp_top = -1;
    while (*top != -1) {
        int temp = s[(*top)--];
        while (tmp_top != -1 && tmp_stack[tmp_top] > temp) {
            s[++(*top)] = tmp_stack[tmp_top--];
        }
        tmp_stack[++tmp_top] = temp;
    }
    while (tmp_top != -1) s[++(*top)] = tmp_stack[tmp_top--];
}

int main() {
    int s[] = {34, 3, 31, 98, 92, 23};
    int top = 5;
    printf("--- Sort Stack using Auxiliary Stack ---\n");
    sort_stack(s, &top);
    printf("Sorted Stack (Top to Bottom): ");
    while (top != -1) printf("%d ", s[top--]);
    printf("\n");
    return 0;
}
