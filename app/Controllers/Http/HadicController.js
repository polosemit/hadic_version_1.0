'use strict'

var fs = require('fs');
var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider(process.env.NODE_URL));
var PROMISE = require('promise');
const { resolve } = require('path');

// let account = fs.readFileSync('contractHadic.txt', 'utf8')

class HadicController {

    async MethodCall({ request, response, params }) {
        try {
            // const jsonData = JSON.parse(request.raw())
            response.implicitEnd = false
            // console.log(fs.readFileSync('bytecode.txt', 'utf8'))
            ////////// SMART CONTRACT //////////
            // instantiating a contract object
            var contract = new web3.eth.Contract(JSON.parse(fs.readFileSync('abiHadic.txt', 'utf8')), params.contract, { from: process.env.NODE_ACCOUNT_ADDRESS })
            return new PROMISE(function (resolve, reject) {
                var method = "contract.methods." + params.methods + ".call()"

                const run = eval(method)
                run.then(result => {
                    var status = JSON.parse('{"statusCode": 200,"message": "success"}')
                    // console.log("res: " + params.methods.includes("displayHalalInfo"))
                    if (params.methods.includes("displayOperation")) {
                        var resultNew = JSON.parse('{"QRCodeId": "' + result.QRCodeId + '","Name":"' + result.Name + '","Type":"' + result.Type + '","Date":"' + result.Date + '", "Time":"' + result.Time + '"}')
                    }
                    if (params.methods.includes("displayLogistic")) {
                        var resultNew = JSON.parse('{"QRCodeId": "' + result.QRCodeId + '","Type":"' + result.Type + '","RegNo":"' + result.RegNo + '","Date":"' + result.Date + '", "Time":"' + result.Time + '"}')
                    }
                    if (params.methods.includes("displayRetailer")) {
                        var resultNew = JSON.parse('{"QRCodeId": "' + result.QRCodeId + '","Name":"' + result.Name + '","Address":"' + result.Address + '","Date":"' + result.Date + '", "Time":"' + result.Time + '"}')
                    }

                    resolve({
                        status,
                        result: resultNew
                    })
                })
                    .catch(error => {
                        console.log("methodCall error: " + error.toString())
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
            var contract = new web3.eth.Contract(JSON.parse(fs.readFileSync('abiHadic.txt', 'utf8')), params.contract)

            return new PROMISE(function (resolve, reject) {
                // contract.method.storeData(jsonData.id, jsonData.company_name, jsonData.date)

                var method = "contract.methods." + jsonData.methods + ".send({from: '" + process.env.NODE_ACCOUNT_ADDRESS + "', gasPrice: '" + web3.utils.toHex(web3.utils.toWei('30', 'gwei')) + "', gas: '" + web3.utils.toHex(800000) + "'})"

                const run = eval(method)
                run.then(result => {
                    var res = JSON.parse('{"statusCode": 200,"message": "success"}')
                    console.log(result)
                    resolve({
                        res,
                        result: result
                    })
                })
                    .catch(error => {
                        console.log("methodSend error: " + error.toString())
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

            var contract = new web3.eth.Contract(JSON.parse(fs.readFileSync('abiHadic.txt', 'utf8')));
            return new PROMISE(function (resolve, reject) {
                contract.deploy({
                    data: '0x' + fs.readFileSync('bytecodeHadic.txt', 'utf8')
                }).send({ from: process.env.NODE_ACCOUNT_ADDRESS, gas: 4000000, gasPrice: web3.utils.toHex(web3.utils.toWei('30', 'gwei')) },
                    async function (error, transactionHash) {
                        if (error) {
                            console.log(error.toString())
                            reject(error)
                        }
                        console.log('Transaction Hash: ', transactionHash)
                    }).on('receipt', async (receipt) => {
                        // console.log(receipt.contractAddress, receipt.contractAddress);
                        var status = JSON.parse('{"statusCode": 200,"message": "success"}')
                        fs.writeFile('contractHadic.txt', receipt.contractAddress, function (err) {
                            if (err) throw err;
                            console.log('File is created successfully.');
                        });
                        fs.readFile('contractHadic.txt',
                            // callback function that is called when reading file is done
                            function (err, data) {
                                if (err) throw err;
                                // data is a buffer containing file content
                                console.log(data.toString('utf8'))
                            });
                        resolve({
                            status,
                            result: receipt
                        });
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

module.exports = HadicController
