import { Todo as ITodo } from '@dooexid/api-client';
import { ChangeEventHandler, useCallback, useEffect, useState } from 'react';

type Props = {
  onSave: (update: ITodo) => void;
  onCancel?: () => void;
  disabled: boolean;
  item?: ITodo;
  saveTitle?: string;
};

const initialItem = { title: '' };

export const EditTodo = ({
  item,
  onCancel,
  onSave,
  disabled,
  saveTitle = 'Update',
}: Props) => {
  const id = `${item?._id}`;

  const [editedTodo, setEditedTodo] = useState<ITodo>(item || initialItem);
  useEffect(() => setEditedTodo(item || initialItem), [item]);

  const onEdit = useCallback(() => {
    onSave({
      title: editedTodo.title,
      done: editedTodo.done,
    });
  }, [onSave, editedTodo]);

  const onChangeDone: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const checked = e.target.checked;
      setEditedTodo((old) => ({ ...old, done: checked }));
    },
    []
  );

  const onChangeTitle: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const value = e.target.value;
      setEditedTodo((old) => ({ ...old, title: value }));
    },
    []
  );

  const doneInputId = `done_${id}`;

  return (
    <form onSubmit={onEdit}>
      <fieldset disabled={disabled}>
        <input type="text" value={editedTodo?.title} onChange={onChangeTitle} />
        <br />

        <input
          type="checkbox"
          checked={editedTodo?.done}
          onChange={onChangeDone}
          id={doneInputId}
        />
        <label htmlFor={doneInputId}>Done</label>
        <br />

        <button onClick={onEdit}>{saveTitle}</button>
        {!!onCancel && <button onClick={onCancel}>Cancel</button>}
      </fieldset>
    </form>
  );
};
