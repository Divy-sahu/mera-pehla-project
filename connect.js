const mongoose= require("mongoose")


async function connectmondodb(url) {
    return mongoose.connect(url);
    
}

module.exports= {
    connectmondodb

}