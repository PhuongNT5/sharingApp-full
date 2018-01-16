export interface IEmailService {
    sendEmail(toEmails: string, content: string): Promise<string>;
}

