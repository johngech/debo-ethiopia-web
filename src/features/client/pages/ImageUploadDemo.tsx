import {
  Form,
  FormImagePicker,
  FormMultipleImagePicker,
  SubmitButton,
} from "@/components/forms";
import { loginSchema } from "@/validation";

const ImageUploadDemo = () => {
  return (
    <div>
      <h1>HomePage</h1>
      <Form
        initialValues={{}}
        validationSchema={loginSchema}
        onSubmit={() => {}}
      >
        <FormImagePicker name="Avatar" label="Profile Picture" />
        <FormMultipleImagePicker name="images" label="Event Images" />
        <SubmitButton title="Upload" />
      </Form>
    </div>
  );
};

export default ImageUploadDemo;
