---
title: Form Handling in React with Validation
hero_image: blocks.jpg
tags: react-hook-form, vest, forms, react, next.js
---

# Form Handling in React with Validation: React Hook Form and Vest

## Intro

If you are already familiar with basic form handling in React, skip to the Walkthrough section.

Creating forms and processing and validating submitted form data can be a hassle in React.

A common and simple solution involves combining application state with the `onChange` handler of form field DOM elements. Here's an example file called `SampleForm.jsx` with a single input field that takes a user's email. Included is a submit `button` and `onSubmit()` function that logs the input data to the console:

```jsx=
import { useState } from 'react'

const SampleForm = () => {
  const [formState, setFormState] = useState({});

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form>
      <input
        name="email"
        autoComplete="email"
        type="text"
        onChange={({ target }) => setFormState({ email: target.value })}
      />
      <button type="submit" onClick={() => onSubmit(formState)}>
        Submit
      </button>
    </form>
  );
};

export default SampleForm;
```

This approach, although simple, isn't performant. The app is re-rendered on every key press. It also lacks a seamless way of integrating with a validation library. Using a validation library ensures that the data submitted by the user adheres to certain standards set by the developer (`formState.email` is not null, is a string, and is in an email format, etc.).

As we'll see below, composing a form and validating that form's submitted data can be simplified using libraries like [`react-hook-form`](https://react-hook-form.com/) and [`vest`](https://ealush.com/vest/#/).

> If you choose to build a form in the same way as `<SampleForm />` above, I suggest using a schema-based validation library like [`joi`](https://joi.dev/) to handle validation.

## Benefits of Using [`react-hook-form`](https://react-hook-form.com/)

- Prevent excessive re-renders.
- Form components mount quickly.
- Subscribe to the state changes of individual components without re-rendering the whole form.

## Benefits of Using [`vest`](https://ealush.com/vest/#/)

- [Comes with many validation functions out of the box](https://ealush.com/vest/#/./n4s/rules).
- Declarative: uses named functions (such as `isString()`) instead of schemas. This is personal preference. I happen to find declarative validation easier to read than when it's schema based.
- [Functionality can be extended using other declarative libraries](https://ealush.com/vest/#/./n4s/external), like [`validator`](https://github.com/validatorjs/validator.js).

## Walkthrough

1. We'll start by installing our dependencies. The last dependency is one maintained by the React Hook Form team and connects `react-hook-form` with `vest`.

```javascript
npm i react-hook-form vest validator @hookform/resolvers
```

2. We'll take our `SampleForm.jsx` file from earlier and modify it to use `react-hook-form` to manage form state and data submission.

```jsx=
import { useForm } from "react-hook-form";

const SampleForm = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        name="email"
        autoComplete="email"
        type="text"
        {...register("email")}
      />
      { errors.email && <p>errors.email.message</p> }
      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>
    </form>
  );
};

export default SampleForm
```

What just happened? Let's break it down:

- The `useState()` hook was replaced with `useForm()`. The form's state is now in the hands of `react-hook-form`. It can be accessed by destructuring the `formState` object found in `useForm()`.
- The `button` is conditionally disabled by the boolean `isSubmitting`. This variable automatically becomes `true` when the `onSubmit` function is running, even if async!
- The `handleSubmit` function is passed to the `form` `onSubmit`, with our custom `onSubmit` function passed as an argument.
- The `button` no longer requires an `onClick` handler because `handleSubmit` will take care of that action for us.
- The `input` has been "registered" by passing `{...register('email')}` to it. It's state is now being tracked by `useForm()`.
- The `errors` object automatically receives keys that correspond with the `name` passed to the `register()` function on form fields. This can be used to conditionally display an error message if validation fails, like so: `{ errors.email && <p>errors.email.message</p> }`. We'll implement validation in the next step.

3. What if the user doesn't input a valid email before clicking "Submit"? What if the user doesn't input anything at all? Preventing these sorts of situations is what validation is for. Start by creating a separate file, entitled `validation.js`. Import the necessary functions from `vest`, instantiate a `vest()` function, and export it.

```javascript
import vest, { test, enforce } from "vest";

export const emailInputValidator = vest.create("emailInput", (data = {}) => {
  test("email", "Invalid email.", () => {
    enforce(data.email)
      .isNotEmpty()
      .isString()
      .matches(
        /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/g
      );
  });
});
```

- The first argument to the `test` function names the test. The second argument is the error message that will be displayed to the user when the test fails.
- The final argument is where the magic happens. `enforce()` is passed the user's input from the `data` object. `vest` is able to chain together rules. It's easy to tell from the names of the chained functions what's happening:
- The input is tested to verify that it is not `null`, is a string, and that it matches a crazy email regex from [this site](https://www.emailregex.com/).

4. Now, we bring it all together using the `@hookform/resolvers` package. Return to the `SampleForm.jsx` file and modify it to match the following:

```jsx=
import { useForm } from "react-hook-form";
import { vestResolver } from "@hookform/resolvers/vest";
import { emailInputValidator } from "./validation.js";

const SampleForm = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: vestResolver(emailInputValidator),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onClick={handleSubmit(onSubmit)}>
      <input
        name="email"
        autoComplete="email"
        type="text"
        {...register("email")}
      />
      {errors.email && <p>{ errors.email.message }</p>}
      <button type="submit" disabled={isSubmitting}>
        Submit
      </button>
    </form>
  );
};

export default SampleForm;
```

- The appropriate resolver was imported from `@hookform/resolvers/vest`. `react-hook-form` [supports a wide variety of validation libraries](https://github.com/react-hook-form/resolvers#quickstart). The validator function we just created is imported as well.
- `vestResolver` is passed to `useForm()`, and `emailInputValidator` is passed to it.
- Now, if the 'Submit' `button` is clicked and the `email` field's input doesn't match the `emailInputValidator`'s' specification, an error will be thrown and the error message will be shown.
- If the input passes the test, you should be able to check your `console` and see the data you just submitted!

> When using a dev server with hot reload like Next.js, you may need to refresh the page after importing/modifying any validator functions before they take effect.

It's best to also validate form data on the server side in order to protect against malicious user inputs that slip by your validator function. This is common practice, as in general, 'the client should not be trusted'.

---

That concludes this walkthrough. I suggest you try out other form validation libraries to see which one you like best. Some developers prefer schema-based validation. Thanks for reading! If you found this blog post helpful, or ran into any errors along the way, please leave a comment below and I'll respond as soon as I can!
