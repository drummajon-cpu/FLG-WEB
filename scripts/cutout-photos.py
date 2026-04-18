"""Remove backgrounds from all gallery photos using rembg."""
from pathlib import Path
from rembg import remove, new_session
from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "public" / "images" / "work"
DST = ROOT / "public" / "images" / "work" / "cutout"
DST.mkdir(parents=True, exist_ok=True)

session = new_session("isnet-general-use")

targets = [
    "767 Aileron.jpg",
    "767 Outboard Flap.jpg",
    "A320 Outboard Flap.jpg",
    "A330 Inboard Flap.jpg",
    "Air Inlet.jpg",
    "Rudder.jpg",
    "Vertical Leading Edge.jpg",
]

for name in targets:
    src = SRC / name
    out = DST / (name.rsplit(".", 1)[0] + ".png")
    if not src.exists():
        print(f"? skip (missing): {name}")
        continue
    img = Image.open(src)
    result = remove(img, session=session)
    result.save(out, "PNG", optimize=True)
    print(f"+ {name} -> {out.name}")

print("done.")
