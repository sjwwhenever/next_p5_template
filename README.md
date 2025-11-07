# Next.js + p5.js Template

A clean, minimal template for creating interactive p5.js sketches with Next.js, featuring a simple animated circle example and UI controls.

## Features

- **Simple p5.js Integration**: Ready-to-use p5.js setup with React/Next.js
- **UI Controls**: Minimal control panel with collapsible sections
- **Export Capabilities**:
  - Capture images (with transparent background option)
  - Record videos (10 seconds, multiple quality settings)
  - Save/load configuration as JSON
- **Keyboard Shortcuts**: Spacebar to pause/play
- **Real-time Parameter Updates**: Change sketch properties without reloading

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) to see your sketch

## Project Structure

```
app/
├── components/
│   ├── P5Canvas.tsx          # Reusable p5.js wrapper
│   ├── GuiPanel.tsx          # Control panel UI
│   └── CollapsibleSection.tsx # UI component
├── sketches/
│   └── circleSketch.ts       # Your p5.js sketch (edit this!)
├── types/
│   └── sketch.ts             # Type definitions
├── page.tsx                  # Main page
├── layout.tsx                # App layout
└── globals.css               # Global styles
```

## Customizing Your Sketch

1. **Edit the sketch**: Modify `app/sketches/circleSketch.ts`
2. **Update parameters**: Change `app/types/sketch.ts` to add new properties
3. **Update UI controls**: Modify `app/components/GuiPanel.tsx` to match your parameters
4. **Adjust defaults**: Edit `defaultSketchParams` in `app/types/sketch.ts`

## Built With

- [Next.js 16](https://nextjs.org/) - React framework
- [p5.js](https://p5js.org/) - Creative coding library
- [React](https://react.dev/) - UI framework
- [Tailwind CSS v4](https://tailwindcss.com/) - Styling
- [TypeScript](https://www.typescriptlang.org/) - Type safety

## Learn More

- [p5.js Documentation](https://p5js.org/reference/)
- [Next.js Documentation](https://nextjs.org/docs)
- [p5-wrapper Documentation](https://github.com/P5-wrapper/react)
