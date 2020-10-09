'use strict'

var fs = require('fs');
var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider(process.env.NODE_URL));
var PROMISE = require('promise');
const { resolve } = require('path');

let abi = '[{"inputs": [],"stateMutability": "nonpayable","type": "constructor"},{"inputs": [{"internalType": "uint256","name": "ApplicationId_","type": "uint256"}],"name": "displayHalalInfo","outputs": [{"components": [{"internalType": "uint256","name": "ApplicationId","type": "uint256"},{"internalType": "uint256","name": "CompanyId","type": "uint256"},{"internalType": "uint256","name": "CBId","type": "uint256"},{"internalType": "uint256","name": "CBCountryId","type": "uint256"},{"internalType": "string","name": "HalalCertDateIssued","type": "string"},{"internalType": "string","name": "HalalCertDateExpired","type": "string"},{"internalType": "string","name": "HalalCertRefNo","type": "string"}],"internalType": "struct VHSmart.HalalInfo","name": "_info","type": "tuple"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "","type": "uint256"}],"name": "info","outputs": [{"internalType": "uint256","name": "ApplicationId","type": "uint256"},{"internalType": "uint256","name": "CompanyId","type": "uint256"},{"internalType": "uint256","name": "CBId","type": "uint256"},{"internalType": "uint256","name": "CBCountryId","type": "uint256"},{"internalType": "string","name": "HalalCertDateIssued","type": "string"},{"internalType": "string","name": "HalalCertDateExpired","type": "string"},{"internalType": "string","name": "HalalCertRefNo","type": "string"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "_ApplicationId","type": "uint256"},{"internalType": "uint256","name": "_CompanyId","type": "uint256"},{"internalType": "uint256","name": "_CBId","type": "uint256"},{"internalType": "uint256","name": "_CBCountryId","type": "uint256"},{"internalType": "string","name": "_HalalCertDateIssued","type": "string"},{"internalType": "string","name": "_HalalCertDateExpired","type": "string"},{"internalType": "string","name": "_HalalCertRefNo","type": "string"}],"name": "storeHalalInfo","outputs": [],"stateMutability": "nonpayable","type": "function"}]'
let bytecode = '608060405234801561001057600080fd5b50610b46806100206000396000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c8063293efdab146100465780632e34059914610062578063d5e5b59b14610098575b600080fd5b610060600480360381019061005b9190610750565b6100c8565b005b61007c60048036038101906100779190610727565b610198565b60405161008f9796959493929190610992565b60405180910390f35b6100b260048036038101906100ad9190610727565b6103a2565b6040516100bf9190610970565b60405180910390f35b6040518060e00160405280888152602001878152602001868152602001858152602001848152602001838152602001828152506000808981526020019081526020016000206000820151816000015560208201518160010155604082015181600201556060820151816003015560808201518160040190805190602001906101519291906105dc565b5060a082015181600501908051906020019061016e9291906105dc565b5060c082015181600601908051906020019061018b9291906105dc565b5090505050505050505050565b6000602052806000526040600020600091509050806000015490806001015490806002015490806003015490806004018054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561025c5780601f106102315761010080835404028352916020019161025c565b820191906000526020600020905b81548152906001019060200180831161023f57829003601f168201915b505050505090806005018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156102fa5780601f106102cf576101008083540402835291602001916102fa565b820191906000526020600020905b8154815290600101906020018083116102dd57829003601f168201915b505050505090806006018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156103985780601f1061036d57610100808354040283529160200191610398565b820191906000526020600020905b81548152906001019060200180831161037b57829003601f168201915b5050505050905087565b6103aa61065c565b6000808381526020019081526020016000206040518060e001604052908160008201548152602001600182015481526020016002820154815260200160038201548152602001600482018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156104885780601f1061045d57610100808354040283529160200191610488565b820191906000526020600020905b81548152906001019060200180831161046b57829003601f168201915b50505050508152602001600582018054600181600116156101000203166002900480601f01602080910402602001604051908101604052809291908181526020018280546001816001161561010002031660029004801561052a5780601f106104ff5761010080835404028352916020019161052a565b820191906000526020600020905b81548152906001019060200180831161050d57829003601f168201915b50505050508152602001600682018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156105cc5780601f106105a1576101008083540402835291602001916105cc565b820191906000526020600020905b8154815290600101906020018083116105af57829003601f168201915b5050505050815250509050919050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061061d57805160ff191683800117855561064b565b8280016001018555821561064b579182015b8281111561064a57825182559160200191906001019061062f565b5b5090506106589190610699565b5090565b6040518060e00160405280600081526020016000815260200160008152602001600081526020016060815260200160608152602001606081525090565b6106bb91905b808211156106b757600081600090555060010161069f565b5090565b90565b600082601f8301126106cf57600080fd5b81356106e26106dd82610a43565b610a16565b915080825260208301602083018583830111156106fe57600080fd5b610709838284610aa6565b50505092915050565b60008135905061072181610af9565b92915050565b60006020828403121561073957600080fd5b600061074784828501610712565b91505092915050565b600080600080600080600060e0888a03121561076b57600080fd5b60006107798a828b01610712565b975050602061078a8a828b01610712565b965050604061079b8a828b01610712565b95505060606107ac8a828b01610712565b945050608088013567ffffffffffffffff8111156107c957600080fd5b6107d58a828b016106be565b93505060a088013567ffffffffffffffff8111156107f257600080fd5b6107fe8a828b016106be565b92505060c088013567ffffffffffffffff81111561081b57600080fd5b6108278a828b016106be565b91505092959891949750929550565b600061084182610a6f565b61084b8185610a7a565b935061085b818560208601610ab5565b61086481610ae8565b840191505092915050565b600061087a82610a6f565b6108848185610a8b565b9350610894818560208601610ab5565b61089d81610ae8565b840191505092915050565b600060e0830160008301516108c06000860182610952565b5060208301516108d36020860182610952565b5060408301516108e66040860182610952565b5060608301516108f96060860182610952565b50608083015184820360808601526109118282610836565b91505060a083015184820360a086015261092b8282610836565b91505060c083015184820360c08601526109458282610836565b9150508091505092915050565b61095b81610a9c565b82525050565b61096a81610a9c565b82525050565b6000602082019050818103600083015261098a81846108a8565b905092915050565b600060e0820190506109a7600083018a610961565b6109b46020830189610961565b6109c16040830188610961565b6109ce6060830187610961565b81810360808301526109e0818661086f565b905081810360a08301526109f4818561086f565b905081810360c0830152610a08818461086f565b905098975050505050505050565b6000604051905081810181811067ffffffffffffffff82111715610a3957600080fd5b8060405250919050565b600067ffffffffffffffff821115610a5a57600080fd5b601f19601f8301169050602081019050919050565b600081519050919050565b600082825260208201905092915050565b600082825260208201905092915050565b6000819050919050565b82818337600083830152505050565b60005b83811015610ad3578082015181840152602081019050610ab8565b83811115610ae2576000848401525b50505050565b6000601f19601f8301169050919050565b610b0281610a9c565b8114610b0d57600080fd5b5056fea2646970667358221220daeafa93c1e26e59ae9f596a2ba7c670d847dff4fbd67c6d55a45306aee0007264736f6c63430006060033';

