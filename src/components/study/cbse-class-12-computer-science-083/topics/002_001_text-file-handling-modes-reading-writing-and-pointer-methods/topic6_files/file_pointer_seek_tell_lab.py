"""
CBSE Class XII Computer Science (Code 083)
Topic 6: File Pointer Manipulation Laboratory - tell() and seek()
Author: Sukanta Hui, Coder & AccoTax, Barrackpore
"""

def demo_pointer_operations():
    filename = "pointer_demo.txt"
    
    # 1. Setup sample text
    with open(filename, "w", encoding="utf-8") as f:
        f.write("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ")

    print("=" * 65)
    print("DEMONSTRATING tell() AND seek() IN TEXT MODE")
    print("=" * 65)
    
    with open(filename, "r+", encoding="utf-8") as f:
        print(f"[*] Initial pointer location (tell): {f.tell()}") # 0
        
        # Read first 10 characters
        part1 = f.read(10)
        print(f"[+] Read 10 chars: '{part1}'")
        print(f"[*] Pointer location after reading 10 chars: {f.tell()}") # 10
        
        # Reposition to byte 20 from start
        f.seek(20)
        print(f"[*] After f.seek(20), pointer is at: {f.tell()}") # 20
        part2 = f.read(5)
        print(f"[+] Read 5 chars from byte 20: '{part2}'") # 'KLMNO'
        
        # Rewind to start
        f.seek(0)
        print(f"[*] Rewound to beginning: {f.tell()}") # 0
        
        # Move to end of file to calculate total file size
        f.seek(0, 2)
        total_size = f.tell()
        print(f"[+] Total file size via seek(0, 2) + tell(): {total_size} bytes")

if __name__ == "__main__":
    demo_pointer_operations()
