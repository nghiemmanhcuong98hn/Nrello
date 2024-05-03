import nodemailer from 'nodemailer';

// Create a transporter object
const transporter = nodemailer.createTransport({
	// Your SMTP configuration
	host: 'outlook.live.com',
	port: 587,
	auth: {
		user: 'outlook_4046600DF86264DE@outlook.com',
		pass: 'a0987954221'
	}
});

export default transporter;
