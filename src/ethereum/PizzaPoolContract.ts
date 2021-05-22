import { BigNumber } from "@ethersproject/bignumber";
import Config from "../Config";
import SmartContract from "./SmartContract";

export interface PoolStruct {
    pizzaId: BigNumber;
    owner: string;

    inSlice: BigNumber;
    outSlice: BigNumber;

    accSubsidyBlock: BigNumber;
    inAccSubsidy: BigNumber;
    outAccSubsidy: BigNumber;

    takenBlock: BigNumber;
    takenAccSubsidy: BigNumber;
}

class PizzaPoolContract extends SmartContract {

    constructor() {
        super(
            Config.POOL_ADDRESS,
            require("./PizzaPoolContractABI.json"),
        );
    }

    public async init() {
        await super.init([
            "CreatePool",
            "ChangePool",
            "DeletePool",
            "JoinPool",
            "ChangeSlice",
            "DeleteSlice",
            "TakePool",
            "Distribute",
        ]);
    }

    public async getPoolCount(): Promise<BigNumber> { return await this.contract.poolCount(); }
    public async getPizza(poolId: BigNumber): Promise<PoolStruct> { return await this.contract.pools(poolId); }

    public async createPool(power: BigNumber): Promise<BigNumber> {
        return await this.web3Contract.createPool(power);
    }
}

export default new PizzaPoolContract();
