# Accessibility Testing Guide

This guide covers manual testing for WCAG 2.1 compliance across the konfigurator app.

## Screen Reader Testing

### Using VoiceOver (Mac)
```bash
# Enable VoiceOver
Cmd + F5

# Common commands:
VO + Right Arrow     # Read next item
VO + Left Arrow      # Read previous item
VO + U               # Open rotor (quick navigation)
Tab                  # Navigate by tab order
```

**Test Cases:**
1. [ ] VoiceOver announces all interactive elements (buttons, links, inputs)
2. [ ] Watch description updates are announced when selections change
3. [ ] Loading spinner is announced when loading
4. [ ] Disabled buttons are announced as "dimmed" or "disabled"
5. [ ] Skip links are available when pressing Tab from start
6. [ ] Step navigation is announced with current/completed status
7. [ ] Form labels (fieldset/legend) properly associate with options

### Using NVDA (Windows)
```bash
# Download: https://www.nvaccess.org/
# Start reading: Insert + Down Arrow
# Stop reading: Control

# Common commands:
Down Arrow           # Read next line
Up Arrow             # Read previous line
Insert + F7          # Open elements list
Tab                  # Navigate by tab order
```

**Test Cases:** Same as VoiceOver above

### Using JAWS (Windows - Commercial)
- Similar navigation to NVDA
- Test with Forms Mode (Enter) and Browse Mode

---

## Keyboard Navigation Testing

### Test Without Mouse
1. [ ] Tab through entire app - all interactive elements are reachable
2. [ ] Tab order follows visual flow (left-to-right, top-to-bottom)
3. [ ] No keyboard traps (can always escape with Esc or Tab)
4. [ ] Focus indicators are visible on all interactive elements
5. [ ] Focus outlines are consistent across all buttons/links

### Keyboard Shortcuts to Test
```
Tab              Navigate forward
Shift + Tab      Navigate backward
Enter            Activate buttons/links
Space            Toggle selection (checkboxes, radio buttons)
Arrow Keys       Rotate 3D watch model
+                Zoom in on 3D model
-                Zoom out on 3D model
?                Toggle keyboard help (if implemented)
```

### Navigation Flow
- [ ] Start → Band Step → Watch Case → Dial Details → Dial Color → Overview
- [ ] Previous/Next buttons navigate correctly
- [ ] Disabled buttons are not focusable (use Tab to verify)
- [ ] Can reach all option buttons with Tab

---

## Color & Contrast Testing

