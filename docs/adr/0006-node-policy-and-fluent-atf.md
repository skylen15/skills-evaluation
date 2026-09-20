# Node policy tests plus Fluent ATF on the instance

Submission policy stays a plain module with Node tests so decisions do not need Glide. Instance truth (Business Rules, UI Action adapters, query ACLs, cascade delete) is proved with Automated Test Framework authored in Fluent after Now SDK 4.12.2, because that release can declare a Test Suite and the tests that belong to it in the scoped app. ATF arrange data is created in the test (users, Submissions, child rows) and rolled back; catalog seed, groups, and roles are reused by Fluent reference, not copied or hard-coded as instance sys_ids.
