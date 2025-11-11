# Images Directory

Place your static image files in this directory.

## Usage

Images placed here can be referenced in your Next.js app using absolute paths:

```jsx
<img src="/images/your-image.png" alt="Description" />
```

Or with Next.js Image component:

```jsx
import Image from 'next/image'

<Image src="/images/your-image.png" alt="Description" width={500} height={300} />
```

## Supported Formats

- PNG
- JPG/JPEG
- SVG
- GIF
- WebP

