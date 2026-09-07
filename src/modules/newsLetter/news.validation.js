import{z} from 'zod';
export const newsLetterValidationSchema=z.object({
    email:z.email("Enter valid email").trim()
});