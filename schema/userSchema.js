const {z} = require('zod');

const userSchema = z.object({
    username: z.string().min(3, {message: 'username must be between 3 and 20 character'}).max(20).regex(/^[a-zA-Z0-9_]+$/, { message: "Username can only contain letters, numbers, and underscores" }), 
    email: z.string().email().refine(val => val.endsWith('.com'), { message: "Please enter a valid email"}),
    password: z.string().min(5, {message: 'password must be between 5 and 32 character'}).max(32).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{5,32}$/, { 
        message: "Password must contain at least one lowercase, one uppercase, and one special character" 
    }),
    confpassword: z.string()

}).refine((value) => value.password === value.confpassword , {
        message: "Passwords do not match",
        path: ["confpassword"],
    });

    module.exports = userSchema;

