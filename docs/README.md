# n-layers

**A simple CLI that scaffolds a clean n-layered architecture folder structure for your projects.**

Stop creating the same folders over and over.  
With one command, `n-layers` sets up a professional and organized project structure based on the classic n-layers architecture.

---

## Features

- Creates the standard n-layers directory structure
- Checks if the target path is a valid directory
- Verifies read/write permissions before creating folders
- Idempotent — skips folders that already exist
- Clear console feedback for every action
- Zero external dependencies

---

## Installation

### Global (recommended)

```bash
npm install -g n-layers


### Local / development

```bash
git clone https://github.com/Gabriel-Angelo712/n-layers.git
cd n-layers
npm link
```

> Requires **Node.js 18+**

---

## Quick Start

```bash
# Create the structure in the current directory
n-layers ./

# Create the structure in a specific folder
n-layers ./my-project
```

---

## Usage

```bash
n-layers <directory>
```

The first argument **must** be a path to an existing directory.

### Example

```bash
mkdir my-app
cd my-app
n-layers ./
```

---

## Generated Structure

The CLI ensures the following directories exist (and creates them if they are missing):

```
.
├── src
│   ├── entities
│   ├── factories
│   ├── services
│   ├── repositories
│   └── utils
├── docs
└── database
```

---

## Layer Responsibilities

| Layer          | Responsibility                                                                 |
|----------------|---------------------------------------------------------------------------------|
| **Entities**   | Pure domain objects. No dependencies.                                           |
| **Repositories** | Abstract data persistence (database, external APIs, file system, etc.)        |
| **Services**   | Contain business logic. Orchestrate entities and repositories.                  |
| **Factories**  | Centralize the creation of complex objects.                                     |
| **Utils**      | Generic and reusable helper functions.                                          |
| **docs**       | Project documentation.                                                          |
| **database**   | Database-related files (migrations, schemas, seeds, etc.)                       |

---

## Behavior

When you run the CLI, it will:

1. Validate that the given path is an existing directory
2. Check read and write permissions
3. Create any missing folders from the structure above
4. Print clear status messages to the console

If a folder already exists, it is simply skipped.

---

## Platform Notes

- Currently the core logic relies on a Bash script, so it works best on **Linux** and **macOS**.
- On Windows it may require WSL or Git Bash.

---

## Requirements

- Node.js ≥ 18

---

## License

MIT © 2026 Gabriel Ângelo
