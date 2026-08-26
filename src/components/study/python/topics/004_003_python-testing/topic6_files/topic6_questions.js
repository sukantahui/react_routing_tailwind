// src/components/study/python/topics/004_003_python-testing/topic6_files/topic6_questions.js
// Comprehensive Master Review Questions for Topic 6: Mocking external dependencies with unittest.mock (patch, Mock, MagicMock)

const questions = [
  {
    question: "What is the primary purpose of mocking in unit tests?",
    shortAnswer: "To isolate the unit of code under test from external, non-deterministic, slow, or destructive dependencies (such as external HTTP APIs, payment gateways, live databases, or SMS gateways) by substituting them with controllable test doubles.",
    explanation: "Test isolation and external dependency replacement.",
    hint: "Replaces slow, flaky, or external services with controllable fake objects.",
    level: "basic",
    codeExample: "mock_api = Mock(); mock_api.get_balance.return_value = 5000.0"
  },
  {
    question: "What is the difference between 'Mock' and 'MagicMock' in Python's standard library?",
    shortAnswer: "'MagicMock' is a subclass of 'Mock' that provides default implementations for Python magic/dunder methods (such as '__len__', '__iter__', '__getitem__', '__enter__', and '__exit__'), making it suitable for mocking context managers, iterables, and container objects.",
    explanation: "Dunder magic method support in MagicMock.",
    hint: "MagicMock supports dunder methods like __iter__, __len__, and context managers (__enter__/__exit__).",
    level: "basic",
    codeExample: "m = MagicMock(); len(m); [x for x in m]; with m: pass"
  },
  {
    question: "What is the difference between 'return_value' and 'side_effect' on a Mock object?",
    shortAnswer: "'return_value' returns the exact same fixed value every time the mock is called; 'side_effect' can raise an exception, execute a custom callable function, or return successive values from an iterable upon each call.",
    explanation: "Static return values vs dynamic execution and exception simulation.",
    hint: "return_value returns static data; side_effect can raise errors, call functions, or iterate.",
    level: "basic",
    codeExample: "mock.return_value = 100\nmock.side_effect = [1, 2, ConnectionError('Timeout')]"
  },
  {
    question: "What is the 'Where to Patch' golden rule in Python's unittest.mock?",
    shortAnswer: "Always patch where an object is LOOKED UP / IMPORTED (in the module under test), NOT where the object was originally defined (e.g. if 'billing.py' has 'import requests', patch 'billing.requests.post', not 'requests.post').",
    explanation: "The single most common mocking mistake in Python engineering.",
    hint: "Patch where the function is imported and used, not where it is defined.",
    level: "moderate",
    codeExample: "# In billing.py: import requests -> Patch: @patch('billing.requests.post')"
  },
  {
    question: "How do you verify that a mock function was called exactly once with specific arguments?",
    shortAnswer: "Using 'mock_fn.assert_called_once_with(arg1, arg2, kwarg=val)', which verifies both the call count and the exact arguments passed to the mock.",
    explanation: "Strict invocation contract assertion in unittest.mock.",
    hint: "Use mock_fn.assert_called_once_with(*args, **kwargs).",
    level: "basic",
    codeExample: "mock_mailer.assert_called_once_with('mamata@email.com', 'Welcome')"
  },
  {
    question: "How does 'patch' work as a decorator vs as a context manager?",
    shortAnswer: "As a decorator ('@patch(\"module.func\")'), it passes the created mock object as an argument to the test function; as a context manager ('with patch(\"module.func\") as mock_f:'), it restricts mocking to the enclosed block.",
    explanation: "Decorator vs context manager scopes for patch.",
    hint: "@patch passes the mock as a parameter; with patch(...) as mock restricts scope.",
    level: "basic",
    codeExample: "@patch('app.api')\ndef test_fn(mock_api): ... \n# vs: with patch('app.api') as m: ..."
  },
  {
    question: "What is the danger of mocking without 'autospec=True' (Mock Drift)?",
    shortAnswer: "Standard mocks accept any method name and any number of arguments without complaining, allowing tests to pass even if the real production function's signature or method names have changed or been deleted.",
    explanation: "Mock drift and false positive tests caused by unconstrained mocks.",
    hint: "Unconstrained mocks allow calling nonexistent methods or wrong arguments without errors.",
    level: "moderate",
    codeExample: "@patch('service.send_email', autospec=True) # Enforces real signature"
  },
  {
    question: "How do you mock Python's built-in 'open()' function for file reading/writing tests?",
    shortAnswer: "Using 'unittest.mock.mock_open(read_data=\"sample file content\")' paired with '@patch(\"builtins.open\", mock_open(...))'.",
    explanation: "Standard library helper for mocking file I/O streams.",
    hint: "@patch('builtins.open', mock_open(read_data='content'))",
    level: "moderate",
    codeExample: "with patch('builtins.open', mock_open(read_data='{\"status\": \"OK\"}')):"
  },
  {
    question: "How do you inspect all calls made to a mock over its lifecycle?",
    shortAnswer: "By inspecting 'mock_fn.call_args_list' (a list of 'call(args, kwargs)' objects) or checking 'mock_fn.call_count'.",
    explanation: "Call history and multi-invocation inspection.",
    hint: "mock_fn.call_args_list contains the history of all calls.",
    level: "moderate",
    codeExample: "assert mock_fn.call_count == 3\nassert mock_fn.call_args_list[0] == call('first_arg')"
  },
  {
    question: "What is 'unittest.mock.PropertyMock' used for?",
    shortAnswer: "'PropertyMock' is specialized for mocking '@property' getter/setter attributes on classes that are accessed without parentheses (e.g. 'obj.status').",
    explanation: "Class property attribute mocking.",
    hint: "Used to mock properties accessed without calling parentheses (e.g. obj.balance).",
    level: "moderate",
    codeExample: "with patch.object(Student, 'balance', new_callable=PropertyMock) as mock_bal:\n    mock_bal.return_value = 5000.0"
  },
  {
    question: "How do you simulate a network timeout or connection error using a mock?",
    shortAnswer: "Assign the exception class or instance to the mock's 'side_effect' attribute (e.g. 'mock_post.side_effect = requests.exceptions.Timeout(\"Gateway down\")').",
    explanation: "Network failure simulation with side_effect.",
    hint: "mock.side_effect = requests.exceptions.Timeout('Connection timed out')",
    level: "basic",
    codeExample: "mock_gateway.side_effect = TimeoutError('Bank API unreachable')"
  },
  {
    question: "What is the difference between 'patch.object(target, 'attribute')' and 'patch('target.module.attribute')'?",
    shortAnswer: "'patch.object' takes the actual Python class/module object as its first argument and the attribute name as a string; 'patch' takes a single complete import path string.",
    explanation: "Direct object attribute patching vs string module path patching.",
    hint: "patch.object takes the actual imported class/module object directly.",
    level: "moderate",
    codeExample: "patch.object(MyService, 'send_sms') vs patch('my_pkg.MyService.send_sms')"
  },
  {
    question: "How do you mock an asynchronous function in Python 3.8+?",
    shortAnswer: "Using 'unittest.mock.AsyncMock', which natively returns an awaitable coroutine and provides assertions like 'assert_awaited_once_with()'.",
    explanation: "Native asyncio coroutine mocking with AsyncMock.",
    hint: "Use unittest.mock.AsyncMock for async def functions.",
    level: "moderate",
    codeExample: "mock_async_fetch = AsyncMock(return_value={'status': 200})\nawait mock_async_fetch()"
  },
  {
    question: "What does 'mock_fn.assert_not_called()' verify?",
    shortAnswer: "It asserts that the mock was NEVER invoked during the test execution (useful for verifying that caching prevented an API call or error conditions aborted early).",
    explanation: "Zero invocation contract verification.",
    hint: "Verifies that the mock was never called during the test.",
    level: "basic",
    codeExample: "cache_hit_func(); mock_database.assert_not_called()"
  },
  {
    question: "Can multiple '@patch' decorators be stacked on a single test function?",
    shortAnswer: "Yes, but remember that stacked patches are passed as arguments to the test function in BOTTOM-TO-TOP (reverse) order.",
    explanation: "Stacked patch argument ordering rule.",
    hint: "Bottom-most patch is passed as the first argument, top-most patch is passed last.",
    level: "complex",
    codeExample: "@patch('module.email') # Passed 2nd\n@patch('module.db')    # Passed 1st\ndef test_fn(mock_db, mock_email): ... "
  },
  {
    question: "What is a 'Spy' in the test doubles taxonomy and how is it created with unittest.mock?",
    shortAnswer: "A spy wraps a real object, delegating calls to the real implementation while secretly recording all invocation arguments and call counts; created with 'Mock(wraps=real_object)'.",
    explanation: "Delegating mock wrapper for behavior verification.",
    hint: "Mock(wraps=real_instance) executes real code while recording calls.",
    level: "complex",
    codeExample: "real_calc = Calculator(); spy = Mock(wraps=real_calc)"
  },
  {
    question: "Why should you avoid over-mocking (mocking internal private functions)?",
    shortAnswer: "Over-mocking ties unit tests to implementation details rather than public contracts, creating brittle tests that break during internal refactoring even when overall behavior is correct.",
    explanation: "Over-mocking anti-pattern and refactoring fragility.",
    hint: "Mock only external boundaries (APIs, DBs, I/O), not internal private helpers.",
    level: "moderate",
    codeExample: "# Mock external HTTP APIs, not your internal private helper functions"
  },
  {
    question: "What happens if a mock method name is misspelled when 'spec=True' is NOT set?",
    shortAnswer: "The mock dynamically creates a brand-new Mock attribute for the misspelled name without error, causing assertions like 'assert mock.misspelled_method.called' to pass or fail unexpectedly.",
    explanation: "Silent attribute creation hazards on un-specced mocks.",
    hint: "Without spec, mocks dynamically create attributes on the fly for any typo.",
    level: "basic",
    codeExample: "mock.asert_called_once() # Typo in 'assert' creates a new mock silently!"
  },
  {
    question: "What does 'mock_fn.reset_mock()' do?",
    shortAnswer: "It clears all captured call history ('call_count', 'call_args', 'call_args_list') while preserving configured 'return_value' and 'side_effect' settings.",
    explanation: "Call history resetting between test steps.",
    hint: "Resets call counts and argument histories without wiping configured return values.",
    level: "basic",
    codeExample: "mock.reset_mock() # Clears call history"
  },
  {
    question: "What is the ultimate golden rule of mocking in Python?",
    shortAnswer: "Mock at the architectural boundaries (HTTP, DB, Filesystem, Clock), patch where objects are used, enforce signatures with 'autospec=True', and assert both return values and invocation arguments.",
    explanation: "The complete enterprise mocking best practice standard.",
    hint: "Boundary mocking + where-used patching + autospec=True.",
    level: "basic",
    codeExample: "# Enterprise Mocking Standard"
  }
];

export default questions;
