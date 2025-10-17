# Components

Reusable UI components for the Wow AI Showcase.

## 🎯 Available Components

### `PostHogProvider`

Analytics provider component that wraps your app.

```typescript
import { PostHogProvider } from '@/components/PostHogProvider'

function App() {
  return (
    <PostHogProvider>
      <MyApp />
    </PostHogProvider>
  )
}
```

**Props:**

- `children` (ReactNode) - Child components

### `LanguageSwitcher`

Component for switching between languages.

```typescript
import { LanguageSwitcher } from '@/components/LanguageSwitcher'

function Header() {
  return (
    <header>
      <h1>My App</h1>
      <LanguageSwitcher />
    </header>
  )
}
```

**Props:**

- `className` (string, optional) - Additional CSS classes
- `showLabels` (boolean, optional) - Show language labels

### `ExperimentWrapper`

Wrapper component for A/B testing.

```typescript
import { ExperimentWrapper } from '@/components/ExperimentWrapper'

function TestedComponent() {
  return (
    <ExperimentWrapper experiment="button-test">
      {({ variant }) => (
        <button className={variant === 'primary' ? 'bg-blue-500' : 'bg-green-500'}>
          Click Me
        </button>
      )}
    </ExperimentWrapper>
  )
}
```

**Props:**

- `experiment` (string) - Experiment name
- `children` (function) - Render function with variant

## 🎨 UI Components

### `Button`

Reusable button component.

```typescript
import { Button } from '@/components/ui/button'

function MyComponent() {
  return (
    <Button variant="primary" size="lg" onClick={handleClick}>
      Click Me
    </Button>
  )
}
```

**Props:**

- `variant` ('primary' | 'secondary' | 'outline') - Button style
- `size` ('sm' | 'md' | 'lg') - Button size
- `onClick` (function) - Click handler
- `disabled` (boolean) - Disabled state

### `Card`

Card container component.

```typescript
import { Card } from '@/components/ui/card'

function MyCard() {
  return (
    <Card>
      <h3>Card Title</h3>
      <p>Card content goes here.</p>
    </Card>
  )
}
```

**Props:**

- `className` (string, optional) - Additional CSS classes
- `children` (ReactNode) - Card content

### `Input`

Form input component.

```typescript
import { Input } from '@/components/ui/input'

function MyForm() {
  return (
    <form>
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={setEmail}
      />
    </form>
  )
}
```

**Props:**

- `type` (string) - Input type
- `placeholder` (string) - Placeholder text
- `value` (string) - Input value
- `onChange` (function) - Change handler

## 🔧 Advanced Usage

### Custom Component Props

```typescript
interface CustomButtonProps {
  variant: 'primary' | 'secondary'
  size: 'sm' | 'md' | 'lg'
  onClick: () => void
  children: React.ReactNode
}

function CustomButton({ variant, size, onClick, children }: CustomButtonProps) {
  return (
    <button
      className={`btn btn-${variant} btn-${size}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
```

### Component Composition

```typescript
function ComplexComponent() {
  return (
    <Card>
      <Card.Header>
        <h3>Title</h3>
      </Card.Header>
      <Card.Body>
        <p>Content</p>
      </Card.Body>
      <Card.Footer>
        <Button>Action</Button>
      </Card.Footer>
    </Card>
  )
}
```

## 📚 Next Steps

- [Hooks](/api/hooks) - React hooks documentation
- [Utilities](/api/utilities) - Utility functions
- [Experiments System](/experiments/) - Learn about experiments

Ready to use components? Check out our [Experiments Guide](/experiments/)!
