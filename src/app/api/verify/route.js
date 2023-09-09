import { NextResponse, NextRequest } from "next/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(req,res){

    const head = headers();
    let userName = head.get('userName');
    let userEmail = head.get('userEmail');

    //return NextResponse.json({name:userName,email:userEmail});
    return redirect('/dashboard');
}