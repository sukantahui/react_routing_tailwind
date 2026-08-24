# detect_file_type.py
# A simple heuristic to detect if a file is text or binary

def is_text_file(filename, sample_size=1024):
    """Return True if the file appears to be text, else False."""
    try:
        with open(filename, 'rb') as f:
            sample = f.read(sample_size)
        # Check for null bytes (common in binary)
        if b'\x00' in sample:
            return False
        # Check if printable characters dominate
        try:
            sample.decode('utf-8')
            return True
        except UnicodeDecodeError:
            return False
    except Exception:
        return False

if __name__ == "__main__":
    # Test with different files
    test_files = ['sample.txt', 'data.bin', 'image.jpg']
    for fname in test_files:
        is_text = is_text_file(fname)
        print(f"{fname}: {'Text' if is_text else 'Binary'}")