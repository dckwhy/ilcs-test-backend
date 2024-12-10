"use strict";

const Joi = require("joi");
let response = require("./res");
let connection = require("./connection");

exports.index = function (req, res) {
  response.ok("running", res);
};

module.exports.addOrUpdateDataPungutan = function (req, res) {
  const requiredFields = [
    "ur_incoterms",
    "ur_valuta",
    "nilai_incoterm",
    "ur_flag_kontainer",
  ];

  for (let field of requiredFields) {
    if (!req.body[field]) {
      return response.ok(`Field ${field} harus diisi.`, res);
    }
  }

  const schema = Joi.object({
    ur_incoterms: Joi.string().required(),
    ur_valuta: Joi.string().required(),
    nilai_incoterm: Joi.number().positive().required(),
    ur_flag_kontainer: Joi.string().required(),
  });

  const { error, value } = schema.validate(req.body);

  if (error) {
    return response.ok(`Validasi gagal: ${error.message}`, res);
  }

  let {
    id_aju,
    ur_incoterms,
    ur_valuta,
    nilai_kurs,
    nilai_incoterm,
    biaya_tambahan,
    tarif_vd,
    fob,
    ur_asuransi,
    nilai_asuransi,
    freight,
    nilai_pabean,
    nilai_pabean_idr,
    berat_kotor,
    berat_bersih,
    ur_flag_kontainer,
  } = req.body;

  ur_incoterms = value.ur_incoterms;
  ur_valuta = value.ur_valuta;
  nilai_incoterm = value.nilai_incoterm;
  ur_flag_kontainer = value.ur_flag_kontainer;

  if (id_aju) {
    connection.query(
      "UPDATE pungutan SET ur_incoterms = ?, ur_valuta = ?, nilai_kurs = ?, nilai_incoterm = ?, biaya_tambahan = ?, tarif_vd = ?, fob = ?, ur_asuransi = ?, nilai_asuransi = ?, freight = ?, nilai_pabean = ?, nilai_pabean_idr = ?, berat_kotor = ?, berat_bersih = ?, ur_flag_kontainer = ? WHERE id_aju = ?",
      [
        ur_incoterms,
        ur_valuta,
        nilai_kurs,
        nilai_incoterm,
        biaya_tambahan,
        tarif_vd,
        fob,
        ur_asuransi,
        nilai_asuransi,
        freight,
        nilai_pabean,
        nilai_pabean_idr,
        berat_kotor,
        berat_bersih,
        ur_flag_kontainer,
        id_aju,
      ],
      function (error, rows, fields) {
        if (error) {
          console.log(error);
          response.ok("Error saat mengupdate data", res);
        } else {
          response.ok("Berhasil mengupdate data", res);
        }
      }
    );
  } else {
    connection.query(
      "INSERT INTO pungutan (id_aju, ur_incoterms, ur_valuta, nilai_kurs, nilai_incoterm, biaya_tambahan, tarif_vd, fob, ur_asuransi, nilai_asuransi, freight, nilai_pabean, nilai_pabean_idr, berat_kotor, berat_bersih, ur_flag_kontainer) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        id_aju,
        ur_incoterms,
        ur_valuta,
        nilai_kurs,
        nilai_incoterm,
        biaya_tambahan,
        tarif_vd,
        fob,
        ur_asuransi,
        nilai_asuransi,
        freight,
        nilai_pabean,
        nilai_pabean_idr,
        berat_kotor,
        berat_bersih,
        ur_flag_kontainer,
      ],
      function (error, rows, fields) {
        if (error) {
          console.log(error);
          response.ok("Error saat menambahkan data", res);
        } else {
          response.ok("Berhasil menambahkan data", res);
        }
      }
    );
  }
};
