var mongoose   = require('mongoose');

// Create a schema
var UtilisateurSchema = new mongoose.Schema({
  prenom: { type:String, required: true, trim:true},
  nom: { type:String, required: true, trim:true},
  email: { type:String, required: true, trim:true, unique: true}, // trim efface les espaces avant et après le string
  passe: { type:String, required: true, trim:true},
  statut: { type:String, required: true, trim:true}, // commercial ou responsable
  actif: { type:Boolean, default:true }, // l'utilisateur a t'il le droit d'entrer ?
  token: { type:String } 
},
{
    timestamps: true
}
);

// Create a model based on the schema
module.exports = mongoose.model('Utilisateur', UtilisateurSchema);