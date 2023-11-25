// 导入web3模块
const Web3 = require('web3');

// 定义你要调用的合约函数的签名，比如transfer(address,uint256)
const functionSignature = "transfer(address,uint256)";

// 定义你要传入的参数的类型和值，比如["0x1234567890123456789012345678901234567890", 100]
const parameterTypes = ["address", "uint256"];
const parameterValues = ["0x1234567890123456789012345678901234567890", 100];

// 使用web3的abi模块，对函数签名和参数进行编码，生成input data
const inputData = web3.eth.abi.encodeFunctionCall({
    name: functionSignature,
    type: 'function',
    inputs: parameterTypes.map(type => ({type}))
}, parameterValues);

// 定义交易的其他参数，比如gas limit，gas price，nonce等
const txParams = {
    from: accountAddress, // 你的账户地址
    to: contractInstance.options.address, // 合约地址
    gasLimit: web3.utils.toHex(210000), // gas限制
    gasPrice: web3.utils.toHex(web3.utils.toWei('10', 'gwei')), // gas价格
    nonce: web3.utils.toHex(await web3.eth.getTransactionCount(accountAddress)), // nonce值
    data: inputData // input data
};

// 使用web3的accounts模块，对交易进行签名，生成原始交易数据
const signedTx = await web3.eth.accounts.signTransaction(txParams, privateKey);

// 使用web3的eth模块，发送已签名的交易，获取交易哈希和收据
const txHash = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
const txReceipt = await web3.eth.getTransactionReceipt(txHash);

// 打印交易哈希和收据
console.log("Transaction hash:", txHash);
console.log("Transaction receipt:", txReceipt);
