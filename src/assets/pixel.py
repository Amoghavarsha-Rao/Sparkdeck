from PIL import Image

import numpy as np


# Load the image
image_path = "C:/Users/artix/Desktop/logo square white bg.png"

image = Image.open(image_path)

# Pixelate the image
pixelation_level = 30  # Adjust pixelation level (higher means more pixelated)
pixelation_level = int(pixelation_level * 1.2)  # Increase pixel size by 1.2x
small_image = image.resize(
    (max(1, image.width // pixelation_level), max(1, image.height // pixelation_level)),
    resample=Image.NEAREST
)
more_pixelated_image = small_image.resize(image.size, Image.NEAREST)
# Convert to numpy array for manipulation
img_array = np.array(more_pixelated_image)

# Introduce slight vertical tolerance by randomly shifting rows
vertical_tolerance = 2  # Max pixels to shift vertically

for i in range(img_array.shape[0]):
    shift = np.random.randint(-vertical_tolerance, vertical_tolerance + 1)
    img_array[i] = np.roll(img_array[i], shift, axis=0)

# Convert back to PIL image
non_symmetrical_image = Image.fromarray(img_array)

# Save the modified image
non_symmetrical_image_path = "C:/Users/artix/Desktop/pixelated_logo.png"
non_symmetrical_image.save(non_symmetrical_image_path)

non_symmetrical_image_path
