import { act, fireEvent, render } from '@testing-library/react';
import React, { useState } from 'react';
import { Prompts, usePrompt } from '..';

function Dialog({
  onAccept,
  onReject,
}: {
  onAccept: () => void;
  onReject: () => void;
}) {
  return (
    <div data-testid="dialog">
      <button data-testid="accept" onClick={onAccept} type="button">
        Yes
      </button>
      <button data-testid="reject" onClick={onReject} type="button">
        No
      </button>
    </div>
  );
}

describe('use-prompt', () => {
  it('works correctly with global event emitter context', async () => {
    function Button() {
      const [prompt, prompting] = usePrompt();
      const [lastAnswer, setLastAnswer] = useState(null);

      return (
        <>
          <span data-testid="answer">{JSON.stringify(lastAnswer)}</span>
          <button
            data-testid="button"
            disabled={prompting}
            onClick={() =>
              prompt(({ answer }) => (
                <Dialog
                  onAccept={() => answer(true)}
                  onReject={() => answer(false)}
                />
              )).then(value => setLastAnswer(value))
            }
            type="button"
          >
            Delete
          </button>
        </>
      );
    }
    const { getByTestId, queryByTestId } = render(
      <>
        <Button />
        <Prompts />
      </>,
    );

    fireEvent.click(getByTestId('button'));

    expect(getByTestId('answer')).toMatchInlineSnapshot(`
      <span
        data-testid="answer"
      >
        null
      </span>
    `);
    expect(queryByTestId('dialog')).not.toBe(null);

    // now answer the dialog
    await act(() => Promise.resolve(fireEvent.click(getByTestId('accept'))));

    expect(queryByTestId('dialog')).toBe(null);

    expect(getByTestId('answer')).toMatchInlineSnapshot(`
      <span
        data-testid="answer"
      >
        true
      </span>
    `);
  });
});
