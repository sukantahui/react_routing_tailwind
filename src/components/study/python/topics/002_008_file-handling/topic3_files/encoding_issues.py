# encoding_issues.py
# Demonstrates common encoding problems and solutions

def demonstrate_encoding_issues():
    # Create a file with non-ASCII characters
    with open('unicode_example.txt', 'w', encoding='utf-8') as f:
        f.write("Barrackpore: সোয়াদীপ, তুহিনা, অভ্রনিলা, দেবাংশু\n")
        f.write("Naihati: こんにちは\n")
        f.write("Ichapur: 😊🚀\n")
    
    # Try reading with wrong encoding
    print("🔴 Reading with ASCII (wrong):")
    try:
        with open('unicode_example.txt', 'r', encoding='ascii') as f:
            print(f.read())
    except UnicodeDecodeError as e:
        print(f"Error: {e}\n")
    
    # Try reading with correct encoding
    print("✅ Reading with UTF-8 (correct):")
    with open('unicode_example.txt', 'r', encoding='utf-8') as f:
        print(f.read())
    
    # Handling errors
    print("🛠️ Using 'errors=replace' to handle bad bytes:")
    with open('unicode_example.txt', 'r', encoding='ascii', errors='replace') as f:
        print(f.read())
    
    # Writing with different encoding
    print("📝 Writing with UTF-16 and reading back:")
    with open('unicode_utf16.txt', 'w', encoding='utf-16') as f:
        f.write("Shyamnagar: 🏫")
    with open('unicode_utf16.txt', 'r', encoding='utf-16') as f:
        print(f.read())

if __name__ == "__main__":
    demonstrate_encoding_issues()