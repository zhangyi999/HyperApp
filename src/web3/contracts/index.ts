import Web3 from "web3";

export const initContract = (provider: any, address: string, abi: any) => {
  try {
    const web3 = new Web3(provider);
    const contract = new web3.eth.Contract(abi, address, {
      from: "0xac3Ba799055Bb644a7D35d862ea74C90c5b3AD44",
    });
    return contract;
  } catch (error) {
    throw error;
  }
};
