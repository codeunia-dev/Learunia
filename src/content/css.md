# CSS Cheatsheet

## Selectors

```css
/* Basic selectors */
* { } /* Universal selector */
element { } /* Element selector */
.class { } /* Class selector */
#id { } /* ID selector */

/* Attribute selectors */
[attr] { } /* Has attribute */
[attr=value] { } /* Exact match */
[attr*=value] { } /* Contains */
[attr^=value] { } /* Starts with */
[attr$=value] { } /* Ends with */

/* Pseudo-classes */
:first-child { } /* First child */
:last-child { } /* Last child */
:nth-child(n) { } /* Nth child */
:hover { } /* Mouse over */
:focus { } /* Focused */
:active { } /* Active state */
:visited { } /* Visited link */
:disabled { } /* Disabled element */

/* Pseudo-elements */
::before { content: ""; } /* Before element */
::after { content: ""; } /* After element */
::first-line { } /* First line */
::first-letter { } /* First letter */
::selection { } /* Selected text */
```

## Box Model

```css
/* Box model properties */
.box {
  width: 200px;
  height: 100px;
  padding: 20px;
  border: 2px solid #333;
  margin: 10px;
  box-sizing: border-box; /* Include padding/border in width/height */
}

/* Box sizing */
.box-content { box-sizing: content-box; } /* Default */
.box-border { box-sizing: border-box; } /* Include padding/border */
```

## Layout Properties

```css
/* Display */
.inline { display: inline; }
.block { display: block; }
.inline-block { display: inline-block; }
.flex { display: flex; }
.grid { display: grid; }
.none { display: none; }

/* Position */
.static { position: static; } /* Default */
.relative { position: relative; } /* Relative to normal position */
.absolute { position: absolute; } /* Relative to nearest positioned ancestor */
.fixed { position: fixed; } /* Relative to viewport */
.sticky { position: sticky; } /* Sticky positioning */

/* Z-index */
.z-1 { z-index: 1; }
.z-10 { z-index: 10; }
.z-100 { z-index: 100; }
.z-auto { z-index: auto; }
```

## Flexbox

```css
/* Flex container */
.flex-container {
  display: flex;
  flex-direction: row; /* row | row-reverse | column | column-reverse */
  flex-wrap: wrap; /* nowrap | wrap | wrap-reverse */
  justify-content: center; /* flex-start | flex-end | center | space-between | space-around | space-evenly */
  align-items: center; /* stretch | flex-start | flex-end | center | baseline */
  align-content: space-between; /* flex-start | flex-end | center | space-between | space-around | stretch */
}

/* Flex items */
.flex-item {
  flex: 1; /* Shorthand for flex-grow, flex-shrink, flex-basis */
  flex-grow: 1; /* Grow factor */
  flex-shrink: 1; /* Shrink factor */
  flex-basis: auto; /* Initial size */
  align-self: center; /* Override align-items */
  order: 1; /* Order in flex container */
}
```

## Grid

```css
/* Grid container */
.grid-container {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr; /* Fractional units */
  grid-template-rows: 100px 200px; /* Fixed heights */
  grid-gap: 20px; /* Gap between grid items */
  grid-template-areas: 
    "header header header"
    "sidebar main aside"
    "footer footer footer";
}

/* Grid items */
.grid-item {
  grid-column: 1 / 3; /* Start at line 1, end at line 3 */
  grid-row: 1 / 2; /* Start at line 1, end at line 2 */
  grid-area: main; /* Named grid area */
  justify-self: center; /* Horizontal alignment within cell */
  align-self: center; /* Vertical alignment within cell */
}

/* Grid lines */
.grid-lines {
  grid-template-columns: [start] 1fr [middle] 2fr [end];
  grid-column: start / end;
}
```

## Typography

