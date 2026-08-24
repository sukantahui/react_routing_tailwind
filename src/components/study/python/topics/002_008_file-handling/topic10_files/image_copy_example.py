# image_copy_example.py
# Demonstrates copying a binary file (like an image)

import os
import shutil

def create_dummy_image(filename="dummy.jpg"):
    """Create a dummy binary file that simulates an image."""
    # This is just binary data, not a real JPEG
    dummy_data = b'\xFF\xD8\xFF\xE0'  # JPEG header signature
    dummy_data += b'\x00\x10\x4A\x46\x49\x46\x00\x01'
    dummy_data += b'\x00' * 1000  # fill with zeros
    with open(filename, 'wb') as f:
        f.write(dummy_data)
    print(f"✅ Created dummy image: {filename}")
    return filename

def copy_binary_file(src, dst):
    """Copy a binary file in chunks."""
    chunk_size = 1024  # 1KB chunks
    copied = 0

    with open(src, 'rb') as source:
        with open(dst, 'wb') as dest:
            while True:
                chunk = source.read(chunk_size)
                if not chunk:
                    break
                dest.write(chunk)
                copied += len(chunk)

    print(f"📋 Copied {copied} bytes from '{src}' to '{dst}'")
    return copied

def compare_files(f1, f2):
    """Compare two binary files."""
    with open(f1, 'rb') as a, open(f2, 'rb') as b:
        data1 = a.read()
        data2 = b.read()

    if data1 == data2:
        print(f"✅ Files are identical ({len(data1)} bytes)")
    else:
        print(f"❌ Files differ: {len(data1)} vs {len(data2)} bytes")

if __name__ == "__main__":
    # Create a dummy image
    src = create_dummy_image()

    # Copy it
    dst = "copy_of_image.jpg"
    copy_binary_file(src, dst)

    # Verify they match
    compare_files(src, dst)

    # Check file sizes
    size1 = os.path.getsize(src)
    size2 = os.path.getsize(dst)
    print(f"📊 Sizes: {size1} bytes (original), {size2} bytes (copy)")

    # Clean up
    for f in [src, dst]:
        if os.path.exists(f):
            os.remove(f)
    print("🧹 Cleaned up.")