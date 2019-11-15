# @Byteclaw/use-event-emitter

[React](https://github.com/facebook/react) hooks and components for construction of simple event emitters.

## Installation

```console
npm install @byteclaw/use-event-emitter
yarn add @byteclaw/use-event-emitter
```

## Usage

Here is a quick example how to use these hooks.

```jsx
import {
  EventEmitterContext,
  useEventEmitterInstance,
  useEventEmitter,
} from '@byteclaw/use-event-emitter';
import React, { useEffect } from 'react';

function Comp() {
  // returns the event emitter from the context
  const eventEmitter = useEventEmitter();

  useEffect(() => {
    const unsubscribe = eventEmitter.on('test', (...args) => console.log(args));

    return () => unsubscribe();
  }, []);
}

function App({ children }) {
  // returns the new instance of event emitter
  const eventEmitter = useEventEmitterInstance();

  return (
    <EventEmitterContext.Provider value={eventEmitter}>
      <Comp1 />
    </EventEmitterContext.Provider>
  );
}
```
