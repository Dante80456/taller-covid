const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Conectar a MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Conectado a MongoDB Atlas'))
  .catch(err => console.error('Error conectando a MongoDB:', err));

// Esquema para el test
const testSchema = new mongoose.Schema({
    userId: String,
    diagnosis: String,
    timestamp: { type: Date, default: Date.now }
});

const Test = mongoose.model('Test', testSchema);

// Endpoint para recibir el diagnóstico
app.post('/api/submit', async (req, res) => {
    try {
        const { userId, diagnosis } = req.body;
        const newTest = new Test({ userId, diagnosis });
        await newTest.save();
        res.json({ message: 'Diagnóstico guardado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error guardando el diagnóstico' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));