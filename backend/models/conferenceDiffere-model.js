const mongoose = require('mongoose')
const Schema = mongoose.Schema
       
var conferenceDiffereSchema = new Schema(
    {
      
        description: { type: String, required: false },
        theme: { type: String, required: true },
       
        video: { type: String, required: true},
        statut: { type: Boolean, required: false ,default:false},

        
        employer: { type: Schema.Types.ObjectId,ref:'Utilisateur', required:false },
        entreprise: { type: Schema.Types.ObjectId,ref:'Entreprise', required:false },
        evenement: { type: Schema.Types.ObjectId,ref:'Evenement', required:true }

    },
    { timestamps: true },
)

module.exports = mongoose.model('ConferenceDiffere', conferenceDiffereSchema)
