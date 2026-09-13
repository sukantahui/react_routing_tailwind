/**
 * StreamBufferingDemo.c
 * Demonstrates Standard I/O Streams (stdin, stdout, stderr),
 * Stream Buffering Modes (_IOFBF, _IOLBF, _IONBF), and fflush().
 *
 * Educator: Sukanta Hui (Coder & AccoTax)
 */

#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

int main(void) {
    printf("========================================================\n");
    printf("   CODER & ACCOTAX - STANDARD STREAMS & BUFFERING LAB   \n");
    printf("========================================================\n\n");

    // 1. Standard Streams Overview
    printf("--- 1. STANDARD STREAM IDENTIFIERS ---\n");
    printf("  Standard Input  (stdin)  : File Descriptor %d\n", fileno(stdin));
    printf("  Standard Output (stdout) : File Descriptor %d\n", fileno(stdout));
    printf("  Standard Error  (stderr) : File Descriptor %d (Always Unbuffered)\n\n", fileno(stderr));

    // 2. Demonstrating stderr vs stdout behavior
    // stderr is unbuffered: printed immediately even without a newline!
    fprintf(stderr, "  [stderr Immediate Notice] This message bypasses stdout buffer.\n");
    
    // 3. Demonstrating stdout buffering and fflush()
    printf("--- 2. STREAM FLUSHING WITH fflush() ---\n");
    printf("  Simulating task progress: ");
    
    // Without a newline '\n', stdout waits in the buffer unless flushed explicitly
    for (int i = 1; i <= 3; i++) {
        printf(". ");
        fflush(stdout); // Force immediate flush to terminal screen!
    }
    printf(" [DONE]\n\n");

    // 4. Changing Buffering Mode using setvbuf()
    printf("--- 3. CUSTOM BUFFERING CONFIGURATION WITH setvbuf() ---\n");
    char custom_buffer[1024];
    
    // Configure stdout to use our custom full buffer
    if (setvbuf(stdout, custom_buffer, _IOFBF, sizeof(custom_buffer)) == 0) {
        printf("  stdout switched to Full Buffering (_IOFBF) with 1024-byte custom buffer.\n");
        // Explicitly flush before exit so all buffered text appears
        fflush(stdout);
    }

    // Reset back to line buffered for clean exit
    setvbuf(stdout, NULL, _IOLBF, 0);

    printf("\n  Stream demonstration completed successfully.\n");
    printf("========================================================\n");

    return 0;
}
