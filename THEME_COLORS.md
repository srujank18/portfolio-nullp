# Premium Theme - Visual Quick Reference

## 🎨 Color Palette at a Glance

```
BACKGROUNDS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Pure Black      #000000  ████████████
  Deep Black      #0d0d0d  ████████████
  Charcoal        #1a1a1a  ████████████
  Dark Gray       #1f1f1f  ████████████

TEXT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  White           #ffffff  ████████████
  Light Gray      #b8b8b8  ████████████
  Medium Gray     #808080  ████████████

ACCENTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Gold            #d4af37  ████████████  (Primary)
  Emerald Green   #10b981  ████████████  (Success)
  Red             #ef4444  ████████████  (Danger)
  Amber           #f59e0b  ████████████  (Warning)
  Purple          #8b5cf6  ████████████  (Secondary)
  Teal            #06b6d4  ████████████  (Data)

BORDERS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Default         #2a2a2a  ████████████
  Light           #363636  ████████████
```

## 📊 Component Color Map

### Cards
```
Background:     #1f1f1f (Dark Gray)
Border:         #2a2a2a (Dark Gray)
Border Hover:   #363636 (Light Gray)
Accent Line:    Gold gradient on hover
Shadow:         rgba(0, 0, 0, 0.5)
Hover Shadow:   rgba(212, 175, 55, 0.1) - Gold glow
```

### Buttons
```
Gradient:       #d4af37 → #10b981 (Gold to Green)
Text:           #000000 (Black on gradient)
Hover:          Lift 2px + Gold shadow glow
Danger:         #ef4444 → #dc2626 (Red gradient)
Danger Text:    #ffffff (White)
```

### Charts
```
Tooltip BG:     #1f1f1f (Dark Gray)
Tooltip Title:  #d4af37 (Gold)
Tooltip Body:   #b8b8b8 (Light Gray)
Grid Lines:     #2a2a2a (Dark Gray)
Bar 1:          #d4af37 (Gold)
Bar 2:          #8b5cf6 (Purple)
Bar 3+:         Color palette rotation
Gains:          #10b981 (Green)
Losses:         #ef4444 (Red)
```

### Tables
```
Header BG:      Transparent
Header Text:    #b8b8b8 (Light Gray), uppercase
Row Border:     #2a2a2a (Dark Gray)
Row Hover:      #1a1a1a (Charcoal)
Category Name:  #d4af37 (Gold)
Value:          #ffffff (White)
Positive %:     #10b981 (Green)
Negative %:     #ef4444 (Red)
```

## 🎯 Usage Guidelines

### When to Use Gold (#d4af37)
- Primary accents
- Category names
- Important highlights
- Header/gradient text
- Hover states
- Button backgrounds

### When to Use Emerald (#10b981)
- Profit indicators
- Positive gains
- Success messages
- Secondary accent
- Growth indicators

### When to Use Red (#ef4444)
- Loss indicators
- Negative values
- Error states
- Caution signals

### When to Use Gray (#b8b8b8)
- Labels
- Secondary text
- Descriptions
- Metadata

### When to Use Black (#000000)
- Page background
- Text on gold (high contrast)

## 📐 Typography Map

```
h1 (Header)         2.5rem  weight 800  Gold gradient
h2 (Card Title)     1.125rem weight 600 White
h3 (Subtitle)       0.95rem  weight 500 Light Gray
Value Numbers       2.5rem  weight 800 White
Labels              0.875rem weight 500 Light Gray
Small Text          0.8rem   weight 400 Medium Gray
```

## 🎨 Gradient Examples

### Button Gradient
```
Direction: 135deg (diagonal)
Start: Gold (#d4af37)
End: Emerald (#10b981)
Creates: Premium luxury feel
```

### Header Gradient
```
Direction: 135deg
Start: Gold (#d4af37)
End: Emerald (#10b981)
Text Clip: True (gradient fills text)
```

### Card Hover Accent
```
Direction: 90deg (horizontal)
Colors: transparent → gold → transparent
Position: Top 1px line
Opacity: 0 → 1 on hover
```

## 🔄 Interactive States

### Cards
- Default: Subtle border & shadow
- Hover: Lighter border + gold shadow + gradient line
- Transition: 0.3s ease

### Buttons
- Default: Gradient background
- Hover: Translate up 2px + gold glow
- Disabled: 50% opacity
- Transition: 0.3s ease

### Form Inputs
- Default: Dark bg (#1a1a1a) + dark border
- Focus: Gold border + gold glow
- Transition: 0.3s ease

### Charts
- Default: Static display
- Hover: Bars lighten + tooltip appears
- Smooth: All color transitions

## 📏 Spacing Reference

```
Page Padding:       2rem
Gap Between Cards:  1.5rem
Card Padding:       1.75rem
Button Padding:     0.75rem 1.5rem
Border Radius:      0.75rem
Input Padding:      0.75rem
Table Cell Padding: 1rem
```

## 🌈 Shadow Reference

```
Cards (Normal):     0 2px 8px rgba(0, 0, 0, 0.5)
Cards (Hover):      0 8px 24px rgba(212, 175, 55, 0.1)
Buttons (Hover):    0 12px 24px rgba(212, 175, 55, 0.25)
Input Focus:        0 0 0 3px rgba(212, 175, 55, 0.1)
```

## 📱 Responsive Adjustments

### Desktop (1200px+)
```
H1:     2.5rem
Value:  2.5rem
Pad:    2rem
```

### Tablet (768px - 1199px)
```
H1:     1.75rem
Value:  1.75rem
Pad:    1.5rem
Grid:   2 columns
```

### Mobile (< 768px)
```
H1:     1.75rem
Value:  1.75rem
Pad:    1.25rem
Grid:   1 column
Cards:  Full width
```

## ✨ Special Effects

### Hover Effects
- Cards: Border glow + shadow expansion
- Buttons: Lift animation + color glow
- Text: Color fade transitions

### Focus Effects
- Inputs: Gold border + subtle glow
- Interactive: Clear visual feedback

### Transitions
- Duration: 0.3s
- Timing: ease (smooth acceleration)
- Properties: all (or specific)

## 🎓 Design Philosophy

**Premium = Quality + Simplicity**

- Few colors, well-used
- Clean spacing
- Clear hierarchy
- Smooth interactions
- Professional typography
- Luxury without clutter

**Black + Gold = Timeless Elegance**

- Black: Modern, luxury, focus
- Gold: Wealth, premium, highlight
- Emerald: Growth, success, prosperity
- Creates sophisticated aesthetic

---

**Reference this guide when:**
- Adding new components
- Styling new sections
- Maintaining consistency
- Making design decisions
- Updating features
