## COM Brain Boot

Before repo-local work, boot through COM Brain.

Primary local AgenticOS root:
`C:\Users\Juice\OneDrive - FLG\AgenticOS`

Private read-only remote mirror fallback:
`https://github.com/drummajon-cpu/agenticos-com`

If the local Windows path is reachable, start from:
`C:\Users\Juice\OneDrive - FLG\AgenticOS\06-Templates\COM-New-Coding-Session-Prompt.md`

If the local Windows path is not reachable, read the same boot/context files from the private mirror, starting with:
`06-Templates/COM-New-Coding-Session-Prompt.md`

Then consume or run the COM boot validator and require `BOOT_PASS` before state-changing work. If COM memory is used, validate the COM ledger read-only when available.

At the top of the first substantive response in a new session, explicitly report one visible line:
`COM Brain: BOOTED (BOOT_PASS, current_rev <rev>, authority NONE, lease INERT)`
or
`COM Brain: DEGRADED (<reason>, read-only until Jonathan gives exact authority)`.

This repo remains separate from all other projects. COM provides boot/context and authority boundaries only. COM does not grant repo write, GitHub, deploy, gate, live-system, lease, pointer, Vault, doctrine, pickup, or ledger authority.
