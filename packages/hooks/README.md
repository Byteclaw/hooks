# @byteclaw/hooks

Collection of useful [React](https://github.com/facebook/react) hooks for your Applications.

## Installation

```console
npm install @byteclaw/hooks
yarn add @byteclaw/hooks
```

## Hooks

- [`@byteclaw/use-event-emitter`](https://github.com/byteclaw/hooks/tree/master/packages/use-event-emitter) - React hooks and components for construction of simple event emitters
- [`@byteclaw/use-overflow-scroll-position`](https://github.com/byteclaw/hooks/tree/master/packages/use-overflow-scroll-position) - React hook for tracking the scroll position inside an overflow:scroll enabled element
- [`@byteclaw/use-prompt`](https://github.com/byteclaw/hooks/tree/master/packages/use-prompt) - React hook and component for prompting the user to input anything using your custom components.
- [`@byteclaw/use-static-callback`](https://github.com/byteclaw/hooks/tree/master/packages/use-static-callback) - Variations of React `useCallback` hook that can be used with function declarations.
- [`@byteclaw/use-unique-id`](https://github.com/byteclaw/hooks/tree/master/packages/use-unique-id) - React hook to generate unique ids for your components

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
