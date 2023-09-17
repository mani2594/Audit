import React, { FC, useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/esm/Form";
import InputGroup from "react-bootstrap/esm/InputGroup";
import Row from "react-bootstrap/esm/Row";
import * as formik from "formik";
import Container from "react-bootstrap/esm/Container";
import { format } from "date-fns";
import ValidationSchema from "./ValidationSchema";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { TicketApi } from "../../Services/TicketApi";
import { Spinner } from "react-bootstrap";
import { CounterState } from "../Redux/Reducers/createSlice";
interface IncidentProps { }

export interface Audit {
  incidentNumber:string;
  auditor: string;
  assign:string;  
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
  const username = useSelector((state:CounterState) => state.username);
  const { ticketNumber } = useParams<{ ticketNumber: string}>();
  const history = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { Formik } = formik;  
  const location = useLocation();
  function fetchData(ticketNumber: string| undefined) {      
    if(ticketNumber){
      const allIncident : Audit[] =location.state.incident;  
      const incident = allIncident.find(x=> x.incidentNumber == ticketNumber)
      if(incident){
        setValues(incident);
        console.log(incident);
      }
    }
  }
  useEffect(()=>{
    fetchData(ticketNumber);
  },[ticketNumber])
  const [values, setValues] = useState<Audit>({  
    incidentNumber :"",          
    auditor: username,
   assign: "",   
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
   corrCompletionDate : "",
   verificationAccepted: "",
   ncrClosedDate: "",
   followUp: ""
});

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

  const handleSubmit = async () => {
    try{debugger
      setIsLoading(true);
      if(ticketNumber){
        await TicketApi.EditAudit(values);    
      }else{        
        await TicketApi.createAudit(values);            
      }
    }
    catch (error) {
      setError("Failed to add ticket!");      
    }
    finally{
      setIsLoading(false);
      history("/home");
    }
  }
  const nonConformityDropdown = [
    { value: 'critical', label: 'Critical' },
    { value: 'major', label: 'Major' },
    { value: 'minor', label: 'Minor' },
  ];
  const ncrStatusDropdown=[
    {value:'Created',label:'Created'},
    {value:'Submitted(pending effectiveness evaluation)',label:'Submitted(pending effectiveness evaluation)'},

    {value:'Closed',label:'Closed'},    
  ];
  const siteDropdown=[
    {value:'IPPL - KK',label:'IPPL - KK'},
    {value:'IPPL - WLR',label:'IPPL - WLR'},
    {value:'IPPL - GJ',label:'IPPL - GJ'}, 
  ];
  const functionDropdown=[
    {value:'Procurement',label:'Procurement'},
    {value:'Supply chain - QA',label:'Supply chain - QA'},
    {value:'Production - Bulk',label:'Production - Bulk'},
    {value:'Production - Retail',label:'Production - Retail'}, 
    {value:'Quality',label:'Quality'},
    {value:'Maintenance',label:'Maintenance'},  
  ];  
 
  const redTextStyle = {
    color: 'red',
  };
  return (
    <Container fluid>
      {error!=null && <h1 style={{color: "red"}}>{error}</h1>}
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      ) : (
      
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
                            readOnly                            
                            value={values.auditor}                                                
                          />
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
                            value={values.assign}                        
                          />
                          <Form.Control.Feedback type="invalid">
                            {errors.assign}
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
                          value={values.ncrCreationDate}           
                          isValid={touched.ncrCreationDate && !errors.ncrCreationDate}                          
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.ncrCreationDate}
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
                          <Form.Select
                            name="function"
                            required
                            onChange={handleChange}
                            value={values.function}
                            isValid={values.function !== ''}
                          >                          
                            {functionDropdown.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </Form.Select>
                          <Form.Control.Feedback type="invalid">
                            Please select an option.
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
                          <Form.Select
                            name="site"
                            required
                            onChange={handleChange}
                            value={values.site}
                            isValid={values.site !== ''}
                          >                          
                            {siteDropdown.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </Form.Select>
                          <Form.Control.Feedback type="invalid">
                            Please select an option.
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
                            value={values.area}                                    
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
                          <Form.Select
                            name="nonConformity"
                            required
                            onChange={handleChange}
                            value={values.nonConformity}
                            isValid={values.nonConformity !== ''}
                          >                            
                            {nonConformityDropdown.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </Form.Select>
                          <Form.Control.Feedback type="invalid">
                            Please select an option.
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
                          value={values.descNonConformity}           
                          isValid={touched.descNonConformity && !errors.descNonConformity}                          
                        />
                        <Form.Control.Feedback type="invalid">
                          {errors.descNonConformity}
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
                          <Form.Select
                            name="ncrStatus"
                            required
                            onChange={handleChange}
                            value={values.ncrStatus}
                            isValid={values.ncrStatus !== ''}
                          >                            
                            {ncrStatusDropdown.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </Form.Select>
                          <Form.Control.Feedback type="invalid">
                            Please select an option.
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
                          value={values.rootCause}                                  
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
                          value={values.correction}           
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
                          value={values.correctionAction}           
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
                          value={values.corrCompletionDate}           
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
                          value={values.ncrCreationDate}           
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
                          value={values.verificationAccepted}           
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
                          value={values.ncrClosedDate}           
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
                          value={values.followUp}           
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
                          value={values.ncrClosedBy}           
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
      )}
    </Container>
  );
};

export default Incident;
