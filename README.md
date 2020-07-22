# FABI-Surveillance, Tree Protection Co-operative Program (TPCP)

## Overview

This proposed system is the TPCP database analytics and interface for data capturing, monitoring, and modelling of forest pests and pathogens.

## Table of Contents

> Use the following links to easily traverse the `README`

- [Installation](#installation-instructions)
- [Testing](#testing)
- [Documentation](#documentation)
- [Project Management](#project-management-tool)
- [Collaborators](#collaborators)
- [Contributions](#contributions)
- [Git Standards](#git-standards)
- [License](#license)

## Installation Instructions

### Clone

- Clone this repository to your local machine using `git@github.com:COS301-SE-2020/FABI.git`
  
  > Note this requires appropriate privileges

### Setup

- While in the API project directory inside the terminal

> Update and Install all necessary packages

```bash
npm update
npm install
```

> Run the system

```bash
npm run
```
- While in the Frontend project directory inside the terminal

> Update and Install all necessary packages

```bash
npm update
npm install
```

> Run the system

```bash
npm start
```
## Testing

### Integration

We will be using the GitHub workflow and actions to setup continuous integration testing for all pushing/pull requests.

### Unit tests

We will be using external libraries to aid in our automated unit tests.
- While in the API project directory inside the terminal

  > Run the test command

```c
npm run test
```

- While in the Frontend project directory inside the terminal

  > Run the test command

```c
npm test
```

## Documentation

Please find all appropriate documentation below

- [System Requirements Specification](https://www.overleaf.com/read/kwbmcxbbfrtj) (Current version)

  > SRS Documentation is regularly updated due to Agile Methodology

- [API Documentation](https://api-hzg6vf4a2a-ew.a.run.app/graphql)

## Project Management Tool

Our team is using [Notion](https://www.notion.so/runtimeterrors/aca58d2e5d20454fafed42295c2c58dd?v=dde4028656ba4818b7682ed048cd425c) and GitHub Projects to monitor and manage our development. In future we would like to integrate our PM Tool with GitHub for easier access.

## Collaborators

> The Development Team

| [Steven Jordaan]() | [Bradley Mapstone]() | [Shaun Naude]() | [Matthew Kershaw]() | [Daniel Nel]() |
| :---: |:---:| :---:| :---:| :---:|
| [![Steven Jordaan](https://avatars2.githubusercontent.com/u/50364770?s=400&u=fc71708e5f1b450bbc8895c133d9ac50ae5c3838&v=4&s=200)]()    | [![Bradley Mapstone](https://avatars1.githubusercontent.com/u/56454573?s=400&u=b3edd9887578d8a29dcb467cc296f3ac05d43d05&v=4&s=200)]() | [![Shaun Naude](https://avatars1.githubusercontent.com/u/44646417?s=400&u=988e26f57a2785a279c93e992838db03382c7d7e&v=4&s=200)](http://fvcproductions.com)  | [![Matthew Kershaw](https://avatars1.githubusercontent.com/u/54933104?s=400&v=4&s=200)]()  | [![Daniel Nel](https://avatars0.githubusercontent.com/u/40039774?s=400&u=dfacc43e5d1cb9a50ccd5493008f41d1cca5ea65&v=4&s=200)]()  |
| [Portfolio](https://sj-jordaan.github.io/) | [Portfolio](https://bradez-of-map-n-stone.github.io/) | [Portfolio](https://shaunnaude.github.io/) | [Portfolio](https://mattyk-dev.github.io/) | [Portfolio](https://mdnel.tech/) |

### Steven Jordaan

I am currently studying BSc Information and Knowledge Systems with my elective group dipping into software developement. I have many interests in the IT field such as Interaction Design, Web Developement, App Developement, Alogorithms, Theoretical Computer Science etc. but I am not only interested in IT, I also find many other fields such as Biology, Engineering, and even Psychology to be fascinating.

### Bradley Mapstone

Experienced Book Seller with a demonstrated history of working in the retail industry. Skilled in Microsoft Excel, Microsoft Word, Microsoft PowerPoint, Strategic Planning, and Microsoft Office. Proficient in Java, C++ and database work in SQL. Strong administrative professional studying an IT course focusing on GIS at the University of Pretoria/Universiteit van Pretoria.

### Shaun Naude

My Name is Shaun Naude, I am Currently 3rd year BSc Computer Science
at the University of Pretoria.

### Matthew Kershaw

I'm a computer science student in my final year at the University of Pretoria. I am an enthusiastic person who enjoys working with others. My experience in the field of computer science is still quite low but I am a fast learner who is not afraid to tackle problems head on.

### Daniel Nel
Hey I am currently a third year computer science student at the University of Pretoria. I am a tech and coffee enthusiast. I love working on projects and challenging myself to learn more about the wonderful world of software development.

## Contributions
|                             | Steven Jordaan | Bradley Mapstone | Shaun Naude | Matthew Kershaw | Daniel Nel |
|-----------------------------|:--------------:|:----------------:|:-----------:|:---------------:|:----------:|
| ====Demo 1====              |        X       |         X        |      X      |        X        |      X     |
| 1. SRS                      |        X       |         X        |      X      |        X        |      X     |
| 1.1 Introduction            |                |                  |             |                 |      X     |
| 1.2 User Stories            |                |         X        |             |                 |            |
| 1.3 User Characteristics    |                |                  |             |                 |      X     |
| 1.4 Functional Requirements |        X       |                  |             |                 |            |
| 1.5 Domain Model            |        X       |                  |             |        X        |            |
| 1.6 Quality Requirements    |                |         X        |      X      |                 |            |
| 1.7 Trace-ability Matrix    |        X       |                  |             |                 |            |
| 2. System                   |        X       |         X        |      X      |        X        |      X     |
| 2.1 Database                |                |                  |             |        X        |            |
| 2.2 User Management         |        X       |                  |      X      |        X        |            |
| 2.2.1 Login                 |        X       |                  |             |                 |      X     |
| 2.2.2 Register              |        X       |                  |      X      |                 |            |
| 2.3 Data Capture            |        X       |         X        |             |                 |            |
| 2.3.1 Question data         |                |         X        |             |                 |            |
| 2.3.2 Location              |                |         X        |             |                 |            |
| 2.3.3 Photo capture         |        X       |                  |             |                 |            |
| 3. Testing                  |        X       |                  |      X      |        X        |      X     |
| 3.1 API unit tests          |                |                  |      X      |                 |      X     |
| 3.2 Frontend unit tests     |        X       |                  |             |                 |            |
| 3.3 Integration pipeline    |                |                  |             |        X        |            |


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
2. To work on something new branch off of `develop`
3. `commit` to that branch locally and **regularly** `push` to the remote branch of the same name
4. When a branch is ready to be merged, open a `pull request`
5. Another member must review the `feature` before you can `merge` it into `master`
6. Once `merged` into `master`, you **must** deploy

## License

`There is currently no License for external use`
