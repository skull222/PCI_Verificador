// api/guardar.js
const { Pool } = require('pg');

const pool = new Pool({
 connectionString: process.env.DATABASE_URL,
ssl: { rejectUnauthorized: false },
});

module.exports = async (req, res) => {
if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
}

const {
    fecha,
    reunión,
    nombre_completo,
    nombre_papá_mamá,
    telefono,
    Colonia,
    'Alcaldía o Municipio': alcaldia,
    invitado,
    celular_de_la_persona_que_invito,
    como_nos_conocio,
    celula,
    verificador,
    red,
    oracion
} = req.body;

try {
    const query = `
    INSERT INTO formulario (
        fecha,
        reunion,
        nombre_completo,
        nombre_papá_mamá,
        telefono,
        colonia,
        alcaldia,
        invitado,
        celular_invitado,
        red_conexion,
        celula,
        verificador,
        red,
        oracion
    ) VALUES (
        $1, $2, $3, $4, $5, $6, $7,
        $8, $9, $10, $11, $12, $13, $14
    )
    `;

    await pool.query(query, [
    fecha,
    reunión,
    nombre_completo,
    nombre_papá_mamá,
    telefono,
    Colonia,
    alcaldia,
    invitado,
    celular_de_la_persona_que_invito,
    como_nos_conocio,
    celula,
    verificador,
    red,
    oracion
    ]);

    res.status(200).json({ mensaje: "Formulario guardado correctamente" });
} catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en el servidor" });
}
};
