import { DefaultConfig } from "./interfaces";
import { Token } from "@uniswap/sdk-core";
import { tokenDetails } from "./tokens";
import { FeeAmount, computePoolAddress } from "@uniswap/v3-sdk";
import { ethers } from "ethers";

import uniswapPool from "@uniswap/v3-core/artifacts/contracts/UniswapV3Pool.sol/UniswapV3Pool.json";
import Quoter from "@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json";
interface token {
	sign: string;
	amount: number;
}

export const getQuote = async (inputToken: token, outputToken: token) => {
	try {
		const rpcProvider: string = "https://rpc.mevblocker.io/fast";

		const inToken: Token = new Token(
			1,
			tokenDetails[inputToken.sign]["address"],
			tokenDetails[inputToken.sign]["decimals"]
		);
		const outToken: Token = new Token(
			1,
			tokenDetails[outputToken.sign]["address"],
			tokenDetails[outputToken.sign]["decimals"]
		);

		const CurrentConfig: DefaultConfig = {
			rpc: {
				local: "http://localhost:8545",
				mainnet: rpcProvider,
			},
			tokens: {
				in: inToken,
				amountIn: inputToken.amount,
				out: outToken,
				poolFee: FeeAmount.MEDIUM,
			},
		};

		// compute the pool address.
		const currentPoolAddress = await computePoolAddress({
			factoryAddress: "0x1F98431c8aD98523631AE4a59f267346ea31F984",
			tokenA: CurrentConfig.tokens.in,
			tokenB: CurrentConfig.tokens.out,
			fee: CurrentConfig.tokens.poolFee,
		});

		// make the pool contract instance.
		const provider = ethers.getDefaultProvider(rpcProvider);
		// const provider = new ethers.BrowserProvider(window.ethereum);
		const pool = new ethers.Contract(
			currentPoolAddress,
			uniswapPool.abi,
			provider
		);

		const token0 = await pool.token0();
		const token1 = await pool.token1();
		const fee = await pool.fee();

		// get the quoter contract address.
		const quoterAddress = "0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6";
		const quoter = new ethers.Contract(quoterAddress, Quoter.abi, provider);

		const quotedAmountOut = await quoter.callStatic.quoteExactInputSingle(
			token0,
			token1,
			fee,
			ethers.utils
				.parseUnits(
					CurrentConfig.tokens.amountIn.toString(),
					CurrentConfig.tokens.in.decimals
				)
				.toString(),
			0
		);

		// console.log("the result is : ", quotedAmountOut);
		console.log(
			" usdt to shiba inu = ",
			ethers.utils.formatUnits(quotedAmountOut, 8)
		);
	} catch (error) {
		console.log("error occured", error);
	}
};
