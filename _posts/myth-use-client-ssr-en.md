---
title: "Use client vs SEO"
description: "The Myth That Needs to Die: use client Doesn't Kill SSR!"
image: "/posts/use-client-vs-seo.png"
category: "NextJs"
date: "2025-10-09"
id: 100
---

#### "If I use 'use client', I lose server-side rendering and my SEO goes down the drain!"

Man, I see this panic every single day. Developers contorting their code, creating absurd architectural workarounds, all to avoid that dreaded `"use client"` at the top of the file.

And you know what's the funny part? **It's all based on a lie.**


## The Naked Truth

Let me be straight with you:

**`"use client"` does NOT disable Server-Side Rendering.**

`"use client"` only defines **where the component is hydrated**, not where it's initially rendered. That's a huge difference, and a lot of people get confused about it.


## What Actually Happens: The Complete Flow

Let me show you with a simple example, an <InteractiveButton />:

```tsx
// components/InteractiveButton.tsx
"use client"

import { useState } from 'react';

export default function InteractiveButton() {
  const [count, setCount] = useState(0);

  return (
    <div className="counter">
      <h2>You clicked {count} times</h2>
      <button onClick={() => setCount(count + 1)}>
        Click here
      </button>
    </div>
  );
}
```

### Now look at what happens behind the scenes (step by step):

**1. On the Server (during Build or on Request)**

Next.js renders the component on the server and generates the complete initial HTML. Like this:

```html
<div class="counter">
  <h2>You clicked 0 times</h2>
  <button>Click here</button>
</div>
```

See that? The HTML is already ready, complete and all.

**2. Preparing the Bundle**

Next.js packages everything you need: the rendered HTML, the JavaScript needed for hydration, CSS, assets... everything bundled together.

**3. Sending to the Client**

The server sends to the browser the complete HTML (already rendered), the optimized JavaScript bundle, and the hydration instructions.

**4. In the Browser (Hydration)**

Now React "wakes up" that static HTML. It attaches the event listeners, connects the state, and boom - the component becomes interactive.

#### And what does Google see in all of this?

Well, Googlebot does exactly the first step: fetches the initial HTML. And guess what? It sees **everything**:

- ✅ Title
- ✅ Description  
- ✅ Headings (h1, h2, h3...)
- ✅ Complete content
- ✅ Links
- ✅ Images with alt text

*Zero SEO problems.*


## ⚠️ When You ACTUALLY Lose SSR (and SEO)

But hold on, it's not all roses. There IS a scenario where you **do lose** the benefits of SSR, and this is where most people mess up:

#### ❌ The Deadly Anti-Pattern

```tsx
"use client"

import { useEffect, useState } from 'react';

export default function ProductDetails() {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 💀 Fetches data AFTER the page loads
    fetch('/api/product/123')
      .then(res => res.json())
      .then(data => {
        setProduct(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <span>${product.price}</span>
    </div>
  );
}
```

#### What does Google see in this case?

```html
<div>Loading...</div>
```

**This is not cool.**

### Why?

Because the initial HTML is rendered **before** `useEffect` runs. `useEffect` only executes in the browser, **after** hydration. So check out the timeline:

```
1. Server renders → <div>Loading...</div>
2. HTML arrives in the browser
3. Google indexes → "Loading..." 💀
4. React hydrates
5. useEffect runs
6. Data arrives
7. Component re-renders
8. (But Google left a long time ago)
```

Got the problem? You basically delivered an empty page to Google.

### The Golden Rule

Remember this:

> **Fetch data on the server. Add interactivity on the client.**

Or, translating to code:

```tsx
// ✅ CORRECT
async function ServerComponent() {
  const data = await fetchData(); // Server fetches
  return <ClientComponent data={data} />; // Client receives it ready
}

// ❌ WRONG
function ClientComponent() {
  useEffect(() => {
    fetchData(); // Client fetches (too late for SEO)
  }, []);
}
```


## Conclusion: Free Yourself from Fear

Look, **Server Components and Client Components are not opposites.** They're **complementary**. They actually work together.

`"use client"` is not your enemy. It's a tool, and like any tool, you just need to know when to use it.

Think of it this way: Server Components do the heavy lifting. Client Components add the interactive magic. Both are rendered on the server. Both generate initial HTML. Both are SEO-friendly.

Use `"use client"` when you need:
- ✅ `useState`, `useEffect`, other hooks
- ✅ Event handlers (`onClick`, `onChange`)
- ✅ Browser APIs (`localStorage`, `navigator`)
- ✅ Libraries that need the DOM

**And stop being afraid of SEO.** Next.js handles that for you. HTML is always rendered on the server. Always. `"use client"` just says: "hey, this one also needs JavaScript to be interactive."

That's it. Nothing more, nothing less.

**Now go ahead and use `"use client"` without guilt!** 🚀

SEO thanks you. Google thanks you. And your bundle size does too (when you use it wisely).