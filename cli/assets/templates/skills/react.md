---
name: react
description: React development patterns and best practices
---

# React Skill

Expert knowledge for React development, including hooks, patterns, and performance optimization.

## Core Principles

### Component Design
- Keep components small and focused
- Single responsibility principle
- Composition over inheritance
- Lift state only when necessary

### Hooks Best Practices
- Follow the Rules of Hooks
- Custom hooks for reusable logic
- Use the right hook for the job
- Avoid unnecessary effects

## Component Patterns

### Functional Components

```tsx
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  disabled?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  onClick,
  disabled = false,
}: ButtonProps) {
  return (
    <button
      className={`btn btn-${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
```

### Compound Components

```tsx
const Tabs = ({ children }: { children: React.ReactNode }) => {
  const [activeTab, setActiveTab] = useState(0);
  
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
};

Tabs.List = TabList;
Tabs.Panel = TabPanel;

// Usage
<Tabs>
  <Tabs.List>
    <Tabs.Tab>Tab 1</Tabs.Tab>
    <Tabs.Tab>Tab 2</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel>Content 1</Tabs.Panel>
  <Tabs.Panel>Content 2</Tabs.Panel>
</Tabs>
```

## Hooks Patterns

### useState vs useReducer

```tsx
// useState for simple state
const [count, setCount] = useState(0);

// useReducer for complex state
const [state, dispatch] = useReducer(reducer, initialState);

// Use useReducer when:
// - State has multiple sub-values
// - Next state depends on previous
// - Complex state transitions
```

### useEffect Best Practices

```tsx
// Always specify dependencies
useEffect(() => {
  const subscription = subscribe(id);
  return () => subscription.unsubscribe();
}, [id]); // Only re-run when id changes

// Avoid effects for derived state
// Bad:
useEffect(() => {
  setFullName(`${firstName} ${lastName}`);
}, [firstName, lastName]);

// Good:
const fullName = `${firstName} ${lastName}`;
```

### Custom Hooks

```tsx
function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}

// Usage
const [theme, setTheme] = useLocalStorage('theme', 'light');
```

## Performance

### Memoization

```tsx
// Memoize expensive calculations
const sortedItems = useMemo(
  () => items.sort((a, b) => a.name.localeCompare(b.name)),
  [items]
);

// Memoize callbacks passed to children
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);

// Memoize components that receive stable props
const MemoizedList = memo(List);
```

### Virtualization

```tsx
// For large lists, use virtualization
import { useVirtualizer } from '@tanstack/react-virtual';

function VirtualList({ items }) {
  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
  });
  
  // Render only visible items
}
```

## Common Mistakes

### Avoid These

```tsx
// Bad: Object/array in dependency array
useEffect(() => {}, [{ id }]); // Creates new reference

// Bad: Mutating state directly
state.items.push(newItem);
setState(state);

// Bad: Missing key or using index as key
items.map((item, i) => <Item key={i} />);
```

### Do These Instead

```tsx
// Good: Primitive dependencies
useEffect(() => {}, [id]);

// Good: Immutable updates
setState(prev => ({
  ...prev,
  items: [...prev.items, newItem]
}));

// Good: Stable, unique keys
items.map(item => <Item key={item.id} />);
```
