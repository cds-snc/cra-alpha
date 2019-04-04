workflow "Build and test on push" {
  on = "push"
  resolves = ["Docker Registry"]
}

action "Lint Dockerfile" {
  uses = "docker://cdssnc/docker-lint"
}

action "Install npm dependencies" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  args = "install"
}

action "Run JS linter" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  needs = ["Install npm dependencies"]
  args = "run lint"
}

action "Run Jest unit tests" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  needs = ["Install npm dependencies"]
  args = "test"
}

action "If master branch" {
  uses = "actions/bin/filter@24a566c2524e05ebedadef0a285f72dc9b631411"
  needs = ["Run Jest unit tests", "Run JS linter", "Lint Dockerfile"]
  args = "branch workflow"
}

action "Docker Registry" {
  uses = "actions/docker/login@8cdf801b322af5f369e00d85e9cf3a7122f49108"
  needs = ["If master branch"]
  secrets = ["DOCKER_USERNAME", "DOCKER_PASSWORD"]
}
