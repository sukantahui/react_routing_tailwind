# text_read_write.py
# Demonstrates reading from and writing to a text file

def write_text():
    """Write some lines to a text file."""
    with open('sample.txt', 'w', encoding='utf-8') as f:
        f.write("Hello, Swadeep!\n")
        f.write("Welcome to File Handling.\n")
        f.write("This is a text file.\n")
    print("✅ Text file 'sample.txt' written.")

def read_text():
    """Read and print the contents of a text file."""
    try:
        with open('sample.txt', 'r', encoding='utf-8') as f:
            content = f.read()
        print("📄 Content of 'sample.txt':")
        print(content)
    except FileNotFoundError:
        print("❌ File not found. Run write_text() first.")

if __name__ == "__main__":
    write_text()
    read_text()