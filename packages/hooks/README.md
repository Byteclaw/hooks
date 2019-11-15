# @byteclaw/hooks

Collection of useful [React](https://github.com/facebook/react) hooks for your Applications.

## Installation

```console
npm install @byteclaw/hooks
yarn add @byteclaw/hooks
```

## Usage

```jsx
import { useOverflowScrollPosition } from '@byteclaw/hooks';
import React from 'react';

function ScrollableBox(children) {
  const box = useRef(null);
  const [scrollPosition, scrollHeight] = useOverflowScrollPosition(box);

  if (scrollPosition !== null && scrollPosition === scrollHeight) {
    console.log(`You've successfully scrolled to the end, yay!`);
  }

  return <div ref={box}>{children}</div>;
}
```
