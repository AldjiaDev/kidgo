import { Fragment, useState } from 'react';
import { FlatList, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { observer } from '@legendapp/state/react';

import { Button } from '~/components/nativewindui/Button';
import { Text } from '~/components/nativewindui/Text';
import { BodyScrollView } from '~/components/ui/BodyScrollView';
import { addTodo, todos$ as _todos$, toggleDone } from '~/utils/supabase-legend';

// Emojis to decorate each todo.
const NOT_DONE_ICON = String.fromCodePoint(0x1f7e0);
const DONE_ICON = String.fromCodePoint(0x2705);

// The text input component to add a new todo.
const NewTodo = () => {
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
      style={styles.input}
    />
  );
};

// A single todo component, either 'not done' or 'done': press to toggle.
const Todo = ({ todo }: { todo: Tables<'todos'> }) => {
  const handlePress = () => {
    toggleDone(todo.id);
  };
  return (
    <TouchableOpacity
      key={todo.id}
      onPress={handlePress}
      style={[styles.todo, todo.done ? styles.done : null]}>
      <Text style={styles.todoText}>
        {todo.done ? DONE_ICON : NOT_DONE_ICON} {todo.text}
      </Text>
    </TouchableOpacity>
  );
};

// A list component to show all the todos.
const Todos = observer(({ todos$ }: { todos$: typeof _todos$ }) => {
  // Get the todos from the state and subscribe to updates
  const todos = todos$.get();
  const renderItem = ({ item: todo }: { item: Tables<'todos'> }) => <Todo todo={todo} />;
  if (todos)
    return <FlatList data={Object.values(todos)} renderItem={renderItem} style={styles.todos} />;

  return <Fragment></Fragment>;
});

export default function SettingsScreen() {
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

const styles = StyleSheet.create({
  done: {
    backgroundColor: '#dfd',
  },
  input: {
    borderColor: '#999',
    borderRadius: 8,
    borderWidth: 2,
    flex: 0,
    fontSize: 20,
    height: 64,
    marginTop: 16,
    padding: 16,
  },
  todo: {
    backgroundColor: '#ffd',
    borderRadius: 8,
    marginBottom: 16,
    padding: 16,
  },
  todoText: {
    fontSize: 20,
  },
  todos: {
    flex: 1,
    marginTop: 16,
  },
});
