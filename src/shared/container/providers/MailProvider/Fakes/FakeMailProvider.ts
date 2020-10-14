import IMailProvider from '../Models/IMailProvider';
import ISendMailDTO from '../dtos/ISendMailDto';
class FakeMailProvider implements IMailProvider {
  private messages: ISendMailDTO[] = [];

  public async sendMail(message: ISendMailDTO): Promise<void> {
    this.messages.push(message);
  }
}

export default FakeMailProvider;
