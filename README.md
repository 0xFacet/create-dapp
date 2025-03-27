# Create Facet Dapp

A tool to quickly scaffold a new Facet dapp with RainbowKit, wagmi, and Next.js.

## Usage

You can create a new Facet dapp using any of these methods:

```bash
# Using npm
npm init @0xfacet/dapp

# Using yarn
yarn create @0xfacet/dapp

# Using pnpm
pnpm create @0xfacet/dapp
```

You can also specify a custom project directory:

```bash
npm init @0xfacet/dapp my-awesome-dapp
```

## Features

- Next.js 15+ setup with App Router
- RainbowKit for wallet connection
- wagmi for Ethereum interactions
- Tailwind CSS for styling
- TypeScript support
- Facet SDK integration

## Environment Setup

After creating your project, you'll find a `.env` file in the root directory. You'll need to set:

```
NEXT_PUBLIC_NETWORK=sepolia
```

## License

MIT
