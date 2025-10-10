---
title: "Use client vs SEO"
description: "The Myth That Needs to Die: use client Doesn't Kill SSR!"
image: "/posts/use-client-vs-seo.png"
category: "NextJs"
date: "2025-10-09"
id: 100
---

## The Myth That Needs to Die: "use client" Doesn't Kill SSR!

### The misunderstanding that's costing devs performance (and sleep)

If you've worked with Next.js 13+, you've probably heard (or thought) this:

> "If I use `"use client"`, I lose Server-Side Rendering and my SEO goes down the drain!"

I see this panic every single day. Developers contorting their code, creating architectural workarounds, all to avoid that dreaded `"use client"` at the top of the file.

And you know what's funny? **It's all based on a lie.** 🚫


## The Naked Truth

Let's cut to the chase:

**`"use client"` does NOT disable Server-Side Rendering.**

Read that again. Out loud. Tattoo it on your forehead if you need to.

`"use client"` only defines **where the component is hydrated**, not where it's initially rendered.


## 🏗️ What Actually Happens: The Complete Flow

Let's see this in practice with a simple example:

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

### The real flow (step by step):

**1. On the Server (Build/Request Time)**
```
Next.js renders the component on the server
Generates complete initial HTML:
<div class="counter">
  <h2>You clicked 0 times</h2>
  <button>Click here</button>
</div>
```

**2. Bundle Preparation**
```
Next.js packages:
- Rendered HTML ✅
- JavaScript needed for hydration ✅
- CSS/assets ✅
```

**3. Response to Client**
```
Server sends:
- Complete HTML (rendered)
- Optimized JS bundle
- Hydration instructions
```

**4. In the Browser (Hydration)**
```
React "wakes up" the static HTML
Attaches event listeners
Makes the component interactive
```


## 🔍 The Definitive Proof: View Source

Still don't believe it? Let's do a real test.

### Experiment 1: Client Component with "use client"

```tsx
// app/page.tsx
import InteractiveButton from '@/components/InteractiveButton';

export default function Home() {
  return (
    <main>
      <h1>My Page</h1>
      <InteractiveButton />
    </main>
  );
}
```

**Now open the page and:**
1. Right-click → "View page source" (Ctrl+U)
2. Search for "You clicked"

**What you'll see:**

```html
<!DOCTYPE html>
<html>
  <head>...</head>
  <body>
    <main>
      <h1>My Page</h1>
      <div class="counter">
        <h2>You clicked 0 times</h2>
        <button>Click here</button>
      </div>
    </main>
    <!-- Complete HTML is here! -->
  </body>
</html>
```

**The HTML is there.** Rendered. Complete. Ready for Google to index. 🎯

### What Google sees:

Googlebot does exactly this: fetches the initial HTML. And guess what? It sees **everything**.

```
✅ Title
✅ Description
✅ Headings (h1, h2, h3...)
✅ Complete content
✅ Links
✅ Images with alt text
```

Zero SEO problems.


## The Truth Table

Let's end the confusion once and for all:

| Aspect | Server Component | Client Component (`"use client"`) |
|---------|------------------|-----------------------------------|
| **Initial HTML** | ✅ Rendered on server | ✅ Rendered on server |
| **JavaScript in bundle** | ❌ None | ✅ Only what's needed |
| **SEO** | ✅ Perfect | ✅ Perfect |
| **First Paint** | ⚡ Instant | ⚡ Instant |
| **Hydration** | ❌ Not needed | ✅ Yes |
| **Interactivity** | ❌ Static | ✅ Interactive |
| **Access to hooks** | ❌ No | ✅ Yes |
| **Event handlers** | ❌ No | ✅ Yes |

**TL;DR:** The only real difference is that Client Components add JavaScript to the bundle to make the HTML interactive. SEO? **Identical.**


## The Theater Analogy

Think of a theater play:

### Server Component = Static scenery
- The set is already there when the curtains open
- Beautifully painted, lit, perfect
- But it doesn't move

### Client Component = Scenery with actors
- The set is **also there** when the curtains open
- But now there are actors interacting with the audience
- They need "scripts" (JavaScript) to know what to do

