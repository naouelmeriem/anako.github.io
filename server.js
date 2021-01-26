const express = require("express")
var bodyParser = require("body-parser");
const path = require('path')

const app = express();
app.use(express.json())

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static(__dirname + '/public'));


app.get("/", (req, res) => {
  res.render('index')
});

app.get("/product", (req, res) => {
  res.render('product')
});

app.get("/diagnostic", (req, res) => {
  res.render('diagnostic')
});


app.post('/diagnostic/result', async (req, res) => {

  let matching_remover = [];
  let matching_cleaner = [];
  let matching_day_care = [];
  let matching_night_care = [];
  let matching_serum = [];
  let matching_stick = [];

  // Pollution
  if (req.body.pollution) {
    if (req.body.pollution.includes("son_de_riz")) {
      matching_remover.push("son de riz")
    }
    if (req.body.pollution.includes("huile_de_framboise")) {
      matching_cleaner.push("huile de framboise")
    }
    if (req.body.pollution.includes("huile_de_tomate")) {
      matching_day_care.push("huile de tomate")
    }
  }

  // Consommation
  if (req.body.consommation) {
    req.body.consommation.forEach(element => {
      if (req.body.pollution.includes("son_de_riz") && !matching_cleaner.find(el => el === 'son de riz')) {
        matching_cleaner.push("son de riz")
      }
      if (req.body.pollution.includes("huile_de_tomate" && !matching_cleaner.find(el => el === 'huile de tomate'))) {
        matching_cleaner.push("huile de framboise")
      }
    });
  }

  // Summer exposition
  if (req.body.exposition) {
    if (req.body.exposition == "huile_de_framboise" && !matching_cleaner.find(el => el === 'huile de framboise')) {
      matching_cleaner.push("huile de framboise")
    }
  }

  // skinCondition
  if (req.body.skinCondition) {
    req.body.skinCondition.forEach(el => {
      // Makeup remover matching
      if (req.body.pollution.includes("huile_de_coton")) {
        matching_remover.push("huile de coton")
      }
      if (req.body.pollution.includes("huile_de_son_de_riz") && !matching_remover.find(el => el === 'son de riz')) {
        matching_remover.push("huile de son de riz")
      }
      if (req.body.pollution.includes("huile_abricot" && !matching_remover.find(el => el === 'huile d\'abricot'))) {
        matching_remover.push("huile de framboise")
      }
      if (req.body.pollution.includes("huile_de_prune")) {
        matching_remover.push("huile de prune")
      }
      if (req.body.pollution.includes("huile_de_noisette" && !matching_remover.find(el => el === 'huile de noisette'))) {
        matching_remover.push("huile de noisette")
      }
      // Cleaner matching
      if (req.body.pollution.includes("huile_de_cassis")) {
        matching_cleaner.push("huile de cassis")
      }
      if (req.body.pollution.includes("huile_de_cameline")) {
        matching_cleaner.push("huile de cameline")
      }
      if (req.body.pollution.includes("huile_de_neem")) {
        matching_cleaner.push("huile de neem")
      }
      if (req.body.pollution.includes("hydrolat_de_rose")) {
        matching_cleaner.push("hydrolat de rose")
      }
      if (req.body.pollution.includes("huile_de_prune")) {
        matching_cleaner.push("huile de prune")
      }
      // Stick matching
      if (req.body.pollution.includes("macerat_de_verveine")) {
        matching_stick.push("macérat de verveine")
      }
      if (req.body.pollution.includes("macerat_de_basilic")) {
        matching_stick.push("macérat de basilic")
      }
      if (req.body.pollution.includes("macerat_de_menthe")) {
        matching_stick.push("macérat de menthe")
      }
      if (req.body.pollution.includes("mmacerat_de_persil")) {
        matching_stick.push("macérat de persil")
      }
      // Day Care & serum
      if (req.body.pollution.includes("extrait_de_pivoine")) {
        matching_day_care.push("extrait de pivoine")
        matching_serum.push("extrait de pivoine")
      }
      if (req.body.pollution.includes("extrait_de_ginseng")) {
        matching_day_care.push("extrait de ginseng")
        matching_serum.push("extrait de ginseng")
      }
      if (req.body.pollution.includes("extrait_de_murier_blanc")) {
        matching_day_care.push("extrait de murier blanc")
        matching_serum.push("extrait de murier blanc")
      }
      if (req.body.pollution.includes("extrait_de_the_matcha")) {
        matching_day_care.push("extrait de thé matcha")
        matching_serum.push("extrait de thé matcha")
      }
      if (req.body.pollution.includes("extrait_de_centella_asiatica")) {
        matching_day_care.push("extrait de centella asiatica")
        matching_serum.push("extrait de centella asiatica")
      }
      if (req.body.pollution.includes("extrait_de_ginkgo")) {
        matching_day_care.push("extrait de ginkgo")
        matching_serum.push("extrait de ginkgo")
      }
      if (req.body.pollution.includes("extrait de pivoine")) {
        matching_day_care.push("extrait de pivoine")
        matching_serum.push("extrait de pivoine")
      }
      // Night care
      if (req.body.pollution.includes("eau_de_mer_atomise")) {
        matching_night_care.push("eau de mer atomisé")
      }
      if (req.body.pollution.includes('huile_de_cameline')) {
        matching_night_care.push("huile de cameline")
      }
      if (req.body.pollution.includes('algue_laminaria')) {
        matching_night_care.push("algue laminaria")
      }
      if (req.body.pollution.includes('spiruline')) {
        matching_night_care.push("spiruline")
      }
    })
  }

  // skinconfort
  if (req.body.skinCondition) {
    if (req.body.skinCondition.includes("hydrolat_de_cassis")) {
      matching_cleaner.push("hydrolat de cassis")
    }
    if (req.body.skinCondition.includes("hydrolat_de_bambou")) {
      matching_cleaner.push("hydrolat de bambou")
    }
  }

  // skinreaction 
  if (req.body.skinreaction) {
    if (req.body.skinreaction.includes("hydrolat_de_jasmin")) {
      matching_cleaner.push("hydrolat de jasmin")
    }
  }

  if (req.body.skinIllness) {
    req.body.skinIllness.map(s => {
      if (req.body.skinIllness.includes("huile_hibiscus")) {
        matching_remover.push("huile d'hibiscus")
      }
      if (req.body.skinIllness.includes("huile_cranverry")) {
        matching_serum.push("huile cranverry")
      }
    })
  }

  if (req.body.skinType) {
    // Makeup remover
    if (req.body.skinType.includes("huile_de_camelia")) {
      matching_remover.push("huile de camélia")
    }
    if (req.body.skinType.includes("huile_de_coton") && !matching_cleaner.find(el => el === "huile de coton")) {
      matching_remover.push("huile de coton")
    }
    if (req.body.skinType.includes("huile_de_cerise") && !matching_cleaner.find(el => el === "huile de cerise")) {
      matching_remover.push("huile de cerise")
    }
    if (req.body.skinType.includes("huile_de_pepin_de_raisin") && !matching_cleaner.find(el => el === "huile de pépin de raisin")) {
      matching_remover.push("huile de pépin de raisin")
    }
    if (req.body.skinType.includes("huile_de_noisette") && !matching_cleaner.find(el => el === "huile de noisette")) {
      matching_remover.push("huile de noisette")
    }
    // Cleaner
    if (req.body.skinType.includes("hydrolat_de_cassis") && !matching_cleaner.find(el => el === "hydrolat de cassis")) {
      matching_cleaner.push("hydrolat de cassis")
    }
    if (req.body.skinType.includes("hydrolat_de_bambou") && !matching_cleaner.find(el => el === "hydrolat de bambou")) {
      matching_cleaner.push("hydrolat de bambou")
    }
    if (req.body.skinType.includes("hydrolat_de_jasmin") && !matching_cleaner.find(el => el === "hydrolat de jasmin")) {
      matching_cleaner.push("hydrolat de jasmin")
    }
    if (req.body.skinType.includes("hydrolat_de_verveine")) {
      matching_cleaner.push("hydrolat de verveine")
    }
    if (req.body.skinType.includes("hydrolat_de_citron")) {
      matching_cleaner.push("hydrolat de citron")
    }
    //stick 
    if (req.body.skinType.includes("huile_de_chanvre")) {
      matching_stick.push("huile de chanvre")
    }
    if (req.body.skinType.includes("huile_de_pepin_de_raisin")) {
      matching_stick.push("huile de pépin de raisin")
    }
    if (req.body.skinType.includes("huile_de_melon")) {
      matching_stick.push("huile de melon")
    }
    // Serum
    if (req.body.skinType.includes("huile_de_camelia")) {
      matching_serum.push("huile de camélia")
    }
    if (req.body.skinType.includes("huile_de_périlla")) {
      matching_serum.push("huile de périlla")
    }
    if (req.body.skinType.includes("huile_de_chanvre")) {
      matching_serum.push("huile de chanvre")
    }
    if (req.body.skinType.includes("huile_de_jojoba")) {
      matching_serum.push("huile de jojoba")
    }
    if (req.body.skinType.includes("huile_de_melon")) {
      matching_serum.push("huile de melon")
    }
    // Day care
    if (req.body.skinType.includes("huile_de_noisette")) {
      matching_day_care.push("huile de noisette")
    }
    if (req.body.skinType.includes("huile_de_riz")) {
      matching_day_care.push("huile de riz")
    }
    if (req.body.skinType.includes("huile_de_cerise")) {
      matching_day_care.push("huile de cerise")
    }
    if (req.body.skinType.includes("huile_de_dattier")) {
      matching_day_care.push("huile de dattier")
    }
    // Night care
    if (req.body.skinType.includes("huile_onagre")) {
      matching_day_care.push("huile d'onagre")
    }
    if (req.body.skinType.includes("huile_de_cerise")) {
      matching_day_care.push("huile de cerise")
    }
    if (req.body.skinType.includes("huile_de_dattier")) {
      matching_day_care.push("huile de dattier")
    }
  }

  if (req.body.skinMakeup) {
    if (req.body.skinMakeup.includes('no_makeupremover')) {
      matching_remover = []
    }
  }

  res.render('result', {
    remover: matching_remover,
    cleaner: matching_cleaner,
    day: matching_day_care,
    night: matching_night_care,
    serum: matching_serum,
    stick: matching_stick
  })
})


app.listen(3000)