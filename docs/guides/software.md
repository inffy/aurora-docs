---
title: Installing Software on Aurora
description: How to install software on Aurora
---

## Flatpak

[Flatpak](https://flatpak.org) is the primary package method for graphical applications. By default, the [Flathub](https://www.flathub.org) remote is used which contains several popular applications to install from. Install Flatpaks with the **Discover** application.

## Homebrew

The [Homebrew](https://brew.sh/) package manager is specifically for installing command-line utilities and software used in the terminal.

## Docker

[Docker](https://www.docker.com/) is a popular containerization platform for running and managing containers. There are several ways to get Docker on Aurora:

### Option 1: Use Aurora DX (Recommended for Developers)

For the best Docker experience, consider switching to **Aurora DX** which includes Docker pre-installed and configured:

- Docker Engine with full integration
- Visual Studio Code with devcontainer support
- Pre-configured development tools

To switch to Aurora DX, use the rebase helper:

```bash
ujust rebase-helper
```

Learn more about Aurora DX and its developer features in the [Aurora DX Introduction](/dx/aurora-dx-intro).

### Option 2: Install via Homebrew

Install Docker CLI tools through Homebrew for command-line usage:

```bash
brew install docker docker-compose
```

> **Note**: This installs Docker CLI tools only. You'll need a Docker daemon running elsewhere (like Docker Desktop, remote Docker host, or a container runtime).

### Option 3: Use Docker in Distrobox

Run Docker inside a Distrobox container to get full Docker functionality:

```bash
# Create a container with Docker
distrobox create --name docker-box --image registry.fedoraproject.org/fedora:latest
distrobox enter docker-box
# Inside the container:
sudo dnf install docker
sudo systemctl enable --now docker
sudo usermod -aG docker $USER
```

### Option 4: Switch Between Aurora Variants

You can easily switch between Aurora variants using the [rebase helper](/guides/release-streams#switching-between-streams) to find the right balance of features for your needs.

## Distrobox Containers

[Distrobox](https://distrobox.it/) containers are Linux subsystems of other popular Linux distributions which give users access to their package managers (like `dnf` or `apt`) and their package formats (like RPM and Deb).

They are commonly used for two different scenarios:

- Used as a fallback for Linux software that do not have a Flatpak available
- Development boxes

## `rpm-ostree`

> **Note**: It is highly recommended to only use this as a last resort.

Layer RPM packages to the host like a traditional Linux operating system which comes with major downsides such as:

- High potential for broken upgrades due to dependency issues.
- Slower updates due to adding an extra layer to the deployment.

Read more about layering packages to the host [here](/guides/layerapp).
