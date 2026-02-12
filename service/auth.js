const sessionIdtousermap = new Map();

function setuser(Id, user){

    console.log("setusr", Id);

    sessionIdtousermap.set(Id,user);
}

function getuser(Id){
    return sessionIdtousermap.get(Id)
}

module.exports = {

    setuser,
    getuser
} 