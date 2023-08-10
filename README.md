# SKPlayground

Welcome to the SKPlayground, your interactive playground to experiment with Microsoft's Semantic Kernel SDK. Dive-in to explore, learn, play and develop with AI capabilities.

> **Warning**
> This app is a work in progress and aims to mainly serve as a technical reference for building fully fledged web applications on top of Semantic Kernel. Some things may not work properly and bugs are to be expected.
> See the roadmap below for planned features.

![Screenshot](/screenshots/dashboard.png)

## Key Features

- **Interactive Learning Environment:** Get hands-on experience with an app powered by Semantic Kernel.
- **Full Visibility:** View both inputs and outputs.
- **Markdown:** Any output in markdown format will be rendered appropriately.
- **Easily Adoptable Tech Stack:** Built with Next.js for the frontend and .NET 7 Minimal API for the backend.
- **Extendability:** Can serve as an excellent starting point or inspiration for your own projects involving AI.

> **Note**
> An online demo environment is availabe at [skplayground.dev](https://skplayground.dev/)

![Screenshot](/screenshots/example-prompt.png)

![Screenshot](/screenshots/output-markdown.png)

## Architecture

This app is composed of a dedicated `frontend` (UI/UX) and `backend` (business logic).

### Frontend

- [Next.js](https://github.com/vercel/next.js) App Router
- [Tailwind CSS](https://github.com/tailwindlabs/tailwindcss) CSS framework
- [Radix Primitives](https://github.com/radix-ui/primitives) headless components
- [shadcn/ui](https://github.com/shadcn-ui/ui) default styling
- [Lucide](https://github.com/vercel/next.js) icon set

### Backend

- [.NET 7](https://dotnet.microsoft.com) code framework
- [ASP.NET Core](https://dotnet.microsoft.com/apps/aspnet/apis) minimal API
- [SignalR](https://dotnet.microsoft.com/apps/aspnet/signalr) real-time communication

## Roadmap

- Stream messages from the server (pending native streaming support for functions in SK)
- Configure AI options including providers (OpenAI, Azure, etc.) as well as models (GPT-3.5, GPT-4, etc.)
