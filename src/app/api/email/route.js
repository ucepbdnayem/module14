import nodemailer from "nodemailer";
import {NextResponse} from "next/server";
import { CreateToken } from "@/helpers/createToken";

export async function POST(req, res){
	const body = await req.json();
	const toName = body.name;
	const toEmail = body.email;

	let Transporter = nodemailer.createTransport({
		// service: 'Gmail',
		// secure: false,
		// auth: {
		// 	user: "nayem.gawhar@gmail.com",
		// 	pass: "ynpgutlghoghksrh",
		// },
		// tls: {
		// 	rejectUnauthorized: false
		// }
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "fb0a7aef118200",
            pass: "075dd1a1366de7"
        }
	})
    // generate token
    const getToken = await CreateToken(toName,toEmail);
    
    // Generate magic link
	const magicLink = `${process.env.APP_URL}/api/verify?token=${getToken}`;

    const message = `
        <h3>Hi, ${toName}</h3>
        <p>Welcome to our authentication app. Login our app, please <a href="${magicLink}">click</a> here
    `;
	let myEmail = {
		from: 'fb0a7aef118200',
		to: toEmail,
		subject: "Test email send",
		text: "Test mail send",
        html: message
	}

	try {
		await Transporter.sendMail(myEmail);
		return NextResponse.json({msg:"Success"})
	}catch (e) {
        console.log(e);
		return NextResponse.json({msg:"Fail"})
	}
}