const EmailTemplates = require('email-templates');
const nodemailer = require('nodemailer');
const path = require('path');

const {config} = require('../configs');
const allTemplates = require('../email-templates');
const {ErrorHandler, errors} = require('../errors');

const {NOT_FOUND_EMAIL_TEMPLATE} = errors;

const templateParser = new EmailTemplates({
    views: {
        root: path.join(process.cwd(), 'email-templates')
    }
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: config.NO_REPLY_EMAIL,
        pass: config.NO_REPLY_EMAIL_PASSWORD
    }
});

const sendMail = async (userMail, emailAction, context = {}) => {
    const templateInfo = allTemplates[emailAction];

    if (!templateInfo) {
        throw new ErrorHandler(NOT_FOUND_EMAIL_TEMPLATE.message, NOT_FOUND_EMAIL_TEMPLATE.code);
    }

    const html = await templateParser.render(templateInfo.templateName, context);

    return transporter.sendMail({
        from: 'No reply',
        to: userMail,
        subject: templateInfo.subject,
        html
    });
};

module.exports = {
    sendMail
};

