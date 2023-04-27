const jwt = require("jsonwebtoken");
const Sib = require("sib-api-v3-sdk");
const client = Sib.ApiClient.instance;
const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.API_KEY;

const createActivationToken = (user) => {
  return jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: "5m",
  });
};

const sendEmail = async (options, activationUrl) => {
  const sender = {
    email: "sukanta.das4104@gmail.com",
    // name: 'Anjan Shomodder',
  };

  const receivers = [
    {
      email: options?.email,
    },
  ];

  const transactionalEmailApi = new Sib.TransactionalEmailsApi();

  transactionalEmailApi
    .sendTransacEmail({
      subject: "Activate your account",
      sender,
      to: receivers,
      htmlContent: `
			<p>Hello ${options?.name}, please click on the link to activate your account</p>
            <a href=${activationUrl} target="_blank">Activate Your Account</a>
		`,
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return error;
    });
};

module.exports = { createActivationToken, sendEmail };
