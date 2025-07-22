// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract USDToken is ERC20 {
  constructor () ERC20("USD Token", "USD") {
    _mint(msg.sender, 1_000_000_000 * 1e18);
  }
}