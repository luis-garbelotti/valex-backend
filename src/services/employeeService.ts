import * as employeeRepository from '../repositories/employeeRepository.js'

export async function validateExistEmployee(employeeId: number) {
    const employee = await employeeRepository.findById(employeeId)

    if(!employee) {
        throw {
            type: "Not_Found"
        }
    }

    return employee;
}