# @Byteclaw/use-unique-id

[React](https://github.com/facebook/react) hook to generate unique ids for your components.

## Installation

```console
npm install @byteclaw/use-unique-id
yarn add @byteclaw/use-unique-id
```

## Usage

### Client side only

```jsx
import { useUniqueId } from '@byteclaw/use-unique-id';
import React, { useCallback } from 'react';

function Element() {
  const id = useUniqueId();
}

function App() {
  return <Element />;
}
```

### Server side support

In order to have consistent unique ids across client and server side render please provider custom `UniqueIdProvider`.

```jsx
import { UniqueIdProvider, useUniqueId } from '@byteclaw/use-unique-id';
import React, { useCallback } from 'react';

function Element() {
  const id = useUniqueId();
}

function App() {
  return (
    <UniqueIdProvider>
      <Element />
    </UniqueIdProvider>
  );
}
```
