---
name: test-writer
description: Write tests to the project convention for a given feature, covering the happy path, validation errors, and access control. Use when adding tests for new work.
---

# Test Writer

Use this skill whenever new backend or frontend work needs test coverage. `testing.md` sets the strategy and lists the key flows and acceptance criteria; use it to decide what level of test a given change needs.

## Steps

1. **Identify the level.** Pure logic gets a unit test. An API route gets an integration test against a real or test database. A user facing flow that spans several steps is a candidate for an end to end test, see `testing.md` for the five key flows.
2. **Cover the happy path.** The feature working as intended, with valid input and the correct role.
3. **Cover validation errors.** Missing required fields, wrong types, and any business rule the endpoint or form enforces (for example, an appointment cannot be scheduled in the past).
4. **Cover access control.** For any protected route, a test with no token, a test with an expired token, and a test with a valid token but the wrong role. Confirm each is rejected with the right status code, not just that the UI hides a button.
5. **Check against the acceptance criteria.** If the feature maps to an item in `testing.md`'s acceptance criteria list or a user story in `prd.md` section 7, write the test so it directly proves that criterion.
6. **Keep tests readable.** Plain names describing what is being proven, no clever abstractions that hide what the test actually checks.

## Rules

- A new API route is not done until it has at least one happy path test and one access control test.
- Do not mark a test as passing by weakening the assertion; if the behaviour is wrong, fix the behaviour.
