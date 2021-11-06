import { Service, Todo as ITodo } from '@dooexid/api-client';
import { ChangeEventHandler, useCallback, useState } from 'react';

type Props = {
  item: ITodo;
  onDeleted: (id: string) => void;
  onEdited: (updated: ITodo) => void;
};

enum Mode {
  View = 'View',
  Delete = 'Delete',
  Edit = 'Edit',
}

export function Todo({ item, onDeleted, onEdited }: Props) {
  const id = `${item?._id}`;

  const [editedTodo, setEditedTodo] = useState(item);
  const [mode, setMode] = useState<Mode>(Mode.View);
  const [deleting, setDeleting] = useState(false);
  const [editing, setEditing] = useState(false);

  const onSwitchModeToView = useCallback(() => setMode(Mode.View), []);
  const onSwitchModeToEdit = useCallback(() => {
    setEditedTodo(item);
    setMode(Mode.Edit);
  }, [item]);
  const onSwitchModeToDelete = useCallback(() => setMode(Mode.Delete), []);

  const onDelete = useCallback(() => {
    setDeleting(true);
    Service.remove(id)
      .then(({ id }) => onDeleted(id))
      .catch((e) => alert(`Error while deleting item ${id}: ${e}`))
      .finally(() => setDeleting(false));
  }, [onDeleted, id]);

  const onEdit = useCallback(() => {
    setEditing(true);
    const { _id, ...update } = editedTodo;
    Service.patch(id, update)
      .then((update) => !!update && onEdited(update))
      .catch((e) => alert(`Error while editing item ${id}: ${e}`))
      .finally(() => {
        setEditing(false);
        setMode(Mode.View);
      });
  }, [onEdited, editedTodo, id]);

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

  if (mode === Mode.Delete) {
    return (
      <div>
        This item will be removed. Continue?
        <button type="button" onClick={onDelete} disabled={deleting}>
          Yes, delete id
        </button>
        <button type="button" onClick={onSwitchModeToView} disabled={deleting}>
          No, leave it
        </button>
      </div>
    );
  }

  const doneInputId = `done_${id}`;

  if (mode === Mode.Edit) {
    return (
      <form onSubmit={onEdit}>
        <fieldset disabled={editing}>
          <input
            type="text"
            value={editedTodo?.title}
            onChange={onChangeTitle}
          />
          <br />

          <input
            type="checkbox"
            checked={editedTodo?.done}
            onChange={onChangeDone}
            id={doneInputId}
          />
          <label htmlFor={doneInputId}>Done</label>
          <br />

          <button onClick={onEdit}>Update</button>
          <button onClick={onSwitchModeToView}>Cancel</button>
        </fieldset>
      </form>
    );
  }

  return (
    <div>
      {JSON.stringify(item)}
      <button onClick={onSwitchModeToDelete}>X</button>
      <button onClick={onSwitchModeToEdit}>Edit</button>
    </div>
  );
}
