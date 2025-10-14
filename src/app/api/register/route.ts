import { NextRequest, NextResponse } from 'next/server';
import admin from '@/lib/firebase/admin';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const blockedDomains = [
  'mailinator.com',
  'yopmail.com',
  'guerrillamail.com',
  'tempmail.com',
  '10minutemail.com'
];

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // 1. Validar e-mail
    if (!emailRegex.test(email)) {
        return new NextResponse(JSON.stringify({ error: "E-mail inválido ou temporário." }), { status: 400 });
    }

    const domain = email.split('@')[1];
    if (blockedDomains.includes(domain)) {        
        return new NextResponse(JSON.stringify({ error: "E-mail inválido ou temporário." }), { status: 400 });
    }
    
    // 2. Verificar IP
    let ip = req.headers.get('x-forwarded-for');
    if (ip) {
      ip = ip.split(',')[0].trim();
    } else {
      ip = req.socket?.remoteAddress || 'unknown';
    }

    const firestore = admin.firestore();
    const usersRef = firestore.collection('users');
    const snapshot = await usersRef.where('ip', '==', ip).limit(1).get();

    if (!snapshot.empty) {
      return new NextResponse(JSON.stringify({ error: "Limite de cadastros atingido para este IP." }), { status: 429 });
    }

    // 3. Criar usuário
    const userRecord = await admin.auth().createUser({
      email,
      password,
    });

    await usersRef.doc(userRecord.uid).set({
      email: userRecord.email,
      ip: ip,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    return new NextResponse(JSON.stringify({ uid: userRecord.uid }), { status: 201 });

  } catch (error: any) {
    console.error('Registration error:', error);
    if (error.code === 'auth/email-already-exists') {
        return new NextResponse(JSON.stringify({ error: 'Este e-mail já está em uso.' }), { status: 409 });
    }
    return new NextResponse(JSON.stringify({ error: 'Ocorreu um erro interno.' }), { status: 500 });
  }
}
