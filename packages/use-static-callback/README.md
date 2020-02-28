# @Byteclaw/use-static-callback

Variations of [React](https://github.com/facebook/react) `useCallback` hook that can be used with declared functions.

## Installation

```console
npm install @byteclaw/use-static-callback
yarn add @byteclaw/use-static-callback
```

## Usage

### `useStaticCallback` hook

Just declare a function and use `useStaticCallback` to make a callback from it. The callback will be called with arguments specified as an array in second argument. The actual the callback is memoized until the callback or arguments change.

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

### `useStaticCallbackCreator` hook

Just declare a function that returns a callback and use `useStaticCallbackCreator` hook to make a callback from it. The hook will pass arguments provided in an array (second argument) to a callback creator and returns a callback returned by the creator. The actual callback is memoized until the callback creator or arguments change.

```js
import { useStaticCallbackCreator } from '@byteclaw/use-static-callback';
import React from 'react';

function onClickHandlerCreator() {
  return e => console.log('onClick', e);
}

function Component() {
  const onClick = useStaticCallbackCreator(onClickHandlerCreator);

  return <button onClick={onClick} />;
}

function onClickHandlerWithArgsCreator(a, b) {
  return e => console.log(a, b, e); // prints true, false
}

function ComponentWithArgsInCallback() {
  const onClick = useStaticCallbackCreator(onClickHandlerWithArgsCreator, [
    true,
    false,
  ]);

  return <button onClick={onClick} />;
}
```
