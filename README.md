# DNM/DO NOT MERGE Check GitHub Action

This action checks for a specified string in the changed files of a pull request and annotates the associated files if the string is found.

## Example Usage

```yaml
name: Your Healthcheck Github Action
on: [pull_request]

jobs:
  can_merge:
    runs-on: ubuntu-latest
    name: DNM Check
    steps:
      - uses: actions/checkout@v3

      - name: DO NOT MERGE Check
        uses: IntToDouble/DNM@v1
        with:
          search_string: "DNM"
```

If you do not provide a value for the `search_string` input, it will default to `DNM`.

## Why?

Vercel preview deployments are amazing.
So amazing, that it's not crazy to put up a PR to get something you can share for feedback, even if you're not quite done.
While better engineers would never dream of clicking "Merge" before doing a final review, sometimes it's just too easy.

One approach to prevent this is to leave clues for Future You in comments in your code:

```
<!-- DNM - UPDATE WITH FINAL CHANGES FROM LEGAL -->
```

This Github Action serves as your second pair of eyes, failing anytime it detects the string `DNM` (or whatever you choose) in your PR, and then annotating the lines you still need to address:

<!-- TODO - UPDATE IMAGE -->

![image](https://github.com/IntToDouble/DNM/assets/3053339/24f65e96-c0d3-414e-bfb1-03dbc8d27cd8)

## Inputs

| Input           | Description                                    | Required | Default |
| --------------- | ---------------------------------------------- | -------- | ------- |
| `search_string` | The string to search for in the changed files. | No       | "DNM"   |
