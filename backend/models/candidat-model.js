const mongoose = require('mongoose')
const Schema = mongoose.Schema

var candidatSchema = new Schema(
    {        
        
        secteur_activite : { type: String, required: true },
        cv: { type: String, required: true },
        niveau_etude: { type: String, required: true },
        cv: { type: String, required: true },
        annee_experience: { type: String, required: true },
        poste_actuel: { type: String, required: true },
        salaire_actuel: { type: String, required: false },
        // point_fort: { type: String, required: false },
        // point_faible: { type: String, required: false },

        utilisateur:{type: Schema.Types.ObjectId,ref:'Utilisateur'}

        
    },
    { timestamps: true },
)

module.exports = mongoose.model('Candidat', candidatSchema)
