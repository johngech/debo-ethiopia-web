# 🛡️ Debo Ethiopia Web Project

Welcome to the **Debo Ethiopia** frontend repository. This project is built with a high-performance 2026 tech stack focused on type-safety, speed, and automated code quality.

-----

## 🚀 Tech Stack

  * **Runtime:** [Bun](https://bun.sh/) (Fastest JS all-in-one toolkit)
  * **Framework:** React 19 + Vite
  * **Styling:** Tailwind CSS v4 + daisyUI v5
  * **Linter/Formatter:** Biome (Rust-based, replaces Prettier/ESLint)
  * **Quality Gate:** SonarCloud + GitHub Actions
  * **Dead Code Detection:** Knip

-----

## 🛠️ Local Setup

Follow these steps to get your local environment running exactly like production.

### 1\. Prerequisites (Install Bun)

Ensure you have **Bun v2.x** installed. This is our mandatory runtime and package manager.

**macOS & Linux:**

```bash
curl -fsSL https://bun.sh/install | bash
```

**Windows (Powershell):**

```powershell
powershell -c "irm bun.sh/install.ps1 | iex"
```

> **Important:** After installation, restart your terminal or run `source ~/.bashrc` (or `~/.zshrc`) to ensure the `bun` command is active. Verify by running `bun --version`.

### 2\. Clone the Project

```bash
git clone https://github.com/johngech/debo-ethiopia-web.git
cd debo-ethiopia-web
```

### 3\. Installation

Install dependencies using the **frozen lockfile** to ensure every team member has the exact same environment:

```bash
bun install --frozen-lockfile
```

### 4\. Running the App

Start the development server:

```bash
bun dev
```

The app will be available at: `http://localhost:5173`

-----

## 🧹 Code Standards & Workflow

We use a "Zero-Tolerance" policy for messy code, enforced by **Husky** git hooks and a **Node.js 24** CI runner.

### Useful Commands

| Command | Purpose |
| :--- | :--- |
| `bun run lint:fix` | Automatically fix formatting and lint errors (Biome) |
| `bun run check:dead` | Find unused files, exports, or dependencies (Knip) |
| `bun run build` | Production build with Tailwind v4 JIT |

### Git Workflow

1.  **Commit**: When you commit, **Husky** will automatically run Biome. If it fails, the commit is blocked until you fix the errors.
2.  **Push**: Every push triggers the **🛡️ Project Integrity** pipeline in GitHub Actions.
3.  **SonarCloud**: Your PRs will be automatically audited. If you introduce "Code Smells" or "Vulnerabilities," the Quality Gate will fail.

-----

## 📡 CI/CD Pipeline

Our GitHub Actions run on **Node.js 24**. If you modify the workflow, ensure you maintain the `FORCE_JAVASCRIPT_ACTIONS_TO_NODE24: true` flag to avoid deprecation warnings.

-----

## 🎨 Design System

We use **daisyUI v5**. Please use the built-in components to maintain design consistency:
[Explore daisyUI Components](https://daisyui.com/components/)

-----

### Recommended Extensions

To make development smoother, please install the following in VS Code:

  * **Biome**: For instant linting and formatting on save.
  * **Tailwind CSS IntelliSense**: For v4 utility class autocompletion.
