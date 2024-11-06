const testController = (req,res)=>{
    res.status(200).send({
        msg : `welcome user`,
        success : true,
    });
};

module.exports = {testController }