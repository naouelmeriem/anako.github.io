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
    if (Array.isArray(req.body.consommation)) {
      req.body.consommation.forEach(conso => {
        if (conso.includes("huile_de_tomate") && !matching_cleaner.find(el => el === 'huile de tomate')) {
          matching_cleaner.push("huile de tomate")
        }
      })
    } else {
      if (req.body.consommation.includes("huile_de_tomate") && !matching_cleaner.find(el => el === 'huile de tomate')) {
        matching_cleaner.push("huile de tomate")
      }
    }
  }

  // Summer exposition
  if (req.body.exposition) {
    if (req.body.exposition == "huile_de_framboise" && !matching_cleaner.find(el => el === 'huile de framboise')) {
      matching_cleaner.push("huile de framboise")
    }
  }

  // skinCondition
  if (req.body.skinCondition) {
    if (Array.isArray(req.body.skinCondition)) {
      req.body.skinCondition.forEach(condition => {
        // Makeup remover matching
        if (condition.includes("perilla") && !matching_remover.find(el => el === 'perilla')) {
          matching_remover.push("perilla")
        }
        if (condition.includes("huile_abricot") && !matching_remover.find(el => el === 'huile d\'abricot')) {
          matching_remover.push("huile d\'abricot")
        }
        if (condition.includes("huile_de_melon") && !matching_remover.find(el => el === 'huile de melon')) {
          matching_remover.push("huile de melon")
        }
        if (condition.includes("huile_de_son_de_riz") && !matching_remover.find(el => el === 'huile de son de riz')) {
          matching_remover.push("huile de son de riz")
        }
        // Cleaner matching
        if (condition.includes("huile_de_son_de_riz") && !matching_cleaner.find(el => el === 'huile de son de riz')) {
          matching_cleaner.push("huile de son de riz")
        }
        if (condition.includes("huile_de_mure") && !matching_cleaner.find(el => el === 'huile de mure')) {
          matching_cleaner.push("huile de mure")
        }
        if (condition.includes("huile_de_noisette") && !matching_cleaner.find(el => el === 'huile de noisette')) {
          matching_cleaner.push("huile de noisette")
        }
        if (condition.includes("huile_de_soja") && !matching_cleaner.find(el => el === 'huile de soja')) {
          matching_cleaner.push("huile de soja")
        }
        if (condition.includes("huile_de_cameline") && !matching_cleaner.find(el => el === 'huile de cameline')) {
          matching_cleaner.push("huile de cameline")
        }
        // Stick matching
        if (condition.includes("macerat_de_verveine") && !matching_stick.find(el => el === '"macérat de verveine')) {
          matching_stick.push("macérat de verveine")
        }
        if (condition.includes("macerat_de_basilic") && !matching_stick.find(el => el === '"macérat de basilic')) {
          matching_stick.push("macérat de basilic")
        }
        if (condition.includes("macerat_de_menthe") && !matching_stick.find(el => el === 'macérat de menthe')) {
          matching_stick.push("macérat de menthe")
        }
        if (condition.includes("macerat_de_persil") && !matching_stick.find(el => el === 'macérat de persil')) {
          matching_stick.push("macérat de persil")
        }
        // Day Care & serum
        if (condition.includes("extrait_de_pivoine") && !matching_day_care.find(el => el === '"extrait de pivoine') && !matching_serum.find(el => el === '"extrait de pivoine')) {
          matching_day_care.push("extrait de pivoine")
          matching_serum.push("extrait de pivoine")
        }
        if (condition.includes("extrait_de_ginseng") && !matching_day_care.find(el => el === 'extrait de ginseng') && !matching_serum.find(el => el === 'extrait de ginseng')) {
          matching_day_care.push("extrait de ginseng")
          matching_serum.push("extrait de ginseng")
        }
        if (condition.includes("extrait_de_murier_blanc") && !matching_day_care.find(el => el === 'extrait de murier blanc') && !matching_serum.find(el => el === 'extrait de murier blanc')) {
          matching_day_care.push("extrait de murier blanc")
          matching_serum.push("extrait de murier blanc")
        }
        if (condition.includes("extrait_de_the_matcha") && !matching_day_care.find(el => el === 'extrait de thé matcha') && !matching_serum.find(el => el === 'extrait de thé matcha')) {
          matching_day_care.push("extrait de thé matcha")
          matching_serum.push("extrait de thé matcha")
        }
        if (condition.includes("extrait_de_centella_asiatica") && !matching_day_care.find(el => el === 'extrait de centella asiatica') && !matching_serum.find(el => el === 'extrait de centella asiatica')) {
          matching_day_care.push("extrait de centella asiatica")
          matching_serum.push("extrait de centella asiatica")
        }
        if (condition.includes("extrait_de_ginkgo") && !matching_day_care.find(el => el === 'extrait de ginkgo') && !matching_serum.find(el => el === 'extrait de ginkgo')) {
          matching_day_care.push("extrait de ginkgo")
          matching_serum.push("extrait de ginkgo")
        }
        if (condition.includes("extrait_de_pivoine") && !matching_day_care.find(el => el === 'extrait de pivoine') && !matching_serum.find(el => el === 'extrait de pivoine')) {
          matching_day_care.push("extrait de pivoine")
          matching_serum.push("extrait de pivoine")
        }
        // Night care
        if (condition.includes("algue_rouge") && !matching_night_care.find(el => el === 'algue rouge')) {
          matching_night_care.push("algue rouge")
        }
        if (condition.includes("algue_laminaria") && !matching_night_care.find(el => el === "algue laminaria")) {
          matching_night_care.push("algue laminaria")
        }
        if (condition.includes("wakame") && !matching_night_care.find(el => el === 'wakame')) {
          matching_night_care.push("wakame")
        }
      })
    } else {
      if (req.body.skinCondition.includes("perilla") && !matching_remover.find(el => el === 'perilla')) {
        matching_remover.push("perilla")
      }
      if (req.body.skinCondition.includes("huile_abricot") && !matching_remover.find(el => el === 'huile d\'abricot')) {
        matching_remover.push("huile d\'abricot")
      }
      if (req.body.skinCondition.includes("huile_de_melon") && !matching_remover.find(el => el === 'huile de melon')) {
        matching_remover.push("huile de melon")
      }
      if (req.body.skinCondition.includes("huile_de_son_de_riz") && !matching_remover.find(el => el === 'huile de son de riz')) {
        matching_remover.push("huile de son de riz")
      }
      // Cleaner matching
      if (req.body.skinCondition.includes("huile_de_son_de_riz") && !matching_cleaner.find(el => el === 'huile de son de riz')) {
        matching_cleaner.push("huile de son de riz")
      }
      if (req.body.skinCondition.includes("huile_de_mure") && !matching_cleaner.find(el => el === 'huile de mure')) {
        matching_cleaner.push("huile de mure")
      }
      if (req.body.skinCondition.includes("huile_de_noisette") && !matching_cleaner.find(el => el === 'huile de noisette')) {
        matching_cleaner.push("huile de noisette")
      }
      if (req.body.skinCondition.includes("huile_de_soja") && !matching_cleaner.find(el => el === 'huile de soja')) {
        matching_cleaner.push("huile de soja")
      }
      if (req.body.skinCondition.includes("huile_de_cameline") && !matching_cleaner.find(el => el === 'huile de cameline')) {
        matching_cleaner.push("huile de cameline")
      }
      // Stick matching
      if (req.body.skinCondition.includes("macerat_de_verveine") && !matching_stick.find(el => el === '"macérat de verveine')) {
        matching_stick.push("macérat de verveine")
      }
      if (req.body.skinCondition.includes("macerat_de_basilic") && !matching_stick.find(el => el === '"macérat de basilic')) {
        matching_stick.push("macérat de basilic")
      }
      if (req.body.skinCondition.includes("macerat_de_menthe") && !matching_stick.find(el => el === 'macérat de menthe')) {
        matching_stick.push("macérat de menthe")
      }
      if (req.body.skinCondition.includes("macerat_de_persil") && !matching_stick.find(el => el === 'macérat de persil')) {
        matching_stick.push("macérat de persil")
      }
      // Day Care & serum
      if (req.body.skinCondition.includes("extrait_de_pivoine") && !matching_day_care.find(el => el === '"extrait de pivoine') && !matching_serum.find(el => el === '"extrait de pivoine')) {
        matching_day_care.push("extrait de pivoine")
        matching_serum.push("extrait de pivoine")
      }
      if (req.body.skinCondition.includes("extrait_de_ginseng") && !matching_day_care.find(el => el === 'extrait de ginseng') && !matching_serum.find(el => el === 'extrait de ginseng')) {
        matching_day_care.push("extrait de ginseng")
        matching_serum.push("extrait de ginseng")
      }
      if (req.body.skinCondition.includes("extrait_de_murier_blanc") && !matching_day_care.find(el => el === 'extrait de murier blanc') && !matching_serum.find(el => el === 'extrait de murier blanc')) {
        matching_day_care.push("extrait de murier blanc")
        matching_serum.push("extrait de murier blanc")
      }
      if (req.body.skinCondition.includes("extrait_de_the_matcha") && !matching_day_care.find(el => el === 'extrait de thé matcha') && !matching_serum.find(el => el === 'extrait de thé matcha')) {
        matching_day_care.push("extrait de thé matcha")
        matching_serum.push("extrait de thé matcha")
      }
      if (req.body.skinCondition.includes("extrait_de_centella_asiatica") && !matching_day_care.find(el => el === 'extrait de centella asiatica') && !matching_serum.find(el => el === 'extrait de centella asiatica')) {
        matching_day_care.push("extrait de centella asiatica")
        matching_serum.push("extrait de centella asiatica")
      }
      if (req.body.skinCondition.includes("extrait_de_ginkgo") && !matching_day_care.find(el => el === 'extrait de ginkgo') && !matching_serum.find(el => el === 'extrait de ginkgo')) {
        matching_day_care.push("extrait de ginkgo")
        matching_serum.push("extrait de ginkgo")
      }
      if (req.body.skinCondition.includes("extrait_de_pivoine") && !matching_day_care.find(el => el === 'extrait de pivoine') && !matching_serum.find(el => el === 'extrait de pivoine')) {
        matching_day_care.push("extrait de pivoine")
        matching_serum.push("extrait de pivoine")
      }
      // Night care
      if (req.body.skinCondition.includes("algue_rouge") && !matching_night_care.find(el => el === 'algue rouge')) {
        matching_night_care.push("algue rouge")
      }
      if (req.body.skinCondition.includes("algue_laminaria") && !matching_night_care.find(el => el === "algue laminaria")) {
        matching_night_care.push("algue laminaria")
      }
      if (req.body.skinCondition.includes("wakame") && !matching_night_care.find(el => el === 'wakame')) {
        matching_night_care.push("wakame")
      }
    }
  }

  if (req.body.skinIllness) {
    if (Array.isArray(req.body.skinIllness)) {
      req.body.skinIllness.forEach(s => {
        if (s.includes("huile_hibiscus")) {
          matching_remover.push("huile d'hibiscus")
        }
        if (s.includes("huile_cranverry")) {
          matching_serum.push("huile cranverry")
        }
      })
    } else {
      if (req.body.skinIllness.includes("huile_hibiscus")) {
        matching_remover.push("huile d'hibiscus")
      }
      if (req.body.skinIllness.includes("huile_cranverry")) {
        matching_serum.push("huile cranverry")
      }
    }
  }

  if (req.body.skinType) {
    // Makeup remover
    if (req.body.skinType.includes("huile_de_camelia") && !matching_cleaner.find(el => el === "huile de camélia")) {
      matching_remover.push("huile de camélia")
    }
    if (req.body.skinType.includes("huile_de_cerise") && !matching_cleaner.find(el => el === "huile de cerise")) {
      matching_remover.push("huile de cerise")
    }
    if (req.body.skinType.includes("huile_de_pepin_de_raisin") && !matching_cleaner.find(el => el === "huile de pépin de raisin")) {
      matching_remover.push("huile de pépin de raisin")
    }
    if (req.body.skinType.includes("huile_de_sesame") && !matching_cleaner.find(el => el === "huile de sésame")) {
      matching_remover.push("huile de sésame")
    }
    //stick 
    if (req.body.skinType.includes("huile_de_camelia") && !matching_stick.find(el => el === "huile de camélia")) {
      matching_stick.push("huile de camélia")
    }
    if (req.body.skinType.includes("huile_de_cerise") && !matching_stick.find(el => el === "huile de cerise")) {
      matching_stick.push("huile de cerise")
    }
    if (req.body.skinType.includes("huile_de_pepin_de_raisin") && !matching_stick.find(el => el === "huile de pépin de raisin")) {
      matching_stick.push("huile de pépin de raisin")
    }
    if (req.body.skinType.includes("huile_de_sesame") && !matching_stick.find(el => el === "huile de sésame")) {
      matching_stick.push("huile de sésame")
    }
    // Serum
    if (req.body.skinType.includes("huile_de_camelia") && !matching_serum.find(el => el === "huile de camélia")) {
      matching_serum.push("huile de camélia")
    }
    if (req.body.skinType.includes("huile_de_cerise") && !matching_serum.find(el => el === "huile de cerise")) {
      matching_serum.push("huile de cerise")
    }
    if (req.body.skinType.includes("huile_de_pepin_de_raisin") && !matching_serum.find(el => el === "huile de pépin de raisin")) {
      matching_serum.push("huile de pépin de raisin")
    }
    if (req.body.skinType.includes("huile_de_sesame") && !matching_serum.find(el => el === "huile de sésame")) {
      matching_serum.push("huile de sésame")
    }
    // Day care
    if (req.body.skinType.includes("huile_de_camelia") && !matching_day_care.find(el => el === "huile de camélia")) {
      matching_day_care.push("huile de camélia")
    }
    if (req.body.skinType.includes("huile_de_cerise") && !matching_day_care.find(el => el === "huile de cerise")) {
      matching_day_care.push("huile de cerise")
    }
    if (req.body.skinType.includes("huile_de_pepin_de_raisin") && !matching_day_care.find(el => el === "huile de pépin de raisin")) {
      matching_day_care.push("huile de pépin de raisin")
    }
    if (req.body.skinType.includes("huile_de_sesame") && !matching_day_care.find(el => el === "huile de sésame")) {
      matching_day_care.push("huile de sésame")
    }
    // Night care
    if (req.body.skinType.includes("huile_de_camelia") && !matching_night_care.find(el => el === "huile de camélia")) {
      matching_night_care.push("huile de camélia")
    }
    if (req.body.skinType.includes("huile_de_cerise") && !matching_night_care.find(el => el === "huile de cerise")) {
      matching_night_care.push("huile de cerise")
    }
    if (req.body.skinType.includes("huile_de_pepin_de_raisin") && !matching_night_care.find(el => el === "huile de pépin de raisin")) {
      matching_night_care.push("huile de pépin de raisin")
    }
    if (req.body.skinType.includes("huile_de_sesame") && !matching_night_care.find(el => el === "huile de sésame")) {
      matching_night_care.push("huile de sésame")
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


app.listen(process.env.PORT || 5000)