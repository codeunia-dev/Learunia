# HTML5 Cheatsheet

## Basic Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Title</title>
</head>
<body>
    <header>
        <nav>Navigation</nav>
    </header>
    <main>
        <article>Main content</article>
        <aside>Sidebar</aside>
    </main>
    <footer>Footer content</footer>
</body>
</html>
```

## Semantic Elements

### Structure Elements
```html
<header>     <!-- Page/section header -->
<nav>        <!-- Navigation links -->
<main>       <!-- Main content area -->
<section>    <!-- Thematic grouping -->
<article>    <!-- Independent content -->
<aside>      <!-- Sidebar content -->
<footer>     <!-- Page/section footer -->
<figure>     <!-- Self-contained content -->
<figcaption> <!-- Figure caption -->
```

### Text Content
```html
<h1> to <h6>  <!-- Headings -->
<p>           <!-- Paragraph -->
<blockquote>  <!-- Long quotation -->
<pre>         <!-- Preformatted text -->
<code>        <!-- Code snippet -->
<kbd>         <!-- Keyboard input -->
<samp>        <!-- Sample output -->
```

## Forms & Input

### Form Structure
```html
<form action="/submit" method="post">
    <fieldset>
        <legend>Personal Information</legend>
        
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" required>
        
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>
        
        <button type="submit">Submit</button>
    </fieldset>
</form>
```

### Input Types
```html
<!-- Text inputs -->
<input type="text">       <!-- Plain text -->
<input type="email">      <!-- Email validation -->
<input type="password">   <!-- Hidden text -->
<input type="search">     <!-- Search field -->
<input type="tel">        <!-- Telephone -->
<input type="url">        <!-- URL validation -->

<!-- Number inputs -->
<input type="number" min="0" max="100" step="1">
<input type="range" min="0" max="100" value="50">

<!-- Date/Time inputs -->
<input type="date">       <!-- Date picker -->
<input type="time">       <!-- Time picker -->
<input type="datetime-local"> <!-- Date & time -->
<input type="month">      <!-- Month picker -->
<input type="week">       <!-- Week picker -->

<!-- File/Media -->
<input type="file" accept=".jpg,.png">
<input type="color">      <!-- Color picker -->

<!-- Selection -->
<input type="checkbox">   <!-- Checkbox -->
<input type="radio">      <!-- Radio button -->

<!-- Buttons -->
<input type="submit" value="Submit">
<input type="reset" value="Reset">
<input type="button" value="Click">
<button type="submit">Submit</button>
```

### Form Validation
```html
<!-- Required field -->
<input type="text" required>

<!-- Pattern validation -->
<input type="text" pattern="[A-Za-z]{3,}" title="3+ letters">

<!-- Length constraints -->
<input type="text" minlength="3" maxlength="20">

<!-- Number constraints -->
<input type="number" min="18" max="99">

<!-- Custom validation message -->
<input type="email" required 
       oninvalid="this.setCustomValidity('Please enter valid email')"
       oninput="this.setCustomValidity('')">
```

## Lists

```html
<!-- Unordered list -->
<ul>
    <li>Item 1</li>
    <li>Item 2</li>
</ul>

<!-- Ordered list -->
<ol>
    <li>First item</li>
    <li>Second item</li>
</ol>

<!-- Definition list -->
<dl>
    <dt>Term</dt>
    <dd>Definition</dd>
</dl>
```

## Tables

```html
<table>
    <caption>Table Caption</caption>
    <thead>
        <tr>
            <th scope="col">Header 1</th>
            <th scope="col">Header 2</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Data 1</td>
            <td>Data 2</td>
        </tr>
    </tbody>
    <tfoot>
        <tr>
            <td>Footer 1</td>
            <td>Footer 2</td>
        </tr>
    </tfoot>
</table>
```

## Media Elements

### Images
```html
<!-- Basic image -->
<img src="image.jpg" alt="Description">

<!-- Responsive image -->
<img src="small.jpg" 
     srcset="small.jpg 300w, medium.jpg 600w, large.jpg 1200w"
     sizes="(max-width: 600px) 300px, (max-width: 1200px) 600px, 1200px"
     alt="Responsive image">

