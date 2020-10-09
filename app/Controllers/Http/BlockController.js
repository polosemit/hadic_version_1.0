'use strict'

var Web3 = require('web3');
var web3 = new Web3(new Web3.providers.HttpProvider("http://172.18.100.54:8545"));
var PROMISE = require('promise');

class BlockController {
    async getBlock({ request, response, params }) {
        try {
            return new PROMISE(function (resolve, reject) {
                web3.eth.getBlock(params.blockHash)
                    .then(result => {
                        console.log(result)
                        resolve({ block: result })
                    })
                    .catch(error => {
                        console.log("inside promise: " + error)
                        reject(error)
                    })
            })
        } catch (error) {
            console.log("inside try catch: " + error)
            reject(error)
        }
    }

    async getTransaction({ request, response, params }) {
        try {
            return new PROMISE(function (resolve, reject) {
                web3.eth.getTransaction(params.txid)
                    .then(result => {
                        console.log(result)
                        resolve({ transaction: result })
                    })
                    .catch(error => {
                        console.log("inside promise: " + error)
                        reject(error)
                    })
            })
        } catch (error) {
            console.log("inside try catch: " + error)
            reject(error)
        }
    }
}

module.exports = BlockController
