workflow "Build and test on push" {
  on = "push"
  resolves = [ "Update container image in Azure App Service for Containers" ]
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
  needs = [ "Install npm dependencies" ]
  args = "run lint"
}

action "Run jest unit tests" {
  uses = "actions/npm@59b64a598378f31e49cb76f27d6f3312b582f680"
  needs = [ "Install npm dependencies" ]
  args = "test"
}

action "Run cypress functional tests" {
  uses = "bartlett705/npm-cy@f69478046d80aef1be0e17582c189a59bbfc9aa1"
  needs = [ "Install npm dependencies" ]
  args = "run cypress:cli"
}

action "If master branch" {
  uses = "actions/bin/filter@24a566c2524e05ebedadef0a285f72dc9b631411"
  needs = [ "Lint Dockerfile", "Run JS linter", "Run jest unit tests", "Run cypress functional tests" ]
  args = "branch master"
}

action "Build a Docker container" {
  uses = "actions/docker/cli@8cdf801b322af5f369e00d85e9cf3a7122f49108"
  needs = [ "If master branch" ]
  args = "build -t base --build-arg GITHUB_SHA_ARG=$GITHUB_SHA ."
}

action "Login to Docker Hub" {
  uses = "actions/docker/login@8cdf801b322af5f369e00d85e9cf3a7122f49108"
  needs = [ "If master branch" ]
  secrets = [ "DOCKER_USERNAME", "DOCKER_PASSWORD" ]
}

action "Tag :latest" {
  uses = "actions/docker/cli@8cdf801b322af5f369e00d85e9cf3a7122f49108"
  needs = [ "Build a Docker container" ]
  args = "tag base cdssnc/cra-alpha:latest"
}

action "Tag :$GITHUB_SHA" {
  uses = "actions/docker/cli@8cdf801b322af5f369e00d85e9cf3a7122f49108"
  needs = [ "Tag :latest" ]
  args = "tag base cdssnc/cra-alpha:$GITHUB_SHA"
}

action "Push container to Docker Hub" {
  uses = "actions/docker/cli@8cdf801b322af5f369e00d85e9cf3a7122f49108"
  needs = [ "Login to Docker Hub", "Tag :$GITHUB_SHA" ]
  args = "push cdssnc/cra-alpha"
}

action "Login to Azure" {
  uses = "Azure/github-actions/login@d0e5a0afc6b9d8d19c9ade8e2446ef3c20e260d4"
  secrets = [ "AZURE_SERVICE_APP_ID", "AZURE_SERVICE_PASSWORD", "AZURE_SERVICE_TENANT" ]
  needs = [ "Push container to Docker Hub" ]
}

action "Update container image in Azure App Service for Containers" {
  uses = "Azure/github-actions/cli@d0e5a0afc6b9d8d19c9ade8e2446ef3c20e260d4"
  needs = [ "Login to Azure" ]
  env = {
    AZURE_SCRIPT = "az webapp config container set --resource-group cdscracollab-innovation-rg --name cra-alpha --docker-custom-image-name cdssnc/cra-alpha:$GITHUB_SHA"
  }
}

workflow "Lighthouse scan" {
  on = "deployment_status"
  resolves = [ "Run lighthouse scan on landing page" ]
}

action "Run lighthouse scan on landing page" {
  uses = "docker://cdssnc/lighthouse-score-github-action"
  secrets = [ "LIGHTHOUSE_SECRET", "LIGHTHOUSE_URL" ]
  env = {
    LIGHTHOUSE_SCORES = "[99, 99, 90, 99, 50]"
  }
}
