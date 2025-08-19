# Vue.js 3 Cheatsheet

## Installation & Setup

### CDN
```html
<script src="https://unpkg.com/vue@next"></script>
```

### NPM/Yarn
```bash
npm create vue@latest my-project
cd my-project
npm install
npm run dev

# Or with yarn
yarn create vue my-project
cd my-project
yarn install
yarn dev
```

### Vue CLI
```bash
npm install -g @vue/cli
vue create my-project
cd my-project
npm run serve
```

## Vue 3 Composition API

### Basic Component
```vue
<template>
  <div>
    <h1>{{ title }}</h1>
    <p>Count: {{ count }}</p>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'

export default {
  name: 'Counter',
  setup() {
    // Reactive data
    const count = ref(0)
    const title = ref('Vue 3 Counter')
    
    // Computed property
    const doubleCount = computed(() => count.value * 2)
    
    // Methods
    const increment = () => {
      count.value++
    }
    
    const decrement = () => {
      count.value--
    }
    
    // Lifecycle hooks
    onMounted(() => {
      console.log('Component mounted')
    })
    
    // Return everything that should be available in template
    return {
      count,
      title,
      doubleCount,
      increment,
      decrement
    }
  }
}
</script>
```

### Script Setup (Simplified Syntax)
```vue
<template>
  <div>
    <h1>{{ title }}</h1>
    <p>Count: {{ count }}</p>
    <button @click="increment">+</button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Reactive data
const count = ref(0)
const title = ref('Vue 3 Counter')

// Computed property
const doubleCount = computed(() => count.value * 2)

// Methods
const increment = () => {
  count.value++
}

// Lifecycle hooks
onMounted(() => {
  console.log('Component mounted')
})
</script>
```

## Reactivity

### ref() - Primitive Values
```javascript
import { ref } from 'vue'

const count = ref(0)
const message = ref('Hello')
const isVisible = ref(true)

// Access value with .value
console.log(count.value) // 0
count.value = 10
```

### reactive() - Objects
```javascript
import { reactive } from 'vue'

const state = reactive({
  count: 0,
  user: {
    name: 'John',
    email: 'john@example.com'
  }
})

// Direct property access
console.log(state.count) // 0
state.count = 10
state.user.name = 'Jane'
```

### toRefs() - Convert Reactive Object
```javascript
import { reactive, toRefs } from 'vue'

const state = reactive({
  count: 0,
  message: 'Hello'
})

// Convert to refs for destructuring
const { count, message } = toRefs(state)

// Now count and message are refs
console.log(count.value) // 0
```

### readonly() - Immutable Data
```javascript
import { reactive, readonly } from 'vue'

const state = reactive({
  count: 0
})

const readonlyState = readonly(state)
// readonlyState.count = 10 // Warning: cannot modify
```

## Computed Properties

### Basic Computed
```javascript
import { ref, computed } from 'vue'

const count = ref(1)
const doubleCount = computed(() => count.value * 2)

console.log(doubleCount.value) // 2
```

### Computed with Getter and Setter
```javascript
import { ref, computed } from 'vue'

const firstName = ref('John')
const lastName = ref('Doe')

const fullName = computed({
  get() {
    return firstName.value + ' ' + lastName.value
  },
  set(newValue) {
    [firstName.value, lastName.value] = newValue.split(' ')
  }
})

fullName.value = 'Jane Smith'
console.log(firstName.value) // Jane
console.log(lastName.value) // Smith
```

## Watchers

### watch() - Watch Reactive Data
```javascript
import { ref, watch } from 'vue'

const count = ref(0)

// Watch a single ref
watch(count, (newValue, oldValue) => {
  console.log(`Count changed from ${oldValue} to ${newValue}`)
})

// Watch multiple sources
const name = ref('John')
const age = ref(30)

watch([name, age], ([newName, newAge], [oldName, oldAge]) => {
  console.log(`Name: ${oldName} -> ${newName}`)
  console.log(`Age: ${oldAge} -> ${newAge}`)
})
```

### watchEffect() - Automatic Dependency Tracking
```javascript
import { ref, watchEffect } from 'vue'

const count = ref(0)
const message = ref('Hello')

watchEffect(() => {
  // Automatically tracks count and message
  console.log(`${message.value}: ${count.value}`)
})
```

### Watch Options
```javascript
import { ref, watch } from 'vue'

const obj = ref({ count: 0 })

// Deep watch for objects
watch(obj, (newValue, oldValue) => {
  console.log('Object changed')
}, { deep: true })

// Immediate execution
watch(count, (newValue, oldValue) => {
  console.log('Count changed')
}, { immediate: true })

// Flush timing
watch(count, (newValue, oldValue) => {
  console.log('Count changed')
}, { flush: 'post' }) // 'pre', 'post', or 'sync'
```

## Lifecycle Hooks

