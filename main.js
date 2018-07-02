const SHA256 = require('crypto-js/sha256')
class Block{
    constructor(index, timestamp, data, previoushash=''){
        this.index = index
        this.timestamp = timestamp
        this.data = data
        this.previoushash = previoushash
        this.hash = ''
    }
    calculateHash(){
        return SHA256(this.index + this.previoushash + this.timestamp + JSON.stringify(this.data)).toString()
    }
}
class BlockChain{
    constructor(){
        this.chain = [this.creategenesisBlock()]
    }
    creategenesisBlock(){
        return new Block(0,'2/7/2018','Genesis Block','null')
    }
    getLatesBlock(){
        return this.chain[this.chain.length - 1]
    }
    addBlock(newBlock){
        newBlock.previoushash = this.getLatesBlock().hash
        newBlock.hash = newBlock.calculateHash()
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
mycoin.addBlock(new Block(1,'3/7/2018','data 1',{amount: 4}))
mycoin.addBlock(new Block(2,'3/7/2018','data 2',{amount: 1}))
console.log(mycoin.isChainValid())