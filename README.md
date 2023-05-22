# "// DNM: DO NOT MERGE" Check GitHub Action

This action checks for a specified string in the changed files of a pull request and posts a comment on the pull request with the results if the string is found.

## Inputs

| Input           | Description                                    | Required | Default |
| --------------- | ---------------------------------------------- | -------- | ------- |
| `search_string` | The string to search for in the changed files. | No       | "DNM"   |

## Outputs

| Output             | Description                                                  |
| ------------------ | ------------------------------------------------------------ |
| `found_string`     | Whether the specified string was found in the changed files. |
| `string_locations` | The locations of the specified string in changed files.      |

## Example Usage

Here is an example of how to use the DNM Check action. This action will trigger on every pull request event.

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

If you do not provide a `search_string` input, it will default to "DNM".
