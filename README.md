# ERC20 Token
Launch ERC20 new token.

## Overview

This project demonstrates how to launch a new ERC20 token on Ethereum using Solidity and Hardhat. It includes:

- `HUMToken`: A custom ERC20 token contract.
- `USDToken`: Another ERC20 token contract for testing swaps.
- `SwapPool`: A contract for swapping between HUM and USD tokens.
- Deployment scripts and configuration.

## Prerequisites


## Usage

To run this project, use the following commands:

```bash
npx hardhat node
npx hardhat run scripts/swap.js --network localhost
```

This will start a local Hardhat node and execute the swap script, which deploys contracts, adds liquidity, and performs a token swap.
