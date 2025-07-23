# ERC20 Token
Launch ERC20 new token.

## Overview

This project demonstrates how to launch a new ERC20 token on Ethereum using Solidity and Hardhat. It includes:

- `HUMToken`: A custom ERC20 token contract.
- `USDToken`: Another ERC20 token contract for testing swaps.
- `SwapPool`: A contract for swapping between HUM and USD tokens.
- Deployment scripts and configuration.

## Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [Yarn](https://yarnpkg.com/) or [npm](https://www.npmjs.com/)
- [Hardhat](https://hardhat.org/)

## Setup

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd ERC20_token
   ```

2. **Install dependencies:**
   ```bash
   yarn install
   # or
   npm install
   ```

3. **Compile contracts:**
   ```bash
   npx hardhat compile
   ```

## Deployment

To deploy the contracts to a local Hardhat network:
1. **Start a local Hardhat node (in a separate terminal):**
   ```bash
   npx hardhat node
   ```

2. **Deploy the contracts:**
   ```bash
   npx hardhat run scripts/deploy.js --network localhost
   ```

The deployment script will deploy the `HUMToken`, `USDToken`, and `SwapPool` contracts. The deployed contract addresses will be printed in the terminal.

## Interacting with the Contracts

You can interact with the deployed contracts using Hardhat's console:

1. **Open the Hardhat console:**
   ```bash
   npx hardhat console --network localhost
   ```

2. **Get contract instances:**
   After deployment, copy the deployed contract addresses from your terminal output. In the console, you can interact with the contracts as follows:

   ```js
   // Replace these addresses with the actual deployed addresses
   const HUMToken = await ethers.getContractAt("HUMToken", "<HUMToken_address>");
   const USDToken = await ethers.getContractAt("USDToken", "<USDToken_address>");
   const SwapPool = await ethers.getContractAt("SwapPool", "<SwapPool_address>");

   ```

3. **Example interactions:**

   - **Check balances:**
     ```js
     const [owner] = await ethers.getSigners();
     (await HUMToken.balanceOf(owner.address)).toString();
     (await USDToken.balanceOf(owner.address)).toString();
     ```

   - **Approve tokens for swapping:**
     ```js
     // Approve SwapPool to spend your HUM tokens
     await HUMToken.approve(SwapPool.target, ethers.parseUnits("1000", 18));
     // Approve SwapPool to spend your USD tokens
     ```
   - **Swap tokens (example):**
     ```js
     await SwapPool.swapHUMforUSD(ethers.parseUnits("100", 18));

   - **Check updated balances:**
     ```js
     (await HUMToken.balanceOf(owner.address)).toString();
     (await USDToken.balanceOf(owner.address)).toString();
     ```

> **Note:**  
> The exact function names and parameters for swapping may differ depending on your `SwapPool` contract implementation. Refer to your contract code for details.