```css
/* Font properties */
.text {
  font-family: "Arial", sans-serif;
  font-size: 16px;
  font-weight: bold; /* normal | bold | 100-900 */
  font-style: italic; /* normal | italic | oblique */
  font-variant: small-caps; /* normal | small-caps */
  line-height: 1.5; /* Multiplier or fixed value */
  text-align: center; /* left | right | center | justify */
  text-decoration: underline; /* none | underline | overline | line-through */
  text-transform: uppercase; /* none | capitalize | uppercase | lowercase */
  letter-spacing: 2px; /* Spacing between characters */
  word-spacing: 5px; /* Spacing between words */
}
```

## Colors and Backgrounds

```css
/* Colors */
.color {
  color: #ff0000; /* Hex */
  color: rgb(255, 0, 0); /* RGB */
  color: rgba(255, 0, 0, 0.5); /* RGBA with alpha */
  color: hsl(0, 100%, 50%); /* HSL */
  color: hsla(0, 100%, 50%, 0.5); /* HSLA with alpha */
  color: red; /* Named colors */
}

/* Backgrounds */
.background {
  background-color: #f0f0f0;
  background-image: url('image.jpg');
  background-repeat: no-repeat; /* repeat | no-repeat | repeat-x | repeat-y */
  background-position: center; /* top | bottom | left | right | center */
  background-size: cover; /* cover | contain | auto | 100% 100% */
  background-attachment: fixed; /* scroll | fixed | local */
  background: linear-gradient(to right, #ff0000, #00ff00); /* Gradient */
}
```

## Borders and Shadows

```css
/* Borders */
.border {
  border: 2px solid #333; /* Shorthand */
  border-width: 2px;
  border-style: solid; /* solid | dashed | dotted | double | groove | ridge | inset | outset */
  border-color: #333;
  border-radius: 10px; /* Rounded corners */
  border-top-left-radius: 10px; /* Individual corners */
}

/* Shadows */
.shadow {
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.3); /* Box shadow */
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5); /* Text shadow */
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.3)); /* Drop shadow */
}
```

## Transforms and Transitions

```css
/* Transforms */
.transform {
  transform: translateX(20px); /* Move horizontally */
  transform: translateY(-20px); /* Move vertically */
  transform: translate(20px, -20px); /* Move both */
  transform: scale(1.5); /* Scale up */
  transform: scaleX(2); /* Scale horizontally */
  transform: scaleY(0.5); /* Scale vertically */
  transform: rotate(45deg); /* Rotate */
  transform: skewX(20deg); /* Skew horizontally */
  transform: skewY(10deg); /* Skew vertically */
  transform: matrix(1, 0, 0, 1, 20, 20); /* Matrix transform */
}

/* Multiple transforms */
.multiple-transforms {
  transform: translateX(20px) rotate(45deg) scale(1.2);
}

/* Transitions */
.transition {
  transition: all 0.3s ease; /* Shorthand */
  transition-property: all; /* Specific properties */
  transition-duration: 0.3s; /* Duration */
  transition-timing-function: ease; /* ease | linear | ease-in | ease-out | ease-in-out | cubic-bezier() */
  transition-delay: 0s; /* Delay before transition starts */
}
```

## Animations

```css
/* Keyframes */
@keyframes slideIn {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

/* Animation properties */
.animate {
  animation: slideIn 1s ease-in-out; /* Shorthand */
  animation-name: slideIn; /* Name of keyframes */
  animation-duration: 1s; /* Duration */
  animation-timing-function: ease-in-out; /* Timing function */
  animation-delay: 0s; /* Delay */
  animation-iteration-count: infinite; /* Number of iterations */
  animation-direction: normal; /* normal | reverse | alternate | alternate-reverse */
  animation-fill-mode: both; /* none | forwards | backwards | both */
  animation-play-state: running; /* running | paused */
}
```

## Media Queries

