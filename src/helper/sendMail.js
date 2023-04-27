const Sib = require("sib-api-v3-sdk");

require("dotenv").config();

const client = Sib.ApiClient.instance;

const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.API_KEY;

const sendEmail = async (email) => {
  const sender = {
    email: "sukanta.das4104@gmail.com",
    // name: 'Anjan Shomodder',
  };

  const receivers = [
    {
      email: email,
    },
  ];

  const transactionalEmailApi = new Sib.TransactionalEmailsApi();

  transactionalEmailApi
    .sendTransacEmail({
      subject: "Verification Email For Menzilla",
      sender,
      to: receivers,
      htmlContent: `
			<h1>Become a {{params.role}} developer</h1>
			<a href='https://cules-coding.vercel.app/'>Cules Coding</a>
		`,
      params: {
        role: "frontend",
      },
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};

module.exports = sendEmail;
