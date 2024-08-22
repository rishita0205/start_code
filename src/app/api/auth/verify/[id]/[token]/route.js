import { dbConnection } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import Verification from '@/models/emailVerification';
import { compareString } from '@/Utils';

dbConnection();

export async function GET(req, { params }) {
  const id = params.id;
  const token = params.token;
  
  try {
    const result = await Verification.findOne({ userId: id });
    if (!result) {
      const message = 'Incorrect link to verify.';
      return NextResponse.redirect(`${req.nextUrl.origin}/api/auth/verified?status=error&message=${encodeURIComponent(message)}`);
    }

    const { expiresAt, token: hashedToken } = result;

    if (expiresAt < Date.now()) {
      await Verification.findOneAndDelete({ id });
      await User.findOneAndDelete({ _id: id });

      const message = 'Verification token has expired.';
      return NextResponse.redirect(`${req.nextUrl.origin}/api/auth/verified?status=error&message=${encodeURIComponent(message)}`);
    }

    
    const isMatch = await compareString(token, hashedToken);

    if (!isMatch) {
      const message = 'Invalid verification token.';
      return NextResponse.redirect(`${req.nextUrl.origin}/api/auth/verified?status=error&message=${encodeURIComponent(message)}`);
    }

    const updatedUser = await User.findOneAndUpdate({ _id: id }, { isVerified: true });
    await Verification.findOneAndDelete({ userId: id });

    const message = 'Email verified successfully';
    const res =NextResponse.redirect(`${req.nextUrl.origin}/api/auth/verified?status=success&message=${encodeURIComponent(message)}`);
    res.cookies.set('verification-success', 'true', { path: '/' });
    return res;
  } catch (error) {
    console.error('Error verifying user:', error);

    const message = 'Verification failed or link is invalid.';
    return NextResponse.redirect(`${req.nextUrl.origin}/api/auth/verified?status=error&message=${encodeURIComponent(message)}`);
  }
}
