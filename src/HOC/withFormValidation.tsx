import React, { ChangeEvent } from "react";
import { Col, Form, FormProps, Row } from "react-bootstrap";
import { useField } from "formik";

interface WithFormValidationProps extends FormProps {
    label: string;
    name: string;
    controlId: string;
    type: "text" | "number";
}

const withFormValidation = (Component: React.ComponentType<any>) => ({
    controlId,
    label,
    name,
    type,
    ...props
}: WithFormValidationProps) => {
    const [field, meta] = useField(name);
    const handleChange = (e: ChangeEvent<any>) => {
        field.onChange(e);
      };

    return (
        <Form.Group controlId={controlId} className="mt-2">
            <Row className="align-items-center">
                <Col xs="auto" md={4}>
                    <Form.Label>{label}</Form.Label>
                </Col>
                <Col md={8}>
                    <Component {...field} {...props} type={type} isInvalid={meta.touched && !!meta.error} />
                    <Form.Control.Feedback type="invalid">{meta.error}</Form.Control.Feedback>
                </Col></Row>
        </Form.Group>
    );
};

export default withFormValidation;
