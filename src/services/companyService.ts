import * as companyRepository from "../repositories/companyRepository.js"

export async function findCompanyByApiKey(apiKey: string) {
    const company = await companyRepository.findByApiKey(apiKey);

    if(!company) {
        throw { type: 'Unauthorized' }
    }
    
    return company;
}