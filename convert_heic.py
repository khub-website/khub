"""Convert all HEIC files in public/slider/ to JPG and rename existing misnamed files."""
import os, sys
from pathlib import Path

try:
    from pillow_heif import register_heif_opener
    from PIL import Image
    register_heif_opener()
except ImportError:
    print("ERROR: pillow-heif not installed. Run: pip install pillow-heif")
    sys.exit(1)

slider_dir = Path(__file__).parent / "public" / "slider"
print(f"Processing: {slider_dir}")

converted = []

for f in sorted(slider_dir.iterdir()):
    if f.suffix.lower() in ('.heic', '.heif'):
        out = f.with_suffix('.jpg')
        print(f"  Converting: {f.name} -> {out.name}")
        img = Image.open(f)
        img = img.convert("RGB")
        # Resize to max 1920px on longest side for web
        max_dim = 1920
        if max(img.size) > max_dim:
            ratio = max_dim / max(img.size)
            new_size = (int(img.width * ratio), int(img.height * ratio))
            img = img.resize(new_size, Image.LANCZOS)
        img.save(out, "JPEG", quality=88)
        converted.append(out.name)
        print(f"    OK ({img.width}x{img.height})")
    elif f.suffix.lower() == '.jpg':
        # Check if it's actually a HEIC file disguised as JPG
        with open(f, 'rb') as fh:
            header = fh.read(4)
        if header[:2] != b'\xff\xd8':
            print(f"  Fixing misnamed HEIC: {f.name}")
            img = Image.open(f)
            img = img.convert("RGB")
            max_dim = 1920
            if max(img.size) > max_dim:
                ratio = max_dim / max(img.size)
                new_size = (int(img.width * ratio), int(img.height * ratio))
                img = img.resize(new_size, Image.LANCZOS)
            img.save(f, "JPEG", quality=88)
            converted.append(f.name)
            print(f"    OK ({img.width}x{img.height})")
        else:
            print(f"  Already valid JPG: {f.name}")

print(f"\nDone! Converted {len(converted)} files.")
print("\nAll JPG files in slider/:")
for f in sorted(slider_dir.glob("*.jpg")):
    print(f"  {f.name} ({f.stat().st_size // 1024} KB)")