```javascript
import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  onActivated,
  onDeactivated,
  onErrorCaptured
} from 'vue'

export default {
  setup() {
    onBeforeMount(() => {
      console.log('Before mount')
    })
    
    onMounted(() => {
      console.log('Mounted')
    })
    
    onBeforeUpdate(() => {
      console.log('Before update')
    })
    
    onUpdated(() => {
      console.log('Updated')
    })
    
    onBeforeUnmount(() => {
      console.log('Before unmount')
    })
    
    onUnmounted(() => {
      console.log('Unmounted')
    })
    
    onActivated(() => {
      console.log('Activated (keep-alive)')
    })
    
    onDeactivated(() => {
      console.log('Deactivated (keep-alive)')
    })
    
    onErrorCaptured((error, instance, info) => {
      console.log('Error captured:', error)
    })
  }
}
```

## Template Syntax

### Text Interpolation
```vue
<template>
  <!-- Text interpolation -->
  <span>Message: {{ msg }}</span>
  
  <!-- Raw HTML -->
  <span v-html="rawHtml"></span>
  
  <!-- Attribute binding -->
  <div v-bind:id="dynamicId"></div>
  <div :id="dynamicId"></div>
  <div :class="{ active: isActive }"></div>
  
  <!-- JavaScript expressions -->
  <span>{{ number + 1 }}</span>
  <span>{{ ok ? 'YES' : 'NO' }}</span>
  <span>{{ message.split('').reverse().join('') }}</span>
</template>
```

### Directives
```vue
<template>
  <!-- v-if / v-else-if / v-else -->
  <div v-if="type === 'A'">A</div>
  <div v-else-if="type === 'B'">B</div>
  <div v-else>Not A/B</div>
  
  <!-- v-show -->
  <div v-show="isVisible">Visible</div>
  
  <!-- v-for -->
  <ul>
    <li v-for="item in items" :key="item.id">
      {{ item.name }}
    </li>
  </ul>
  
  <!-- v-for with index -->
  <li v-for="(item, index) in items" :key="item.id">
    {{ index }} - {{ item.name }}
  </li>
  
  <!-- v-for with object -->
  <li v-for="(value, key) in object" :key="key">
    {{ key }}: {{ value }}
  </li>
  
  <!-- v-on (event handling) -->
  <button v-on:click="doSomething">Click me</button>
  <button @click="doSomething">Click me</button>
  <button @click="count++">Increment</button>
  
  <!-- Event modifiers -->
  <form @submit.prevent="onSubmit">
    <input @keyup.enter="submit">
    <button @click.once="doOnce">Do once</button>
  </form>
  
  <!-- v-model (two-way binding) -->
  <input v-model="message" placeholder="Edit me">
  <p>Message is: {{ message }}</p>
</template>
```

### Class and Style Binding
```vue
<template>
  <!-- Class binding -->
  <div :class="{ active: isActive, 'text-danger': hasError }"></div>
  <div :class="[activeClass, errorClass]"></div>
  <div :class="classObject"></div>
  
  <!-- Style binding -->
  <div :style="{ color: activeColor, fontSize: fontSize + 'px' }"></div>
  <div :style="[baseStyles, overridingStyles]"></div>
  <div :style="styleObject"></div>
</template>

<script setup>
import { ref, computed } from 'vue'

const isActive = ref(true)
const hasError = ref(false)
const activeClass = ref('active')
const errorClass = ref('text-danger')

const classObject = computed(() => ({
  active: isActive.value && !hasError.value,
  'text-danger': hasError.value
}))

const activeColor = ref('red')
const fontSize = ref(30)

const styleObject = ref({
  color: 'red',
  fontSize: '13px'
})
</script>
```

## Component Communication

### Props
```vue
<!-- Parent Component -->
<template>
  <ChildComponent 
    :message="parentMessage" 
    :count="count"
    :user="user"
  />
</template>

<!-- Child Component -->
<template>
  <div>
    <p>{{ message }}</p>
    <p>Count: {{ count }}</p>
    <p>User: {{ user.name }}</p>
  </div>
</template>

<script setup>
// Define props
const props = defineProps({
  message: String,
  count: {
    type: Number,
    default: 0
  },
  user: {
    type: Object,
    required: true
  }
})

// Or with TypeScript
const props = defineProps<{
  message: string
  count?: number
  user: { name: string, email: string }
}>()
</script>
```

### Emits
```vue
<!-- Child Component -->
<template>
  <button @click="handleClick">Click me</button>
</template>

<script setup>
// Define emits
const emit = defineEmits(['update', 'delete'])

// Or with validation
const emit = defineEmits({
  update: (value) => {
    return typeof value === 'string'
  },
  delete: null
})

const handleClick = () => {
  emit('update', 'Hello from child')
  emit('delete', id)
}
</script>

<!-- Parent Component -->
<template>
  <ChildComponent 
    @update="handleUpdate" 
    @delete="handleDelete"
  />
</template>

<script setup>
const handleUpdate = (value) => {
  console.log('Updated:', value)
}

const handleDelete = (id) => {
  console.log('Delete:', id)
}
</script>
```

### Provide/Inject
```vue
<!-- Parent/Ancestor Component -->
<script setup>
import { provide, ref } from 'vue'

const theme = ref('dark')
const updateTheme = (newTheme) => {
  theme.value = newTheme
}

// Provide data and methods
provide('theme', theme)
provide('updateTheme', updateTheme)
</script>

<!-- Child/Descendant Component -->
<script setup>
import { inject } from 'vue'

// Inject provided data
const theme = inject('theme')
const updateTheme = inject('updateTheme')

const changeTheme = () => {
  updateTheme('light')
}
</script>
```

