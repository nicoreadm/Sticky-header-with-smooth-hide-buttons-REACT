# Sticky-header
A Next.js sticky header component implementing scroll-direction detection via React Hooks (useRef, useEffect) to dynamically toggle navigation visibility with CSS transitions.
A standalone React component for Next.js implementing a "sticky" navigation bar with scroll-aware behavior.

## Technical Overview

This component manages the visibility of secondary navigation elements based on the user's vertical scroll direction (`window.scrollY`).

### Logic Flow
1.  **State Management**: Uses `useState` to toggle a boolean flag (`hideButtons`).
2.  **Scroll Tracking**:
    * Uses `useRef` to persist the `lastScrollY` value across renders without triggering re-renders.
    * Attaches a passive event listener to the `scroll` event.
    * Compares `currentScrollY` vs `lastScrollY` to determine direction (Delta).
3.  **Thresholds**:
    * **Scroll Down**: Sets `hideButtons = true` only if `scrollY > 100px`.
    * **Scroll Up**: Sets `hideButtons = false` immediately upon negative delta.

### CSS Implementation
The animation relies on CSS transitions rather than JavaScript animations for performance.

* **Transitions**: applied to `max-width`, `opacity`, and `transform`.
* **Layout Shift**: Uses `max-width` interpolation (0 to N) to allow the DOM to reflow smoothly when elements are hidden.
* **Interaction**: Applies `pointer-events: none` when the state is hidden to prevent ghost clicks.
* **Visuals**: Uses `backdrop-filter: blur()` combined with an RGBA background for transparency support.

## Code Structure

```jsx
// Core logic snippet
const lastScrollY = useRef(0);

useEffect(() => {
  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
       // Downward scroll > threshold
       setHideButtons(true);
    } else if (currentScrollY < lastScrollY.current) {
       // Upward scroll
       setHideButtons(false);
    }
    lastScrollY.current = currentScrollY;
  };
  
  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, []);
```
## Dependencies
React >= 16.8 (Hooks support)

Next.js (Link component)
