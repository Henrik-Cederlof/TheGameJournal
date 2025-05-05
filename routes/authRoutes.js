import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../src/models/User.js'


const router = express.Router();

// Registrera en ny användare!
router.post('/register', async (req, res) => {
  const { firstname, lastname, password, email} = req.body;

  try {
    // Kontrollera om användaren redan finns
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: 'E-postadressen är already registrerad fan' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ firstname, lastname, password: hashedPassword, email });
    await newUser.save();
    res.status(201).json({ message: 'Användare registrerad' });
  } catch (error) {
    console.error('Registreringsfel:', error);
    res.status(500).json({ message: 'Något gick fel vid registreringen' });
  }
});

// Logga in en användare!
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    

    if (!user) return res.status(400).json({ message: "Användaren hittades inte" });
    console.log("Inloggningsförsök:", email, password);
    console.log("Användare hittad:", user);
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Lösenord matchar:", isMatch);

    if (!isMatch) return res.status(400).json({ message: "Fel passwörd fattaru väl!" });

    // Skapa en token för autentisering
    // Token är en sträng som innehåller information om användaren och en signatur för att verifiera dess äkthet
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.status(200).json({
      token,
      user: {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Login error:", err); // <-- Lägg till denna rad

    res.status(500).json({ message: "Server error" });
  }
});

export default router;