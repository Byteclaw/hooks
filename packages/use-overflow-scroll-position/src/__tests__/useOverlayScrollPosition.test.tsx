import { fireEvent, render } from '@testing-library/react';
import React, { ReactNode, useRef } from 'react';
import { useOverflowScrollPosition } from '../index';

function BigBox() {
  const box = useRef<HTMLDivElement>(null);
  const buffer = new Array(99999);

  const { current } = box;

  if (current != null) {
    current.style.overflowY = 'scroll';
    current.style.height = '10000px';
    current.style.width = '100px';
  }

  return (
    <div data-testid="bigbox" ref={box}>
      {buffer.map(() => '∆')}
    </div>
  );
}

function Box({
  children,
  onChange,
}: {
  children: ReactNode | ReactNode[];
  onChange: (val: [number | null, number | null]) => any;
}) {
  const box = useRef<HTMLDivElement>(null);
  const [position, height] = useOverflowScrollPosition(box);

  onChange([position, height]);

  const { current } = box;

  if (current != null) {
    current.style.overflowY = 'scroll';
    current.style.height = '100px';
    current.style.width = '100px';
  }

  return (
    <>
      <div data-testid="box" ref={box}>
        {children}
      </div>
    </>
  );
}

describe('useOverflowScrollPosition hook', () => {
  it('works corretly', async () => {
    const onChangeMock = jest.fn();
    let values: [number | null, number | null] = [null, null];
    const setValues = (val: [number | null, number | null]) => {
      values = val;
    };
    onChangeMock.mockImplementation(val => setValues(val));

    const { getByTestId } = render(
      <Box onChange={onChangeMock}>
        <BigBox />
      </Box>,
    );

    getByTestId('box').scrollTop = 200;

    expect(values[0]).toBe(0);

    fireEvent.scroll(getByTestId('box'));

    expect(values[0]).toBe(200);
    expect(onChangeMock).toHaveBeenCalledTimes(4);
  });
});
