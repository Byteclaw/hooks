# @Byteclaw/use-prompt

[React](https://github.com/facebook/react) hook and component for prompting the user to input anything using your custom components.

## Installation

```console
npm install @byteclaw/use-prompt
yarn add @byteclaw/use-prompt
```

## Usage

Here is a quick example. `answer` accepts any values you want so you aren't limited just to boolean values.

By default application uses global event emitter context created by `@byteclaw/use-event-emitter` hook unless you create your own event emitter context.

## Shared global event emitter context

```jsx
import { Prompts, usePrompt } from '@byteclaw/use-prompt';
import React, { useCallback } from 'react';

function Dialog({ onAccept, onReject }) {
  return (
    <div>
      <p>Are you sure?</p>
      <button onClick={onAccept}>Yes</button>
      <button onClick={onReject}>No</button>
    </div>
  );
}

function ConfirmButton() {
  const [prompt, prompting] = usePrompt();
  const onClick = useCallback(async () => {
    const result = await prompt(({ answer }) => (
      <Dialog onAccept={() => answer(true)} onReject={() => answer(false)} />
    ));
  }, [ask]);

  return (
    <button disabled={prompting} onClick={onClick}>
      Do something
    </button>
  );
}

function App() {
  return (
    <>
      <ConfirmButton />
      <Prompts />
    </>
  );
}
```

## Custom event emitter context

```jsx
import {
  EventEmitterContext,
  useEventEmitterInstance,
} from '@byteclaw/use-event-emitter';
import { Prompts, usePrompt } from '@byteclaw/use-prompt';
import React, { useCallback } from 'react';

function Dialog({ onAccept, onReject }) {
  return (
    <div>
      <p>Are you sure?</p>
      <button onClick={onAccept}>Yes</button>
      <button onClick={onReject}>No</button>
    </div>
  );
}

function ConfirmButton() {
  const [prompt, prompting] = usePrompt();
  const onClick = useCallback(async () => {
    const result = await prompt(({ answer }) => (
      <Dialog onAccept={() => answer(true)} onReject={() => answer(false)} />
    ));
  }, [ask]);

  return (
    <button disabled={prompting} onClick={onClick}>
      Do something
    </button>
  );
}

function App() {
  const eventEmitter = useEventEmitterInstance();

  return (
    <EventEmitterContext.Provider value={eventEmitter}>
      <ConfirmButton />
      <Prompts />
    </EventEmitterContext.Provider>
  );
}
```
