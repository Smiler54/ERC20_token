// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract USDToken is ERC20 {
  constructor (uint initialSupply) ERC20("USD Token", "USD") {
    _mint(msg.sender, initialSupply);
  }

  function mint(address to, uint256 amount) public {
    _mint(to, amount);
  }
}