## Slots

### Basic Slots
```vue
<!-- Parent Component -->
<template>
  <BaseCard>
    <h3>Card Title</h3>
    <p>Card content goes here</p>
  </BaseCard>
</template>

<!-- BaseCard Component -->
<template>
  <div class="card">
    <slot></slot>
  </div>
</template>
```

### Named Slots
```vue
<!-- Parent Component -->
<template>
  <BaseLayout>
    <template #header>
      <h1>Page Title</h1>
    </template>
    
    <template #default>
      <p>Main content</p>
    </template>
    
    <template #footer>
      <p>Footer content</p>
    </template>
  </BaseLayout>
</template>

<!-- BaseLayout Component -->
<template>
  <div class="container">
    <header>
      <slot name="header"></slot>
    </header>
    
    <main>
      <slot></slot>
    </main>
    
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>
```

### Scoped Slots
```vue
<!-- Parent Component -->
<template>
  <UserList>
    <template #default="{ user, index }">
      <strong>{{ index + 1 }}. {{ user.name }}</strong>
      <span>({{ user.email }})</span>
    </template>
  </UserList>
</template>

<!-- UserList Component -->
<template>
  <div>
    <div v-for="(user, index) in users" :key="user.id">
      <slot :user="user" :index="index"></slot>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const users = ref([
  { id: 1, name: 'John', email: 'john@example.com' },
  { id: 2, name: 'Jane', email: 'jane@example.com' }
])
</script>
```

## Vue Router

### Installation
```bash
npm install vue-router@4
```

### Basic Setup
```javascript
// router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/user/:id', component: User, props: true }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})

// main.js
import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'

createApp(App).use(router).mount('#app')
```

### Navigation
```vue
<template>
  <!-- Router links -->
  <router-link to="/">Home</router-link>
  <router-link to="/about">About</router-link>
  <router-link :to="{ name: 'user', params: { id: 123 }}">User</router-link>
  
  <!-- Router view -->
  <router-view />
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// Programmatic navigation
const goToAbout = () => {
  router.push('/about')
  // router.push({ name: 'about' })
  // router.push({ path: '/about', query: { tab: 'info' }})
}

// Access route parameters
console.log(route.params.id)
console.log(route.query.tab)
</script>
```

## State Management (Pinia)

### Installation
```bash
npm install pinia
```

### Setup
```javascript
// main.js
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.mount('#app')
```

### Store Definition
```javascript
// stores/counter.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  // State
  const count = ref(0)
  const name = ref('Eduardo')
  
  // Getters (computed)
  const doubleCount = computed(() => count.value * 2)
  
  // Actions (methods)
  function increment() {
    count.value++
  }
  
  function decrement() {
    count.value--
  }
  
  return {
    count,
    name,
    doubleCount,
    increment,
    decrement
  }
})
```

### Using Store in Components
```vue
<template>
  <div>
    <p>Count: {{ counter.count }}</p>
    <p>Double: {{ counter.doubleCount }}</p>
    <button @click="counter.increment">+</button>
    <button @click="counter.decrement">-</button>
  </div>
</template>

<script setup>
import { useCounterStore } from '@/stores/counter'

const counter = useCounterStore()

// Or destructure with storeToRefs
import { storeToRefs } from 'pinia'
const { count, doubleCount } = storeToRefs(counter)
const { increment, decrement } = counter
</script>
```

## Useful Composables

### useLocalStorage
```javascript
import { ref, watch } from 'vue'

export function useLocalStorage(key, defaultValue) {
  const storedValue = localStorage.getItem(key)
  const value = ref(storedValue ? JSON.parse(storedValue) : defaultValue)
  
  watch(value, (newValue) => {
    localStorage.setItem(key, JSON.stringify(newValue))
  }, { deep: true })
  
  return value
}

// Usage
const theme = useLocalStorage('theme', 'light')
```

### useFetch
```javascript
import { ref } from 'vue'

export function useFetch(url) {
  const data = ref(null)
  const error = ref(null)
  const loading = ref(true)
  
  fetch(url)
    .then(response => response.json())
    .then(json => {
      data.value = json
    })
    .catch(err => {
      error.value = err
    })
    .finally(() => {
      loading.value = false
    })
    
  return { data, error, loading }
}

// Usage
const { data, error, loading } = useFetch('/api/users')
```

## Best Practices

1. **Use Composition API** - More flexible and reusable than Options API
2. **Prefer script setup** - Cleaner syntax and better TypeScript support
3. **Use computed for derived state** - More efficient than methods
4. **Destructure reactive objects with toRefs** - Maintain reactivity
5. **Use provide/inject for deeply nested props** - Avoid prop drilling
6. **Keep components small and focused** - Single responsibility principle
7. **Use TypeScript** - Better developer experience and catch errors early
8. **Follow naming conventions** - PascalCase for components, kebab-case for props
