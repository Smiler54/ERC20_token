// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract HUMToken is ERC20 {
  constructor (uint initialSupply) ERC20("HUM Token", "HUM") {
    _mint(msg.sender, initialSupply);
  }

  function mint(address to, uint256 amount) public {
    _mint(to, amount);
  }
}