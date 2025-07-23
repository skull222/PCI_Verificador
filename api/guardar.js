import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const {
    fecha,
    reunion,
    persona,
    nombre_completo,
    nombre_papa_mama,
    telefono,
    colonia,
    alcaldia,
    persona_que_te_invito,
    celular_de_la_persona_que_invito,
    como_nos_conocio,
    asiste_a_celula,
    verificador,
    red,
    oracion
  } = req.body;

  try {
    const query = `
      INSERT INTO formulario (
        fecha,
        reunion,
        persona,
        nombre_completo,
        nombre_papa_mama,
        telefono,
        colonia,
        alcaldia,
        persona_que_te_invito,
        celular_de_la_persona_que_invito,
        como_nos_conocio,
        asiste_a_celula,
        verificador,
        red,
        oracion
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15);
    `;

    const values = [
      fecha,
      reunion,
      persona,
      nombre_completo,
      nombre_papa_mama,
      telefono,
      colonia,
      alcaldia,
      persona_que_te_invito,
      celular_de_la_persona_que_invito,
      como_nos_conocio,
      asiste_a_celula,
      verificador,
      red,
      oracion
    ];

    await pool.query(query, values);
    return res.status(200).json({ mensaje: 'Formulario guardado correctamente' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al guardar los datos' });
  }
}
