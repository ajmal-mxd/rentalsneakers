const mongoose=require('mongoose');

const uri="mongodb://localhost:27017/rentalsneaker"

const connect =()=>{mongoose.connect(uri,)
.then(()=>{console.log(`MDB connected ${uri}`);})
.catch((err)=>{console.log(err)});
}




module.exports={connect} 