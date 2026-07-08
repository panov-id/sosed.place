#!/usr/bin/env python3
# Compress selected wallpaper art into small web JPEGs and emit base64 data URIs.
import base64, io, json, os
from PIL import Image, ImageFilter

SRC = "/art"
OUT = "/out"
# name -> (source file, target width, jpeg quality)
JOBS = {
    "splash":  ("courtyard.png", 1300, 66),
    "hero":    ("facade.png",    1600, 70),
    "card_say":  ("windows.png",  820, 68),
    "card_match":("terrace.png",  820, 68),
    "card_fade": ("aerial.png",   820, 66),
    "texture": ("contour.png",    1100, 55),
}

def encode(path, width, q, blur=False):
    im = Image.open(path).convert("RGB")
    w, h = im.size
    nh = int(h * width / w)
    im = im.resize((width, nh), Image.LANCZOS)
    if blur:
        im = im.filter(ImageFilter.GaussianBlur(2))
    buf = io.BytesIO()
    im.save(buf, "JPEG", quality=q, optimize=True, progressive=True)
    b = buf.getvalue()
    return "data:image/jpeg;base64," + base64.b64encode(b).decode(), len(b)

out = {}
total = 0
for name, (fn, w, q) in JOBS.items():
    p = os.path.join(SRC, fn)
    if not os.path.exists(p):
        print("MISSING", p); continue
    uri, size = encode(p, w, q, blur=(name == "texture"))
    out[name] = uri
    total += size
    print(f"  {name:12} {fn:15} {w}px q{q}  -> {size//1024} KB")
json.dump(out, open(os.path.join(OUT, "images.json"), "w"))
print(f"total compressed: {total//1024} KB  (base64 ~+33%)")
