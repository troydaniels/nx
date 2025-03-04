# React Nx Tutorial - Step 11: Test Affected Projects

{% youtube
src="https://www.youtube.com/embed/_mBBFRjs01g"
title="Nx.dev Tutorial | React | Step 11: Test Affected Projects"
width="100%" /%}

In addition to supporting computation caching, Nx scales your development by doing code change analysis to see what is affected by a particular pull request.

**Commit all the changes you have made so far**:

```shell
git add .
git commit -am 'init'
git checkout -b testbranch
```

**Open `libs/ui/src/lib/todos/todos.tsx` and change the component by updating the `<li>` content to `{t.title}!!`:**

```typescript
import { Todo } from '@myorg/data';
import './todos.module.css';

export interface TodosProps {
  todos: Todo[];
}

export function Todos(props: TodosProps) {
  return (
    <ul>
      {props.todos.map((t) => (
        <li className={'todo'}>{t.title}!!</li>
      ))}
    </ul>
  );
}

export default Todos;
```

**Run `npx nx print-affected --type=app --select=projects`**, and you should see `todos` printed out. The `print-affected` looks at what you have changed and uses the project graph to figure out which apps can be affected by this change.

**Run `npx nx print-affected --type=lib --select=projects`**, and you should see `ui` printed out. This command works similarly, but instead of printing the affected apps, it prints the affected libs.

## Test Affected Projects

Printing the affected projects can be handy, but usually you want to do something with them. For instance, you may want to test everything that has been affected.

**Run `npx nx affected:test` to retest only the projects affected by the change.**

As you can see, since we updated the code, without updating the tests, the unit tests failed.

```shell
>  NX  Running target test for projects:

  - ui
  - todos

...

  Failed projects:

  - todos
  - ui
```

Note that Nx only tried to retest `ui` and `todos`. It didn't retest `api` or `data` because there is no way that could be affected by the changes in this branch.

## Affected:\*

You can run any target against the affected projects in the graph like this:

```shell
# The following are equivalent
npx nx affected --target=build
npx nx affected:build
```

## What's Next

- Continue to [Step 12: Summary](/react-tutorial/12-summary)
