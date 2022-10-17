import {FormGroup} from "@angular/forms";

export function verfierFilterDate(formGroup: FormGroup){

    const START_DATE = 'startDateModification';
    const END_DATE = 'endDateModification';
    const startDate = formGroup.get(START_DATE).value;
    const endDate = formGroup.get(END_DATE).value;

    formGroup.controls[START_DATE].setErrors(null);
    formGroup.controls[END_DATE].setErrors(null);

    if(startDate == null && endDate == null) return null;
    if(startDate <= endDate && startDate != null && endDate != null) return null;

    if(startDate > endDate && startDate != null && endDate != null){
        formGroup.controls[START_DATE].setErrors({'incorrect': true});
        formGroup.controls[END_DATE].setErrors({'incorrect': true});
    }

    if(startDate != null && endDate == null){
        formGroup.controls[END_DATE].setErrors({'incorrect': true});
        formGroup.controls[END_DATE].markAsDirty();
    }
    if(startDate == null && endDate != null){
        formGroup.controls[START_DATE].setErrors({'incorrect': true});
        formGroup.controls[START_DATE].markAsDirty();
    }

    return {incorretDate: true};
}
