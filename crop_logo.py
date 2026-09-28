from PIL import Image

img = Image.open("frontend/public/logo.png").convert("RGB")
width, height = img.size
pixels = img.load()

# Find bounding box of non-white pixels (RGB not all >= 250)
min_x, min_y = width, height
max_x, max_y = 0, 0

for y in range(height):
    for x in range(width):
        r, g, b = pixels[x, y]
        # Check if pixel is not pure white/near white
        if r < 245 or g < 245 or b < 245:
            if x < min_x: min_x = x
            if y < min_y: min_y = y
            if x > max_x: max_x = x
            if y > max_y: max_y = y

print(f"Original size: {width}x{height}")
print(f"Content bbox: ({min_x}, {min_y}, {max_x}, {max_y})")

if min_x < max_x and min_y < max_y:
    pad = 12
    left = max(0, min_x - pad)
    top = max(0, min_y - pad)
    right = min(width, max_x + pad)
    bottom = min(height, max_y + pad)
    
    cropped = img.crop((left, top, right, bottom))
    cropped.save("frontend/public/logo.png")
    print(f"Successfully cropped logo to: {cropped.size}")
