const exp = require('express');
const router_Matiere =exp.Router();
const mult = require("multer");
const Matiere = require("../Models/Matiere")

//recuperer image

photoname = "";
const mystorge = mult.diskStorage({
    destination: './Images',
    filename: (req, photo, redirect) => {
        L_date = Date.now();
        let f1 = L_date + "." + photo.mimetype.split('/')[1];
        redirect(null, f1);
        photoname = f1;
    }
});
const upload = mult({ storage: mystorge });

//ajouter matiere
router_Matiere.post("/ajouterMatiere", upload.any('img'),  (req, res) => {
    const data = req.body;
    const matiere = new Matiere(data);
    matiere.image=photoname;
    matiere.save().then(()=>{
        res.send("ok");
    }).catch(()=>{
        res.send("erreur");
    });
}
);

//lister matieres
router_Matiere.get("/Lister", VerifierToken, (req, res) => {
    Matiere.find().then((result) => {
        res.send(result);
    }).catch(() => {
        res.send('error');
    });
});

module.exports = router_Matiere;