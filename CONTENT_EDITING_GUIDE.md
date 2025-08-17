# Content Editing Guide for Aftermath Studios Website

## Overview
All text content on the website can be easily edited through the `content.js` file. This allows you to update text without touching the HTML code.

## How to Edit Content

1. Open the `content.js` file in any text editor
2. Find the section you want to edit
3. Change the text between the quotation marks
4. Save the file
5. Refresh your browser to see the changes (Ctrl+F5 for hard refresh)

## Content Structure

### Studio Information
```json
"studio": {
    "name": "AFTERMATH STUDIOS",  // Main studio name
    "tagline": "Art Studio"        // Tagline under logo
}
```

### Hero Section (Homepage Top)
```json
"hero": {
    "title": "Where Art Transforms Reality",  // Main headline
    "subtitle": "Exploring the boundaries...", // Subtitle text
    "ctaButton": "Read Antumbra"              // Button text
}
```

### Antumbra Section
```json
"antumbra": {
    "title": "ANTUMBRA",           // Section title
    "subtitle": "Our Latest Manga", // Subtitle
    "badges": ["ACT 1", "ONGOING"], // Status badges
    "synopsis": [                   // Array of paragraphs
        "First paragraph...",
        "Second paragraph..."
    ],
    "stats": {
        "chapters": "44",            // Number of chapters
        "acts": "3",                 // Number of acts
        "launchYear": "2024"         // Launch year
    }
}
```

### About Section
```json
"about": {
    "title": "About Aftermath",
    "paragraphs": [                 // Array of paragraphs
        "First paragraph...",
        "Second paragraph...",
        "Third paragraph..."
    ],
    "stats": {
        "artists": "15+",            // Number value
        "artistsLabel": "Featured Artists",  // Label text
        // ... more stats
    }
}
```

### Artists Section
```json
"artists": {
    "title": "Our Artists",
    "list": [                       // Array of artist objects
        {
            "name": "Sarah Mitchell",
            "specialty": "Abstract Expressionism",
            "bio": "Artist biography..."
        },
        // ... more artists
    ]
}
```

### Contact Section
```json
"contact": {
    "title": "Get In Touch",
    "address": {
        "line1": "123 Art District Lane",
        "line2": "Creative Quarter",
        "line3": "New York, NY 10001"
    },
    "details": {
        "phone": "(555) 123-4567",
        "email": "info@aftermartart.studio",
        "hours": "Tue-Sat 10AM-6PM"
    }
}
```

## Important Notes

1. **Keep JSON Format Valid**: 
   - Always use double quotes for strings
   - Don't forget commas between items
   - No trailing commas after the last item

2. **Arrays**: 
   - For multiple paragraphs or items, use square brackets `[]`
   - Separate items with commas

3. **Testing**: 
   - After editing, refresh the page
   - Check browser console for any JSON parsing errors
   - If content doesn't appear, check for JSON syntax errors

4. **Backup**: 
   - Keep a backup of the original `content.json` file
   - If something breaks, you can restore from backup

## Example Edit

To change the hero title from "Where Art Transforms Reality" to "Art Without Boundaries":

1. Open `content.js`
2. Find: `"title": "Where Art Transforms Reality",`
3. Change to: `"title": "Art Without Boundaries",`
4. Save and refresh browser (Ctrl+F5)

## Troubleshooting

- **Content not updating**: Clear browser cache (Ctrl+F5 or Cmd+Shift+R on Mac)
- **Page blank**: Check for JavaScript syntax errors in content.js
- **Console errors**: Open browser developer tools (F12) to see error messages
- **Make sure**: content.js is loaded before script.js in index.html