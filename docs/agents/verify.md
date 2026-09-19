# Verify

After changing files, run the `package.json` scripts named `fmt`, `lint`, and `test` in that order. Read each script’s body there.

1. **Format.** Run `fmt`. Done when it exits 0.
2. **Lint.** Run `lint`. Done when it exits 0.
3. **Test.** Run `test`. Done when it exits 0.

Start the next script only after the previous step is done. Work is done when all three steps are done. Each of those names must be a `package.json` script that has been run to exit 0.
