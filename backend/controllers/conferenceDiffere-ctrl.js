const ConferenceDiffere = require('../models/conferenceDiffere-model')
const Administrateur = require('../models/administrateur-model')
  
const { v4: uuidv4 } = require('uuid');

// creer un conference
exports.create = (req, res, next) => {

  const body = req.body;
  const userSession =  req.session.user;
  console.log(body)
  
    // verifier si le body contient des données
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'aucune donnée saisie',
        })
    }


    // verification administrateur
    Administrateur.findOne({utilisateur: userSession.userId})
        .then( admin => {
            if (!admin) {
                return res.status(401).json({ success: false, error: 'administrateur non trouvé !' });
              }

                    // poste container 
                    const conferenceDiffere = new ConferenceDiffere({
                        ...body,
                        employer: admin.utilisateur,
                        entreprise:admin.entreprise
        
                        })
                
                        
                        if (!conferenceDiffere) {
                            return res.status(400).json({ success: false, error: err })
                        }

                        conferenceDiffere
                            .save()
                            .then(() => {
                                return res.status(201).json({
                                    success: true,
                                    id: conferenceDiffere._id,
                                    message: 'conference différée créee avec succes!',
                                })
                            })
                            .catch(error => {
                                return res.status(400).json({
                                    success: false ,
                                    error,
                                    message: 'conference différée non créee!',
                                })
                            })

       
                            
        })
        .catch(error => {
            return res.status(400).json({
                success: false,
                error,
                message: 'Administrateur non trouvé!',
            })
        })
        //end verification admin

    
    
  };


// mettre à jour un conference
exports.update = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'aucune donnée saisie',
        })
    }

    ConferenceDiffere.findOne({ _id: req.params.id }, (err, conferenceDiffere) => {
      if (err) {
          return res.status(404).json({
              success:false,
              err,
              message: 'aucun conference trouvé !',
          })
      }
      
      conferenceDiffere.theme = body.theme
      conferenceDiffere.description = body.description
      conferenceDiffere.video =  `${req.protocol}://${req.get('host')}/fichier/video/conferenceDiffere/${req.file.filename}`
      conferenceDiffere.statut = body.statut
      conferenceDiffere.employer = body.employer
      conferenceDiffere.evenement = body.evenement
      
      conferenceDiffere
          .save()
          .then(() => {
              return res.status(200).json({
                  success: true,
                  id: conferenceDiffere._id,
                  message: 'conference différée mise à jour !',
              })
          })
          .catch(error => {
              return res.status(404).json({
                  success: false,
                  error,
                  message: 'conference différée non mise à jour!',
              })
          })
  })

}


// supprimer un conference
exports.deleteOne = async (req, res) => {
  
  await ConferenceDiffere.findOneAndDelete({ _id: req.params.id }, (err, conferenceDiffere) => {
      if (err) {
          return res.status(400).json({ success: false, error: err })
      }

      if (!conferenceDiffere) {
          return res
              .status(404)
              .json({ success: false, error: `aucun conference différée trouvé` })
      }

      return res.status(200).json({ success: true, data: conferenceDiffere })
  }).catch(err => console.log(err))
}


// obtenir un conference
exports.getOne = async (req, res) => {
  await ConferenceDiffere.findOne({ _id: req.params.id }, (err, conferenceDiffere) => {
      if (err) {
          return res.status(400).json({ success: false, error: err })
      }

      if (!conferenceDiffere) {
          return res
              .status(404)
              .json({ success: false, error: `aucun conference différée trouvé` })
      }
      return res.status(200).json({ success: true, data: conferenceDiffere })
  }).catch(err => console.log(err))
}


// obtenir tous les conference
exports.getAll = async (req, res) => {
  await ConferenceDiffere.find({}, (err, conferenceDiffere) => {
      if (err) {
          return res.status(400).json({ success: false, error: err })
      }
      if (!conferenceDiffere.length) {
          return res
              .status(404)
              .json({ success: false, error: ` aucun conference différée trouvé` })
      }
      return res.status(200).json({ success: true, data: conferenceDiffere })
  }).catch(err => console.log(err))
}



// poste ler a un evenement
exports.getEventConferenceDiffere = async (req, res) => {
    await ConferenceDiffere.find({evenement: req.params.id }, (err, conferenceDiffere) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
  
        if (!conferenceDiffere) {
            return res
                .status(404)
                .json({ success: false, error: `aucun conference différée trouvé` })
        }
        return res.status(200).json({ success: true, data: conferenceDiffere })
    }).catch(err => console.log(err))
  }
  

  
// supprimer un formation
exports.deleteAllConfenceDiffereFromEvent = async (req, res) => {
  
    await ConferenceDiffere.deleteMany({ evenement: req.params.id }, (err, conferenceDiffere) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
  
        if (!conferenceDiffere) {
            return res
                .status(404)
                .json({ success: false, error: `aucun conference trouvé` })
        }
  
        return res.status(200).json({ success: true, data: conferenceDiffere })
    }).catch(err => console.log(err))
  }