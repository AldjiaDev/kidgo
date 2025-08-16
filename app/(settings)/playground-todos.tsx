import { useState } from 'react';
import { FlatList, Text, TextInput, TouchableOpacity } from 'react-native';
import { observer } from '@legendapp/state/react';

import { BodyScrollView } from '~/components/ui/BodyScrollView';
import { Tables } from '~/utils/database.types';
import { addTodo, todos$ as _todos$, toggleDone } from '~/utils/supabase-legend';

// Emojis to decorate each todo.
const NOT_DONE_ICON = String.fromCodePoint(0x1f7e0);
const DONE_ICON = String.fromCodePoint(0x2705);

export default function PlaygroundTodosScreen() {
  // The text input component to add a new todo.
  function NewTodo() {
    const [text, setText] = useState('');
    const handleSubmitEditing = ({ nativeEvent: { text } }) => {
      setText('');
      addTodo(text);
    };
    return (
      <TextInput
        value={text}
        onChangeText={(text) => setText(text)}
        onSubmitEditing={handleSubmitEditing}
        placeholder="Que voulez vous faire aujourd'hui ?"
        className="mt-4 h-16 flex-none rounded-lg border-2 border-gray-500 p-4 text-xl"
      />
    );
  }

  // A single todo component, either 'not done' or 'done': press to toggle.
  function Todo({ todo }: { todo: Tables<'todos'> }) {
    function handlePress() {
      toggleDone(todo.id);
    }

    return (
      <TouchableOpacity
        key={todo.id}
        onPress={handlePress}
        className={`mb-2 rounded-lg px-4 py-2 ${todo.done ? 'bg-green-100' : 'bg-yellow-100'}`}>
        <Text className="text-xl">
          {todo.done ? DONE_ICON : NOT_DONE_ICON} {todo.text}
        </Text>
      </TouchableOpacity>
    );
  }

  // A list component to show all the todos.
  const Todos = observer(({ todos$ }: { todos$: typeof _todos$ }) => {
    // Get the todos from the state and subscribe to updates
    const todos = todos$.get();

    const renderItem = ({ item: todo }: { item: Tables<'todos'> }) => <Todo todo={todo} />;

    if (todos)
      return (
        <FlatList data={Object.values(todos)} renderItem={renderItem} className="mt-4 flex-1" />
      );

    return <></>;
  });

  return (
    <BodyScrollView
      contentContainerStyle={{
        paddingVertical: 16,
        gap: 2,
      }}>
      <NewTodo />
      <Todos todos$={_todos$} />
    </BodyScrollView>
  );
}