```css
/* Responsive design */
@media screen and (max-width: 768px) {
  .mobile {
    font-size: 14px;
    padding: 10px;
  }
}

@media screen and (min-width: 769px) and (max-width: 1024px) {
  .tablet {
    font-size: 16px;
    padding: 20px;
  }
}

@media screen and (min-width: 1025px) {
  .desktop {
    font-size: 18px;
    padding: 30px;
  }
}

/* Print styles */
@media print {
  .print {
    color: black;
    background: white;
  }
}
```

## CSS Variables (Custom Properties)

```css
/* Define variables */
:root {
  --primary-color: #007bff;
  --secondary-color: #6c757d;
  --font-size: 16px;
  --spacing: 20px;
}

/* Use variables */
.element {
  color: var(--primary-color);
  font-size: var(--font-size);
  margin: var(--spacing);
  background-color: var(--secondary-color, #default); /* With fallback */
}
```

## Pseudo-elements and Content

```css
/* Before and after content */
.element::before {
  content: "→ "; /* Text content */
  content: url('icon.png'); /* Image content */
  content: attr(data-label); /* Attribute content */
  content: counter(item); /* Counter content */
  content: ""; /* Empty content for styling */
}

/* Counters */
.container {
  counter-reset: item; /* Reset counter */
}

.item {
  counter-increment: item; /* Increment counter */
}

.item::before {
  content: counter(item) ". "; /* Display counter */
}
```

## Filters

```css
/* CSS filters */
.filter {
  filter: blur(5px); /* Blur effect */
  filter: brightness(150%); /* Brightness */
  filter: contrast(200%); /* Contrast */
  filter: grayscale(100%); /* Grayscale */
  filter: hue-rotate(90deg); /* Hue rotation */
  filter: invert(100%); /* Invert colors */
  filter: opacity(50%); /* Opacity */
  filter: saturate(200%); /* Saturation */
  filter: sepia(100%); /* Sepia effect */
  filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.3)); /* Drop shadow */
}

/* Multiple filters */
.multiple-filters {
  filter: grayscale(50%) blur(2px) brightness(120%);
}
```

## CSS Grid Areas

```css
/* Named grid areas */
.layout {
  display: grid;
  grid-template-areas: 
    "header header header"
    "sidebar main aside"
    "footer footer footer";
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-rows: auto 1fr auto;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.aside { grid-area: aside; }
.footer { grid-area: footer; }
```

## Responsive Images

```css
/* Responsive images */
.responsive-img {
  max-width: 100%;
  height: auto;
  object-fit: cover; /* cover | contain | fill | none | scale-down */
  object-position: center; /* Position within container */
}

/* Picture element support */
.picture {
  width: 100%;
  height: 300px;
  background-size: cover;
  background-position: center;
}
```

## Best Practices

```css
/* Use semantic class names */
.button-primary { } /* Instead of .btn-blue */
.navigation-main { } /* Instead of .nav-top */

/* Use relative units */
.container {
  max-width: 1200px; /* Instead of fixed pixels */
  padding: 2rem; /* Instead of 32px */
  font-size: 1.125rem; /* Instead of 18px */
}

/* Mobile-first approach */
.element {
  padding: 1rem; /* Mobile styles */
}

@media (min-width: 768px) {
  .element {
    padding: 2rem; /* Desktop styles */
  }
}

/* Use CSS custom properties for theming */
.theme-light {
  --bg-color: #ffffff;
  --text-color: #333333;
}

.theme-dark {
  --bg-color: #333333;
  --text-color: #ffffff;
}
```

## Common Layout Patterns

```css
/* Centering elements */
.center-flex {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.center-grid {
  display: grid;
  place-items: center;
  min-height: 100vh;
}

.center-absolute {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* Sticky footer */
.page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1;
}

.footer {
  margin-top: auto;
}

/* Card layout */
.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: 10px;
}

/* Masonry-like layout */
.masonry {
  columns: 3;
  column-gap: 20px;
}

.masonry-item {
  break-inside: avoid;
  margin-bottom: 20px;
}
```
