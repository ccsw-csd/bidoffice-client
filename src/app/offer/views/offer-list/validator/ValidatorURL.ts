import { AbstractControl } from "@angular/forms";
import isURL from 'validator/lib/isURL'

export function ValidateURL(control: AbstractControl){

    if(control.value == null) return null;
    if(isURL(control.value)) return null;

    return {invalidURL: true}
}