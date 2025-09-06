---
title: Release Streams
description: Understanding Aurora's different release streams and how to choose the right one
---

# Release Streams

Aurora offers different release streams to meet various user needs and preferences. Each stream provides a different balance of stability, features, and update frequency.

## Available Streams

### Stable

The **stable** stream is the recommended choice for most users. It provides:

- **Stability**: Thoroughly tested releases with fewer bugs
- **Reliability**: Changes are well-tested before reaching end users
- **Regular Updates**: Monthly to bi-monthly update cycles
- **Production Ready**: Suitable for daily use and production environments

**Image Tags**: `stable`, `stable-daily`

**Examples**:
- `ghcr.io/ublue-os/aurora:stable`
- `ghcr.io/ublue-os/aurora-dx:stable`
- `ghcr.io/ublue-os/aurora-nvidia:stable`
- `ghcr.io/ublue-os/aurora-nvidia-open:stable`

### Latest

The **latest** stream provides:

- **Cutting Edge**: Latest features and improvements
- **Faster Updates**: Updates as soon as they're available
- **Testing Ground**: Newer packages that may have occasional issues
- **For Enthusiasts**: Best for users who want the newest features

**Image Tags**: `latest`

**Examples**:
- `ghcr.io/ublue-os/aurora:latest`
- `ghcr.io/ublue-os/aurora-dx:latest`

### LTS (Long Term Support)

The **LTS** stream offers:

- **Extended Support**: 3-5 year support lifecycle
- **Maximum Stability**: Based on CentOS Stream 10
- **Enterprise Ready**: Designed for enterprise deployments
- **Minimal Changes**: Focus on security updates rather than feature updates
- **ARM Support**: First Aurora edition to officially support ARM64

**Image Tags**: `lts`

For detailed information about Aurora LTS, see the [Aurora Helium LTS documentation](../lts/introduction.md).

## Choosing the Right Stream

### Use **Stable** if you want:
- A reliable daily driver
- Regular updates without cutting-edge instability
- The best balance of features and stability
- **Recommended for most users**

### Use **Latest** if you want:
- The newest features immediately
- To help test upcoming changes
- Are comfortable with occasional issues

### Use **LTS** if you want:
- Maximum stability for enterprise use
- Minimal system changes over time
- Long-term support without frequent upgrades
- ARM64 support

## Switching Between Streams

You can switch between streams using the `bootc switch` command:

### To Stable Stream
```bash
sudo bootc switch --enforce-container-sigpolicy ghcr.io/ublue-os/aurora:stable
```

### To Latest Stream
```bash
sudo bootc switch --enforce-container-sigpolicy ghcr.io/ublue-os/aurora:latest
```

### To LTS Stream
```bash
sudo bootc switch --enforce-container-sigpolicy ghcr.io/ublue-os/aurora:lts
```

### Hardware-Specific Images

Replace `aurora` with your specific image variant:
- `aurora-dx` for Developer Experience variant
- `aurora-nvidia` for NVIDIA proprietary driver support
- `aurora-nvidia-open` for NVIDIA open driver support

## Update Frequency and Throttling

### Stable Stream
- Updates are released after thorough testing
- Typically monthly to bi-monthly cadence
- Updates include both system packages and container updates

### Latest Stream
- Updates follow Fedora's release schedule closely
- More frequent updates as changes become available
- May include beta or release candidate packages

### LTS Stream
- Focused primarily on security updates
- Minimal feature changes during the support lifecycle
- Updates follow CentOS Stream 10 maintenance schedule

## Checking Your Current Stream

To see which stream you're currently using:

```bash
rpm-ostree status
```

Look for the container image URL in the output to identify your current stream.

## Recommendations

- **New Users**: Start with the **stable** stream
- **Developers**: Consider **stable** for reliability or **latest** for newest tools
- **Enterprise**: Use **LTS** for production deployments
- **Enthusiasts**: Try **latest** for cutting-edge features

Remember that you can always switch between streams if your needs change!