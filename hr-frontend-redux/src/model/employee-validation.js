export default class EmployeeValidationModel {
    constructor() {
        this.isIdentityNoValid = true;
        this.identityNoValidationMessage = "";

        this.isIbanNoValid = true;
        this.ibanValidationMessage = "";

        this.isModelValid = true;
    }
}