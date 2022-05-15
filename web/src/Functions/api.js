import { HashConnect } from 'hashconnect';

require("dotenv").config();

const {
  Client,
  PrivateKey,
  ContractExecuteTransaction,
  ContractFunctionParameters,
  ContractCallQuery,
  AccountId,
  Hbar,
} = require("@hashgraph/sdk");

const htsContract = require("./PlayersV4.json");

export async function walletConnect() {
  let hashconnect = new HashConnect();

  let saveData = {
    topic: "",
    pairingString: "",
    privateKey: "",
    pairedWalletData: null,
    pairedAccounts: [],
  };

  let appMetadata = {
    name: "NFTBL",
    description: "Your own football team",
    icon: "./img/football.png"
  };

  const initData = await hashconnect.init(appMetadata);
  saveData.privateKey = initData.privKey;

  const state = await hashconnect.connect();
  saveData.topic = state.topic;

  saveData.pairingString = hashconnect.generatePairingString(state, "testnet", false);

  hashconnect.findLocalWallets();
  hashconnect.connectToLocalWallet(saveData.pairingString);

  return [hashconnect, saveData];
}

export async function getMints() {
  const operatorId = AccountId.fromString(process.env.REACT_APP_ACCOUNT_ID);
  const operatorKey = PrivateKey.fromStringED25519(process.env.REACT_APP_PRIVATE_KEY);

  if (operatorId == null || operatorKey == null) {
    throw new Error("Environment variables myAccountId and myPrivateKey must be present");
  }

  const client = Client.forTestnet().setOperator(operatorId, operatorKey);

  const contractId = '0.0.34817440';

  const contractCallQuery = new ContractCallQuery()
    .setContractId(contractId)
    .setGas(100000)
    .setFunction("totalSupply");

  const contractUpdateResult = await contractCallQuery.execute(client);
  const amount = contractUpdateResult.bytes;
  return amount;
}

export async function getMintAmount(walletData, accountId, amount) {
	const hashconnect = walletData[0];
	const saveData = walletData[1];
	const provider = hashconnect.getProvider("testnet", saveData.topic, accountId);
	const signer = hashconnect.getSigner(provider);

  const contractId = '0.0.34817440';

  const mint = await new ContractExecuteTransaction()
      .setContractId(contractId)
      .setGas(1000000)
      .setFunction(
          "mint",
          new ContractFunctionParameters()
          .addUint256(amount)
      )
      .setPayableAmount(new Hbar(0.001 * amount))
      .freezeWithSigner(signer);

  const txResponse = await mint.executeWithSigner(signer);
  return txResponse;
}