const mongoose = require('mongoose');

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

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { userId, diagnosis } = req.body;
            const newTest = new Test({ userId, diagnosis });
            await newTest.save();
            res.status(200).json({ message: 'Diagnóstico guardado exitosamente' });
        } catch (error) {
            res.status(500).json({ error: 'Error guardando el diagnóstico' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}