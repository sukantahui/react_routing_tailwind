#include <stdio.h>
#include <string.h>

void print_memory(void *ptr, size_t size) {
    unsigned char *bytes = (unsigned char*)ptr;
    for (size_t i = 0; i < size; i++) {
        printf("%02x ", bytes[i]);
        if ((i+1) % 16 == 0) printf("\n");
    }
    printf("\n");
}

int main() {
    char buffer[10];
    strcpy(buffer, "Hello");
    printf("Buffer content: ");
    print_memory(buffer, sizeof(buffer));

    // Simulate a buffer overflow (for demonstration)
    // strcpy(buffer, "This is too long"); // uncomment to see overflow

    // Show that the overflow would corrupt adjacent memory
    int guard = 0xDEADBEEF;
    printf("Before overflow: guard = 0x%x\n", guard);
    // Uncomment to cause overflow:
    // strcpy(buffer, "This is way too long and will overwrite guard");
    // printf("After overflow: guard = 0x%x\n", guard);

    return 0;
}