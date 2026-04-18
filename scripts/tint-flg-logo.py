"""
Tint the 'FLG' letters in public/images/flg-logo.png toward heritage teal (#2EB9A8).

The PNG is 1092x255 RGB. The FLG letters occupy roughly x in [0, 510] while
'Technics' starts around x=540. We tint any near-neutral bright pixel in the
FLG zone by blending it toward the heritage teal. Near-neutral means the
R/G/B channels are within a small delta — this skips the already-blue
'Technics' letters and the teal streaks, affecting only the white FLG glyphs.
"""

from PIL import Image

SRC = "public/images/flg-logo.png"
DST = SRC  # overwrite in place

# Heritage teal (from tailwind.config.ts `teal.DEFAULT`)
TEAL = (46, 185, 168)

# How much to blend white -> teal for the FLG letters (0..1).
# User asked for "a little more" teal — strong tint but letters still read as
# the serif FLG wordmark.
BLEND = 0.55

# The x-boundary between FLG and 'Technics'. 510 is safely past the 'G'
# and before the 'T'.
FLG_MAX_X = 510

# Pixel is considered 'near white' when min(rgb) > BRIGHT_MIN and the
# max-min spread is within NEUTRAL_DELTA (so coloured pixels like the
# light blue Technics or the teal streaks aren't touched).
BRIGHT_MIN = 150
NEUTRAL_DELTA = 12


def lerp(a: int, b: int, t: float) -> int:
    return round(a + (b - a) * t)


def main() -> None:
    img = Image.open(SRC).convert("RGB")
    px = img.load()
    w, h = img.size

    for y in range(h):
        for x in range(FLG_MAX_X):
            r, g, b = px[x, y]
            if min(r, g, b) < BRIGHT_MIN:
                continue
            if max(r, g, b) - min(r, g, b) > NEUTRAL_DELTA:
                continue
            # Scale the blend by how bright the pixel is so edges blend
            # naturally into the dark background instead of producing a
            # hard teal fringe.
            brightness = min(r, g, b) / 255
            t = BLEND * brightness
            px[x, y] = (
                lerp(r, TEAL[0], t),
                lerp(g, TEAL[1], t),
                lerp(b, TEAL[2], t),
            )

    img.save(DST, "PNG", optimize=True)
    print(f"wrote {DST}")


if __name__ == "__main__":
    main()
