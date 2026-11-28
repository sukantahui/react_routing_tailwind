"""
CBSE Class XII Computer Science (Code 083)
Topic 2: Opening, Inspecting Attributes, and Closing File Handles
Author: Sukanta Hui, Coder & AccoTax, Barrackpore
"""

def demonstrate_file_lifecycle():
    filename = "barrackpore_students.txt"
    
    print("=" * 60)
    print("STEP 1: OPENING FILE AND EXAMINING STREAM ATTRIBUTES")
    print("=" * 60)
    
    f = open(filename, "w", encoding="utf-8")
    
    # Inspecting built-in file object attributes
    print(f"[*] File name (f.name)      : {f.name}")
    print(f"[*] Access mode (f.mode)    : {f.mode}")
    print(f"[*] Is closed? (f.closed)   : {f.closed}")
    print(f"[*] Is readable?            : {f.readable()}")
    print(f"[*] Is writable?            : {f.writable()}")
    print(f"[*] Is seekable?            : {f.seekable()}")
    
    print("\n" + "=" * 60)
    print("STEP 2: WRITING CONTENT & EXPLICIT FLUSHING")
    print("=" * 60)
    
    f.write("Mamata | Class 12 CS | Roll 1\n")
    f.write("Susmita | Class 12 CS | Roll 2\n")
    print("[*] Two lines written to memory buffer.")
    
    f.flush()
    print("[+] f.flush() invoked: dirty buffers synchronized to disk.")
    
    print("\n" + "=" * 60)
    print("STEP 3: CLOSING FILE & VERIFYING IS_CLOSED")
    print("=" * 60)
    
    f.close()
    print(f"[+] f.close() called successfully.")
    print(f"[*] Is closed now? (f.closed): {f.closed}")
    
    # Demonstrating exception on closed file I/O
    try:
        f.write("Attempting to write after close")
    except ValueError as err:
        print(f"[!] Caught expected exception: {err}")

if __name__ == "__main__":
    demonstrate_file_lifecycle()
