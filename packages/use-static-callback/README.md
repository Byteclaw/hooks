# @Byteclaw/use-static-callback

Variation of [React](https://github.com/facebook/react) `useCallback` that can be used with declared functions.

## Installation

```console
npm install @byteclaw/use-static-callback
yarn add @byteclaw/use-static-callback
```

## Usage

Just declare a function and use `useStaticCallback` to make a callback from it.

```js
import { useStaticCallback } from '@byteclaw/use-static-callback';
import React from 'react';

function onClickHandler() {
  console.log('onClick');
}

function Component() {
  const onClick = useStaticCallback(onClickHandler);

  return <button onClick={onClick} />;
}

function onClickHandlerWithArgs(a, b) {
  console.log(a, b); // prints true, false
}

function ComponentWithArgsInCallback() {
  const onClick = useStaticCallback(onClickHandlerWithArgs, [true, false]);

  return <button onClick={onClick} />;
}
```
