// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract HUMToken is ERC20 {
  constructor () ERC20("HUM Token", "HUM") {
    _mint(msg.sender, 1_000_000_000 * 1e18);
  }
}