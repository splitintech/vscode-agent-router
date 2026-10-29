# Contributing to vscode-agent-router

Develop this product in this standalone repository. See [README](README.md) for setup, APIs and tests, and [migration](docs/migration.md) for provenance. Keep public package names and APIs compatible. Include tests for behavior changes and run the existing checks before opening a pull request. Never commit credentials, live user data or local configuration.

The [Open Internal Tools catalog](https://github.com/splitintech/open-internal-tools) links the independent projects. Product issues and changes belong [here](https://github.com/splitintech/vscode-agent-router/issues).

Run `python3 scripts/check-migration.py` to verify provenance inventory and retained assets. Use `--snapshot` only against the original migration snapshot; subsequent intentional source changes should not rewrite that historical snapshot.
