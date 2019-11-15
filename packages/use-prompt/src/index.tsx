import { useEventEmitter } from '@byteclaw/use-event-emitter';
import { useUniqueId } from '@byteclaw/use-unique-id';
import React, {
  cloneElement,
  ReactElement,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from 'react';

const $$PROMPT_EVENT = '$$prompt.prompt';
const $$ANSWER_EVENT = '$$prompt.answer';

type PromptReducerValue = { id: number | string; prompt: ReactElement }[];

function promptReducer(
  value: PromptReducerValue,
  action:
    | { type: 'PROMPT'; id: number | string; prompt: ReactElement }
    | { type: 'ANSWER'; id: number | string },
): PromptReducerValue {
  switch (action.type) {
    case 'ANSWER': {
      const { id } = action;

      return value.filter(prompt => prompt.id !== id);
    }
    case 'PROMPT': {
      const { id, prompt } = action;

      return [...value, { id, prompt }];
    }
    default:
      return value;
  }
}

export function Prompts() {
  const eventEmitter = useEventEmitter();
  const [prompts, dispatch] = useReducer(promptReducer, []);

  // listen to events
  useEffect(() => {
    const unsubcribeAnswer = eventEmitter.on($$ANSWER_EVENT, (
      id: number /* value: any */,
    ) => dispatch({ type: 'ANSWER', id }));

    const unsubcribePrompt = eventEmitter.on(
      $$PROMPT_EVENT,
      (id: number, prompt: ReactElement) =>
        dispatch({ type: 'PROMPT', id, prompt }),
    );

    return () => {
      unsubcribeAnswer();
      unsubcribePrompt();
    };
  }, []);

  return (
    <>{prompts.map(({ id, prompt }) => cloneElement(prompt, { key: id }))}</>
  );
}

interface PrompFunctionProps<TAnswer> {
  answer(value: TAnswer): void;
}

interface PromptFunction<TAnswer> {
  (prompt: (props: PrompFunctionProps<TAnswer>) => ReactElement): Promise<
    TAnswer
  >;
}

export function usePrompt<TAnswer>(): [PromptFunction<TAnswer>, boolean] {
  const id = useUniqueId();
  const eventEmitter = useEventEmitter();
  const [prompting, setPrompting] = useState(false);
  const prompt: PromptFunction<TAnswer> = useCallback(renderer => {
    return new Promise((resolve, reject) => {
      // subscribe to answer
      const handler: { unsubscribe: Function | null } = {
        unsubscribe: null,
      };

      try {
        handler.unsubscribe = eventEmitter.on(
          $$ANSWER_EVENT,
          (promptId: number, value: any) => {
            if (id === promptId) {
              setPrompting(false);

              if (handler.unsubscribe) {
                handler.unsubscribe();
                handler.unsubscribe = null;
              }

              resolve(value);
            }
          },
        );

        setPrompting(true);

        const comp = renderer({
          answer: value => {
            eventEmitter.emit($$ANSWER_EVENT, id, value);
          },
        });

        eventEmitter.emit($$PROMPT_EVENT, id, comp);
      } catch (e) {
        if (handler.unsubscribe) {
          handler.unsubscribe();
          handler.unsubscribe = null;
        }

        setPrompting(false);

        reject(e);
      }
    });
  }, []);

  return [prompt, prompting];
}
