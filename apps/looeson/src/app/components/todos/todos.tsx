import { useCallback, useEffect, useState } from 'react';
import { Service, Todo as ITodo } from '@dooexid/api-client';
import { Todo } from '../todo/todo';
import { EditTodo } from '../edit-todo/edit-todo';

export const Todos = () => {
  const [itemsCreated, setItemsCreated] = useState(0);
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [creating, setCreating] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);

    Service.getAll()
      .then(setTodos)
      .catch((e) => setError(`${e}`))
      .finally(() => setLoading(false));
  }, []);

  const onEdited = useCallback(
    (updated: ITodo) =>
      setTodos((old) =>
        old.map((item) => (item._id === updated._id ? updated : item))
      ),
    []
  );

  const onDeleted = useCallback(
    (id: string) => setTodos((old) => old.filter(({ _id }) => _id !== id)),
    []
  );

  const onCreate = useCallback((item: ITodo) => {
    setCreating(true);
    Service.create(item)
      .then((created) => {
        setTodos((old) => [...old, created]);
        setItemsCreated((v) => v + 1);
      })
      .catch((e) => alert(`Error while creating: ${e}`))
      .finally(() => setCreating(false));
  }, []);

  if (error) {
    return <>{error}</>;
  }

  if (loading) {
    return <>Loading…</>;
  }

  return (
    <>
      <EditTodo
        key={itemsCreated}
        disabled={creating}
        onSave={onCreate}
        saveTitle="Create"
      />
      {todos.map((todo) => (
        <Todo
          key={todo._id}
          item={todo}
          onDeleted={onDeleted}
          onEdited={onEdited}
        />
      ))}
    </>
  );
};
