// src/components/study/python/topics/004_001_filesystem-os/topic7_files/topic7_questions.js
// Comprehensive Master Review Questions for Topic 7: Automated directory backup and file organizer scripts

const questions = [
  {
    question: "How does an automated file organizer script categorize incoming files?",
    shortAnswer: "By mapping file extensions (using 'pathlib.Path.suffix.lower()') to target category directory names in a lookup dictionary and moving matching files into their respective subfolders.",
    explanation: "Extension mapping directory categorization.",
    hint: "Uses a dictionary mapping extensions (.pdf, .csv) to category folders.",
    level: "basic",
    codeExample: "CATEGORY_MAP = {'Documents': {'.pdf', '.docx'}, 'Data': {'.csv', '.json'}}"
  },
  {
    question: "How do you handle filename collisions when moving a file to an existing destination?",
    shortAnswer: "Check if the destination path exists; if it does, dynamically append a sequence counter: 'f\"{path.stem} ({counter}){path.suffix}\"' until an unused filename is found.",
    explanation: "Deterministic collision resolution algorithm.",
    hint: "Append an incrementing number in parentheses until the path is unique.",
    level: "basic",
    codeExample: "while target.exists(): target = parent / f'{stem} ({counter}){suffix}'"
  },
  {
    question: "Why is comparing filenames insufficient for detecting duplicate files?",
    shortAnswer: "Files with identical names may contain completely different contents, and identical content is frequently saved under different filenames (e.g. 'doc.pdf' and 'doc_copy.pdf').",
    explanation: "Name vs content identity distinction.",
    hint: "Identical contents can have different names, and same names can have different contents.",
    level: "basic",
    codeExample: "# Content verification requires cryptographic hashing or byte comparisons"
  },
  {
    question: "What is the two-stage optimization for finding duplicate files across large filesystem trees?",
    shortAnswer: "Stage 1: Group all files by exact byte size ('os.path.getsize()'); Stage 2: Compute SHA-256 hashes ONLY for files that share the exact same size, skipping hashing for uniquely-sized files.",
    explanation: "Two-stage duplicate detection optimization.",
    hint: "Group by file size first, then hash only files with matching sizes.",
    level: "moderate",
    codeExample: "if len(size_map[size]) > 1: hash_files(size_map[size])"
  },
  {
    question: "Why should cryptographic hashing ('hashlib.sha256') always read files in streaming chunks?",
    shortAnswer: "To prevent loading large multi-gigabyte files (e.g. 10GB ISOs or video files) into system RAM all at once, which causes 'MemoryError' crashes.",
    explanation: "Constant-memory streaming hashing.",
    hint: "Streams data in 64KB chunks to keep memory usage under 10MB regardless of file size.",
    level: "moderate",
    codeExample: "for chunk in iter(lambda: f.read(64*1024), b''): hasher.update(chunk)"
  },
  {
    question: "What is the key difference between a full backup and an incremental backup?",
    shortAnswer: "A full backup copies every file regardless of whether it has changed; an incremental backup copies ONLY new files and files whose modification timestamp or size has changed since the last backup.",
    explanation: "Full vs incremental delta synchronization.",
    hint: "Full copies everything; incremental copies only new or modified files.",
    level: "basic",
    codeExample: "if not dst.exists() or src.stat().st_mtime > dst.stat().st_mtime: copy2(src, dst)"
  },
  {
    question: "Why is 'shutil.copy2()' mandatory when writing an incremental backup engine?",
    shortAnswer: "Because 'shutil.copy2()' preserves original modification timestamps ('st_mtime'); if regular 'copy()' were used, destination files would get current timestamps and subsequent runs would erroneously re-copy unchanged files.",
    explanation: "Timestamp preservation in delta synchronization.",
    hint: "Preserves modification timestamps so subsequent syncs accurately detect unchanged files.",
    level: "moderate",
    codeExample: "shutil.copy2(src_path, dst_path) # Preserves st_mtime"
  },
  {
    question: "How do you detect if a source file has been modified compared to its backup copy?",
    shortAnswer: "Compare their modification timestamps ('src.stat().st_mtime > dst.stat().st_mtime') and file sizes ('src.stat().st_size != dst.stat().st_size').",
    explanation: "Delta modification detection.",
    hint: "Check if source mtime is greater than destination mtime or sizes differ.",
    level: "basic",
    codeExample: "is_modified = (src_stat.st_mtime > dst_stat.st_mtime) or (src_stat.st_size != dst_stat.st_size)"
  },
  {
    question: "What does an incremental backup audit manifest typically contain?",
    shortAnswer: "Summary statistics including timestamp, count and paths of 'added_files' (new), 'updated_files' (modified), and 'unchanged_files' (skipped).",
    explanation: "Backup audit manifest structure.",
    hint: "Contains added, updated, and unchanged file counts and paths.",
    level: "basic",
    codeExample: "{'added': 5, 'updated': 2, 'unchanged': 140}"
  },
  {
    question: "How do you organize files by their creation or modification date into 'YYYY/MM' folders?",
    shortAnswer: "Extract the year and month from 'datetime.fromtimestamp(path.stat().st_mtime)' and move the file into 'f\"{year}/{month:02d}/\"'.",
    explanation: "Date-based folder hierarchy organization.",
    hint: "Extract year and month from mtime and construct YYYY/MM destination subfolders.",
    level: "basic",
    codeExample: "dt = datetime.fromtimestamp(p.stat().st_mtime); dst = root / f'{dt.year}/{dt.month:02d}'"
  },
  {
    question: "How do you safely clean up exact duplicate files after hashing?",
    shortAnswer: "Keep the primary original file in each cluster, and replace duplicates with symbolic links (symlinks), hardlinks, or move them to a 'Quarantined_Duplicates/' folder before permanent deletion.",
    explanation: "Safe deduplication workflow.",
    hint: "Keep the original and quarantine or link duplicate copies.",
    level: "moderate",
    codeExample: "for dup in cluster[1:]: os.remove(dup['path']) # Keeps cluster[0]"
  },
  {
    question: "What is the benefit of using 'hashlib.sha256' over 'hashlib.md5' for file deduplication?",
    shortAnswer: "SHA-256 has zero practical risk of hash collisions and meets modern cryptographic compliance standards, whereas MD5 has known collision vulnerabilities.",
    explanation: "Cryptographic hash security.",
    hint: "SHA-256 eliminates collision risks and complies with enterprise security standards.",
    level: "basic",
    codeExample: "hasher = hashlib.sha256()"
  },
  {
    question: "How do you prevent an organizer script from moving its own destination category folders?",
    shortAnswer: "Filter out directory entries using 'if item.is_file():' or check if 'item.name' is in the set of category folder names.",
    explanation: "Directory filtering in file organizers.",
    hint: "Check item.is_file() so only regular files are processed.",
    level: "basic",
    codeExample: "for item in watch_dir.iterdir(): if not item.is_file(): continue"
  },
  {
    question: "How do you calculate total disk space wasted by duplicate files across an entire system?",
    shortAnswer: "For each duplicate cluster, multiply the file size by '(number_of_copies - 1)' and sum across all clusters.",
    explanation: "Wasted storage calculation formula.",
    hint: "Sum of size * (count - 1) across all verified duplicate clusters.",
    level: "basic",
    codeExample: "wasted = sum(c[0]['size_bytes'] * (len(c) - 1) for c in duplicate_clusters)"
  },
  {
    question: "How do you handle files without any file extension in an organizer script?",
    shortAnswer: "Route them to an 'Other_Uncategorized' or 'No_Extension' category folder.",
    explanation: "Fallback category routing.",
    hint: "Assign them to a default 'Other_Uncategorized' fallback directory.",
    level: "basic",
    codeExample: "cat = CATEGORY_MAP.get(ext, 'Other_Uncategorized')"
  },
  {
    question: "Why should an organizer script convert extensions to lowercase before checking ('suffix.lower()')?",
    shortAnswer: "Filesystems on Windows and cameras produce uppercase extensions ('.PDF', '.JPG'); converting to lowercase ensures accurate mapping matches.",
    explanation: "Extension case normalization.",
    hint: "Normalizes uppercase extensions (.PDF, .JPG) for reliable matching.",
    level: "basic",
    codeExample: "ext = path.suffix.lower()"
  },
  {
    question: "What is 'os.replace()' vs 'shutil.move()' when organizing files?",
    shortAnswer: "'os.replace()' is an atomic replacement for files on the same filesystem; 'shutil.move()' automatically handles cross-directory and cross-drive filesystem moves.",
    explanation: "Atomic replace vs cross-drive move.",
    hint: "shutil.move handles cross-drive relocation; os.replace is same-filesystem atomic swap.",
    level: "basic",
    codeExample: "shutil.move(str(src), str(dst))"
  },
  {
    question: "How do you implement a progress bar or telemetry counter in a file organizer script?",
    shortAnswer: "Count total files upfront, then update an enumerated progress counter during iteration, printing 'f\"[{i}/{total}] Organized {item.name}\"'.",
    explanation: "CLI UX progress tracking.",
    hint: "Enumerate the file list and print progress percentages.",
    level: "basic",
    codeExample: "for i, f in enumerate(files, 1): print(f'[{i}/{len(files)}] Moving {f.name}')"
  },
  {
    question: "How do you prevent partial file writes from corrupting an incremental backup if interrupted?",
    shortAnswer: "Write the file to a temporary file (e.g. 'file.tmp') in the target folder first, and upon successful completion, atomically rename it to final name with 'os.replace()'.",
    explanation: "Atomic file writing pattern.",
    hint: "Write to temp file first, then atomically rename to target with os.replace.",
    level: "complex",
    codeExample: "# Atomic write pattern: copy to .tmp, then os.replace to final"
  },
  {
    question: "How do you exclude hidden files (starting with '.') from being organized?",
    shortAnswer: "Check 'if item.name.startswith(\".\"): continue'.",
    explanation: "Hidden file filtering.",
    hint: "Skip files where name.startswith('.').",
    level: "basic",
    codeExample: "if item.name.startswith('.'): continue"
  },
  {
    question: "Can an incremental backup engine handle deleted source files?",
    shortAnswer: "Yes; if configured for full mirroring ('--mirror'), the engine scans the backup directory and removes any backup file that no longer exists in the source directory.",
    explanation: "Mirroring deletion synchronization.",
    hint: "Scan destination and remove files that no longer exist in source.",
    level: "moderate",
    codeExample: "for dst_f in dst_dir.rglob('*'): if not (src_dir / rel).exists(): os.remove(dst_f)"
  },
  {
    question: "How do you generate a timestamped backup directory name?",
    shortAnswer: "Using 'datetime.now().strftime(\"%Y%m%d_%H%M%S\")': 'backup_dir = root / f\"backup_{datetime.now().strftime(\'%Y%m%d_%H%M%S\')}\"'.",
    explanation: "Timestamped backup naming.",
    hint: "Format datetime.now() with YYYYMMDD_HHMMSS.",
    level: "basic",
    codeExample: "ts = datetime.now().strftime('%Y%m%d_%H%M%S'); dir_name = f'snapshot_{ts}'"
  },
  {
    question: "What is the time complexity of the two-stage duplicate file detection algorithm on N files?",
    shortAnswer: "Stage 1 (Size grouping) is O(N) disk stats; Stage 2 (Hashing) is O(M) where M is the small subset of files with size collisions, drastically outperforming naive O(N) hashing of all files.",
    explanation: "Algorithmic complexity optimization.",
    hint: "O(N) for size checks, O(M) for hashing only size collisions.",
    level: "moderate",
    codeExample: "# Two-stage size + hash complexity optimization"
  },
  {
    question: "How do you combine the organizer, duplicate detector, and incremental backup into a single CLI tool?",
    shortAnswer: "Use 'argparse' with subparsers ('organize', 'dedup', 'backup'), dispatching to dedicated methods of a unified vault management class.",
    explanation: "Modular CLI application architecture.",
    hint: "Use argparse subparsers to route commands to dedicated engine methods.",
    level: "basic",
    codeExample: "sub = parser.add_subparsers(dest='cmd'); sub.add_parser('organize'); sub.add_parser('dedup')"
  },
  {
    question: "What is the ultimate golden rule for directory backup and file organizer scripts?",
    shortAnswer: "Always resolve collisions deterministically, use two-stage size+SHA256 duplicate detection in 64KB chunks, preserve modification timestamps with 'shutil.copy2()' during incremental backups, and maintain comprehensive audit manifests.",
    explanation: "The complete enterprise guideline for file organization and backup automation in Python.",
    hint: "Deterministic collision resolution, 2-stage chunked hashing, copy2 timestamp preservation, and audit manifests.",
    level: "basic",
    codeExample: "# Python File Organization & Backup Engineering Mastery"
  }
];

export default questions;
