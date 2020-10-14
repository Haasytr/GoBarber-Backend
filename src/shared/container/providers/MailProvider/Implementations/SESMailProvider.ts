import nodemailer, { Transporter } from 'nodemailer'
import aws from 'aws-sdk';
import MailConfig from '@config/mail'
import {inject, injectable} from 'tsyringe'

import IMailProvider from '../Models/IMailProvider';
import IMailTemplateProvider from '@shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider';
import ISendMailDTO from '../dtos/ISendMailDto';

@injectable()
export default class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(

    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider

  ) {
    this.client = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: '2010-12-1'
      })
    })
  }

  public async  sendMail({
    to,
    from,
    subject,
    templateData,
  }: ISendMailDTO): Promise<void> {
    await this.client.sendMail({
      from: {
        name: from?.name || MailConfig.defaults.from.name,
        address: from?.email || MailConfig.defaults.from.email,
      },
      to: {
        name: to.name,
        address: to.email
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),

     })
  }
}
