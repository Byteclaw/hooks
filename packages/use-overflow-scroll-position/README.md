# @Byteclaw/use-overflow-scroll-position

[React](https://github.com/facebook/react) hook for tracking the scroll position inside an overflow:scroll enabled element.

## Installation

```console
npm install @byteclaw/use-overflow-scroll-position
yarn add @byteclaw/use-overflow-scroll-position
```

## Usage

Here is a quick example with a simple scrollable div container rendering a children. **It can be used with any element ref**:

```jsx
import { useOverflowScrollPosition } from '@byteclaw/use-overflow';

function ScrollableBox(children) {
  const box = useRef(null);
  const [scrollPosition, scrollHeight] = useOverflowScrollPosition(box);

  if (scrollPosition !== null && scrollPosition === scrollHeight) {
    console.log(`You've successfully scrolled to the end, yay!`);
  }

  return <div ref={box}>{children}</div>;
}
```

## API

`useOverflowScrollPosition(ref: MutableRefObject<HTMLElement | null>)` returns a tuple `[number | null, number | null]`.
The **first value** is how much of the content you've `actually scrolled` through, the **second value** is the content `total size`, so you can use it for calculations like scrolled percentage. The values are null until the ref is assigned an element.
