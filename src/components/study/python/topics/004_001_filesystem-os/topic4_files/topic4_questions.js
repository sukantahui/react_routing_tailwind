// src/components/study/python/topics/004_001_filesystem-os/topic4_files/topic4_questions.js
// Comprehensive Master Review Questions for Topic 4: Command-line arguments parsing: sys.argv & argparse module

const questions = [
  {
    question: "What is 'sys.argv' in Python and what does it contain?",
    shortAnswer: "'sys.argv' is a list of strings representing the command-line arguments passed to the script, where 'sys.argv[0]' is the script filename and 'sys.argv[1:]' are the user arguments.",
    explanation: "Command-line token list in the sys module.",
    hint: "List of raw strings with the script name at index 0 and arguments at subsequent indices.",
    level: "basic",
    codeExample: "import sys\nprint('Script:', sys.argv[0], 'Args:', sys.argv[1:])"
  },
  {
    question: "What data type are all elements in 'sys.argv' by default?",
    shortAnswer: "All elements in 'sys.argv' are raw strings ('str'); numerical values, booleans, and dates must be manually cast.",
    explanation: "String typing invariant of sys.argv.",
    hint: "All elements are strings and require manual casting.",
    level: "basic",
    codeExample: "port = int(sys.argv[1]) if len(sys.argv) > 1 else 8080"
  },
  {
    question: "Why is the standard library 'argparse' module preferred over manual 'sys.argv' parsing?",
    shortAnswer: "'argparse' automatically generates user-friendly help text ('--help'), performs type validation/coercion, supports short/long flags, enforces choices, and handles subcommands with zero boilerplate.",
    explanation: "Standard library CLI framework benefits.",
    hint: "Provides auto-help, type casting, flag parsing, and error handling automatically.",
    level: "basic",
    codeExample: "parser = argparse.ArgumentParser(); parser.add_argument('--port', type=int)"
  },
  {
    question: "How does 'argparse' distinguish between positional arguments and optional flags?",
    shortAnswer: "Arguments without leading dashes ('\"source_file\"') are positional and required by default; arguments starting with '-' or '--' ('\"--campus\"', '\"-c\"') are optional flags.",
    explanation: "Positional vs optional argument syntax.",
    hint: "Positional arguments have no leading dash; optional flags start with '-' or '--'.",
    level: "basic",
    codeExample: "parser.add_argument('file') # Positional\nparser.add_argument('-v', '--verbose') # Optional"
  },
  {
    question: "What does 'action=\"store_true\"' do in 'parser.add_argument()'?",
    shortAnswer: "It creates a boolean flag that defaults to 'False' if omitted, and stores 'True' if the user passes the flag on the command line.",
    explanation: "Boolean switch flag action.",
    hint: "Creates a boolean flag that is True when present and False when omitted.",
    level: "basic",
    codeExample: "parser.add_argument('--dry-run', action='store_true')"
  },
  {
    question: "How do you enforce that an argument must be an integer and provide a default fallback?",
    shortAnswer: "By specifying 'type=int' and 'default=value': 'parser.add_argument(\"--limit\", type=int, default=50)'.",
    explanation: "Typed argument coercion with defaults.",
    hint: "Use type=int and default=50.",
    level: "basic",
    codeExample: "parser.add_argument('--limit', type=int, default=50)"
  },
  {
    question: "How do you restrict an argument's value to a specific set of allowed options?",
    shortAnswer: "Using the 'choices=' parameter: 'parser.add_argument(\"--campus\", choices=[\"barrackpore\", \"kolkata\"])'.",
    explanation: "Enum-like value constraints.",
    hint: "Use choices=['opt1', 'opt2'].",
    level: "basic",
    codeExample: "parser.add_argument('--format', choices=['json', 'csv', 'table'])"
  },
  {
    question: "How do you allow an argument to accept multiple values into a list?",
    shortAnswer: "Using 'nargs=\"+\"' (one or more values) or 'nargs=\"*\"' (zero or more values), which gathers tokens into a Python list.",
    explanation: "Variable argument count (nargs).",
    hint: "Use nargs='+' for 1+ values or nargs='*' for 0+ values.",
    level: "basic",
    codeExample: "parser.add_argument('files', nargs='+', help='One or more file paths')"
  },
  {
    question: "How do you build a multi-command CLI (e.g. 'git commit', 'docker run') in argparse?",
    shortAnswer: "Using 'subparsers = parser.add_subparsers(dest=\"command\", required=True)' and adding individual command parsers with 'subparsers.add_parser(\"enroll\")'.",
    explanation: "Subcommand routing in argparse.",
    hint: "Use parser.add_subparsers() and add_parser() for each subcommand.",
    level: "moderate",
    codeExample: "sub = parser.add_subparsers(dest='cmd'); enroll = sub.add_parser('enroll')"
  },
  {
    question: "What is 'add_mutually_exclusive_group()' and when should it be used?",
    shortAnswer: "It creates a group where only ONE of the included flags can be provided at a time (e.g., mutually exclusive output formats like '--json' vs '--csv').",
    explanation: "Mutually exclusive flag enforcement.",
    hint: "Ensures that conflicting flags cannot be passed at the same time.",
    level: "basic",
    codeExample: "group = parser.add_mutually_exclusive_group()\ngroup.add_argument('--json', action='store_true')\ngroup.add_argument('--csv', action='store_true')"
  },
  {
    question: "How do you implement a custom argument validator that raises a descriptive CLI error?",
    shortAnswer: "Define a function that takes a string argument, validates it, and raises 'argparse.ArgumentTypeError(\"Error message\")' if invalid, then pass that function to 'type=my_func'.",
    explanation: "Custom validation functions in argparse.",
    hint: "Pass a function to type= that raises argparse.ArgumentTypeError on invalid input.",
    level: "moderate",
    codeExample: "def positive_int(v): i = int(v); if i <= 0: raise argparse.ArgumentTypeError('Must be > 0'); return i"
  },
  {
    question: "Can 'pathlib.Path' be passed directly to 'type=' in 'add_argument()'?",
    shortAnswer: "Yes. Passing 'type=pathlib.Path' automatically converts the command-line string into a 'Path' object in the resulting parsed namespace.",
    explanation: "Pathlib integration with argparse.",
    hint: "Yes, use type=Path to receive Path objects directly in args.",
    level: "basic",
    codeExample: "from pathlib import Path\nparser.add_argument('config', type=Path)"
  },
  {
    question: "What happens when a user passes '--help' or '-h' to an argparse script?",
    shortAnswer: "'argparse' automatically prints a cleanly formatted help manual including script description, parameter usage, options, and epilog, then exits with code 0.",
    explanation: "Automated help manual generation.",
    hint: "Prints auto-generated help manual and exits cleanly with code 0.",
    level: "basic",
    codeExample: "$ python script.py --help"
  },
  {
    question: "How do you make an optional flag required?",
    shortAnswer: "By passing 'required=True': 'parser.add_argument(\"--api-key\", required=True)'.",
    explanation: "Mandatory optional-style flags.",
    hint: "Pass required=True to add_argument.",
    level: "basic",
    codeExample: "parser.add_argument('--token', required=True)"
  },
  {
    question: "What does 'parser.parse_args(args=None)' return?",
    shortAnswer: "An 'argparse.Namespace' object containing the parsed parameters as attributes (e.g. 'args.campus', 'args.batch_size').",
    explanation: "Namespace attribute container.",
    hint: "Returns an argparse.Namespace object with attributes matching argument names.",
    level: "basic",
    codeExample: "args = parser.parse_args(); print(args.campus)"
  },
  {
    question: "How do you convert an 'argparse.Namespace' object into a standard Python dictionary?",
    shortAnswer: "Using 'vars(args)': 'args_dict = vars(parser.parse_args())'.",
    explanation: "Namespace to dictionary conversion.",
    hint: "Use vars(args) to get a dict representation.",
    level: "basic",
    codeExample: "config_dict = vars(args)"
  },
  {
    question: "What is 'parser.parse_known_args()' and when is it useful?",
    shortAnswer: "It parses only the arguments defined in the parser and returns a 2-tuple '(args, unknown_args)' without raising an error on unrecognized flags (ideal for forwarding extra flags to sub-tools).",
    explanation: "Partial argument parsing for wrappers.",
    hint: "Returns (known_args, unknown_args) without crashing on extra unrecognized flags.",
    level: "moderate",
    codeExample: "known, extra = parser.parse_known_args()"
  },
  {
    question: "How do you customize the name of the attribute in 'args' when using a flag with hyphens like '--batch-size'?",
    shortAnswer: "'argparse' automatically replaces hyphens with underscores, making it accessible as 'args.batch_size' (or you can override it using 'dest=\"custom_name\"').",
    explanation: "Hyphen normalization and dest parameter.",
    hint: "Hyphens become underscores (args.batch_size) or customize with dest=.",
    level: "basic",
    codeExample: "parser.add_argument('--max-items', dest='limit') # Accessible as args.limit"
  },
  {
    question: "What is 'metavar' in 'add_argument()' and how does it affect '--help'?",
    shortAnswer: "'metavar' overrides the placeholder name displayed in help messages without changing the attribute name in the 'args' namespace.",
    explanation: "CLI documentation placeholder customization.",
    hint: "Controls the parameter name shown in the help documentation.",
    level: "basic",
    codeExample: "parser.add_argument('--ip', metavar='HOST_IP', help='Server IP address')"
  },
  {
    question: "How do you specify a custom version flag in argparse?",
    shortAnswer: "Using 'action=\"version\"' with 'version=\"%(prog)s 1.0.0\"': 'parser.add_argument(\"-V\", \"--version\", action=\"version\", version=\"%(prog)s 2.0\")'.",
    explanation: "Version flag protocol in argparse.",
    hint: "Use action='version' and version='%(prog)s 1.0.0'.",
    level: "basic",
    codeExample: "parser.add_argument('--version', action='version', version='%(prog)s 2026.1')"
  },
  {
    question: "Why should you avoid parsing CLI arguments inside library modules?",
    shortAnswer: "CLI parsing should be confined to script entrypoints ('if __name__ == \"__main__\":') to keep library modules reusable, importable, and easily unit-testable without side effects.",
    explanation: "Separation of concerns in Python architecture.",
    hint: "Keep CLI parsing in entrypoints so modules remain reusable and unit-testable.",
    level: "moderate",
    codeExample: "if __name__ == '__main__': cli_main()"
  },
  {
    question: "How do you test 'argparse' logic in unit tests without invoking the command line?",
    shortAnswer: "Pass an explicit list of argument strings to 'parser.parse_args([\"--campus\", \"kolkata\"])' instead of relying on 'sys.argv'.",
    explanation: "Unit testing CLI parsers.",
    hint: "Pass an explicit list of strings to parser.parse_args(['-c', 'kolkata']).",
    level: "basic",
    codeExample: "args = parser.parse_args(['--campus', 'kolkata'])"
  },
  {
    question: "What is 'argparse.RawDescriptionHelpFormatter' used for?",
    shortAnswer: "It prevents 'argparse' from automatically line-wrapping and collapsing whitespace in the description/epilog, preserving formatted ASCII tables and multi-line examples.",
    explanation: "Preserving raw text formatting in help manuals.",
    hint: "Preserves custom whitespace and linebreaks in help descriptions and examples.",
    level: "moderate",
    codeExample: "parser = argparse.ArgumentParser(formatter_class=argparse.RawDescriptionHelpFormatter)"
  },
  {
    question: "What exit code should a Python CLI return on success vs validation failure?",
    shortAnswer: "Return code 0 on success, and non-zero (typically 1 or 2) on error/validation failure ('sys.exit(0)' vs 'sys.exit(1)').",
    explanation: "Standard OS process exit code conventions.",
    hint: "0 for success, non-zero (1, 2) for error.",
    level: "basic",
    codeExample: "sys.exit(0) # Success"
  },
  {
    question: "What is the ultimate golden rule for command-line arguments in Python?",
    shortAnswer: "Always use 'argparse.ArgumentParser' with descriptive help strings, validate types with 'type=', create modular subcommands with 'add_subparsers()', and provide safe '--dry-run' flags for destructive operations.",
    explanation: "The complete enterprise guideline for CLI engineering in Python.",
    hint: "Use argparse with types, choices, subparsers, and dry-run switches for robust production CLIs.",
    level: "basic",
    codeExample: "# Python CLI Engineering Mastery"
  }
];

export default questions;
