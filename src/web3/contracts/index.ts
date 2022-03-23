import Web3 from "web3";

export const initContract = (provider: any, address: string, abi: any) => {
  try {
    const web3 = new Web3(provider);
    const contract = new web3.eth.Contract(abi, address);
    return contract;
  } catch (error) {
    throw error;
  }
};
