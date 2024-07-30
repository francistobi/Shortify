import { object, string } from "yup";

const destinationSchema = object({
  destination: string().required("Destination is required"),
});

export default destinationSchema;
