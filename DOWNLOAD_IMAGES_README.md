# Downloading User-Attachment Images

## ⚠️ ACTION REQUIRED

This PR has converted all GitHub user-attachment URLs to local references, but **9 images still need to be downloaded** due to network restrictions in the sandboxed build environment.

**Why can't the images be downloaded automatically?**
- The GitHub user-attachments CDN (github-production-user-asset-6210df.s3.amazonaws.com) is blocked in the Copilot sandboxed environment
- Images must be downloaded from a machine with internet access
- Scripts are provided below to automate this process

**Quick Start:**
```bash
# From a machine with internet access, run:
./download-images.sh
```

## Overview

This repository has been updated to use local copies of GitHub user-attachment images instead of linking directly to GitHub's CDN. The markdown files have been updated to reference local paths, but the actual image files need to be downloaded.

## Images Already Available

The following 3 images were copied from the Bluefin documentation repository and are already in place:
- `69f64ed1-7fcc-4040-9a3d-12b71308da1b.png` (Podman Desktop)
- `2daf276d-2aed-47b9-9792-923d674ef226.png` (DistroShelf)
- `2a4dc4b5-f1a8-4781-80a4-92ea4dfeeb97.png` (Terminal containers)

## Images That Need to Be Downloaded

The following 9 images need to be downloaded and placed in `static/img/user-attachments/`:

1. `682057ec-e435-4fe7-aca5-928ee1a7063f.png` - rebase-helper tool (from release-streams.md)
2. `af508f58-e696-4eba-956b-ad3dea19d315.png` - Newelle AI interface (from local-ai.md)
3. `55798d51-0ec0-4029-af90-fae9d9ade5cd.png` - bbrew tool (from local-kubernetes.md)
4. `59e24766-0885-4fc8-a6e9-87339672487c.png` - Bold Brew image (from 2025 wrap-up blog)
5. `c1359b27-a04b-4ca4-82b7-ca669890c653.png` - Aurora metrics (from 2025 wrap-up blog)
6. `d096c0bf-4dea-4dca-a3d5-d41c8ac80bd9.png` - Contributors chart (from 2025 wrap-up blog)
7. `3d93c1f3-eb12-44c5-bd0f-08fef60e0c2b.png` - Issues chart (from 2025 wrap-up blog)
8. `611291de-4cea-4b20-8050-8f0dcc5b2109.png` - Commits chart (from 2025 wrap-up blog)
9. `f36f5e8e-2b5d-4ef1-bb97-97da0d62e185.png` - Stargazer4 banner (from Nov 2025 blog)

## How to Download

### Option 1: Using Bash Script (Recommended)

Run the bash script from a machine with internet access:

```bash
chmod +x download-images.sh
./download-images.sh
```

This script will:
- Download all 9 missing images from GitHub
- Save them to `static/img/user-attachments/`
- Skip images that already exist (3 images are already in place)
- Report success/failure for each image

### Option 2: Using Node.js Script

Run the Node.js download script:

```bash
node download-user-attachments.js
```

### Option 3: Using curl (Manual)

```bash
cd static/img/user-attachments/

curl -L "https://github.com/user-attachments/assets/682057ec-e435-4fe7-aca5-928ee1a7063f" -o "682057ec-e435-4fe7-aca5-928ee1a7063f.png"
curl -L "https://github.com/user-attachments/assets/af508f58-e696-4eba-956b-ad3dea19d315" -o "af508f58-e696-4eba-956b-ad3dea19d315.png"
curl -L "https://github.com/user-attachments/assets/55798d51-0ec0-4029-af90-fae9d9ade5cd" -o "55798d51-0ec0-4029-af90-fae9d9ade5cd.png"
curl -L "https://github.com/user-attachments/assets/59e24766-0885-4fc8-a6e9-87339672487c" -o "59e24766-0885-4fc8-a6e9-87339672487c.png"
curl -L "https://github.com/user-attachments/assets/c1359b27-a04b-4ca4-82b7-ca669890c653" -o "c1359b27-a04b-4ca4-82b7-ca669890c653.png"
curl -L "https://github.com/user-attachments/assets/d096c0bf-4dea-4dca-a3d5-d41c8ac80bd9" -o "d096c0bf-4dea-4dca-a3d5-d41c8ac80bd9.png"
curl -L "https://github.com/user-attachments/assets/3d93c1f3-eb12-44c5-bd0f-08fef60e0c2b" -o "3d93c1f3-eb12-44c5-bd0f-08fef60e0c2b.png"
curl -L "https://github.com/user-attachments/assets/611291de-4cea-4b20-8050-8f0dcc5b2109" -o "611291de-4cea-4b20-8050-8f0dcc5b2109.png"
curl -L "https://github.com/user-attachments/assets/f36f5e8e-2b5d-4ef1-bb97-97da0d62e185" -o "f36f5e8e-2b5d-4ef1-bb97-97da0d62e185.png"
```

### Option 4: Manual Browser Download

If automated downloads fail, manually download each image:

1. Open each URL in a browser:
   - `https://github.com/user-attachments/assets/682057ec-e435-4fe7-aca5-928ee1a7063f`
   - `https://github.com/user-attachments/assets/af508f58-e696-4eba-956b-ad3dea19d315`
   - (etc. - see list above in "Images That Need to Be Downloaded")

2. Right-click and save each image

3. Rename the downloaded files to: `{uuid}.png` (e.g., `682057ec-e435-4fe7-aca5-928ee1a7063f.png`)

4. Place all downloaded images in: `static/img/user-attachments/`

## Verification

After downloading the images, verify they exist:

```bash
ls -lh static/img/user-attachments/
```

You should see all 12 PNG files (3 existing + 9 downloaded).

## Testing

Build and serve the documentation site to verify all images load correctly:

```bash
npm run build
npm run serve
```

Then visit the pages that use these images:
- http://localhost:3000/guides/release-streams
- http://localhost:3000/guides/local-ai
- http://localhost:3000/dx/local-kubernetes
- http://localhost:3000/dx/aurora-dx-intro
- http://localhost:3000/blog/aurora-2025
- http://localhost:3000/blog/stargazer-4

## Why This Change?

This migration enables:
- Full offline documentation viewing
- Faster page loads via local asset serving
- Independence from GitHub CDN availability
- Better caching and performance
- Follows Docusaurus best practices for static assets
