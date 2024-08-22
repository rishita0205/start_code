import { dbConnection } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import { SendEmail } from '@/Utils/sendMail';
import { hashString } from '@/Utils/index.js';

dbConnection();

export async function POST(req) {
  try {
    const reqBody = await req.json();
    const { name, email, password } = reqBody;

    // Find if user already exists
    let user = await User.findOne({ email });

    if (user) {
      if (user.isVerified) {
        return NextResponse.json({
          success: false,
          message: "User with this email already exists",
        });
      }
    }

    // Create new user and hash password
    const hashedPassword = await hashString(password);
    user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Send verification email
    SendEmail(user);

    return NextResponse.json({
      success: true,
      message: "Verification email has been sent to your account. Check your email for further instructions.",
    });

  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
