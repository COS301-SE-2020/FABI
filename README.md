# FABI - Tree Protection Co-operative Program (TPCP)

## Overview

This proposed system is the TPCP database analytics and interface for data capturing, monitoring, and modelling of forest pests and pathogens.

## Table of Contents

> Use the following links to easily traverse the `README`

- [Installation](#installation-instructions)
- [Testing](#testing)
- [Documentation](#documentation)
- [Project Management](#project-management-tool)
- [Collaborators](#collaborators)
- [Git Standards](#git-standards)
- [Contributing](#contributing)
- [License](#license)

## Installation Instructions

### Clone

- Clone this repository to your local machine using `git@github.com:COS301-SE-2020/FABI.git`
  
  > Note this requires appropriate privileges

### Setup

- While in the project directory inside the terminal

> Update and Install all necessary packages

```bash
foo update
foo install
```

> Run the system

```bash
foo start
```

## Testing

### Integration

We will be using the GitHub workflow and actions to setup continuous integration testing for all pushing/pull requests.

### Unit tests

We will be using external libraries to aid in our automated unit tests.

  > Run the test command

```c
foo test
```

## Documentation

Please find all appropriate documentation below

- [System Requirements Specification]() (Current version)

  > SRS Documentation is regularly updated due to Agile Methodology

- [API Documentation]()
- [Coding Standards]()

## Project Management Tool

Our team is using [Notion]() to monitor and manage our development. In future we would like to integrate our PM Tool with GitHub for easier access.

## Collaborators

> The Development Team

| [Steven Jordaan]() | [Bradley Mapstone]() | [Shaun Naude]() | [Matthew Kershaw]() | [Daniel Nel]() |
| :---: |:---:| :---:| :---:| :---:|
| [![Steven Jordaan](https://avatars2.githubusercontent.com/u/50364770?s=400&u=fc71708e5f1b450bbc8895c133d9ac50ae5c3838&v=4&s=200)]()    | [![Bradley Mapstone](https://avatars1.githubusercontent.com/u/56454573?s=400&u=b3edd9887578d8a29dcb467cc296f3ac05d43d05&v=4&s=200)]() | [![Shaun Naude](https://avatars1.githubusercontent.com/u/44646417?s=400&u=988e26f57a2785a279c93e992838db03382c7d7e&v=4&s=200)](http://fvcproductions.com)  | [![Matthew Kershaw](https://avatars1.githubusercontent.com/u/54933104?s=400&v=4&s=200)]()  | [![Daniel Nel](https://avatars0.githubusercontent.com/u/40039774?s=400&u=dfacc43e5d1cb9a50ccd5493008f41d1cca5ea65&v=4&s=200)]()  |
| [Portfolio]() | [Portfolio]() | [Portfolio]() | [Portfolio]() | [Portfolio]() |

## Git Standards

### Workflow

[![Workflow](https://miro.medium.com/max/1316/1*5i8mTaBs05J3eGhp_CJv5Q.png)]()

### Naming Conventions

- Use grouping tokens at the beginning of branch names
  > `userManagement/<feature>`
- Define and use short lead tokens
  > `um/login` where `um` means `User Management`

### Rules of this flow

1. Anything in `master` is deployable
2. To work on something new branch off of `master`
3. `commit` to that branch locally and **regularly** `push` to the remote branch of the same name
4. When a branch is ready to be merged, open a `pull request`
5. Another member must review the `feature` before you can `merge` it into `master`
6. Once `merged` into `master`, you **must** deploy

## Contributing
Due to this being a project contributing marks to our module COS301, we are unable to accept any pull requests from external sources but if you have any suggestions about how we could improve something please let us know at [runtimeterrors@protonmail.com]()

## License

`There is currently no License for external use`
