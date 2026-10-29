# Repository release setup

The migration does not publish a package or transfer external credentials. Public package names, extension identity and existing tag prefixes are preserved. Old releases remain available in the hub and registry. Do not recreate a previously published version merely to change repository metadata.

Publishing is disabled until repository variable `MARKETPLACE_PUBLISHING_ENABLED` is set to `true`. Configure VSCE_PAT and OVSX_PAT for the existing splitin.agent-router publisher identity. Verify all standalone CI and packed-consumer checks before enabling publishing and creating a new signed release tag. The old hub publishing workflow must be retired before switching authority.

Use the existing publish workflow in `.github/workflows/`. Its working paths now start at repository root. The historical migration snapshot is not a live-provider or production qualification.