### Current Colors Requiring Design Review
- **Subtext** (#9C9B9B): Current 2.4:1 contrast
  - Recommended for WCAG AA: #6B6969 (4.7:1 contrast)
  - Status: Meets WCAG A, doesn't meet WCAG AA
  
- **Disabled Buttons** (#CDCDCD): Current 2.1:1 contrast
  - Recommended for WCAG AA: #999999 (4.8:1 contrast)
  - Status: Meets WCAG A, doesn't meet WCAG AA

### Contrast Checking Tools
- WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/
- Color Contrast Analyzer: https://www.tpgi.com/color-contrast-checker/
- Browser Extensions: WAVE, Axe DevTools

### Test Cases
- [ ] All text has sufficient contrast against background
- [ ] Focus indicators (2px outlines) are clearly visible
- [ ] Color isn't the only indicator of state (also use text/underlines)

---

## Touch Target Size Testing

### Recommended Sizes
- **WCAG AA**: 44px × 44px minimum (not required, but recommended)
- **Current Implementation**: 
  - Option buttons: 44px × 44px ✅
  - Navigation buttons: 33px × 33px (below recommendation)
  - All other buttons: Adequate spacing

### Mobile Testing
- [ ] Can tap option buttons accurately with thumb (44px)
- [ ] No accidental taps on nearby buttons
- [ ] Buttons are large enough for users with motor difficulties

---

## Focus Indicator Testing

### Visual Focus Indicators
All interactive elements now use consistent style:
```css
outline: 2px solid black;
outline-offset: 2px;
```

### Test Cases
- [ ] Navigation buttons show focus ring
- [ ] Logo link shows focus ring
- [ ] Cart button shows focus ring
- [ ] Navigation links show focus ring
- [ ] Add to Cart button shows full focus ring (not clipped)
- [ ] Option buttons show focus ring (2px outline + 2px offset)
- [ ] All outlines are visible without being cut off by container

---

## 3D Canvas Accessibility

### Screen Reader Behavior
- [ ] Canvas has proper `role="img"`
- [ ] `aria-label` describes current watch configuration
- [ ] Configuration description updates when selections change
- [ ] Keyboard controls are documented for screen readers
- [ ] Skip link allows bypassing 3D canvas

### Keyboard Interaction
- [ ] Canvas can be focused (Tab key)
- [ ] Arrow keys rotate the watch
- [ ] +/- keys zoom in/out
- [ ] ? key shows help (optional)
- [ ] Focus can move away from canvas (not trapped)

---

## Semantic HTML Testing

### Form Structure
- [ ] Fieldset/Legend used for option groups ✅
- [ ] OptionGroup has proper `<fieldset>` wrapper ✅
- [ ] Buttons are `<button>` elements, not `<div>` ✅
- [ ] Links are `<a>` elements with valid `href` ✅

### Navigation Structure
- [ ] StepBar is wrapped in `<nav>` element ✅
- [ ] StepBar has `aria-label="Configuration steps"` ✅
- [ ] StepItems have `role="tab"` and `aria-selected` ✅
- [ ] Header has semantic structure ✅

### Heading Hierarchy
- [ ] Page has single `<h1>` or proper hierarchy
- [ ] Headings are sequential (no skipping levels)
- [ ] Headings use semantic tags, not styled divs

---

## Common Issues to Watch For

### ✅ Already Fixed
- Focus indicators on all interactive elements
- Proper button disabled states with HTML `disabled` attribute
- Semantic navigation and step indicators
- Screen reader announcements for loading states
- Proper form structure with fieldset/legend
- Skip links for keyboard navigation
- ARIA labels on interactive elements
- 44px touch targets for option buttons

### ⚠️ Known Limitations
- Subtext contrast below WCAG AA (awaiting designer review)
- Disabled button contrast below WCAG AA (awaiting designer review)
- 3D canvas is visual-only (audio description would be complex)
- Some navigation links may need actual URL destinations (currently using hash)

### 🔍 Still to Test
- Real screen reader testing (VoiceOver, NVDA, JAWS)
- Actual mobile touch testing
- Testing with browser zoom/text scaling
- Testing with reduced motion preferences
- Testing with high contrast mode

---

## Automated Accessibility Testing Tools

### Browser Extensions
- **Axe DevTools**: https://www.deque.com/axe/devtools/
- **WAVE**: https://wave.webaim.org/extension/
- **Lighthouse**: Built into Chrome DevTools (Audits tab)
- **ARIA DevTools**: https://chrome.google.com/webstore/

### Command Line Tools
```bash
# Install pa11y (automated accessibility testing)
npm install -g pa11y

# Run on local dev server
pa11y http://localhost:5173
```

### Online Testing
- WebAIM WAVE: https://wave.webaim.org/
- TPGI Accessibility Checker: https://www.tpgi.com/

---

## Compliance Summary

**Current Status:**
- ✅ WCAG 2.1 Level A: Meets (with noted color exceptions)
- ⚠️ WCAG 2.1 Level AA: Mostly meets (awaiting color review with design team)
- ❌ WCAG 2.1 Level AAA: Does not meet

**Recommended Actions:**
1. Consult design team on color contrast changes
2. Conduct real screen reader testing
3. Test on actual mobile devices
4. Enable browser zoom testing
5. Review with users who have accessibility needs
