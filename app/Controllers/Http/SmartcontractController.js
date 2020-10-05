'use strict'

var fs = require('fs');
var Web3 = require('web3');
var web3 = new Web3("http://localhost:8545");
var PROMISE = require('promise');

let abi = '[{"inputs": [{"internalType": "uint256","name": "_id","type": "uint256"},{"internalType": "string","name": "_company_name","type": "string"},{"internalType": "string","name": "_date","type": "string"}],"stateMutability": "nonpayable","type": "constructor"},{"inputs": [],"name": "displayData","outputs": [{"internalType": "uint256","name": "id","type": "uint256"},{"internalType": "string","name": "company_name","type": "string"},{"internalType": "string","name": "date","type": "string"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "_id","type": "uint256"},{"internalType": "string","name": "_company_name","type": "string"},{"internalType": "string","name": "_date","type": "string"}],"name": "storeData","outputs": [],"stateMutability": "nonpayable","type": "function"}]'
let bytecode = '608060405234801561001057600080fd5b5060405161080938038061080983398181016040528101906100329190610185565b8260008001819055508160006001019080519060200190610054929190610077565b50806000600201908051906020019061006e929190610077565b505050506102b1565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106100b857805160ff19168380011785556100e6565b828001600101855582156100e6579182015b828111156100e55782518255916020019190600101906100ca565b5b5090506100f391906100f7565b5090565b61011991905b808211156101155760008160009055506001016100fd565b5090565b90565b600082601f83011261012d57600080fd5b815161014061013b82610231565b610204565b9150808252602083016020830185838301111561015c57600080fd5b610167838284610267565b50505092915050565b60008151905061017f8161029a565b92915050565b60008060006060848603121561019a57600080fd5b60006101a886828701610170565b935050602084015167ffffffffffffffff8111156101c557600080fd5b6101d18682870161011c565b925050604084015167ffffffffffffffff8111156101ee57600080fd5b6101fa8682870161011c565b9150509250925092565b6000604051905081810181811067ffffffffffffffff8211171561022757600080fd5b8060405250919050565b600067ffffffffffffffff82111561024857600080fd5b601f19601f8301169050602081019050919050565b6000819050919050565b60005b8381101561028557808201518184015260208101905061026a565b83811115610294576000848401525b50505050565b6102a38161025d565b81146102ae57600080fd5b50565b610549806102c06000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c80633bf408f41461003b5780636c96f1f914610057575b600080fd5b6100556004803603810190610050919061031e565b610077565b005b61005f6100b9565b60405161006e939291906103e5565b60405180910390f35b8260008001819055508160006001019080519060200190610099929190610210565b5080600060020190805190602001906100b3929190610210565b50505050565b6000606080600080015460006001016000600201818054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156101625780601f1061013757610100808354040283529160200191610162565b820191906000526020600020905b81548152906001019060200180831161014557829003601f168201915b50505050509150808054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156101fe5780601f106101d3576101008083540402835291602001916101fe565b820191906000526020600020905b8154815290600101906020018083116101e157829003601f168201915b50505050509050925092509250909192565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061025157805160ff191683800117855561027f565b8280016001018555821561027f579182015b8281111561027e578251825591602001919060010190610263565b5b50905061028c9190610290565b5090565b6102b291905b808211156102ae576000816000905550600101610296565b5090565b90565b600082601f8301126102c657600080fd5b81356102d96102d482610457565b61042a565b915080825260208301602083018583830111156102f557600080fd5b6103008382846104a9565b50505092915050565b600081359050610318816104fc565b92915050565b60008060006060848603121561033357600080fd5b600061034186828701610309565b935050602084013567ffffffffffffffff81111561035e57600080fd5b61036a868287016102b5565b925050604084013567ffffffffffffffff81111561038757600080fd5b610393868287016102b5565b9150509250925092565b60006103a882610483565b6103b2818561048e565b93506103c28185602086016104b8565b6103cb816104eb565b840191505092915050565b6103df8161049f565b82525050565b60006060820190506103fa60008301866103d6565b818103602083015261040c818561039d565b90508181036040830152610420818461039d565b9050949350505050565b6000604051905081810181811067ffffffffffffffff8211171561044d57600080fd5b8060405250919050565b600067ffffffffffffffff82111561046e57600080fd5b601f19601f8301169050602081019050919050565b600081519050919050565b600082825260208201905092915050565b6000819050919050565b82818337600083830152505050565b60005b838110156104d65780820151818401526020810190506104bb565b838111156104e5576000848401525b50505050565b6000601f19601f8301169050919050565b6105058161049f565b811461051057600080fd5b5056fea2646970667358221220f9be88b9d93337a0b3f17465c9471e1bba8cfdef5eff685b92007df9f78a01b064736f6c63430006060033';

let account = '0x4f646898966708FCBA294caf5025CE39b5913182'

class SmartcontractController {
    async MethodCall({ request, response, params }) {
        try {
            // const jsonData = JSON.parse(request.raw())
            response.implicitEnd = false
            console.log(params.methods)
            ////////// SMART CONTRACT //////////
            // instantiating a contract object
            var contract = new web3.eth.Contract(JSON.parse(abi), params.contract, { from: "0x8659E929339ADEe4D181b24f55901DC7D219C773" })

            var method = "contract.methods." + params.methods + ".call()"

            const run = eval(method)
            run.then(result => {
                response.json({ result: result })
            })
                .catch(error => {
                    response.json({ error: error.toString() })
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
            console.log(account)
            var contract = new web3.eth.Contract(JSON.parse(abi), params.contract)

            return new PROMISE(function (resolve, reject) {
                // contract.method.storeData(jsonData.id, jsonData.company_name, jsonData.date)

                var method = "contract.methods." + jsonData.methods + ".send({from: '" + account + "', gasPrice: 2000, gas: 6000000})"

                const run = eval(method)
                run.then(result => {
                    console.log(result)
                    resolve(result)
                })
                    .catch(error => {
                        response.json({ error: error.toString() })
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
            console.log("masuk")
            var contract = new web3.eth.Contract(JSON.parse(abi));
            return new PROMISE(function (resolve, reject) {
                contract.deploy({
                    data: '0x' + bytecode,
                    arguments: ['1', "Serunai Commerce Sdn Bhd", "2/10/2020"]
                }).send({ from: account, gasPrice: 2000, gas: 6000000 },
                    async function (error, transactionHash) {
                        console.log('Transaction Hash: ', transactionHash)
                    }).on('receipt', async (receipt) => {
                        console.log('Contract address: ', receipt.contractAddress);
                        // fs.writeFile('contract.txt', receipt.contractAddress, function (err) {
                        //     if (err) throw err;
                        //     console.log('File is created successfully.');
                        // });
                        // fs.readFile('contract.txt',
                        //     // callback function that is called when reading file is done
                        //     function (err, data) {
                        //         if (err) throw err;
                        //         // data is a buffer containing file content
                        //         console.log(data.toString('utf8'))
                        //     });
                        resolve(receipt);
                    })
            })
        } catch (error) {
            response.json({ error: "deploy: " + error.toString() })
        }
    }
}

module.exports = SmartcontractController