let account = '0x4f646898966708FCBA294caf5025CE39b5913182'

class SmartcontractController {
    async MethodCall({ request, response, params }) {
        try {
            // const jsonData = JSON.parse(request.raw())
            response.implicitEnd = false
            // console.log(params.methods)
            ////////// SMART CONTRACT //////////
            // instantiating a contract object
            var contract = new web3.eth.Contract(JSON.parse(abi), params.contract, { from: process.env.NODE_ACCOUNT_ADDRESS })
            return new PROMISE(function (resolve, reject) {
                var method = "contract.methods." + params.methods + ".call()"

                const run = eval(method)
                run.then(result => {
                    var res = JSON.parse('{"status": 200,"message": "success"}')
                    console.log("res: " + result)
                    var resultNew = JSON.parse('{"ApplicationId": "' + result.ApplicationId + '","CompanyId":"' + result.CompanyId + '","CBId":"' + result.CBId + '","CBCountryId":"' + result.CBCountryId + '","HalalCertDateIssued":"' + result.HalalCertDateIssued + '", "HalalCertDateExpired":"' + result.HalalCertDateExpired + '", "HalalCertRefNo":"' + result.HalalCertRefNo + '"}')
                    resolve({
                        res,
                        result: resultNew
                    })
                })
                    .catch(error => {
                        console.log(error.toString())
                        reject({ error: error.toString() })
                        // response.json({ error: error.toString() })
                    })
            })
        } catch (error) {
            response.json({ error: "call: " + error.toString() })
        }
    }

    async MethodSend({ request, response, params }) {
        try {
            const jsonData = JSON.parse(request.raw())
            response.implicitEnd = false

            ////////// SMART CONTRACT //////////
            // instantiating a contract object
            // console.log(account)
            var contract = new web3.eth.Contract(JSON.parse(abi), params.contract)

            return new PROMISE(function (resolve, reject) {
                // contract.method.storeData(jsonData.id, jsonData.company_name, jsonData.date)

                var method = "contract.methods." + jsonData.methods + ".send({from: '" + process.env.NODE_ACCOUNT_ADDRESS + "', gasPrice: 2000, gas: 6000000})"

                const run = eval(method)
                run.then(result => {
                    console.log(result)
                    resolve(result)
                })
                    .catch(error => {
                        console.log(error.toString())
                        // response.json({ error: error.toString() })
                        reject(error);
                    })
            })
        } catch (error) {
            response.json({ error: "send: " + error.toString() })
        }
    }

    async MethodDeploy({ request, response, params }) {
        try {
            // jsonData (abi, bytecode, id, company_name, date, account)
            // const jsonData = JSON.parse(request.raw())
            response.implicitEnd = false

            var contract = new web3.eth.Contract(JSON.parse(abi));
            return new PROMISE(function (resolve, reject) {
                contract.deploy({
                    data: '0x' + bytecode
                }).send({ from: process.env.NODE_ACCOUNT_ADDRESS, gasPrice: 2000, gas: 6000000 },
                    async function (error, transactionHash) {
                        if (error) {
                            console.log(error.toString())
                            reject(error)
                        }
                        console.log('Transaction Hash: ', transactionHash)
                    }).on('receipt', async (receipt) => {
                        console.log(receipt.contractAddress, receipt.contractAddress);
                        fs.writeFile('contract.txt', receipt.contractAddress, function (err) {
                            if (err) throw err;
                            console.log('File is created successfully.');
                        });
                        fs.readFile('contract.txt',
                            // callback function that is called when reading file is done
                            function (err, data) {
                                if (err) throw err;
                                // data is a buffer containing file content
                                console.log(data.toString('utf8'))
                            });
                        resolve(receipt);
                    })
                    .catch(error => {
                        console.log(error)
                    })
            })
        } catch (error) {
            response.json({ error: "deploy: " + error.toString() })
        }
    }
}

module.exports = SmartcontractController
