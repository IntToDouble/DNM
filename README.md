# DNM/DO NOT MERGE Check GitHub Action

This action checks for a specified string in the changed files of a pull request and posts a comment on the pull request with the results if the string is found.

<br />

## Why?

Vercel preview deployments are amazing.
So amazing, that it's not crazy to put up a PR to get something you can share for feedback, even if you're not quite done.
While better engineers would never dream of clicking "Merge" before doing a final review, sometimes it's just too easy.

One approach to prevent this is to leave clues for Future You in comments in your code:

```
<!-- DNM - UPDATE WITH FINAL CHANGES FROM LEGAL -->
```

This Github Action serves as your second pair of eyes, failing anytime it detects the string `DNM` (or whatever you choose) in your PR, and then commenting on the lines you still need to address:

<img width="663" alt="image" src="https://github.com/IntToDouble/DNM/assets/3053339/2bdd4c7a-443d-490c-aa1b-22ac4c467004">

<br />

## Inputs

| Input           | Description                                    | Required | Default |
| --------------- | ---------------------------------------------- | -------- | ------- |
| `search_string` | The string to search for in the changed files. | No       | "DNM"   |

<br />

## Outputs

| Output             | Description                                                  |
| ------------------ | ------------------------------------------------------------ |
| `found_string`     | Whether the specified string was found in the changed files. |
| `string_locations` | The locations of the specified string in changed files.      |

<br />

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
        uses: IntToDouble/DNM@main
        with:
          search_string: "DNM"
```

This workflow will check the files changed in the pull request for the string "DNM". If the string is found, it will post a comment on the pull request with the file locations of the string, and the job will fail.

If you do not provide a value for the `search_string` input, it will default to `DNM`.
