export const posts = [
    {
        id: 1,
        title: 'The Future of Web Development',
        date: 'November 20, 2025',
        summary: 'Exploring the latest trends in frontend development, from AI-assisted coding to the rise of meta-frameworks.',
        content: `
# The Future of Web Development

Web development is evolving at a breakneck pace. In this post, we'll explore some of the most exciting trends shaping the industry.

## AI-Assisted Coding
Tools like GitHub Copilot and ChatGPT are changing how we write code. They're not replacing developers, but making them more productive.

## Meta-Frameworks
Next.js, Remix, and SvelteKit are becoming the standard for building robust web applications, offering features like server-side rendering and static site generation out of the box.

## WebAssembly
Wasm is unlocking new possibilities for running high-performance code in the browser, enabling applications like video editors and 3D games to run natively on the web.
    `,
        tags: ['Web Dev', 'AI', 'Trends']
    },
    {
        id: 2,
        title: 'Mastering React Hooks',
        date: 'October 15, 2025',
        summary: 'A deep dive into useEffect, useState, and custom hooks to write cleaner and more efficient React code.',
        content: `
# Mastering React Hooks

Hooks revolutionized how we write React components. Let's look at some best practices.

## The Rules of Hooks
Always remember:
1. Only call hooks at the top level.
2. Only call hooks from React functions.

## Custom Hooks
Extracting logic into custom hooks is a powerful way to share stateful logic between components.

## useEffect Best Practices
Understanding the dependency array is crucial. Missing dependencies can lead to stale closures, while unnecessary dependencies cause excessive re-renders.

## Performance Optimization
Use useMemo and useCallback wisely to prevent unnecessary recalculations and re-renders in your components.
    `,
        tags: ['React', 'Hooks', 'JavaScript']
    },
    {
        id: 3,
        title: 'Why UI/UX Matters',
        date: 'September 10, 2025',
        summary: 'Understanding the importance of user-centered design in creating successful digital products.',
        content: `
# Why UI/UX Matters

A pretty interface is nice, but a usable one is essential.

## User-Centered Design
Always start with the user. What are their goals? What are their pain points?

## Accessibility
Building accessible websites ensures that everyone, regardless of ability, can use your product. It's not just a nice-to-have; it's a necessity.

## Design Systems
Creating a consistent design system helps maintain visual coherence across your application and speeds up development.
    `,
        tags: ['UI/UX', 'Design', 'Accessibility']
    },
    {
        id: 4,
        title: 'Web Performance Optimization',
        date: 'August 25, 2025',
        summary: 'Techniques and strategies to make your web applications lightning fast, from code splitting to lazy loading.',
        content: `
# Web Performance Optimization

Performance is not just about speed—it's about user experience and business success.

## Core Web Vitals
Google's Core Web Vitals (LCP, FID, CLS) are now ranking factors. Understanding and optimizing for these metrics is essential.

## Code Splitting
Break your JavaScript bundles into smaller chunks that load on demand. React.lazy() and dynamic imports make this easy.

## Image Optimization
Use modern formats like WebP and AVIF, implement lazy loading, and serve responsive images with srcset.

## Caching Strategies
Leverage browser caching, service workers, and CDNs to reduce server load and improve load times.
    `,
        tags: ['Performance', 'Optimization', 'Web Vitals']
    },
    {
        id: 5,
        title: 'TypeScript for JavaScript Developers',
        date: 'July 18, 2025',
        summary: 'Making the transition from JavaScript to TypeScript and why static typing can improve your development workflow.',
        content: `
# TypeScript for JavaScript Developers

TypeScript has become the de facto standard for large-scale JavaScript applications. Here's why.

## Type Safety
Catch errors at compile time instead of runtime. This alone can save countless hours of debugging.

## Better IDE Support
IntelliSense, auto-completion, and refactoring tools work much better with TypeScript's type information.

## Gradual Adoption
You don't have to convert everything at once. TypeScript allows you to gradually add types to your existing JavaScript codebase.

## Advanced Types
Union types, intersection types, and generics give you powerful tools to model complex data structures accurately.
    `,
        tags: ['TypeScript', 'JavaScript', 'Types']
    },
    {
        id: 6,
        title: 'Modern CSS: Grid and Flexbox',
        date: 'June 12, 2025',
        summary: 'Mastering CSS Grid and Flexbox to create responsive layouts without relying on frameworks.',
        content: `
# Modern CSS: Grid and Flexbox

CSS has evolved tremendously. Grid and Flexbox have made complex layouts simpler than ever.

## When to Use Grid vs Flexbox
Grid is perfect for two-dimensional layouts, while Flexbox excels at one-dimensional layouts.

## Grid Template Areas
Named grid areas make your CSS more readable and maintainable.

## Responsive Design
Use auto-fit and auto-fill with minmax() to create responsive grids without media queries.

## Browser Support
Both Grid and Flexbox have excellent browser support. It's time to ditch those float-based layouts!
    `,
        tags: ['CSS', 'Grid', 'Flexbox']
    },
    {
        id: 7,
        title: 'Building with Serverless Architecture',
        date: 'May 8, 2025',
        summary: 'Exploring serverless computing and how it can simplify backend development and reduce infrastructure costs.',
        content: `
# Building with Serverless Architecture

Serverless doesn't mean no servers—it means you don't have to manage them.

## Benefits of Serverless
Pay only for what you use, automatic scaling, and reduced operational overhead make serverless attractive for many use cases.

## AWS Lambda and Vercel Functions
These platforms make it easy to deploy serverless functions that respond to HTTP requests or events.

## Cold Starts
Understanding and mitigating cold start latency is crucial for production serverless applications.

## Best Practices
Keep functions small and focused, use environment variables for configuration, and implement proper error handling and logging.
    `,
        tags: ['Serverless', 'AWS', 'Backend']
    },
    {
        id: 8,
        title: 'GraphQL vs REST: Choosing the Right API',
        date: 'April 22, 2025',
        summary: 'Comparing GraphQL and REST APIs to help you make informed decisions for your next project.',
        content: `
# GraphQL vs REST: Choosing the Right API

Both GraphQL and REST have their place. Let's explore when to use each.

## GraphQL Advantages
Request exactly the data you need, reduce over-fetching, and get multiple resources in a single request.

## REST Advantages
Simpler to understand, better caching support, and wider adoption make REST a solid choice for many applications.

## The N+1 Problem
GraphQL can suffer from the N+1 query problem. DataLoader and proper query optimization are essential.

## Making the Choice
Consider your team's expertise, your data structure, and your client's needs when choosing between GraphQL and REST.
    `,
        tags: ['GraphQL', 'REST', 'API']
    },
    {
        id: 9,
        title: 'Progressive Web Apps in 2025',
        date: 'March 15, 2025',
        summary: 'How PWAs are bridging the gap between web and native apps with offline support and app-like experiences.',
        content: `
# Progressive Web Apps in 2025

PWAs combine the best of web and native apps, offering offline support, push notifications, and installability.

## Service Workers
The backbone of PWAs, service workers enable offline functionality and background sync.

## App Manifest
The web app manifest makes your PWA installable on users' home screens.

## Offline-First Strategy
Design your app to work offline by default, syncing data when connectivity is available.

## Push Notifications
Re-engage users with timely, relevant notifications—but use them sparingly to avoid annoying your users.
    `,
        tags: ['PWA', 'Service Workers', 'Mobile']
    }
];
