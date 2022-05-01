# auto-assign-pr

## Usage 

```yml
name: 'Auto Assign PR'

on:
  pull_request_target:
    types: [opened, reopened]

permissions:
  pull-requests: write

jobs:
  auto-assign-pr:
    runs-on: ubuntu-latest
    steps:
      - uses: xvepkj/auto-assign-pr@main
````