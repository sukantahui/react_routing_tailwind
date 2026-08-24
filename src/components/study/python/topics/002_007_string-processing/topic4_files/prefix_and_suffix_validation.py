# topic4_files/prefix_and_suffix_validation.py
# Module: 002_007_string-processing
# Topic: Searching & Validation (find, rfind, count, startswith, endswith, isdigit, isalpha)
# Author: Sukanta Hui (Coder & AccoTax)

"""
Topic 4 - File 2: Prefix and Suffix Validation & Stripping
Demonstrates:
  1. startswith() and endswith(): Single prefix/suffix checks
  2. Tuple of candidates: startswith(('http://', 'https://'))
  3. Bounded prefix checking: startswith(prefix, start, stop)
  4. removeprefix() & removesuffix() (Python 3.9+ clean substring removal)
  5. File type classification & routing engine
"""

def demonstrate_basic_prefix_suffix():
    print("=" * 65)
    print("1. startswith() & endswith() BASIC VALIDATION")
    print("=" * 65)

    website = "https://www.codernaccotax.co.in"
    print(f"Target URL: '{website}'\n")

    # Single string check
    is_secure = website.startswith("https://")
    is_india_domain = website.endswith(".in")
    is_com_domain = website.endswith(".com")

    print(f"website.startswith('https://') -> {is_secure}")
    print(f"website.endswith('.in')       -> {is_india_domain}")
    print(f"website.endswith('.com')      -> {is_com_domain}")


def demonstrate_tuple_candidate_matching():
    print("\n" + "=" * 65)
    print("2. TUPLE OF CANDIDATE PREFIXES & SUFFIXES")
    print("=" * 65)

    # You can pass a TUPLE of strings (Lists or sets are NOT allowed!)
    valid_protocols = ("http://", "https://", "ftp://")
    valid_doc_extensions = (".pdf", ".docx", ".xlsx", ".pptx")

    test_urls = [
        "https://codernaccotax.co.in",
        "ftp://backup.server.local",
        "smtp://mail.office.com",
        "www.barrackpore.gov.in"
    ]

    print("--- URL Protocol Validation ---")
    for url in test_urls:
        allowed = url.startswith(valid_protocols)
        status = "[ALLOWED]" if allowed else "[BLOCKED]"
        print(f"'{url:<30}' -> {status}")

    print("\n--- File Extension Routing ---")
    filenames = [
        "invoice_9402.pdf",
        "tax_audit_report.xlsx",
        "setup_script.py",
        "student_photo.jpg"
    ]
    for fn in filenames:
        is_doc = fn.endswith(valid_doc_extensions)
        status = "[DOCUMENT]" if is_doc else "[OTHER FILE]"
        print(f"'{fn:<25}' -> {status}")


def demonstrate_removeprefix_and_removesuffix():
    print("\n" + "=" * 65)
    print("3. Python 3.9+ removeprefix() & removesuffix()")
    print("=" * 65)

    # Contrast with strip() gotchas
    test_str = "www.codernaccotax.co.in"
    print(f"Original: '{test_str}'\n")

    # removeprefix() only removes exact prefix if it exists
    no_www = test_str.removeprefix("www.")
    print(f"test_str.removeprefix('www.') -> '{no_www}'")

    # removesuffix() only removes exact suffix if it exists
    no_tld = test_str.removesuffix(".co.in")
    print(f"test_str.removesuffix('.co.in') -> '{no_tld}'")

    # Safe no-op when prefix/suffix is absent
    safe_noop = test_str.removeprefix("https://")
    print(f"test_str.removeprefix('https://') -> '{safe_noop}' (Zero Error, unchanged)")


if __name__ == "__main__":
    demonstrate_basic_prefix_suffix()
    demonstrate_tuple_candidate_matching()
    demonstrate_removeprefix_and_removesuffix()
