import { FormWrapper, Error, SubmitButton } from "../styles/StyledComponents";
import StatusMSG from "./StatusMsg";
import useManageStatus from "../hooks/useManageStatus";
import { FormEventHandler, ReactNode, useState } from "react";

interface ICustomFormFields {
  name: string;
  value: string | Date;
}

interface IForm {
  children: ReactNode;
  networkRequestFunction: (payload: FormData) => Promise<Response>;
  msgSubject: string;
  customFormFields?: Array<ICustomFormFields> | null;
  validation?: Array<string>;
}

const validateForm = (
  validation: Array<string>,
  formData: FormData
): Promise<Array<string>> =>
  new Promise((res, rej) => {
    let errors: Array<string> = [];
    validation.forEach((field: string) => {
      if (!formData.get(field)) {
        errors.push(`${field} cannot be empty`);
      }
    });

    return res(errors);
  });

const FormWithSubmit: React.FC<IForm> = ({
  children,
  networkRequestFunction,
  msgSubject,
  customFormFields,
  validation,
}) => {
  const {
    responseStatus: { success, fail, loading },
    handleNetworkResponse,
  } = useManageStatus();

  const [validationError, setValidationError] = useState<Array<string>>([]);

  interface IHandleSubmit extends FormEventHandler<HTMLDivElement> {
    preventDefault: () => void;
    target: object;
  }

  const handleSubmit = async (event: IHandleSubmit) => {
    event.preventDefault();
    const target = event.target;
    const formData = new FormData(target as HTMLFormElement);
    let preventSubmission = false;

    if (customFormFields) {
      customFormFields.forEach((field: ICustomFormFields) => {
        formData.append(field.name, field.value as string);
      });
    }

    if (validation) {
      const errors = await validateForm(validation, formData);
      if (errors.length > 0) {
        setValidationError(errors);
        preventSubmission = true;
      } else {
        setValidationError([]);
      }
    }

    if (!preventSubmission) {
      handleNetworkResponse(networkRequestFunction, formData);
    }
  };

  return (
    <>
      <FormWrapper
        component="form"
        onSubmit={handleSubmit as unknown as IHandleSubmit}
      >
        {children}
        <SubmitButton data-testid="submit" type="submit" />
        {loading && <p>Loading</p>}
        <ul>
          {validationError.map((item) => (
            <Error key={item}>{item}</Error>
          ))}
        </ul>
      </FormWrapper>
      <StatusMSG success={success} error={fail} subject={msgSubject} />
    </>
  );
};

export default FormWithSubmit;
