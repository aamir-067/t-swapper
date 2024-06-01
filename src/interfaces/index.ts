import { Token } from "@uniswap/sdk-core";

export interface DefaultConfig {
	rpc: {
		local: string;
		mainnet: string;
	};
	tokens: {
		in: Token;
		amountIn: number;
		out: Token;
		poolFee: number;
	};
}
