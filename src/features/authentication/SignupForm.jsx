import { useForm } from "react-hook-form";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit() {
    console.log("submitted");
  }

  // function onError(errors) {
  //   console.log(errors);
  // }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" errorMessage={errors.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          {...register("fullName", { required: "This field is required." })}
        />
      </FormRow>

      <FormRow label="Email address" errorMessage={errors.email?.message}>
        <Input
          type="email"
          id="email"
          {...register("email", {
            required: "This field is required.",
            pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email." },
          })}
        />
      </FormRow>

      <FormRow label="Password (min 8 characters)" errorMessage={errors.password?.message}>
        <Input
          type="password"
          id="password"
          {...register("password", {
            required: "This field is required.",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Repeat password"
        errorMessage={errors.passwordConfirm?.message}
      >
        <Input
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "This field is required.",
            validate: (val, values) =>
              val === values.password || "Passwords are inconsistent.",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button $variation="secondary" type="reset">
          Cancel
        </Button>
        <Button>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
