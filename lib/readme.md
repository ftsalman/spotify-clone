# Turtle UI

A lightweight personal React UI library containing reusable components, utilities, and styles.

---

## Prerequiests

Copy the /lib/turtle-ui folders into your project root folder

Install tailwind css v4.1 (lastest version)

---

## Installation

Install the required dependencies:

```bash
npm install tailwind-merge clsx prop-types react-transition-group class-variance-authority
```

---

## Usage

Import style.css on your index.html file:

```html
<link rel="stylesheet" href="./lib/turtle-ui/style.css" />
```

---

Import Button Component:

```js
import { Button } from "../lib/turtle-ui/components";

export const ButtonExample = () => {
  return (
    <div className="flex items-center justify-center gap-2 flex-wrap">
      <Button variant="primary">Button</Button>
      <Button variant="secondary">Button</Button>
      <Button variant="tertiary">Button</Button>
    </div>
  );
};
```

###### You can check other componnets examples on the github examples folder
