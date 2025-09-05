# Keyboard Accessories Implementation

This implementation adds keyboard accessories to improve user experience when typing in text fields, particularly for email addresses and task creation.

## Components Added

### EmailKeyboardAccessory

Located at `components/keyboard/EmailKeyboardAccessory.tsx`

**Features:**
- Displays common email domain suggestions above the keyboard
- Available domains: @gmail.com, @outlook.com, @yahoo.com, @hotmail.com, @icloud.com
- Smart domain completion that replaces existing domain or appends if none exists
- Scrollable horizontal list of suggestions

**Usage:**
```tsx
<EmailKeyboardAccessory
  enabled={isEmailFieldFocused}
  onSuggestionPress={(domain) => setEmail(currentEmail + domain)}
/>
```

**Integration:**
- Added to `components/Auth.tsx` for the email registration field
- Shows when email field is focused
- Helps users quickly complete email addresses during registration

### TaskKeyboardAccessory

Located at `components/keyboard/TaskKeyboardAccessory.tsx`

**Features:**
- Displays common French task prefixes above the keyboard
- Available prefixes: "Acheter ", "Appeler ", "Envoyer ", "Réserver ", "Planifier ", "Faire "
- Helps users quickly start typing common task types
- Scrollable horizontal list of suggestions

**Usage:**
```tsx
<TaskKeyboardAccessory
  enabled={isTaskInputFocused}
  onSuggestionPress={(prefix) => setText(prefix)}
/>
```

**Integration:**
- Added to `app/(settings)/playground-todos.tsx` for the todo input field
- Shows when todo input field is focused
- Helps users quickly start typing tasks with common action verbs

## Technical Implementation

Uses the `KeyboardExtender` component from `react-native-keyboard-controller` library:

```tsx
<KeyboardExtender enabled={enabled}>
  <View className="bg-border/70 border-t border-border px-4 py-2">
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <View className="flex-row gap-2">
        {suggestions.map((suggestion) => (
          <TouchableOpacity
            key={suggestion}
            onPress={() => onSuggestionPress(suggestion)}
            className="rounded-lg bg-primary px-3 py-2">
            <Text className="text-sm text-primary-foreground">{suggestion}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  </View>
</KeyboardExtender>
```

## Benefits

1. **Faster Registration**: Users can quickly complete email addresses during signup
2. **Better Task Entry**: Common task prefixes are readily available for todo creation
3. **Improved UX**: Reduces typing effort and potential errors
4. **Mobile-First**: Designed specifically for mobile keyboard interactions

## Testing

To test these keyboard accessories:

1. Run the app on a mobile device or simulator
2. Navigate to the settings and open the Auth screen
3. Tap on the email field to see email domain suggestions
4. Navigate to playground-todos to see task prefix suggestions
5. Tap any suggestion to see it applied to the input field

The keyboard accessories will only appear when:
- The corresponding text field is focused
- The device has a virtual keyboard displayed
- The `enabled` prop is set to `true`

## Future Enhancements

Potential improvements for keyboard accessories:
- Context-aware suggestions based on current input
- User customizable suggestion lists
- Support for multiple languages
- Analytics to track most-used suggestions
- Integration with other input fields throughout the app