const SHA256 = require('crypto-js/sha256')
const blockchain = require('blockchain.info')
const datetime = require('node-datetime').create()
const randomstring = require('randomstring')
console.log(new Date(datetime.now()))
class Block{
    constructor(index, timestamp, data, previoushash=''){
        this.index = index
        this.timestamp = timestamp
        this.data = data
        this.previoushash = previoushash
        this.hash = ''
        this.nonce = 0
    }   
    calculateHash(){
        return SHA256(this.index + this.previoushash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString()
    }
    mineBlock(difficulty){
        console.log('Mining ....')
        while (this.hash.substr(0, difficulty) !== Array(difficulty +1).join("0")){
            this.nonce++
            this.hash = this.calculateHash()
        }
        console.log(this.hash)
    }
}
class BlockChain{
    constructor(){
        this.chain = [this.creategenesisBlock()]
        this.difficulty = 4
    }
    creategenesisBlock(){
        return new Block(0,'2/7/2018','Genesis Block','null')
    }
    getLatesBlock(){
        return this.chain[this.chain.length - 1]
    }
    addBlock(newBlock){
        newBlock.previoushash = this.getLatesBlock().hash
        newBlock.mineBlock(this.difficulty)
        this.chain.push(newBlock) 
    }
    isChainValid(){
        for (let i=1;i<this.chain.length;i++){
            const currentBlock = this.chain[i]
            const previousBlock = this.chain[i-1]
            if (currentBlock.hash != currentBlock.calculateHash()){
                return false
            }
            if (currentBlock.previoushash != previousBlock.hash){
                return false
            }
        }
        return true
    }
}
let mycoin = new BlockChain()
for (let i=1;i<10;i++){
    mycoin.addBlock(new Block(i,new Date(datetime.now()),randomstring.generate()))
}