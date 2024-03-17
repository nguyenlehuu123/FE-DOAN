import { i18n } from "~/plugins/i18n";

const validation = {
  required: (value: any, filedName: string) => ((!!value && value.length !== null) || value === false || value === true) || i18n.global.t('errors.required', { name: filedName }),
  emailPattern: (value: any, fieldName: string) => (!value || /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(value) || /^([a-zA-Z0-9]|[a-zA-Z0-9]+([a-zA-Z0-9.!#$%&'*+-/=?^_`{|}~]*[a-zA-Z0-9]))@([a-zA-Z0-9-_]+[a-zA-Z0-9-_]*[a-zA-Z0-9]+\.)+[a-zA-Z0-9-_]{2,}$/.test(value)) || i18n.global.t('errors.email', { name: fieldName }),
  lengthMax: (value: any, maxLength: number = 1, fieldName: string) => (!value || ('' + value).length <= maxLength) || i18n.global.t('errors.maxByteLength', {
    name: fieldName,
    maxByteLength: maxLength
  }),
  lengthMin: (value: any, minLength: number = 1, fieldName: string) => (!value || ('' + value).length >= minLength) || i18n.global.t('errors.minByteLength', {
    name: fieldName,
    maxByteLength: minLength
  }),
  isRealNumber: (value: any, fieldName: string) => (!isNaN(parseFloat(value)) && isFinite(value)) || i18n.global.t('errors.real', { name: fieldName }),
  isValidWidthRegex: (value: any, regex: RegExp, fieldName: string) => regex.test(value) || i18n.global.t('errors.regex', {
    name: fieldName,
    regex: regex
  }),
  isInRange: (value: number, min: number, max: number, fieldName: string) => (value >= min && value <= max) || i18n.global.t('errors.rangefield', {
    valuename: fieldName,
    maxname: max
  }),
  isInteger: (value: string, fieldName: string) => (!value || /^[0-9０-９]+$/.test(value)) || i18n.global.t('errors.integer', { name: fieldName }),
  phoneNumber: (value: string, fieldName: string) => !value || /^(?:\d{3}-\d{4}-\d{4})$/.test(value) || i18n.global.t('errors.tel', { name: fieldName }),
  compareNewPassword: (newPassword: string, newPasswordCompare: string, sourceFieldName: string, targetFieldName: string) => newPassword === newPasswordCompare || i18n.global.t('errors.passwordconfirm.notequal', {
    name: sourceFieldName,
    confirmproperty: targetFieldName
  }),
  compareOldPassword: (newPassword: string, oldPassword: string) => newPassword !== oldPassword || 'Please enter a password different from your old password.',
}

export default validation
