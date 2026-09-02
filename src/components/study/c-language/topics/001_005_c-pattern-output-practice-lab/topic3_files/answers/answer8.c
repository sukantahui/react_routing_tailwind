#include <stdio.h>
#include <stdint.h>

#define ONE_KB 1024ULL
#define ONE_MB (1024ULL * ONE_KB)
#define ONE_GB (1024ULL * ONE_MB)
#define ONE_TB (1024ULL * ONE_GB)

void formatByteSize(uint64_t bytes) {
    printf("Raw Bytes: %llu Bytes\n", (unsigned long long)bytes);
    printf("  • Kilobytes (KB) : %12.4f KB\n", (double)bytes / ONE_KB);
    printf("  • Megabytes (MB) : %12.4f MB\n", (double)bytes / ONE_MB);
    printf("  • Gigabytes (GB) : %12.4f GB\n", (double)bytes / ONE_GB);
    printf("  • Terabytes (TB) : %12.6f TB\n", (double)bytes / ONE_TB);
}

int main(void) {
    printf("=========================================================\n");
    printf("    SYSTEM UNIT CONVERTER & STORAGE BYTE CALCULATOR      \n");
    printf("=========================================================\n\n");

    uint64_t ramSize = 16ULL * ONE_GB;
    printf("--- [1] 16 GB SYSTEM RAM CAPACITY ---\n");
    formatByteSize(ramSize);

    uint64_t ssdSize = 512ULL * ONE_GB;
    printf("\n--- [2] 512 GB NVMe SSD DISK CAPACITY ---\n");
    formatByteSize(ssdSize);

    return 0;
}
