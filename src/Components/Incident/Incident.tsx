import React, { FC, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/esm/Form";
import InputGroup from "react-bootstrap/esm/InputGroup";
import Row from "react-bootstrap/esm/Row";
import * as formik from "formik";
import Container from "react-bootstrap/esm/Container";
import { format } from "date-fns";
import ValidationSchema from "./ValidationSchema";
import { useDispatch } from "react-redux";
import { AddAudit } from "../Redux/Reducers/createSlice";
import { useNavigate } from "react-router-dom";
interface IncidentProps { }

export interface Audit {
  incidentNumber:string;
  caller: string;
  assign:string;
  created:string;
  function:string;
  area:string;
  site:string;
  nonConformity:string;
  descNonConformity:string;
  ncrCreationDate:string;
  ncrStatus:string;
  ncrClosedBy:string;
  rootCause:string;
  correction:string;
  correctionAction:string;
  corrCompletionDate:string;
  verificationAccepted:string;
  ncrClosedDate:string;
  followUp:string
}

const Incident: FC<IncidentProps> = () => {
  const history = useNavigate();
  const { Formik } = formik;
  const [values, setValues] = useState<Audit>({        
    incidentNumber: "",
    caller: "",
   assign: "",
   created: "",
   function: "",
   area: "",
   site: "",
   nonConformity: "",
   descNonConformity:"",
   ncrCreationDate : format(new Date(), "yyyy-MM-dd"),
   ncrStatus:"",
   ncrClosedBy:"",
   rootCause:"",
   correction :"",
   correctionAction: "",
   corrCompletionDate : format(new Date(), "yyyy-MM-dd"),
   verificationAccepted: "",
   ncrClosedDate: format(new Date(), "yyyy-MM-dd"),
   followUp: format(new Date(), "yyyy-MM-dd")
});
const dispatch = useDispatch()


  const handleChange = (event:any) => {
    // Extract the name and value from the input field.
    const { name, value } = event.target;      
    // Assuming you have a "setValues" function to update the state with the new values.
    // This function updates the state variable "values" with the new value for the corresponding input field.
    setValues({
      ...values,
      [name]: value, // Use the "name" attribute to dynamically set the corresponding state property.
    });    
  };

  const handleSubmit = () => {
    dispatch(AddAudit(values));
    history("/home");
  }

  return (
    <Container fluid>
      <Row className="mb-3">
        <Formik
          validationSchema={ValidationSchema}
          onSubmit={handleSubmit}
          initialValues={values}
        >
          {({ touched, errors }) => (
            <>
              <Col lg={6}>
                <Form noValidate >

                  <Form.Group
                    as={Col}
                    className="mt-2"
                    controlId="validationFormikIncidentNumber"
                  >
                    <Row className="align-items-center">
                      <Col xs="auto" md={4}>
                        <Form.Label>Incident Number</Form.Label>
                      </Col>
                      <Col md={8}>
                        <InputGroup hasValidation>
                          <Form.Control
                            type="text"
                            name="incidentNumber"                            
                            onChange={handleChange}                          
                            isValid={
                              touched.incidentNumber && !errors.incidentNumber
                            }                            
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.incidentNumber}
                          </Form.Control.Feedback>
                        </InputGroup>
                      </Col>
                    </Row>
                  </Form.Group>

                  <Form.Group className="mt-2" as={Col} controlId="validationFormikCaller">
                    <Row className="align-items-center">
                      <Col xs="auto" md={4}>
                        <Form.Label>Caller</Form.Label>
                      </Col>
                      <Col md={8}>
                        <InputGroup hasValidation>
                          <Form.Control
                            type="text"
                            name="caller"
                            required                            
                            onChange={handleChange}
                            isValid={touched.caller && !errors.caller}                            
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.caller}
                          </Form.Control.Feedback>
                        </InputGroup>
                      </Col>
                    </Row>
                  </Form.Group>

                  <Form.Group className="mt-2" as={Col} controlId="validationFormikAssign">
                    <Row className="align-items-center">
                      <Col xs="auto" md={4}>
                        <Form.Label>Assign</Form.Label>
                      </Col>
                      <Col md={8}>
                        <InputGroup hasValidation>
                          <Form.Control
                            type="text"
                            name="assign"                            
                            onChange={handleChange}                            
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.assign}
                          </Form.Control.Feedback>
                        </InputGroup>
                      </Col>
                    </Row>
                  </Form.Group>
                  <Form.Group className="mt-2" as={Col} controlId="validationFormikCreated">
                    <Row className="align-items-center">
                      <Col xs="auto" md={4}>
                        <Form.Label>Created</Form.Label>
                      </Col>
                      <Col md={8}>
                        <InputGroup hasValidation>
                          <Form.Control
                            type="text"
                            name="created"                         
                            onChange={handleChange}
                            isValid={touched.created && !errors.created}                            
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.created}
                          </Form.Control.Feedback>
                        </InputGroup>
                      </Col>
                    </Row>
                  </Form.Group>
                  <Form.Group className="mt-2" as={Col} controlId="validationFormikFunction">
                    <Row className="align-items-center">
                      <Col xs="auto" md={4}>
                        <Form.Label>Function</Form.Label>
                      </Col>
                      <Col md={8}>
                        <InputGroup hasValidation>
                          <Form.Control
                            type="text"
                            name="function"                            
                            onChange={handleChange}                            
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.function}
                          </Form.Control.Feedback>
                        </InputGroup>
                      </Col>
                    </Row>
                  </Form.Group>
                  <Form.Group className="mt-2" as={Col} controlId="validationFormikSite">
                    <Row className="align-items-center">
                      <Col xs="auto" md={4}>
                        <Form.Label>Site</Form.Label>
                      </Col>
                      <Col md={8}>
                        <InputGroup hasValidation>
                          <Form.Control
                            type="text"
                            name="site"                            
                            onChange={handleChange}                            
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.site}
                          </Form.Control.Feedback>
                        </InputGroup>
                      </Col>
                    </Row>
                  </Form.Group>               
                  <Col lg={6}>

                  </Col>
                  
                </Form>
              </Col>
              <Col lg={6}>
              <Form.Group className="mt-2" as={Col} controlId="validationFormikArea">
                      <Row className="align-items-center">
                      <Col xs="auto" md={4}>
                        <Form.Label>Area</Form.Label>
                      </Col>
                      <Col md={8}>
                        <InputGroup hasValidation>
                          <Form.Control
                            type="text"
                            name="area"                            
                            onChange={handleChange}                            
                          />

                          <Form.Control.Feedback type="invalid">
                            {errors.area}
                          </Form.Control.Feedback>
                        </InputGroup>
                      </Col>
                    </Row>

                  </Form.Group>
                  
                <Form.Group className="mt-2" as={Col} controlId="validationFormikNonConformity">
                  <Row className="align-items-center">
                    <Col xs="auto" md={4}>
                      <Form.Label>Non-conformity type</Form.Label>
                    </Col>
                    <Col md={8}>
                      <InputGroup hasValidation>
                        <Form.Control
                          type="text"
                          name="nonConformity"
                          required                          
                          onChange={handleChange}
                          isValid={touched.nonConformity && !errors.nonConformity}                          
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.nonConformity}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group className="mt-2" as={Col} controlId="validationFormikDescriptionNonConformity">
                  <Row className="align-items-center">
                    <Col xs="auto" md={4}>
                      <Form.Label>Description of Non-conformity</Form.Label>
                    </Col>
                    <Col md={8}>
                      <InputGroup hasValidation>
                        <Form.Control
                          type="text"
                          name="descNonConformity"
                          required                          
                          onChange={handleChange}
                          isValid={touched.descNonConformity && !errors.descNonConformity}                          
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.descNonConformity}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group className="mt-2" as={Col} controlId="validationFormikNCRCreationDate">
                  <Row className="align-items-center">
                    <Col xs="auto" md={4}>
                      <Form.Label>NCR Creation Date</Form.Label>
                    </Col>
                    <Col md={8}>
                      <InputGroup hasValidation>
                        <Form.Control
                          type="date"
                          name="ncrCreationDate"
                          required                          
                          onChange={handleChange}
                          isValid={touched.ncrCreationDate && !errors.ncrCreationDate}                          
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.ncrCreationDate}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group className="mt-2" as={Col} controlId="validationFormikNCRStatus">
                  <Row className="align-items-center">
                    <Col xs="auto" md={4}>
                      <Form.Label>NCR Status</Form.Label>
                    </Col>
                    <Col md={8}>
                      <InputGroup hasValidation>
                        <Form.Control
                          type="text"
                          name="ncrStatus"
                          required                          
                          onChange={handleChange}
                          isValid={touched.ncrStatus && !errors.ncrStatus}                          
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.ncrStatus}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Col>
                  </Row>
                </Form.Group>                             
              </Col>
              <Row>
              <Form.Group className="mt-2" as={Col} controlId="validationFormikRootCause">
                  <Row className="align-items-center">
                    <Col xs="auto" md={2}>
                      <Form.Label>Root Cause</Form.Label>
                    </Col>
                    <Col md={6}>
                      <InputGroup hasValidation>
                        <Form.Control
                          as="textarea"
                          name="rootCause"
                          required                          
                          onChange={handleChange}
                          isValid={touched.rootCause && !errors.rootCause}    
                          isInvalid={!!errors.rootCause}                          
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.rootCause}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Col>
                  </Row>
                </Form.Group>
              </Row>
              <Row>
              <Form.Group className="mt-2" as={Col} controlId="validationFormikCorrection">
                  <Row className="align-items-center">
                    <Col xs="auto" md={2}>
                      <Form.Label>Correction (fix now)</Form.Label>
                    </Col>
                    <Col md={6}>
                      <InputGroup hasValidation>
                        <Form.Control
                          as="textarea"
                          name="correction"
                          required                          
                          onChange={handleChange}
                          isValid={touched.correction && !errors.correction}                        
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.correction}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Col>
                  </Row>
                </Form.Group>
              </Row>
              <Row>
              <Form.Group className="mt-2" as={Col} controlId="validationFormikCorrectionAction">
                  <Row className="align-items-center">
                    <Col xs="auto" md={2}>
                      <Form.Label>Correction Action</Form.Label>
                    </Col>
                    <Col md={6}>
                      <InputGroup hasValidation>
                        <Form.Control
                          as="textarea"
                          name="correctionAction"
                          required                         
                          onChange={handleChange}
                          isValid={touched.correctionAction && !errors.correctionAction}                          
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.correctionAction}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Col>
                  </Row>
                </Form.Group>
                </Row>
              <Col lg={6}>
              <Form.Group className="mt-2" as={Col} controlId="validationFormikCorrectionCompletionDate">
                  <Row className="align-items-center">
                    <Col xs="auto" md={4}>
                      <Form.Label>Correction Completion Date</Form.Label>
                    </Col>
                    <Col md={8}>
                      <InputGroup hasValidation>
                        <Form.Control
                          type="date"
                          name="corrCompletionDate"
                          required
                          onChange={handleChange}
                          isValid={touched.corrCompletionDate && !errors.corrCompletionDate}                          
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.corrCompletionDate}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Col>
                  </Row>
                </Form.Group>
              </Col>
              <Col lg={6}>
              <Form.Group className="mt-2" as={Col} controlId="validationFormikNCRCreationDate">
                  <Row className="align-items-center">
                    <Col xs="auto" md={4}>
                      <Form.Label>NCR Creation Date</Form.Label>
                    </Col>
                    <Col md={8}>
                      <InputGroup hasValidation>
                        <Form.Control
                          type="date"
                          name="ncrCreationDate"
                          required                        
                          onChange={handleChange}
                          isValid={touched.ncrCreationDate && !errors.ncrCreationDate}                          
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.ncrCreationDate}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Col>
                  </Row>
                </Form.Group>
              </Col>
              <Row>
              <Form.Group className="mt-2" as={Col} controlId="validationFormikVerification&accepted">
                  <Row className="align-items-center">
                    <Col xs="auto" md={2}>
                      <Form.Label>Verification & Acceptance of Action Plan</Form.Label>
                    </Col>
                    <Col md={6}>
                      <InputGroup hasValidation>
                        <Form.Control
                          as="textarea"
                          name="verificationAccepted"
                          required                          
                          onChange={handleChange}
                          isValid={touched.verificationAccepted && !errors.verificationAccepted}                          
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.verificationAccepted}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Col>
                  </Row>
                </Form.Group>
              </Row>
              <Col lg={6}>
              <Form.Group className="mt-2" as={Col} controlId="validationFormikNCRClosedDate">
                  <Row className="align-items-center">
                    <Col xs="auto" md={4}>
                      <Form.Label>NCR Closed Date</Form.Label>
                    </Col>
                    <Col md={8}>
                      <InputGroup hasValidation>
                        <Form.Control
                          type="date"
                          name="ncrClosedDate"
                          required                          
                          onChange={handleChange}
                          isValid={touched.ncrClosedDate && !errors.ncrClosedDate}                          
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.ncrClosedDate}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Col>
                  </Row>
                </Form.Group>
              </Col>
              <Col lg={6}>
              <Form.Group className="mt-2" as={Col} controlId="validationFormikfollowUp">
                  <Row className="align-items-center">
                    <Col xs="auto" md={4}>
                      <Form.Label>Follow-up Verification</Form.Label>
                    </Col>
                    <Col md={8}>
                      <InputGroup hasValidation>
                        <Form.Control
                          type="date"
                          name="followUp"
                          required                          
                          onChange={handleChange}
                          isValid={touched.followUp && !errors.followUp}                         
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.followUp}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Col>
                  </Row>
                </Form.Group>
              </Col>
              <Col lg={6}>
              <Form.Group className="mt-2" as={Col} controlId="validationFormikNCRClosedBy">
                  <Row className="align-items-center">
                    <Col xs="auto" md={4}>
                      <Form.Label>NCR Closed By Auditor</Form.Label>
                    </Col>
                    <Col md={8}>
                      <InputGroup hasValidation>
                        <Form.Control
                          type="text"
                          name="ncrClosedBy"
                          required                          
                          onChange={handleChange}
                          isValid={touched.ncrClosedBy && !errors.ncrClosedBy}                      
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.ncrClosedBy}
                        </Form.Control.Feedback>
                      </InputGroup>
                    </Col>
                  </Row>
                </Form.Group>
              </Col>
              <Col lg={4}></Col>
              <Col lg={2}>
              <Button className="mt-2"  type="submit"  onClick={handleSubmit} style={{"display":"flex","alignItems":"flex-end"}}>Submit form</Button>                
              </Col>
            </>
          )}
        </Formik>
      </Row>
    </Container>
  );
};

export default Incident;