**In both cases, the scenery exists from the start.** The difference is just whether there are live people inside doing things. 🎪


## ⚠️ When You ACTUALLY Lose SSR (and SEO)

But hold on, it's not all roses. There IS a scenario where you **do** lose the benefits of SSR:

### ❌ The Deadly Anti-Pattern

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

### What Google sees here:

```html
<div>Loading...</div>
```

**That's it.** 😱

### Why?

Because the initial HTML is rendered **before** `useEffect` runs. `useEffect` only executes in the browser, **after** hydration.

**Timeline:**
```
1. Server renders → <div>Loading...</div>
2. HTML arrives in browser
3. Google indexes → "Loading..." 💀
4. React hydrates
5. useEffect runs
6. Data arrives
7. Component re-renders
8. (But Google is already gone)
```


## ✅ The Correct Solution: Fetch on Server, Interact on Client

The ideal pattern combines the best of both worlds:

```tsx
// app/product/[id]/page.tsx
// 👈 Server Component (no "use client")

async function fetchProduct(id: string) {
  const res = await fetch(`https://api.example.com/product/${id}`);
  return res.json();
}

export default async function ProductPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  // Data fetched on server! 🏭
  const product = await fetchProduct(params.id);

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <span>${product.price}</span>
      
      {/* Interactivity where needed */}
      <AddToCartButton product={product} />
    </div>
  );
}
```

```tsx
// components/AddToCartButton.tsx
"use client" // 👈 Now yes, where it makes sense!

import { useState } from 'react';

export default function AddToCartButton({ 
  product 
}: { 
  product: Product 
}) {
  const [added, setAdded] = useState(false);

  function addToCart() {
    // Cart logic here
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <button 
      onClick={addToCart}
      className={added ? 'success' : ''}
    >
      {added ? '✅ Added!' : '🛒 Add to Cart'}
    </button>
  );
}
```

### What Google sees now:

```html
<div>
  <h1>Gaming Laptop XYZ</h1>
  <p>i7 Processor, 16GB RAM, RTX 4060...</p>
  <span>$4,999.90</span>
  <button>🛒 Add to Cart</button>
</div>
```

**Complete content!** SEO happy. Performance on top. Interactivity working. 🎉


## 🎯 The Golden Rule

Memorize this:

> **Fetch data on the server. Add interactivity on the client.**

Or, in code:

```tsx
// ✅ CORRECT
async function ServerComponent() {
  const data = await fetchData(); // Server
  return <ClientComponent data={data} />; // Client receives data
}

// ❌ WRONG
function ClientComponent() {
  useEffect(() => {
    fetchData(); // Client fetches data
  }, []);
}
```


## 🧠 The Correct Mental Model

Stop thinking like this:
```
"use client" = Client-Side Rendering = No SSR = Broken SEO
```

Start thinking like this:
```
"use client" = HTML rendered on server + JavaScript for hydration = Perfect SEO + Interactivity
```

**Server Components and Client Components are not opposites.** They're **complementary**.

- Server Components: do the heavy lifting
- Client Components: add the interactive magic

Both are rendered on the server. Both generate initial HTML. Both are SEO-friendly.


## 🎬 Conclusion: Free Yourself from Fear

`"use client"` is not your enemy. It's a tool.

Use it when you need:
- ✅ `useState`, `useEffect`, other hooks
- ✅ Event handlers (`onClick`, `onChange`)
- ✅ Browser APIs (`localStorage`, `navigator`)
- ✅ Libraries that need the DOM

**And stop being afraid of SEO.** Next.js handles that for you.

HTML is always rendered on the server. Always. `"use client"` just says: "hey, this one also needs JavaScript to be interactive."

That's it. Nothing more, nothing less.


### 📚 Further Reading

- [Next.js: Server Components](https://nextjs.org/docs/app/building-your-application/rendering/server-components)
- [React: Server Components RFC](https://github.com/reactwg/server-components)
- [Vercel: Understanding SSR vs CSR vs SSG](https://vercel.com/blog/understanding-rendering)


**Now go ahead and use `"use client"` without guilt!** 🚀

SEO thanks you. Google thanks you. And your bundle size does too (when you use it wisely).