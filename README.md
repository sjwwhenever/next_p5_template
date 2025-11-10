# next p5 template

A clean, minimal template for creating interactive p5.js sketches with Next.js. Features an intuitive UI with icon controls, real-time parameter adjustments, and export capabilities.

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![p5.js](https://img.shields.io/badge/p5.js-1.10-pink?style=flat-square&logo=p5.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=flat-square&logo=tailwindcss)

## ✨ Features

### Core Functionality
- **Simple p5.js Integration**: Seamless p5.js setup with React/Next.js
- **Real-time Parameter Updates**: Modify sketch properties without reloading
- **Responsive Canvas Sizing**: Canvas automatically adjusts to container dimensions

### UI Controls
- **Icon-Based Controls**: Clean, minimalist icon buttons for common actions
- **Black & White Theme**: Professional monochrome UI design
- **Collapsible Settings Panel**: Expandable panel with customizable sketch parameters
- **Keyboard Shortcuts**: Spacebar to pause/play animation

### Export Capabilities
- **Image Capture**: Save individual frames as PNG
  - Optional transparent background support
  - Multiple quality settings (low, medium, high)
- **Video Recording**: Record 10-second video clips
  - Multiple quality presets
  - Automatic stop after duration
- **Configuration Export/Import**: Save and load sketch parameters as JSON

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/next_p5_template.git
cd next_p5_template
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) to see your sketch

## 🤖 AI-Assisted Development

This template is optimized for AI-assisted coding workflows. Use AI coding assistants to rapidly prototype and iterate on your p5.js sketches.

### Recommended AI Tools

#### Claude Code
[Claude Code](https://claude.com/claude-code) is Anthropic's official CLI for Claude, perfect for iterative development:

```bash
# Install Claude Code (if not already installed)
# Follow instructions at https://docs.claude.com/en/docs/claude-code

# Navigate to your project
cd next_p5_template

# Start coding with Claude
claude-code
```

**Example prompts for Claude Code:**
- "Add a trail effect to the bouncing circle"
- "Create a new sketch with particle physics"
- "Add color cycling based on mouse position"
- "Implement a grid of interactive shapes"

#### Kimi K2 (kimi-cc)
[Kimi K2](https://github.com/moonbitlang/kimi-cc) is another powerful AI coding assistant:

```bash
# Install kimi-cc
npm install -g kimi-cc

# Start Kimi in your project
kimi-cc
```

### Tips for AI-Assisted p5.js Development

1. **Be Specific**: Describe visual effects in detail
   - ❌ "Make it look cool"
   - ✅ "Add a trailing fade effect with 10% opacity background refresh"

2. **Iterate Incrementally**: Build features step by step
   - Start with basic shape
   - Add movement
   - Add interactivity
   - Add visual effects

3. **Reference p5.js Concepts**: Use p5.js terminology
   - "Use `lerp()` for smooth transitions"
   - "Implement Perlin noise for organic movement"
   - "Add easing with `sin()` and `cos()`"

4. **Ask for Explanations**: Understanding helps you build better
   - "Explain how this particle system works"
   - "What does the deltaTime normalization do?"

5. **Export and Share**: Save your configurations
   - Use the Export button to save sketch parameters
   - Share JSON configs with your team or across sessions

### Common AI-Assisted Workflows

**Quick Prototype:**
```
You: "Create a generative art sketch with flowing lines"
AI: [Implements sketch with custom parameters]
You: "Add color variation based on line position"
AI: [Enhances with color logic]
```

**Debug and Optimize:**
```
You: "The animation is laggy, how can I optimize it?"
AI: [Analyzes performance, suggests improvements]
```

**Learn by Example:**
```
You: "Show me how to implement flocking behavior"
AI: [Creates example with explanation]
```

## 📁 Project Structure

```
app/
├── components/
│   ├── P5Canvas.tsx           # Reusable p5.js wrapper component
│   ├── GuiPanel.tsx           # Control panel with settings and actions
│   ├── CollapsibleSection.tsx # Expandable UI section component
│   └── AuthorFooter.tsx       # Footer with author information
├── sketches/
│   └── TemplateSketch.ts      # Your p5.js sketch (edit this!)
├── types/
│   └── sketch.ts              # TypeScript type definitions and defaults
├── page.tsx                   # Main application page
├── layout.tsx                 # Root layout with metadata
└── globals.css                # Global styles and Tailwind config

public/
└── logo.JPG                   # Website favicon and logo
```

## 🎨 Customizing Your Sketch

### 1. Edit the Sketch Logic
Modify `app/sketches/TemplateSketch.ts` to create your own p5.js animation:

```typescript
const sketch = (p: p5) => {
  p.setup = () => {
    // Initialize your sketch
  };

  p.draw = () => {
    // Draw your animation
  };
};
```

### 2. Add Custom Parameters
Update `app/types/sketch.ts` to define new properties:

```typescript
export interface SketchProps {
  // Add your custom parameters
  myParameter: number;
}

export const defaultSketchParams: SketchProps = {
  myParameter: 42,
};
```

### 3. Update UI Controls
Modify `app/components/GuiPanel.tsx` to add controls for your new parameters:

```typescript
<input
  type="range"
  value={params.myParameter}
  onChange={(e) => onParamChange({ myParameter: Number(e.target.value) })}
/>
```

## 🛠️ Built With

- **[Next.js 16](https://nextjs.org/)** - React framework for production
- **[p5.js](https://p5js.org/)** - Creative coding library
- **[React 19](https://react.dev/)** - UI component library
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Lucide React](https://lucide.dev/)** - Icon library

## 📦 Deployment

### Vercel (Recommended)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/next_p5_template)

### Manual Deployment
```bash
npm run build
npm start
```

## 📚 Learn More

- [p5.js Reference](https://p5js.org/reference/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## 👤 Author

**sjwwhenever (不可兼容)**

- GitHub: [@sjwwhenever](https://github.com/sjwwhenever)
- Website: [sjwwhenever.xyz](https://sjwwhenever.xyz)
- Email: sjwwhenever@gmail.com

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/) and [p5.js](https://p5js.org/)
- Icons by [Lucide](https://lucide.dev/)
- Inspired by the creative coding community

---

Made with ❤️ by [sjwwhenever](https://github.com/sjwwhenever)
