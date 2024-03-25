export enum ProjectStatusEnum {
    TO_START="TO_START", //When is not open to apply.
    ACTIVE="ACTIVE", //When is active and you student can apply.
    ON_HOLD="ON_HOLD", //When active but not open to apply because of some problems, etc.
    ENDED='ENDED', //When is closed to apply and results are out.
    CANCELED="CANCELED", //When project is canceled, meaning it will not be happening.
}