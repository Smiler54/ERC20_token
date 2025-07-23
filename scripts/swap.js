// This script deploys HUMToken, USDToken, and SwapPool, adds liquidity, and performs a swap.
// Run with: npx hardhat run scripts/swap.js --network localhost

const { ethers } = require("hardhat");

async function main() {
    // === Setup fixed inputs ===
    const initialSupply = "1000000000";
    const liquidityAmount = "1000";
    const userAmount = "100";

    const toWei = (value) => ethers.parseUnits(value, 18);

    // Deploy HUMToken
    const HUMToken = await ethers.getContractFactory("HUMToken");
    const hum = await HUMToken.deploy(toWei(initialSupply)); // Initial supply of 1 million HUM
    await hum.waitForDeployment();
    const humAddress = await hum.getAddress();
    console.log("HUMToken deployed to:", humAddress);

    // Deploy USDToken
    const USDToken = await ethers.getContractFactory("USDToken");
    const usd = await USDToken.deploy(toWei(initialSupply)); // Initial supply of 1 million USD
    await usd.waitForDeployment();
    const usdAddress = await usd.getAddress();
    console.log("USDToken deployed to:", usdAddress);

    // Deploy SwapPool
    const SwapPool = await ethers.getContractFactory("SwapPool");
    const pool = await SwapPool.deploy(humAddress, usdAddress);
    await pool.waitForDeployment();
    const poolAddress = await pool.getAddress();
    console.log("SwapPool deployed to:", poolAddress);

    const [owner, user] = await ethers.getSigners();
    console.log("Owner address:", owner.address);
    console.log("User address:", user.address);

    console.log("--------------------------------------------------------------------");

    // User approves pool to spend tokens
    await hum.connect(owner).approve(poolAddress, toWei(liquidityAmount));
    await usd.connect(owner).approve(poolAddress, toWei(liquidityAmount));

    // Add liquidity
    await pool.connect(owner).addLiquidity(
        toWei(liquidityAmount),
        toWei(liquidityAmount)
    );
    console.log("Liquidity added", liquidityAmount, "HUM and USD");

    console.log("--------------------------------------------------------------------");

    // // Mint tokens to user
    await hum.mint(user.address, toWei(userAmount));
    // await usd.mint(user.address, toWei(userAmount));

    // Check balances
    console.log("User HUM balance:", ethers.formatUnits(await hum.balanceOf(user.address), 18));
    console.log("User USD balance:", ethers.formatUnits(await usd.balanceOf(user.address), 18));

    console.log("--------------------------------------------------------------------");

    // User approves pool for swap
    await hum.connect(user).approve(poolAddress, toWei(userAmount));

    // Swap HUM for USD
    await pool.connect(user).swap(humAddress, toWei(userAmount));
    console.log("Swap completed");

    console.log("--------------------------------------------------------------------");

    // Check balances
    const humBalance = await hum.balanceOf(user.address);
    const usdBalance = await usd.balanceOf(user.address);
    console.log("User HUM balance:", ethers.formatUnits(humBalance, 18));
    console.log("User USD balance:", ethers.formatUnits(usdBalance, 18));
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
