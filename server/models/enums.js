

let ENUMS = {}

ENUMS.AttributeTypesList = ['STRING', 'INTEGER', 'URL', 'BOOLEAN', 'ENUM', 'LIST', 'MAP', 'FLOAT', 'DATETIME', 'GEOLOCATION']
ENUMS.AttributeTypesEnum = {
    STRING: 'STRING',
    URL: 'URL',
    INTEGER: 'INTEGER',
    BOOLEAN: 'BOOLEAN',
    ENUM: 'ENUM',
    LIST: 'LIST',
    MAP: 'MAP',
    FLOAT: 'FLOAT',
    DATETIME: 'DATETIME',
    GEOLOCATION: 'GEOLOCATION'
}
ENUMS.EmailTypesEnum = {
    ACCOUNT_VERIFICATION: "Account Verification",
    RESET_PASSWORD: "Reset Password",
    LIST: ["Account Verification", "Reset Password"]
}

export default ENUMS;