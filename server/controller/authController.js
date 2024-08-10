import admin from 'firebase-admin';
import fetch from 'node-fetch';
import firebaseConfig from '../../config/firebase-config.js';
import adminWhitelist from '../middleware/whitelist.js';

export const signup = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;

    console.log('Signup request received');
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Role:', role);

    try {
        if (!email || !password) {
            throw new Error('Email and password are required');
        }

        const userResponse = await admin.auth().createUser({
            email: email,
            password: password,
            emailVerified: false,
            disabled: false
        });

        // Set custom user claims for role
        await admin.auth().setCustomUserClaims(userResponse.uid, { role: role });

        console.log('User created successfully:', userResponse);
        res.json(userResponse);
    } catch (error) {
        console.error('Error creating user:', error.message);
        res.status(400).json({ error: error.message });
    }
};

export const signin = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    console.log('Signin request received');
    console.log('Email:', email);
    console.log('Password:', password);

    try {
        if (!email || !password) {
            throw new Error('Email and password are required');
        }

        const apiKey = process.env.API_KEY || firebaseConfig.apiKey;

        const signInUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;
        const signInResponse = await fetch(signInUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password,
                returnSecureToken: true
            })
        });

        const signInData = await signInResponse.json();

        if (signInData.error) {
            throw new Error(signInData.error.message);
        }

        const user = await admin.auth().getUserByEmail(email);
        const role = adminWhitelist.includes(email) ? 'admin' : 'investigator';

        const customToken = await admin.auth().createCustomToken(user.uid, { role });

        console.log('User signed in successfully:', { customToken, role });
        res.json({ customToken, role });
    } catch (error) {
        console.error('Error signing in:', error.message);
        res.status(400).json({ error: error.message });
    }
};
