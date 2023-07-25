import * as yup from "yup";
const ValidationSchema = yup.object().shape({
    incidentNumber: yup.string().required("Incident Number is required"),
    caller: yup.string().required("Caller is required"),
    assign: yup.string().required("Assign is required"),
    created: yup.string().required(),
    function: yup.string().required("Function is required"),
    area: yup.string().required("Area is required"),
    site: yup.string().required("Site is required"),
    nonconformity: yup.string().required("Non Conformity is required"),
    descNonConformity: yup.string().required("Description is required"),
    ncrCreationDate: yup.date().required("NCR Creation Date is required"),
    ncrStatus: yup.string().required("NCR Status is required"),
    ncrClosedBy: yup.string(),
    rootCause: yup.string(),
    correction: yup.string(),
    correctionAction: yup.string(),
    corrCompletionDate: yup.date(),
    verificationAccepted: yup.string(),
    ncrClosedDate: yup.date(),
    followUp : yup.date()
  });

  export default ValidationSchema;