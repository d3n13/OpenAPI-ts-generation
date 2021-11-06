import { Service, Todo as ITodo } from '@dooexid/api-client';
import { useCallback, useState } from 'react';
import { EditTodo } from '../edit-todo/edit-todo';

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

  const [mode, setMode] = useState<Mode>(Mode.View);
  const [deleting, setDeleting] = useState(false);
  const [editing, setEditing] = useState(false);

  const onSwitchModeToView = useCallback(() => setMode(Mode.View), []);
  const onSwitchModeToEdit = useCallback(() => setMode(Mode.Edit), [item]);
  const onSwitchModeToDelete = useCallback(() => setMode(Mode.Delete), []);

  const onDelete = useCallback(() => {
    setDeleting(true);
    Service.remove(id)
      .then(({ id }) => onDeleted(id))
      .catch((e) => alert(`Error while deleting item ${id}: ${e}`))
      .finally(() => setDeleting(false));
  }, [onDeleted, id]);

  const onEdit = useCallback(
    (item: ITodo) => {
      setEditing(true);
      Service.patch(id, item)
        .then((update) => !!update && onEdited(update))
        .catch((e) => alert(`Error while editing item ${id}: ${e}`))
        .finally(() => {
          setEditing(false);
          setMode(Mode.View);
        });
    },
    [onEdited, id]
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

  if (mode === Mode.Edit) {
    return (
      <EditTodo
        item={item}
        onSave={onEdit}
        onCancel={onSwitchModeToView}
        disabled={editing}
      />
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