<!-- Image with figure -->
<figure>
    <img src="chart.png" alt="Sales chart">
    <figcaption>Q4 Sales Performance</figcaption>
</figure>
```

### Audio & Video
```html
<!-- Audio -->
<audio controls>
    <source src="audio.mp3" type="audio/mpeg">
    <source src="audio.ogg" type="audio/ogg">
    Your browser doesn't support audio.
</audio>

<!-- Video -->
<video controls width="640" height="480">
    <source src="video.mp4" type="video/mp4">
    <source src="video.webm" type="video/webm">
    <track kind="subtitles" src="subtitles.vtt" srclang="en" label="English">
    Your browser doesn't support video.
</video>
```

## Meta Tags & SEO

```html
<head>
    <!-- Essential meta tags -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Page Title - Site Name</title>
    <meta name="description" content="Page description">
    
    <!-- Open Graph (Facebook) -->
    <meta property="og:title" content="Page Title">
    <meta property="og:description" content="Page description">
    <meta property="og:image" content="image.jpg">
    <meta property="og:url" content="https://example.com">
    <meta property="og:type" content="website">
    
    <!-- Twitter Cards -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="Page Title">
    <meta name="twitter:description" content="Page description">
    <meta name="twitter:image" content="image.jpg">
    
    <!-- Favicon -->
    <link rel="icon" type="image/x-icon" href="/favicon.ico">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">
</head>
```

## Accessibility

### ARIA Attributes
```html
<!-- Roles -->
<div role="button" tabindex="0">Custom button</div>
<div role="navigation">Nav content</div>
<div role="main">Main content</div>

<!-- Labels -->
<button aria-label="Close dialog">×</button>
<input aria-labelledby="search-label">

<!-- States -->
<button aria-expanded="false">Menu</button>
<div aria-hidden="true">Hidden content</div>
<input aria-required="true">
<div aria-live="polite">Status updates</div>
```

### Best Practices
```html
<!-- Use semantic elements -->
<button> instead of <div onclick="">
<a href="#"> instead of <div onclick="">

<!-- Proper heading hierarchy -->
<h1>Main title</h1>
  <h2>Section title</h2>
    <h3>Subsection title</h3>

<!-- Form labels -->
<label for="username">Username:</label>
<input type="text" id="username" name="username">

<!-- Image alt text -->
<img src="chart.png" alt="Sales increased 25% in Q4">

<!-- Skip navigation -->
<a href="#main-content" class="skip-link">Skip to main content</a>
```

## Global Attributes

```html
<!-- Common attributes for all elements -->
id="unique-identifier"
class="css-class-names"
style="css: properties;"
title="tooltip text"
lang="en"
dir="ltr"
tabindex="0"
accesskey="k"
contenteditable="true"
draggable="true"
hidden
spellcheck="false"
translate="no"

<!-- Data attributes -->
data-custom="value"
data-user-id="123"
```

## HTML5 APIs (JavaScript)

### Local Storage
```javascript
// Store data
localStorage.setItem('key', 'value');

// Retrieve data
const value = localStorage.getItem('key');

// Remove data
localStorage.removeItem('key');

// Clear all
localStorage.clear();
```

### Geolocation
```javascript
navigator.geolocation.getCurrentPosition(
    (position) => {
        console.log(position.coords.latitude);
        console.log(position.coords.longitude);
    },
    (error) => console.error(error)
);
```

### Web Workers
```javascript
// Create worker
const worker = new Worker('worker.js');

// Send message
worker.postMessage('Hello');

// Receive message
worker.onmessage = (e) => {
    console.log(e.data);
};
```

## Best Practices

1. **Use semantic HTML** - Choose elements based on meaning, not appearance
2. **Validate your HTML** - Use W3C validator
3. **Optimize for accessibility** - Use proper ARIA attributes and semantic structure
4. **Mobile-first approach** - Design for mobile, enhance for desktop
5. **Performance** - Optimize images, minimize HTTP requests
6. **SEO-friendly** - Use proper meta tags and structured data
