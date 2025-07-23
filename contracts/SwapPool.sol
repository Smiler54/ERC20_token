// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract SwapPool {
    IERC20 public tokenA;
    IERC20 public tokenB;

    constructor(address _tokenA, address _tokenB) {
        tokenA = IERC20(_tokenA);
        tokenB = IERC20(_tokenB);
    }

    function addLiquidity(uint amountA, uint amountB) external {
        require(
            tokenA.transferFrom(msg.sender, address(this), amountA),
            "Transfer A failed"
        );
        require(
            tokenB.transferFrom(msg.sender, address(this), amountB),
            "Transfer B failed"
        );
    }

    function getAmountOut(
        uint amountIn,
        uint reserveIn,
        uint reserveOut
    ) public pure returns (uint) {
        uint amountInWithFee = amountIn * 1000;
        uint numerator = amountInWithFee * reserveOut;
        uint denominator = reserveIn * 1000 + amountInWithFee;
        return numerator / denominator;
		// (amountIn * 997 * reserveOut) / (reserveIn * 1000 + amountIn * 997);
		// return reserveIn - (reserveIn * reserveOut) / (reserveOut + amountIn);
    }

    function swap(address fromToken, uint amountIn) external {
        require(
            fromToken == address(tokenA) || fromToken == address(tokenB),
            "Invalid token"
        );

        bool isAToB = fromToken == address(tokenA);
        IERC20 inputToken = isAToB ? tokenA : tokenB;
        IERC20 outputToken = isAToB ? tokenB : tokenA;

        uint reserveIn = inputToken.balanceOf(address(this));
        uint reserveOut = outputToken.balanceOf(address(this));

        uint amountOut = getAmountOut(amountIn, reserveIn, reserveOut);

        require(
            inputToken.transferFrom(msg.sender, address(this), amountIn),
            "Input transfer failed"
        );
        require(
            outputToken.transfer(msg.sender, amountOut),
            "Output transfer failed"
        );
    }
}
