import IParseEmailTemplateDTO from '../dtos/IParseMailTemplateDTO';

export default interface IMailProvider {
  parse(data: IParseEmailTemplateDTO): Promise<string>
}
