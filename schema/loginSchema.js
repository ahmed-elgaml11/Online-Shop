const {z} = require('zod');

const loginSchema = z.object({
    email: z.string().email().refine(val => val.endsWith('.com'), { message: "Please enter a valid email"}),
    password: z.string().min(5, {message: 'password must be between 5 and 32 character'}).max(32).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,32}$/ 
    ),

})

module.exports = loginSchema;

