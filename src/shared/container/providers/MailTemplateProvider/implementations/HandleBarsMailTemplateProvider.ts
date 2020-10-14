import handlebars from 'handlebars';
import fs from 'fs';

import IParseEmailTemplateDTO from '../dtos/IParseMailTemplateDTO';
import IMailTemplateProvider from '../models/IMailTemplateProvider';

class HandleBarsMailTemplateProvider implements IMailTemplateProvider {
  public async parse({ file, variables }: IParseEmailTemplateDTO): Promise<string> {

    const TemplateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8'
    })

    const parseTemplate = handlebars.compile(TemplateFileContent);

    return parseTemplate(variables);
  }
}


export default HandleBarsMailTemplateProvider
