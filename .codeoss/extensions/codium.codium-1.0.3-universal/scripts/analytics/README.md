# Event Mapping and Diffing Utilities

This README contains the explanation Re. two utility scripts, `map.ts` and `diff.ts`, to assist with event mapping and comparison. These tools are designed to handle JSON objects of mixpanel events, making it easier to identify differences and map keys between new and old event formats.

---

## Table of Contents

- [Event Mapping and Diffing Utilities](#event-mapping-and-diffing-utilities)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Usage](#usage)
    - [map.ts](#mapts)
      - [Running the Script](#running-the-script)
      - [Arguments](#arguments)
      - [Output](#output)
    - [diff.ts](#diffts)
      - [Running the Script](#running-the-script-1)
      - [Arguments](#arguments-1)
      - [Output](#output-1)

---

## Prerequisites

Ensure you have the following installed:

- Node.js (v16 or later)
- TypeScript
- `ts-node` for running TypeScript scripts directly
- Required dependencies (`colors`, `fs`, etc.)

Install dependencies:

```bash
npm install
```

---

## Usage

### map.ts

The `map.ts` script is used to generate a mapping between keys of two JSON objects based on their values. It helps create a key-to-key correspondence.

#### Running the Script

```bash
ts-node map.ts <origin_event.json> <mapped_event.json>
```

or

```bash
ts-node map.ts <origin_and_mapped_event.json>
```

#### Arguments

- `<origin_event.json>`: Path to the original event JSON file.
- `<mapped_event.json>`: Path to the mapped event JSON file.

#### Output

A JSON object representing the mapping of keys from the origin event to the mapped event.

---

### diff.ts

The `diff.ts` script identifies differences between two JSON objects and highlights changes, additions, and removals. It uses color coding for better readability:

- **Green**: Added keys/values
- **Yellow**: Modified keys/values
- **Red**: Removed keys/values

#### Running the Script

```bash
ts-node diff.ts <origin_event.json> <mapped_event.json>
```

#### Arguments

- `<origin_event.json>`: Path to the original event JSON file.
- `<mapped_event.json>`: Path to the mapped event JSON file.

#### Output

A formatted diff output showing differences between the two events.

---
