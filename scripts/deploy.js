async function main() {
  const [deployer] = await ethers.getSigners();

  const HUM = await ethers.getContractFactory("HUMToken");
  const hum = await HUM.deploy();
  await hum.waitForDeployment();
  const address1 = await hum.getAddress();
  console.log("HUM deployed to:", address1);

  const USD = await ethers.getContractFactory("USDToken");
  const usd = await USD.deploy();
  await usd.waitForDeployment();
  const address2 = await usd.getAddress();
  console.log("USD deployed to:", address2);

  const Pool = await ethers.getContractFactory("SwapPool");
  // const pool = await Pool.deploy(hum.address, usd.address);
  const pool = await Pool.deploy(address1, address2);
  await pool.waitForDeployment();
  // console.log("Pool deployed to:", pool.address);
  console.log("Pool deployed to:", await pool.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});