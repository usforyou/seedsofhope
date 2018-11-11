const ProgramModel = require('../models/programModel');
module.exports = {
    getProgramById,
    findPrograms
}
async function getProgramById (req, res){
    try {
        let programId = req.params.programId
        let program = await ProgramModel.Program.findOne({ _id: programId });
        res.json(program);
    }
    catch (err) {
        
        res.send({ error: `Failed to find program: ${err.message}` })
    }
}
async function findPrograms (req, res){
    try {
        let kw = req.query.kw; 
        let programs = await ProgramModel.Program.find({ });
        res.json(programs);
    }
    catch (err) {
        res.send({ error: `Failed to find programs: ${err.message}` })
    }
}