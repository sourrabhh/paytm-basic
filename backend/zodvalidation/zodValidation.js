const { z } = require('zod');

const signupValidation = z.object({
    username: z.string().email(),
    password: z.string(),
    firstName: z.string(),
    lastName: z.string(),
});

const updateBodyValidation = z.object({
    username: z.string().email().optional(),
    password: z.string().optional(),
});

module.exports = {signupValidation, updateBodyValidation}
