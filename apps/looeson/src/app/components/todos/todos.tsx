import { useCallback, useEffect, useState } from 'react';
import { Service, Todo as ITodo } from '@dooexid/api-client';
import { Todo } from '../todo/todo';

export const Todos = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

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

  if (error) {
    return <>{error}</>;
  }

  if (loading) {
    return <>Loading…</>;
  }

  return (
    <>
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
