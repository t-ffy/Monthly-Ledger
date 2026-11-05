#!/usr/bin/env python3
"""Stamp a new app version so every device picks up the update.

Usage:  python3 scripts/release.py 1.2.0 "What changed, in one sentence."

Updates VERSION in sw.js and version.json. Commit and push afterwards;
GitHub Pages publishes it and each device updates the next time it opens online.
"""
import json, pathlib, re, sys

root = pathlib.Path(__file__).resolve().parent.parent
if len(sys.argv) < 2 or not re.fullmatch(r"\d+\.\d+\.\d+", sys.argv[1]):
    sys.exit(__doc__)
version, notes = sys.argv[1], (sys.argv[2] if len(sys.argv) > 2 else "")

sw = root / "sw.js"
text, n = re.subn(r'const VERSION = "[^"]*";', f'const VERSION = "{version}";', sw.read_text())
if n != 1:
    sys.exit("Could not find the VERSION line in sw.js")
sw.write_text(text)

(root / "version.json").write_text(json.dumps({"version": version, "notes": notes}, indent=2) + "\n")
print(f"Version set to {version} in sw.js and version.json")
