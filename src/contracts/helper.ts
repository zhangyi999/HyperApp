const JSONRPCERROR = "Internal JSON-RPC error.";
type ContractError = {
  title: string;
  message: string;
};

export const CONTRACT_INIT_ERROR: ContractError = {
  title: "contract init failed",
  message: "contract is undefined",
};

export type RejectContractError = (reason?: ContractError) => void;

export function isJsonRpcError(error: string) {
  return error.startsWith(JSONRPCERROR);
}

/**
 * 解析JSON-RPC错误
 */
function JsonRpcErrorParse(error: string): ContractError {
  const obj: any = JSON.parse(error.replace(JSONRPCERROR, ""));
  const parseResult = {
    title: JSONRPCERROR,
    message: "Undefined error",
  };
  if (obj && obj["message"]) {
    parseResult.message = obj["message"];
  }
  return parseResult;
}

/**
 * 解析Object类型错误
 */
function objectErrorParse(error: any): ContractError {
  const parseResult = {
    title: "object error",
    message: "Undefined error",
  };
  if (error && error["message"]) {
    parseResult.message = error["message"];
  }
  return parseResult;
}

/**
 * 合约错误处理器
 *
 * @param JSONRPCMessage
 * @returns
 */
export function errorHandler(JSONRPCMessage: any) {
  if (JSONRPCMessage instanceof Error) {
    const errorMessage = JSONRPCMessage.message;
    if (isJsonRpcError(errorMessage)) {
      return JsonRpcErrorParse(errorMessage);
    }
  } else if (typeof JSONRPCMessage === "object") {
    return objectErrorParse(JSONRPCMessage);
  } else {
    printError(JSONRPCMessage);
  }
}

function printError(error: any) {
  console.log("web3 helper: unparsed error");
  console.log(typeof error);

  console.error(error);
}
