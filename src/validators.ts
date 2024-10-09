import * as yup from "yup";

// Add points payload validation schema
const addPointsSchema = yup.object().shape({
  payer: yup.string().required(),
  points: yup.number().required(), //.min(1),
  timestamp: yup
    .string()
    .required()
    .test("is-date", "Invalid date", (value) => !isNaN(Date.parse(value))),
});

// Spend points payload validation schema
const spendPointsSchema = yup.object().shape({
  points: yup.number().required().min(1),
});

export { addPointsSchema, spendPointsSchema };
